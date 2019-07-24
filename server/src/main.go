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

type SongInfo struct {
	Track   string   `json:"track"`
	Artists []string `json:"artists"`
	Album   string   `json:"album"`
}

type ArtistInfo struct {
	Artist string   `json:"artist"`
	Genres []string `json:"genres"`
}

func getTopArtistList(limit int, offset int, kind string, timeRange string) []ArtistInfo {
	data := []ArtistInfo{}
	s := fmt.Sprintf("https://api.spotify.com/v1/me/top/%s?limit=%d&offset=%d&time_range=%s", kind, limit, offset*limit, timeRange)

	req, _ := http.NewRequest("GET", s, nil)
	var bearer = "Bearer " + accessToken
	req.Header.Set("Authorization", bearer)
	req.Header.Set("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)
	var results map[string]interface{}
	json.Unmarshal(body, &results)
	items := results["items"].([]interface{})
	for _, item := range items {
		destructuredItem := item.(map[string]interface{})
		name := destructuredItem["name"]
		genresTemp := destructuredItem["genres"].([]interface{})
		genres := []string{}
		for _, s := range genresTemp {
			genres = append(genres, s.(string))
		}
		data = append(data, ArtistInfo{
			Artist: name.(string),
			Genres: genres,
		})

	}
	return data
}

func getTopList(limit int, offset int, kind string, timeRange string) []SongInfo {
	data := []SongInfo{}
	s := fmt.Sprintf("https://api.spotify.com/v1/me/top/%s?limit=%d&offset=%d&time_range=%s", kind, limit, offset*limit, timeRange)

	req, _ := http.NewRequest("GET", s, nil)
	var bearer = "Bearer " + accessToken
	req.Header.Set("Authorization", bearer)
	req.Header.Set("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)
	var results map[string]interface{}
	json.Unmarshal(body, &results)
	items := results["items"].([]interface{})
	for _, item := range items {
		destructuredItem := item.(map[string]interface{})

		name := destructuredItem["name"]
		album := destructuredItem["album"].(map[string]interface{})["name"]
		artistsTemp := destructuredItem["artists"].([]interface{})
		artists := []string{}
		for _, a := range artistsTemp {
			artists = append(artists, a.(map[string]interface{})["name"].(string))
		}
		data = append(data, SongInfo{
			Track:   name.(string),
			Artists: artists,
			Album:   album.(string),
		})
	}
	return data
}

type TimeRanges struct {
	Songs   []SongInfo   `json:"songs"`
	Artists []ArtistInfo `json:"artists"`
}
type ReturnData struct {
	Long   TimeRanges `json:"long"`
	Medium TimeRanges `json:"medium"`
	Short  TimeRanges `json:"short"`
}

func getTopSongsHandler(w http.ResponseWriter, r *http.Request) {
	limit := 20
	kind := "tracks"
	long := "long_term"
	medium := "medium_term"
	short := "short_term"
	body := ReturnData{
		Long:   TimeRanges{},
		Medium: TimeRanges{},
		Short:  TimeRanges{},
	}
	for i := 0; i < 3; i++ {
		body.Long.Songs = append(body.Long.Songs, getTopList(limit, i, kind, long)...)
		body.Long.Artists = append(body.Long.Artists, getTopArtistList(limit, i, "artists", long)...)
		body.Medium.Songs = append(body.Medium.Songs, getTopList(limit, i, kind, medium)...)
		body.Medium.Artists = append(body.Medium.Artists, getTopArtistList(limit, i, "artists", medium)...)
		body.Short.Songs = append(body.Short.Songs, getTopList(limit, i, kind, short)...)
		body.Short.Artists = append(body.Short.Artists, getTopArtistList(limit, i, "artists", short)...)
	}
	resJson, err := json.Marshal(body)
	if err != nil {
		fmt.Println(err)
	}
	w.Write(resJson)
}

func main() {
	buildHandler := http.FileServer(http.Dir("../../client/build"))

	http.Handle("/", buildHandler)
	http.HandleFunc("/redirect", redirectHandler)
	http.HandleFunc("/currentSong", getCurrentSongHandler)
	http.HandleFunc("/topSongs", getTopSongsHandler)

	log.Fatal(http.ListenAndServe(":4001", nil))
}
