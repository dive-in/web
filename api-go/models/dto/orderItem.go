package dto

import "github.com/jinzhu/gorm"

type OrderItem struct {
	gorm.Model
	Quantity   int `json:"quantity"`
	MenuItemID uint
	OrderID    uint
}
