package restaurant

import (
	"net/http"
	"strconv"

	"github.com/dive-in/web/api-go/models"
	"github.com/dive-in/web/api-go/services/restaurant"
	"github.com/gin-gonic/gin"
)

type Controller interface {
	GetNearestRestaurants(ctx *gin.Context)
	GetMenuForRestaurant(ctx *gin.Context)
}

type ControllerImpl struct {
	restaurantService restaurant.Service
}

func (c ControllerImpl) GetNearestRestaurants(ctx *gin.Context) {
	transferredObject, _ := ctx.Get("coordinates")
	coordinates := transferredObject.(models.Coordinate)

	restaurants := c.restaurantService.GetClosestRestaurantsTo(&coordinates)

	ctx.JSON(http.StatusOK, restaurants)
}

func (c ControllerImpl) GetMenuForRestaurant(ctx *gin.Context) {
	var err error
	var id int64

	param := ctx.Param("id")
	if id, err = strconv.ParseInt(param, 10, 64); err != nil {
		statusCode := http.StatusBadRequest
		ctx.JSON(statusCode, models.ErrorResponse{
			Status:  statusCode,
			Message: http.StatusText(statusCode),
			Reason:  []string{err.Error()},
		})
		return
	}

	menu := c.restaurantService.GetMenuForRestaurant(uint(id))
	ctx.JSON(http.StatusOK, menu)
}

var controller Controller = nil

func GetController(restaurantService restaurant.Service) Controller {
	if controller == nil {
		controller = ControllerImpl{restaurantService: restaurantService}
	}

	return controller
}
