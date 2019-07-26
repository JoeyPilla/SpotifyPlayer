package spotify

type ArtistInfo struct {
	Artist    string   `json:"artist"`
	Genres    []string `json:"genres"`
	AlbumArt  string   `json:"albumArt"`
	ArtistUrl string   `json:"artistUrl"`
}

type SongInfo struct {
	Track        string   `json:"track"`
	Artists      []string `json:"artists"`
	Album        string   `json:"album"`
	AlbumArt     []string `json:"albumArt"`
	ArtistsUrl   []string `json:"artistsUrl"`
	AudioPreview string   `json:"audioPreview"`
}

type TimeRanges struct {
	Songs   []SongInfo   `json:"songs"`
	Artists []ArtistInfo `json:"artists"`
}

type User struct {
	Email        string `json:"email"`
	RefreshToken string `json:"refreshToken"`
	AccessToken  string `json:"accessToken"`
	ImageUrl     string `json:"imageUrl"`
}
