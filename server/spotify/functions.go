package spotify

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

var client = &http.Client{}

type Type struct {
	Items []struct {
		Type string
	}
}

type TimeRanges struct {
	Songs   []Track  `json:"songs"`
	Artists []Artist `json:"artists"`
}

type User struct {
	Email        string `json:"email"`
	RefreshToken string `json:"refreshToken"`
	AccessToken  string `json:"accessToken"`
	ImageUrl     string `json:"imageUrl"`
}

//GetUserData Gets user data for logging in
func GetUserData(accessToken string) User {
	url := "https://api.spotify.com/v1/me"

	res, err := client.Do(requestBuilder(url, accessToken))
	if err != nil {
		fmt.Println(err)
	}
	defer res.Body.Close()

	body, _ := ioutil.ReadAll(res.Body)
	return getUser(body)
}

func getTopListHelper(c chan interface{}, url, kind, accessToken string) {
	res, err := client.Do(requestBuilder(url, accessToken))
	if err != nil {
		fmt.Println(err)
	}
	defer res.Body.Close()

	body, _ := ioutil.ReadAll(res.Body)
	c <- getData(body)
}

//GetTopList gets the users top 60 tracks/artists based on kind
func GetTopList(kind, timeRange, accessToken string) []interface{} {
	if accessToken == "" {
		return []interface{}{}
	}
	chanArray := []chan interface{}{
		make(chan interface{}, 1),
		make(chan interface{}, 1),
		make(chan interface{}, 1),
	}
	retValue := []interface{}{}
	for i, c := range chanArray {
		url := fmt.Sprintf("https://api.spotify.com/v1/me/top/%s?limit=20&offset=%d&time_range=%s", kind, i*20, timeRange)
		go getTopListHelper(c, url, kind, accessToken)
	}
	for _, c := range chanArray {
		retValue = append(retValue, <-c)
	}
	return retValue
}

func getData(body []byte) interface{} {
	var t Type
	json.Unmarshal(body, &t)
	if len(t.Items) == 0 {
		return "invalid"
	}
	if t.Items[0].Type == "artist" {
		var artists Artists
		json.Unmarshal(body, &artists)
		return artists
	} else {
		var tracks Tracks
		json.Unmarshal(body, &tracks)
		return tracks
	}
}

func requestBuilder(url, accessToken string) *http.Request {
	req, _ := http.NewRequest("GET", url, nil)
	bearer := "Bearer " + accessToken
	req.Header.Set("Authorization", bearer)
	req.Header.Set("Content-Type", "application/json")
	return req
}

func getUser(body []byte) User {
	var results map[string]interface{}
	_ = json.Unmarshal(body, &results)
	user := User{
		Email: results["email"].(string),
	}
	images := results["images"].([]interface{})
	if len(images) > 0 {
		user.ImageUrl = images[0].(map[string]interface{})["url"].(string)
	}
	return user
}
