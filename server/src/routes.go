package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"strings"

	"./spotify"
)

func redirectHandler(w http.ResponseWriter, r *http.Request) {
	urlRedirect := r.URL
	query := urlRedirect.Query()
	code = query["code"][0]
	v := url.Values{}
	v.Set("grant_type", "authorization_code")
	v.Set("code", code)
	v.Set("redirect_uri", "http://localhost:6789/redirect")
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
		tempUser := spotify.GetUserData(accessToken)
		tempUser.AccessToken = accessToken
		tempUser.RefreshToken = tokens.RefreshToken

		found := false
		for _, user := range spotify.Users {
			if user.Email == tempUser.Email {
				found = true
				tempUser = user
			}
		}
		if !found {
			spotify.Users = append(spotify.Users, tempUser)
		}

		http.Redirect(w, r, fmt.Sprintf("http://localhost:3000/?email=%s", tempUser.Email), 301)
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

func getTopSongsHandler(w http.ResponseWriter, r *http.Request) {
	urlRedirect := r.URL
	query := urlRedirect.Query()
	kind := query["type"][0]
	term := query["term"][0]
	email := query["email"][0]

	user := spotify.User{}
	found := false
	for _, u := range spotify.Users {
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

	body := spotify.TimeRanges{
		Songs:   []spotify.SongInfo{},
		Artists: []spotify.ArtistInfo{},
	}
	for i := 0; i < 3; i++ {
		if kind == "tracks" {
			body.Songs = append(body.Songs, spotify.GetTopList(i, kind, term, user.AccessToken).([]spotify.SongInfo)...)
		} else {

			body.Artists = append(body.Artists, spotify.GetTopList(i, kind, term, user.AccessToken).([]spotify.ArtistInfo)...)
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

	user := spotify.User{}
	found := false
	for _, u := range spotify.Users {
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

	for _, u := range spotify.Users {
		if u.Email == email {
			u.AccessToken = user.AccessToken
			break
		}
	}

	resJSON, err := json.Marshal(spotify.User{Email: user.Email, ImageUrl: user.ImageUrl})
	if err == nil {
		w.Write(resJSON)
	} else {
		resJSON, _ = json.Marshal(Error{Type: "Error"})
		w.Write(resJSON)
	}

}
