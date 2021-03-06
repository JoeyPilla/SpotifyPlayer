package spotify

type album struct {
	AlbumType            string            `json:"album_type"`
	Artists              []Artist          `json:"artists"`
	AvailableMarkets     []string          `json:"available_markets"`
	ExternalURLs         map[string]string `json:"external_urls"`
	Href                 string            `json:"href"`
	ID                   string            `json:"id"`
	Images               []image           `json:"images"`
	Name                 string            `json:"name"`
	ReleaseDate          string            `json:"release_date"`
	ReleaseDatePrecision string            `json:"release_date_precision"`
	TotalTracks          int               `json:"total_tracks"`
	Type                 string            `json:"type"`
	URI                  string            `json:"uri"`
}

type Tracks struct {
	Items []Track
}

type Track struct {
	Album            album             `json:"album"`
	Artists          []Artist          `json:"artists"`
	AvailableMarkets []string          `json:"available_markets"`
	DiscNumber       int               `json:"disc_number"`
	DurationMs       int               `json:"duration_ms"`
	Explicit         bool              `json:"explicit"`
	ExternalIds      map[string]string `json:"external_ids"`
	ExternalUrls     map[string]string `json:"external_urls"`
	Href             string            `json:"href"`
	ID               string            `json:"id"`
	IsLocal          bool              `json:"is_local"`
	Name             string            `json:"name"`
	Popularity       int               `json:"popularity"`
	PreviewURL       string            `json:"preview_url"`
	TrackNumber      int               `json:"track_number"`
	Type             string            `json:"type"`
	URI              string            `json:"uri"`
}
