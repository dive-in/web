package dto

type Restaurant struct {
	Id        int               `json:"id"`
	Name      string            `json:"name"`
	Latitude  float64           `json:"latitude"`
	Longitude float64           `json:"longitude"`
	LogoUrl   string            `json:"logoUrl"`
	Tables    []RestaurantTable `json:"tables"`
	//Menu Menu `json:"menu"`
	Employees []Employee `json:"employees"`
}
