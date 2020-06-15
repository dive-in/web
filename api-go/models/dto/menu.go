package dto

type Menu struct {
	Id         int64      `json:"id"`
	Restaurant Restaurant `json:"restaurant"`
	Categories []Category `json:"categories"`
}
