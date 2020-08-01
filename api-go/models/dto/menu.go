package dto

import "github.com/jinzhu/gorm"

type Menu struct {
	gorm.Model
	RestaurantID uint
	Categories   []Category `json:"categories"`
}
