package main

import (
	"net/http"

	"github.com/gorilla/mux"
)

var client = &http.Client{}
var code = ""
var accessToken = ""
var refreshToken = ""

func main() {
	svr := server{
		router: mux.NewRouter(),
	}

	svr.routes()
	svr.start()
}
