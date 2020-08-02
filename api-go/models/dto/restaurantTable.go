package dto

import "github.com/jinzhu/gorm"

type RestaurantTable struct {
	gorm.Model
	Number       string `json:"number"`
	RestaurantID uint
	Orders       []Order `json:"orders"`
}
