package spotify

func getSongData(item interface{}) SongInfo {
	destructuredItem := item.(map[string]interface{})
	name := destructuredItem["name"]
	album := destructuredItem["album"].(map[string]interface{})["name"]
	albumArtTemp := destructuredItem["album"].(map[string]interface{})["images"].([]interface{})
	artistsTemp := destructuredItem["artists"].([]interface{})
	audioPreview := ""
	if destructuredItem["preview_url"] != nil {
		audioPreview = destructuredItem["preview_url"].(string)
	}
	artists := []string{}
	artistsURL := []string{}
	for _, a := range artistsTemp {
		artistsURL = append(artistsURL, a.(map[string]interface{})["external_urls"].(map[string]interface{})["spotify"].(string))
		artists = append(artists, a.(map[string]interface{})["name"].(string))
	}
	albumArt := []string{}
	for _, art := range albumArtTemp {
		albumArt = append(albumArt, art.(map[string]interface{})["url"].(string))
	}
	return SongInfo{
		Track:        name.(string),
		Artists:      artists,
		Album:        album.(string),
		AlbumArt:     albumArt,
		ArtistsUrl:   artistsURL,
		AudioPreview: audioPreview,
	}
}

func getListOfSongs(items []interface{}) []SongInfo {
	data := []SongInfo{}
	for _, item := range items {
		data = append(data, getSongData(item))
	}
	return data
}
