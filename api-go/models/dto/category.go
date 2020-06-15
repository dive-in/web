package dto

type Category struct {
	Id        int64      `json:"id"`
	Name      string     `json:"name"`
	Menu      Menu       `json:"menu"`
	MenuItems []MenuItem `json:"menuItems"`
}
