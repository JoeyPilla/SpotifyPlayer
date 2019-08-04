package main

import (
	"net/http"

	"./spotify"
)

var baseURL = "accounts.spotify.com"

func findUser(email string) (spotify.User, bool) {
	for _, u := range spotify.Users {
		if u.Email != "" && u.Email == email {
			return u, true
		}
	}
	return spotify.User{}, false
}

func reqBuilder(req *http.Request) {
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	req.SetBasicAuth(options.clientId, options.clientSecret)
}
