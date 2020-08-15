package user

import (
	"github.com/dive-in/web/api-go/authorization"
	"github.com/dive-in/web/api-go/models"
	"github.com/dive-in/web/api-go/models/dto"
	"github.com/jinzhu/gorm"
)

type UserService interface {
	SaveOrUpdate(user *models.AuthenticateUser) dto.User
	GenerateToken(id uint, accessToken string) string
}

type UserServiceImpl struct {
	Database *gorm.DB
}

func (u UserServiceImpl) SaveOrUpdate(user *models.AuthenticateUser) dto.User {
	var userEntity dto.User
	u.Database.Where("email = ?", user.Email).First(&userEntity)

	userEntity.Email = user.Email
	userEntity.FirstName = user.FirstName
	userEntity.LastName = user.LastName

	u.Database.Save(&userEntity)

	return userEntity
}

func (u UserServiceImpl) GenerateToken(id uint, accessToken string) string {
	if id == 0 || len(accessToken) == 0 {
		panic("id and accessToken cannot be undefined")
	}

	token, err := authorization.CreateToken(id, accessToken)
	if err != nil {
		panic(err)
	}

	return token
}
