package spotify

func getArtistData(item interface{}) ArtistInfo {
	destructuredItem := item.(map[string]interface{})
	name := destructuredItem["name"]
	genresTemp := destructuredItem["genres"].([]interface{})
	artistURL := destructuredItem["external_urls"].(map[string]interface{})["spotify"].(string)
	albumArtTemp := ""
	if len(destructuredItem["images"].([]interface{})) > 0 {
		albumArtTemp = destructuredItem["images"].([]interface{})[0].(map[string]interface{})["url"].(string)
	}

	genres := []string{}
	for _, s := range genresTemp {
		genres = append(genres, s.(string))
	}
	return ArtistInfo{
		Artist:    name.(string),
		Genres:    genres,
		AlbumArt:  albumArtTemp,
		ArtistUrl: artistURL,
	}
}

func getListOfArtists(items []interface{}) []ArtistInfo {
	data := []ArtistInfo{}
	for _, item := range items {
		data = append(data, getArtistData(item))
	}
	return data
}
