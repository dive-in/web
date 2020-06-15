package dto

import "github.com/jinzhu/gorm"

type OrderItem struct {
	gorm.Model
	Id       int64    `json:"id"`
	Quantity int      `json:"quantity"`
	MenuItem MenuItem `json:"menuItem"`
	Order    Order    `json:"order"`
}
