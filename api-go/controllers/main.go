package controllers

import (
	. "github.com/dive-in/web/api-go/controllers/healthcheck"
	. "github.com/dive-in/web/api-go/controllers/restaurant"
	. "github.com/dive-in/web/api-go/services/healthcheck"
	. "github.com/dive-in/web/api-go/services/restaurant"
)

type ServiceContainer interface {
	GetHealthcheckController() HealthcheckController
	GetRestaurantController() RestaurantController
}

type ServiceContainerImpl struct{}

func (_ ServiceContainerImpl) GetHealthcheckController() HealthcheckController {
	healthcheckService := HealthcheckServiceImpl{}
	controller := HealthcheckControllerImpl{healthcheckService}

	return controller
}

func (_ ServiceContainerImpl) GetRestaurantController() RestaurantController {
	restaurantService := RestaurantServiceImpl{}
	controller := RestaurantControllerImpl{restaurantService}

	return controller
}

var serviceContainer ServiceContainer

func GetServiceContainer() ServiceContainer {
	if serviceContainer == nil {
		serviceContainer = ServiceContainerImpl{}
	}

	return serviceContainer
}
