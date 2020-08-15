package models

type AuthenticateUser struct {
	AccessToken string `form:"accessToken" json:"accessToken" binding:"required"`
	FirstName   string `form:"firstName" json:"firstName" binding:"required"`
	LastName    string `form:"lastName" json:"lastName" binding:"required"`
	Email       string `form:"email" json:"email" binding:"required"`
}
