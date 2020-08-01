package restaurant

import (
	"fmt"
	"github.com/dive-in/web/api-go/models"
	"github.com/dive-in/web/api-go/models/dto"
)

type RestaurantService interface {
	GetClosestRestaurantsTo(c *models.Coordinate) []dto.Restaurant
	GetMenuForRestaurant(id int64) dto.Menu
}

type RestaurantServiceImpl struct{}

func (_ RestaurantServiceImpl) GetClosestRestaurantsTo(c *models.Coordinate) []dto.Restaurant {
	fmt.Printf("Calling GetClosestRestaurantsTo for coordinates: %f, %f\n", c.Latitude, c.Longitude)
	return []dto.Restaurant{{Name: "Test", Latitude: c.Latitude, Longitude: c.Longitude}}
}

func (_ RestaurantServiceImpl) GetMenuForRestaurant(id int64) dto.Menu {
	fmt.Printf("Calling GetMenuForRestaurant for restaurant id: %d", id)
	return dto.Menu{}
}
