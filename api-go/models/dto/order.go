package dto

type Order struct {
	Id              int64           `json:"id"`
	OrderItems      []OrderItem     `json:"orderItems"`
	RestaurantTable RestaurantTable `json:"restaurantTable"`
	User            User            `json:"user"`
}
