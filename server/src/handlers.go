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

func errorHandler(err error) {
	if err != nil {
		fmt.Println(err)
	}
}

func (s *server) buildHandler() http.Handler {
	return http.FileServer(http.Dir("../../client/build"))
}

func (s *server) redirectHandler() http.HandlerFunc {

	return func(w http.ResponseWriter, r *http.Request) {
		code := r.URL.Query()["code"][0]
		v := url.Values{}
		v.Set("grant_type", "authorization_code")
		v.Set("code", code)
		v.Set("redirect_uri", options.redirectUri)

		u := &url.URL{
			Scheme:   "https",
			Path:     baseURL + "/api/token",
			RawQuery: v.Encode(),
		}

		req, err := http.NewRequest("POST", u.String(), nil)
		errorHandler(err)
		reqBuilder(req)

		res, err := client.Do(req)
		errorHandler(err)
		defer res.Body.Close()

		body, _ := ioutil.ReadAll(res.Body)
		var tokens TokenResponse
		err = json.Unmarshal(body, &tokens)
		errorHandler(err)
		if res.StatusCode == 200 {
			accessToken = tokens.AccessToken
			tempUser := spotify.GetUserData(accessToken)
			tempUser.AccessToken = accessToken
			tempUser.RefreshToken = tokens.RefreshToken
			user, found := findUser(tempUser.Email)
			if !found {
				spotify.Users = append(spotify.Users, tempUser)
			} else {
				tempUser = user
			}

			http.Redirect(w, r, fmt.Sprintf(options.link+"/?email=%s", tempUser.Email), 301)
		} else {
			w.WriteHeader(http.StatusInternalServerError)
			fmt.Fprintf(w, "Invalid authorization code, %q", code)
		}
	}
}

// func (s *server) getCurrentSongHandler() http.HandlerFunc {
// 	//thing := prepareThing()
// 	return func(w http.ResponseWriter, r *http.Request) {
// 		url := "https://api.spotify.com/v1/me/player"

// 		req, _ := http.NewRequest("GET", url, nil)
// 		var bearer = "Bearer " + accessToken
// 		req.Header.Set("Authorization", bearer)
// 		req.Header.Set("Content-Type", "application/json")

// 		res, _ := client.Do(req)

// 		defer res.Body.Close()
// 		body, _ := ioutil.ReadAll(res.Body)
// 		w.Write(body)
// 	}
// }

func (s *server) getTopSongsHandler() http.HandlerFunc {

	return func(w http.ResponseWriter, r *http.Request) {
		query := r.URL.Query()
		kind := query["type"][0]
		term := query["term"][0]
		email := query["email"][0]
		user, found := findUser(email)
		if !found {
			resJSON, _ := json.Marshal(Error{Type: "User not found"})
			w.Write(resJSON)
			return
		}
		body := spotify.TimeRanges{
			Songs:   []spotify.SongInfo{},
			Artists: []spotify.ArtistInfo{},
		}
		if kind == "tracks" {
			resp := spotify.GetTopList(kind, term, user.AccessToken)
			for _, value := range resp {
				body.Songs = append(body.Songs, value.([]spotify.SongInfo)...)
			}
		} else {
			resp := spotify.GetTopList(kind, term, user.AccessToken)
			for _, value := range resp {
				body.Artists = append(body.Artists, value.([]spotify.ArtistInfo)...)
			}
		}
		resJSON, err := json.Marshal(body)
		errorHandler(err)

		w.Write(resJSON)
	}
}

func (s *server) returningUserHandler() http.HandlerFunc {

	return func(w http.ResponseWriter, r *http.Request) {
		urlRedirect := r.URL
		query := urlRedirect.Query()
		email := query["email"][0]

		user, found := findUser(email)

		if !found {
			resJSON, _ := json.Marshal(Error{Type: "User not found"})
			w.Write(resJSON)
			return
		}

		u := &url.URL{
			Scheme: "https",
			Path:   baseURL + "/api/token",
		}

		payload := strings.NewReader(fmt.Sprintf("grant_type=refresh_token&refresh_token=%s", user.RefreshToken))
		req, err := http.NewRequest("POST", u.String(), payload)
		errorHandler(err)
		reqBuilder(req)

		res, err := client.Do(req)
		errorHandler(err)
		defer res.Body.Close()

		body, _ := ioutil.ReadAll(res.Body)
		var tokens TokenResponse
		err = json.Unmarshal(body, &tokens)
		errorHandler(err)

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
}

func (s *server) favoriteArtistsHandler() http.HandlerFunc {

	return func(w http.ResponseWriter, r *http.Request) {
		http.Redirect(w, r, options.link, 301)
	}
}
