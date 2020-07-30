package dto

import "github.com/jinzhu/gorm"

type Employee struct {
	gorm.Model
	Name     string `json:"name"`
	Username string `json:"username"`
	Password string `json:"password"`
	Photo    string `json:"photo"`
	//Restaurant Restaurant `json:"restaurant"`
	Shifts []Shift `json:"shifts" gorm:"ForeignKey:EmployeeID"`
}
