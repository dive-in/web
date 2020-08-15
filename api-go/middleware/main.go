package middleware

import (
	"errors"
	"github.com/dgrijalva/jwt-go"
	"github.com/dive-in/web/api-go/authorization"
	"github.com/dive-in/web/api-go/models"
	"github.com/dive-in/web/api-go/utils"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"net/http"
	"strconv"
	"strings"
)

func Authorized(ctx *gin.Context) {
	header := ctx.GetHeader("Authorization")
	splitString := strings.Split(header, " ")
	if len(splitString) != 2 {
		createResponse(ctx, http.StatusUnauthorized, errors.New("authorization token is not present in the headers"))
	} else {
		token, err := authorization.VerifyToken(splitString[1])
		if err != nil {
			createResponse(ctx, http.StatusUnauthorized, err)
		} else if _, ok := token.Claims.(jwt.Claims); !ok && !token.Valid {
			createResponse(ctx, http.StatusUnauthorized, err)
		}
	}
}

func ValidateAuthenticationUser(ctx *gin.Context) {
	var userModel models.AuthenticateUser
	if err := ctx.ShouldBindBodyWith(&userModel, binding.JSON); err != nil {
		createResponse(ctx, http.StatusBadRequest, err)
	} else if !utils.IsEmailValid(userModel.Email) {
		createResponse(ctx, http.StatusBadRequest, errors.New("email is not valid"))
	} else {
		isValid, err := authorization.IsTokenValid(userModel.AccessToken)
		if !isValid {
			if err == nil {
				err = errors.New("provided access token is not a valid Facebook access token")
			}
			createResponse(ctx, http.StatusBadRequest, err)
		}
	}
}

func ValidateCoordinates(ctx *gin.Context) {
	var coordinates models.Coordinate
	if err := ctx.ShouldBindQuery(&coordinates); err != nil {
		createResponse(ctx, http.StatusBadRequest, err)
	}
}

func ValidateRestaurantId(ctx *gin.Context) {
	var err error
	if _, err = strconv.ParseUint(ctx.Param("id"), 10, 64); err != nil {
		createResponse(ctx, http.StatusBadRequest, err)
	}
}

func createResponse(ctx *gin.Context, statusCode int, err error) {
	ctx.JSON(statusCode, models.ErrorResponse{
		Status:  statusCode,
		Message: http.StatusText(statusCode),
		Reason:  []string{err.Error()},
	})
	ctx.Abort()
}
