package spotify

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

var client = &http.Client{}

//GetUserData Gets user data for logging in
func GetUserData(accessToken string) User {
	url := "https://api.spotify.com/v1/me"

	res, err := makeRequest(url, accessToken)
	if err != nil {
		fmt.Println(err)
	}
	defer res.Body.Close()

	body, _ := ioutil.ReadAll(res.Body)
	return getUser(body)
}

func getTopListHelper(c chan interface{}, url, kind, accessToken string) {
	res, err := makeRequest(url, accessToken)
	if err != nil {
		fmt.Println(err)
	}
	defer res.Body.Close()

	body, _ := ioutil.ReadAll(res.Body)
	c <- getData(body, kind)
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

func getData(body []byte, kind string) interface{} {
	var results map[string]interface{}
	json.Unmarshal(body, &results)
	items := results["items"].([]interface{})
	if kind == "tracks" {
		return getListOfSongs(items)
	} else {
		return getListOfArtists(items)
	}
	return nil
}

func makeRequest(url, accessToken string) (*http.Response, error) {
	req, _ := http.NewRequest("GET", url, nil)
	bearer := "Bearer " + accessToken
	req.Header.Set("Authorization", bearer)
	req.Header.Set("Content-Type", "application/json")
	return client.Do(req)
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
