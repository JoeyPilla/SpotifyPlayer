package spotify

import (
	"testing"
)

func TestRequestBuilderHeader(t *testing.T) {
	request := requestBuilder("url", "accessToken")
	for key, value := range request.Header {
		if key == "Authorization" {
			if value[0] != "Bearer accessToken" {
				t.Error(`Header.Authorization value = `, value[0])
			}
		} else if key == "Content-Type" {
			if value[0] != "application/json" {
				t.Error(`Header.Authorization value = `, value[0])
			}
		} else {
			t.Error(`requestBuilder("url", "accessToken").Header key = `, key)
		}
	}

	if request.URL.String() != "url" {
		t.Error(`request.URL = `, request.URL.String())
	}
}

func TestRequestBuilderBlankURL(t *testing.T) {
	request := requestBuilder("", "accessToken")
	for key, value := range request.Header {
		if key == "Authorization" {
			if value[0] != "Bearer accessToken" {
				t.Error(`Header.Authorization value = `, value[0])
			}
		} else if key == "Content-Type" {
			if value[0] != "application/json" {
				t.Error(`Header.Authorization value = `, value[0])
			}
		} else {
			t.Error(`requestBuilder("url", "accessToken").Header key = `, key)
		}
	}
	if request.URL.String() != "" {
		t.Error(`request.URL = `, request.URL.String())
	}
}

func TestRequestBuilderBlankAccessToken(t *testing.T) {
	request := requestBuilder("url", "")
	for key, value := range request.Header {
		if key == "Authorization" {
			if value[0] != "Bearer " {
				t.Error(`Header.Authorization value = `, value[0])
			}
		} else if key == "Content-Type" {
			if value[0] != "application/json" {
				t.Error(`Header.Authorization value = `, value[0])
			}
		} else {
			t.Error(`requestBuilder("url", "accessToken").Header key = `, key)
		}
	}
	if request.URL.String() != "url" {
		t.Error(`request.URL = `, request.URL.String())
	}
}
func TestRequestBuilderBlankAccessTokenBlankURL(t *testing.T) {
	request := requestBuilder("", "")
	for key, value := range request.Header {
		if key == "Authorization" {
			if value[0] != "Bearer " {
				t.Error(`Header.Authorization value = `, value[0])
			}
		} else if key == "Content-Type" {
			if value[0] != "application/json" {
				t.Error(`Header.Authorization value = `, value[0])
			}
		} else {
			t.Error(`requestBuilder("url", "accessToken").Header key = `, key)
		}
	}
	if request.URL.String() != "" {
		t.Error(`request.URL = `, request.URL.String())
	}
}
