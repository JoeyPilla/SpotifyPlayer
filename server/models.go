package main

import (
	"github.com/gorilla/mux"
)

type server struct {
	router *mux.Router
}

type intitalOptions struct {
	clientId     string
	clientSecret string
	redirectUri  string
	link         string
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
