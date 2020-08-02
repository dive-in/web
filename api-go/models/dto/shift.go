package dto

import (
	"github.com/jinzhu/gorm"
	"time"
)

type Shift struct {
	gorm.Model
	StartDate        time.Time `json:"startDate"`
	EndDate          time.Time `json:"endDate"`
	EmployeeID       uint
	RestaurantTables []RestaurantTable `gorm:"many2many:shift_tables";json:"restaurantTables"`
}
