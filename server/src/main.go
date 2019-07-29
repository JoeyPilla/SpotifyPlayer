package main

import (
	"log"
	"net/http"
)

var client = &http.Client{}
var code = ""
var accessToken = ""
var refreshToken = ""

func main() {
	buildHandler := http.FileServer(http.Dir("../../client/build"))
	http.Handle("/", buildHandler)
	http.HandleFunc("/returningUser", returningUserHandler)
	http.HandleFunc("/redirect", redirectHandler)
	http.HandleFunc("/currentSong", getCurrentSongHandler)
	http.HandleFunc("/topSongs", getTopSongsHandler)
	http.HandleFunc("/FavoriteArtists", func(w http.ResponseWriter, r *http.Request) {
		http.Redirect(w, r, options.link, 301)
	})

	log.Fatal(http.ListenAndServe(":4001", nil))
}
