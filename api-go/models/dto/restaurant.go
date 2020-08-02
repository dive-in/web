package dto

import "github.com/jinzhu/gorm"

type Restaurant struct {
	gorm.Model
	Name      string            `json:"name"`
	Latitude  float64           `json:"latitude"`
	Longitude float64           `json:"longitude"`
	LogoUrl   string            `json:"logoUrl"`
	Tables    []RestaurantTable `json:"tables"`
	Menu      Menu              `json:"menu"`
	Employees []Employee        `json:"employees"`
}
