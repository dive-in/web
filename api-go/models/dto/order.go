package dto

import "github.com/jinzhu/gorm"

type Order struct {
	gorm.Model
	OrderItems        []OrderItem `json:"orderItems"`
	RestaurantTableID uint
	UserID            uint
}
