package spotify

type Artists struct {
	Items []Artist
}

type Artist struct {
	ExternalURLs map[string]string `json:"external_urls"`
	Followers    follower          `json:"followers"`
	Genres       []string          `json:"genres"`
	Href         string            `json:"href"`
	ID           string            `json:"id"`
	Images       []image           `json:"images"`
	Name         string            `json:"name"`
	Popularity   int               `json:"popularity"`
	Type         string            `json:"type"`
	URI          string            `json:"uri"`
}

type follower struct {
	Href  string
	Total int
}

type image struct {
	Height int
	URL    string
	Width  int
}
