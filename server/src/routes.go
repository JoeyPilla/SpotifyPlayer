package main

import (
	"log"
	"net/http"
	"time"
)

func (s *server) routes() {
	s.router.Handle("/", s.buildHandler())
	s.router.HandleFunc("/returningUser", s.returningUserHandler())
	s.router.HandleFunc("/redirect", s.redirectHandler())
	s.router.HandleFunc("/currentSong", s.getCurrentSongHandler())
	s.router.HandleFunc("/topSongs", s.getTopSongsHandler())
	s.router.HandleFunc("/FavoriteArtists", s.favoriteArtistsHandler())
}

func (s *server) start() {
	srv := &http.Server{
		Handler: s.router,
		Addr:    "localhost:4001",
		// Good practice: enforce timeouts for servers you create!
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Fatal(srv.ListenAndServe())
}
