package restaurant

import (
	"github.com/dive-in/web/api-go/models"
	"github.com/dive-in/web/api-go/services/restaurant"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

type RestaurantController interface {
	GetNearestRestaurants(ctx *gin.Context)
	GetMenuForRestaurant(ctx *gin.Context)
}

type RestaurantControllerImpl struct {
	RestaurantService restaurant.RestaurantService
}

func (c RestaurantControllerImpl) GetNearestRestaurants(ctx *gin.Context) {
	var coordinates models.Coordinate
	if err := ctx.ShouldBindQuery(&coordinates); err != nil {
		statusCode := http.StatusBadRequest
		ctx.JSON(statusCode, models.ErrorResponse{
			Status:  statusCode,
			Message: http.StatusText(statusCode),
			Reason:  []string{err.Error()},
		})
		return
	}

	restaurants := c.RestaurantService.GetClosestRestaurantsTo(&coordinates)

	ctx.JSON(http.StatusOK, restaurants)
}

func (c RestaurantControllerImpl) GetMenuForRestaurant(ctx *gin.Context) {
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

	menu := c.RestaurantService.GetMenuForRestaurant(id)

	ctx.JSON(http.StatusOK, menu)
}
