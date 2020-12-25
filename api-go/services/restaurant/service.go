package restaurant

import (
	"fmt"
	"sort"

	"github.com/dive-in/web/api-go/models"
	"github.com/dive-in/web/api-go/models/dto"
	"github.com/dive-in/web/api-go/repositories/restaurant"
	"github.com/dive-in/web/api-go/services/location"
)

type Service interface {
	GetClosestRestaurantsTo(c *models.Coordinate) []dto.Restaurant
	GetMenuForRestaurant(id uint) dto.Menu
}

const (
	maxDistance = 10
)

type ServiceImpl struct {
	restaurantRepository restaurant.Repository
	locationService      location.Service
}

func getCoordinateForRestaurant(restaurant *dto.Restaurant) models.Coordinate {
	return models.Coordinate{Latitude: restaurant.Latitude, Longitude: restaurant.Longitude}
}

func (service ServiceImpl) GetClosestRestaurantsTo(c *models.Coordinate) []dto.Restaurant {
	/** TODO andrej-naumovski: We will probably change this logic because the app flow will change
	 *  from allowing the user to select the restaurant to checking if the user is in range at the moment he scans the QR code
	 */
	restaurants := service.restaurantRepository.GetAll()

	restaurantsInRange := []dto.Restaurant{}

	for i := range restaurants {
		restaurantCoordinate := getCoordinateForRestaurant(&restaurants[i])

		distance := service.locationService.GetDistanceBetween(c, &restaurantCoordinate)

		if distance <= maxDistance {
			restaurantsInRange = append(restaurantsInRange, restaurants[i])
		}
	}

	sort.Slice(restaurantsInRange, func(i, j int) bool {
		firstRestaurantCoordinate := getCoordinateForRestaurant(&restaurantsInRange[i])
		firstRestaurantDistance := service.locationService.GetDistanceBetween(c, &firstRestaurantCoordinate)

		secondRestaurantCoordinate := getCoordinateForRestaurant(&restaurantsInRange[j])
		secondRestaurantDistance := service.locationService.GetDistanceBetween(c, &secondRestaurantCoordinate)

		return firstRestaurantDistance > secondRestaurantDistance
	})

	elementRange := 3

	if len(restaurantsInRange) < 3 {
		elementRange = len(restaurantsInRange)
	}

	return restaurantsInRange[0:elementRange]
}

func (service ServiceImpl) GetMenuForRestaurant(id uint) dto.Menu {
	restaurant := service.restaurantRepository.GetByID(id)
	fmt.Printf("Calling GetMenuForRestaurant for restaurant id: %d", id)
	return restaurant.Menu
}

var service Service = nil

func GetService(restaurantRepository restaurant.Repository, locationService location.Service) Service {
	if service == nil {
		service = ServiceImpl{restaurantRepository: restaurantRepository, locationService: locationService}
	}

	return service
}
