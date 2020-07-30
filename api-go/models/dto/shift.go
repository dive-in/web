package dto

import (
	"github.com/jinzhu/gorm"
	"time"
)

type Shift struct {
	gorm.Model
	StartDate        time.Time       `json:"startDate"`
	EndDate          time.Time       `json:"endDate"`
	Employee         Employee        `json:"employee"`
	EmployeeID       uint            `gorm:"column:employee_id"`
	RestaurantTables RestaurantTable `json:"restaurantTables"`
}
