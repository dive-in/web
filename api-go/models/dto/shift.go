package dto

import "time"

type Shift struct {
	Id               int             `json:"id"`
	StartDate        time.Time       `json:"startDate"`
	EndDate          time.Time       `json:"endDate"`
	Employee         Employee        `json:"employee"`
	RestaurantTables RestaurantTable `json:"restaurantTables"`
}
