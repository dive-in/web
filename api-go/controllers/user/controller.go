package user

import (
	"github.com/dive-in/web/api-go/models"
	"github.com/dive-in/web/api-go/services/user"
	"github.com/gin-gonic/gin"
	"net/http"
)

type UserController interface {
	Authenticate(ctx *gin.Context)
}

type UserControllerImpl struct {
	UserService user.UserService
}

func (u UserControllerImpl) Authenticate(ctx *gin.Context) {
	transferredObject, _ := ctx.Get("user")
	userModel := transferredObject.(models.AuthenticateUser)

	newUser := u.UserService.SaveOrUpdate(&userModel)

	token := u.UserService.GenerateToken(newUser.ID, userModel.AccessToken)

	ctx.JSON(http.StatusOK, gin.H{"payload": token})
}
