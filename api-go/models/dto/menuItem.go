package dto

import "github.com/jinzhu/gorm"

type MenuItem struct {
	gorm.Model
	Name         string  `json:"name"`
	Price        float64 `json:"price"`
	Description  string  `json:"description"`
	Quantity     int     `json:"quantity"`
	QuantityType string  `json:"quantityType"`
	Photo        string  `json:"photo"`
	CategoryID   uint
}
