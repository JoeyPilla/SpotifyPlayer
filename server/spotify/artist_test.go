package spotify

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
	"testing"
)

type intitalOptions struct {
	clientId     string
	clientSecret string
	redirectUri  string
	link         string
}

var options = intitalOptions{
	"46f2786f859a4f7cbf7482de3acfe7cf",
	"6317e7356b1341a5902de31f9b8591fd",
	"http://localhost:4001/redirect",
	"http://localhost:3000",
}

var refreshToken = "AQDCfEs04aRGDylszKEY8v3Ff9STXNU-NRuvDpdyFzbqcTSNoLjeJrcWww_QbVFp-lw7jmTyjTMF8mmkRelCTEx7a0CPQmBuH3RDrzB1upt3I5T-_Oph2-runwI2XhJP-7TdMQ"
var accessToken = returningUserHandler()

func TestArtistGetDataArtists(t *testing.T) {
	url := fmt.Sprintf("https://api.spotify.com/v1/me/top/%s?limit=20&offset=%d&time_range=%s", "artists", 0, "long_term")
	res, err := client.Do(requestBuilder(url, accessToken))
	if err != nil {
		fmt.Println(err)
	}
	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)
	data := getData(body).(Artists)
	if len(data.Items) != 20 {
		t.Error(`len(getData(body)) = `, len(data.Items))
	}
}

func TestArtistsGetDataBadType(t *testing.T) {
	url := fmt.Sprintf("https://api.spotify.com/v1/me/top/%s?limit=20&offset=%d&time_range=%s", "artee", 0, "long_term")
	res, err := client.Do(requestBuilder(url, accessToken))
	if err != nil {
		fmt.Println(err)
	}
	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)
	if getData(body).(string) != "invalid" {
		t.Error(`getData(body) = `, getData(body))
	}
}
func TestArtistGetDataLargeOffset(t *testing.T) {
	url := fmt.Sprintf("https://api.spotify.com/v1/me/top/%s?limit=20&offset=%d&time_range=%s", "artists", 600, "long_term")
	res, err := client.Do(requestBuilder(url, accessToken))
	if err != nil {
		fmt.Println(err)
	}
	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)
	if getData(body).(string) != "invalid" {
		t.Error(`getData(body) = `, getData(body))
	}
}
func TestArtistGetDataBadTimeRange(t *testing.T) {
	url := fmt.Sprintf("https://api.spotify.com/v1/me/top/%s?limit=20&offset=%d&time_range=%s", "artists", 0, "fdsa")
	res, err := client.Do(requestBuilder(url, accessToken))
	if err != nil {
		fmt.Println(err)
	}
	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)
	if getData(body).(string) != "invalid" {
		t.Error(`getData(body) = `, getData(body))
	}
}

func TestGetDataBadAccessToken(t *testing.T) {
	url := fmt.Sprintf("https://api.spotify.com/v1/me/top/%s?limit=20&offset=%d&time_range=%s", "artist", 0, "long_term")
	res, err := client.Do(requestBuilder(url, "Bad access token"))
	if err != nil {
		fmt.Println(err)
	}
	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)
	inv := getData(body).(string)
	if inv != "invalid" {
		t.Error(`getData(body) = `, inv)
	}
}

func returningUserHandler() string {
	payload := strings.NewReader(fmt.Sprintf("grant_type=refresh_token&refresh_token=%s", refreshToken))
	req, _ := http.NewRequest("POST", "https://accounts.spotify.com/api/token", payload)
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	req.SetBasicAuth(options.clientId, options.clientSecret)
	res, _ := http.DefaultClient.Do(req)
	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	var results map[string]interface{}
	json.Unmarshal(body, &results)
	return results["access_token"].(string)
}
