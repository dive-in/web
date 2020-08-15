package restaurant

import (
	"github.com/dive-in/web/api-go/models"
	"github.com/dive-in/web/api-go/services/restaurant"
	"github.com/gin-gonic/gin"
	"net/http"
)

type RestaurantController interface {
	GetNearestRestaurants(ctx *gin.Context)
	GetMenuForRestaurant(ctx *gin.Context)
}

type RestaurantControllerImpl struct {
	RestaurantService restaurant.RestaurantService
}

func (c RestaurantControllerImpl) GetNearestRestaurants(ctx *gin.Context) {
	transferredObject, _ := ctx.Get("coordinates")
	coordinates := transferredObject.(models.Coordinate)

	restaurants := c.RestaurantService.GetClosestRestaurantsTo(&coordinates)

	ctx.JSON(http.StatusOK, restaurants)
}

func (c RestaurantControllerImpl) GetMenuForRestaurant(ctx *gin.Context) {
	id, _ := ctx.Get("id")

	menu := c.RestaurantService.GetMenuForRestaurant(id.(uint64))

	ctx.JSON(http.StatusOK, menu)
}
