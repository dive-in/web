package dto

import "github.com/jinzhu/gorm"

type User struct {
	gorm.Model
	FirstName string  `json:"firstName"`
	LastName  string  `json:"lastName"`
	Email     string  `json:"email"`
	Orders    []Order `json:"orders"`
}
