package dto

type User struct {
	Id        int     `json:"id"`
	FirstName string  `json:"firstName"`
	LastName  string  `json:"lastName"`
	Email     string  `json:"email"`
	Orders    []Order `json:"orders"`
}
