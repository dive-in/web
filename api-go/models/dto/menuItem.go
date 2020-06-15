package dto

type MenuItem struct {
	Id           int64    `json:"id"`
	Name         string   `json:"name"`
	Price        float64  `json:"price"`
	Description  string   `json:"description"`
	Quantity     int      `json:"quantity"`
	QuantityType string   `json:"quantityType"`
	Photo        string   `json:"photo"`
	Category     Category `json:"category"`
	//OrderItem    OrderItem `json:"orderItem"`
}
