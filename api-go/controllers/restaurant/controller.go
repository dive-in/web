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
	_ = ctx.BindQuery(&coordinates)

	restaurants := c.RestaurantService.GetClosestRestaurantsTo(&coordinates)

	ctx.JSON(http.StatusOK, restaurants)
}

func (c RestaurantControllerImpl) GetMenuForRestaurant(ctx *gin.Context) {
	id, _ := strconv.ParseUint(ctx.Param("id"), 10, 64)

	menu := c.RestaurantService.GetMenuForRestaurant(id)

	ctx.JSON(http.StatusOK, menu)
}
