package dto

import "github.com/jinzhu/gorm"

type Category struct {
	gorm.Model
	Name      string `json:"name"`
	MenuID    uint
	MenuItems []MenuItem `json:"menuItems"`
}
