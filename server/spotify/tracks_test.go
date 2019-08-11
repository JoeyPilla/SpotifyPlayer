package spotify

import (
	"fmt"
	"io/ioutil"
	"testing"
)

// type intitalOptions struct {
// 	clientId     string
// 	clientSecret string
// 	redirectUri  string
// 	link         string
// }

// var options = intitalOptions{
// 	"46f2786f859a4f7cbf7482de3acfe7cf",
// 	"6317e7356b1341a5902de31f9b8591fd",
// 	"http://localhost:4001/redirect",
// 	"http://localhost:3000",
// }

// var refreshToken = "AQDCfEs04aRGDylszKEY8v3Ff9STXNU-NRuvDpdyFzbqcTSNoLjeJrcWww_QbVFp-lw7jmTyjTMF8mmkRelCTEx7a0CPQmBuH3RDrzB1upt3I5T-_Oph2-runwI2XhJP-7TdMQ"
// var accessToken = returningUserHandler()

func TestTrackGetDataTracks(t *testing.T) {
	url := fmt.Sprintf("https://api.spotify.com/v1/me/top/%s?limit=20&offset=%d&time_range=%s", "tracks", 0, "long_term")
	res, err := client.Do(requestBuilder(url, accessToken))
	if err != nil {
		fmt.Println(err)
	}
	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)
	data := getData(body).(Tracks)
	if len(data.Items) != 20 {
		t.Error(`len(getData(body)) = `, len(data.Items))
	}
}

func TestTrackGetDataBadType(t *testing.T) {
	url := fmt.Sprintf("https://api.spotify.com/v1/me/top/%s?limit=20&offset=%d&time_range=%s", "tra", 0, "long_term")
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
func TestTrackGetDataLargeOffset(t *testing.T) {
	url := fmt.Sprintf("https://api.spotify.com/v1/me/top/%s?limit=20&offset=%d&time_range=%s", "tracks", 600, "long_term")
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
func TestTrackGetDataBadTimeRange(t *testing.T) {
	url := fmt.Sprintf("https://api.spotify.com/v1/me/top/%s?limit=20&offset=%d&time_range=%s", "tracks", 0, "fdsa")
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

func TestTrackGetDataBadAccessToken(t *testing.T) {
	url := fmt.Sprintf("https://api.spotify.com/v1/me/top/%s?limit=20&offset=%d&time_range=%s", "track", 0, "long_term")
	res, err := client.Do(requestBuilder(url, "Bad Access Token"))
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
