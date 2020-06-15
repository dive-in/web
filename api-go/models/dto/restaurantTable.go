package dto

type RestaurantTable struct {
	Id     int    `json:"id"`
	Number string `json:"number"`
	//Restaurant Restaurant `json:"restaurant"`
	//Shift Shift `json:"shift"`
	Orders []Order `json:"orders"`
}
