package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"strings"
)

var client = &http.Client{}
var code = ""
var accessToken = ""
var refreshToken = ""

type User struct {
	Email        string `json:"email"`
	RefreshToken string `json:"refreshToken"`
	AccessToken  string
	ImageUrl     string `json:"imageUrl"`
}

var Users []User

type tokenRequestOptions struct {
	grantType   string `url:"grant_type"`
	code        string `url:"code"`
	redirectUri string `url:"redirect_uri"`
}

type Error struct {
	Type string `url:"error"`
}

type TokenResponse struct {
	AccessToken  string `json:"access_token"`
	TokenType    string `json:"token_type"`
	ExpiresIn    int    `json:"expires_in"`
	RefreshToken string `json:"refresh_token"`
	Scope        string `json:"scope"`
}

func getUserData(accessToken string) User {
	url := "https://api.spotify.com/v1/me"
	req, _ := http.NewRequest("GET", url, nil)
	var bearer = "Bearer " + accessToken
	req.Header.Set("Authorization", bearer)
	//req.Header.Set("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()

	var results map[string]interface{}
	body, _ := ioutil.ReadAll(res.Body)
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

func redirectHandler(w http.ResponseWriter, r *http.Request) {
	//var accessToken = ""
	//var refreshToken = ""
	urlRedirect := r.URL
	query := urlRedirect.Query()
	code = query["code"][0]
	v := url.Values{}
	v.Set("grant_type", "authorization_code")
	v.Set("code", code)
	v.Set("redirect_uri", "http://76.187.109.190:5639/redirect")
	u := &url.URL{
		Scheme:   "https",
		Path:     "accounts.spotify.com/api/token",
		RawQuery: v.Encode(),
	}
	req, err := http.NewRequest("POST", u.String(), nil)
	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")
	req.SetBasicAuth(options.clientId, options.clientSecret)
	if err != nil {
		fmt.Println(err)
	}
	res, err := client.Do(req)
	defer res.Body.Close()
	if err != nil {
		fmt.Println(err)
	}
	body, _ := ioutil.ReadAll(res.Body)
	var tokens TokenResponse
	err = json.Unmarshal(body, &tokens)
	if err != nil {
		fmt.Println(err)
	}
	if res.StatusCode == 200 {
		accessToken = tokens.AccessToken
		tempUser := getUserData(accessToken)
		tempUser.AccessToken = accessToken
		tempUser.RefreshToken = tokens.RefreshToken

		found := false
		for _, user := range Users {
			if user.Email == tempUser.Email {
				found = true
				tempUser = user
			}
		}
		if !found {
			Users = append(Users, tempUser)
		}
		http.Redirect(w, r, fmt.Sprintf("http://76.187.109.190:5639/?email=%s", tempUser.Email), 301)
	} else {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "Invalid authorization code, %q", code)
	}
}

func getCurrentSongHandler(w http.ResponseWriter, r *http.Request) {

	url := "https://api.spotify.com/v1/me/player"

	req, _ := http.NewRequest("GET", url, nil)
	var bearer = "Bearer " + accessToken
	req.Header.Set("Authorization", bearer)
	req.Header.Set("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)
	w.Write(body)

}

type SongInfo struct {
	Track    string   `json:"track"`
	Artists  []string `json:"artists"`
	Album    string   `json:"album"`
	AlbumArt []string `json:"albumArt`
}

type ArtistInfo struct {
	Artist   string   `json:"artist"`
	Genres   []string `json:"genres"`
	AlbumArt string   `json:"albumArt`
}

func getTopArtistList(limit int, offset int, kind string, timeRange string, accessToken string) []ArtistInfo {
	data := []ArtistInfo{}
	s := fmt.Sprintf("https://api.spotify.com/v1/me/top/%s?limit=%d&offset=%d&time_range=%s", kind, limit, offset*limit, timeRange)

	req, _ := http.NewRequest("GET", s, nil)
	var bearer = "Bearer " + accessToken
	req.Header.Set("Authorization", bearer)
	req.Header.Set("Content-Type", "application/json")

	res, _ := client.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)
	var results map[string]interface{}
	json.Unmarshal(body, &results)
	items := results["items"].([]interface{})
	for _, item := range items {
		destructuredItem := item.(map[string]interface{})
		name := destructuredItem["name"]
		genresTemp := destructuredItem["genres"].([]interface{})
		albumArtTemp := ""
		if len(destructuredItem["images"].([]interface{})) > 0 {
			albumArtTemp = destructuredItem["images"].([]interface{})[0].(map[string]interface{})["url"].(string)
		}

		genres := []string{}
		for _, s := range genresTemp {
			genres = append(genres, s.(string))
		}
		data = append(data, ArtistInfo{
			Artist:   name.(string),
			Genres:   genres,
			AlbumArt: albumArtTemp,
		})

	}
	return data
}

func getTopList(limit int, offset int, kind string, timeRange string, accessToken string) []SongInfo {
	data := []SongInfo{}
	s := fmt.Sprintf("https://api.spotify.com/v1/me/top/%s?limit=%d&offset=%d&time_range=%s", kind, limit, offset*limit, timeRange)

	req, _ := http.NewRequest("GET", s, nil)
	var bearer = "Bearer " + accessToken
	req.Header.Set("Authorization", bearer)
	req.Header.Set("Content-Type", "application/json")

	res, _ := client.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)
	var results map[string]interface{}
	json.Unmarshal(body, &results)
	items := results["items"].([]interface{})
	for _, item := range items {
		destructuredItem := item.(map[string]interface{})

		name := destructuredItem["name"]
		album := destructuredItem["album"].(map[string]interface{})["name"]
		albumArtTemp := destructuredItem["album"].(map[string]interface{})["images"].([]interface{})
		artistsTemp := destructuredItem["artists"].([]interface{})
		artists := []string{}
		for _, a := range artistsTemp {
			artists = append(artists, a.(map[string]interface{})["name"].(string))
		}
		albumArt := []string{}
		for _, art := range albumArtTemp {
			albumArt = append(albumArt, art.(map[string]interface{})["url"].(string))
		}
		data = append(data, SongInfo{
			Track:    name.(string),
			Artists:  artists,
			Album:    album.(string),
			AlbumArt: albumArt,
		})
	}
	return data
}

type TimeRanges struct {
	Songs   []SongInfo   `json:"songs"`
	Artists []ArtistInfo `json:"artists"`
}

func getTopSongsHandler(w http.ResponseWriter, r *http.Request) {
	urlRedirect := r.URL
	query := urlRedirect.Query()
	kind := query["type"][0]
	term := query["term"][0]
	email := query["email"][0]
	limit := 20

	user := User{}
	found := false
	for _, u := range Users {
		if u.Email == email {
			found = true
			user = u
			break
		}
	}
	if !found {
		resJSON, _ := json.Marshal(Error{Type: "User not found"})
		w.Write(resJSON)
		return
	}

	body := TimeRanges{
		Songs:   []SongInfo{},
		Artists: []ArtistInfo{},
	}
	for i := 0; i < 3; i++ {
		if kind == "tracks" {
			body.Songs = append(body.Songs, getTopList(limit, i, kind, term, user.AccessToken)...)
		} else {

			body.Artists = append(body.Artists, getTopArtistList(limit, i, kind, term, user.AccessToken)...)
		}
	}
	resJson, err := json.Marshal(body)
	if err != nil {
		fmt.Println(err)
	}
	w.Write(resJson)
}

func returningUserHandler(w http.ResponseWriter, r *http.Request) {
	urlRedirect := r.URL
	query := urlRedirect.Query()
	email := query["email"][0]

	user := User{}
	found := false
	for _, u := range Users {
		if u.Email == email {
			found = true
			user = u
			break
		}
	}

	if !found {
		resJSON, _ := json.Marshal(Error{Type: "User not found"})
		w.Write(resJSON)
		return
	}

	endpoint := "https://accounts.spotify.com/api/token"

	payload := strings.NewReader(fmt.Sprintf("grant_type=refresh_token&refresh_token=%s", user.RefreshToken))
	req, err := http.NewRequest("POST", endpoint, payload)
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	req.SetBasicAuth(options.clientId, options.clientSecret)
	if err != nil {
		fmt.Println(err)
	}
	res, err := client.Do(req)
	defer res.Body.Close()
	if err != nil {
		fmt.Println(err)
	}
	body, _ := ioutil.ReadAll(res.Body)
	var tokens TokenResponse
	err = json.Unmarshal(body, &tokens)
	if err != nil {
		fmt.Println(err)
	}
	var results map[string]interface{}
	json.Unmarshal(body, &results)
	user.AccessToken = results["access_token"].(string)

	for _, u := range Users {
		if u.Email == email {
			u.AccessToken = user.AccessToken
			break
		}
	}

	resJSON, err := json.Marshal(User{Email: user.Email, ImageUrl: user.ImageUrl})
	if err == nil {
		w.Write(resJSON)
	} else {
		resJSON, _ = json.Marshal(Error{Type: "Error"})
		w.Write(resJSON)
	}

}

func main() {
	buildHandler := http.FileServer(http.Dir("../../client/build"))
	http.Handle("/", buildHandler)
	http.HandleFunc("/returningUser", returningUserHandler)
	http.HandleFunc("/redirect", redirectHandler)
	http.HandleFunc("/currentSong", getCurrentSongHandler)
	http.HandleFunc("/FavoriteArtists", func(w http.ResponseWriter, r *http.Request) {
		http.Redirect(w, r, "http://76.187.109.190:5639/", 301)
	})
	http.HandleFunc("/topSongs", getTopSongsHandler)

	log.Fatal(http.ListenAndServe(":4001", nil))
}
