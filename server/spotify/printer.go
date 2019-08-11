package spotify

import (
	"encoding/json"
	"fmt"
)

func (artists Artists) print() {
	printer(artists)
}

func (artist Artist) print() {
	printer(artist)
}

func (tracks Tracks) print() {
	printer(tracks)
}

func (album album) print() {
	printer(album)
}

func printer(i interface{}) {
	temp, _ := json.MarshalIndent(i, "", "  ")
	fmt.Println(string(temp))
}
