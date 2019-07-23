package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
)

var code = ""
var accessToken = ""
var refreshToken = ""

type tokenRequestOptions struct {
	grantType   string `url:"grant_type"`
	code        string `url:"code"`
	redirectUri string `url:"redirect_uri"`
}

type TokenResponse struct {
	AccessToken  string `json:"access_token"`
	TokenType    string `json:"token_type"`
	ExpiresIn    int    `json:"expires_in"`
	RefreshToken string `json:"refresh_token"`
	Scope        string `json:"scope"`
}

func redirectHandler(w http.ResponseWriter, r *http.Request) {
	client := &http.Client{}
	urlRedirect := r.URL
	query := urlRedirect.Query()
	code = query["code"][0]
	v := url.Values{}
	v.Set("grant_type", "authorization_code")
	v.Set("code", code)
	v.Set("redirect_uri", options.redirectUri)

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
		w.Write(body)
		accessToken = tokens.AccessToken
	} else {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "Invalid authorization code, %q", code)
	}

}

func getCurrentSongHandler(w http.ResponseWriter, r *http.Request) {
	//client := &http.Client{}

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

func main() {
	buildHandler := http.FileServer(http.Dir("../../client/build"))

	http.Handle("/", buildHandler)
	http.HandleFunc("/redirect", redirectHandler)
	http.HandleFunc("/currentSong", getCurrentSongHandler)
	log.Fatal(http.ListenAndServe(":4001", nil))
}

// url := "https://accounts.spotify.com/api/token"

// payload := strings.NewReader("grant_type=authorization_code&redirect_uri=http%3A%2F%2Flocalhost%3A4001%2Fredirect&code=AQAN4BrN62z2V3fH69kM-2PeLC9LynpyyGWtg14xcz88fPeh-eUMwoKDsABwO3u0TtE_71fWQh-oA_uHN88ZzA7qZpGGs4U-qVBOtKT8xhGrhBZFQcZTrMDwz1gPoKH4pk3JSUMjgtu33emP3e5TTdnPgeTYQ2YpY_f6OT5ILT_OqxjpdWiGgU6r9-7pIW18jvVdDeyPQrDvWwjtKuvzyolb4G3wOunwZhrk4j6Wv-5isElLsC1TjsjF%0A")

// req, _ := http.NewRequest("POST", url, payload)

// req.Header.Add("Content-Type", "application/x-www-form-urlencoded")
// req.Header.Add("Authorization", "Basic NDZmMjc4NmY4NTlhNGY3Y2JmNzQ4MmRlM2FjZmU3Y2Y6NjMxN2U3MzU2YjEzNDFhNTkwMmRlMzFmOWI4NTkxZmQ=")
// req.Header.Add("User-Agent", "PostmanRuntime/7.15.0")
// req.Header.Add("Accept", "*/*")
// req.Header.Add("Cache-Control", "no-cache")
// req.Header.Add("Postman-Token", "cccc4d26-b5f0-40e5-bc50-886117552729,3fd1a5d5-e8f7-4bcd-9336-0b280701a037")
// req.Header.Add("Host", "accounts.spotify.com")
// req.Header.Add("cookie", "csrf_token=AQDizw1mmrDPliD_dy9vzJ5CndKAuahSAIdhlgjlYKLu0-mBW2zDO6XOBDG3DMYKsbVs-eYlSIGOmSHvaA")
// req.Header.Add("accept-encoding", "gzip, deflate")
// req.Header.Add("content-length", "340")
// req.Header.Add("Connection", "keep-alive")
// req.Header.Add("cache-control", "no-cache")

// res, _ := http.DefaultClient.Do(req)

// defer res.Body.Close()
// body, _ := ioutil.ReadAll(res.Body)

// fmt.Println(res)
// fmt.Println(string(body))
