package controllers

import (
	. "github.com/dive-in/web/api-go/controllers/healthcheck"
	. "github.com/dive-in/web/api-go/controllers/restaurant"
	. "github.com/dive-in/web/api-go/controllers/user"
	. "github.com/dive-in/web/api-go/persistence"
	. "github.com/dive-in/web/api-go/services/healthcheck"
	. "github.com/dive-in/web/api-go/services/restaurant"
	. "github.com/dive-in/web/api-go/services/user"
)

type ServiceContainer interface {
	GetHealthcheckController() HealthcheckController
	GetRestaurantController() RestaurantController
	GetUserController() UserController
}

type ServiceContainerImpl struct{}

func (_ ServiceContainerImpl) GetHealthcheckController() HealthcheckController {
	databaseTemplate := DatabaseTemplateImpl{}
	healthcheckService := HealthcheckServiceImpl{databaseTemplate}
	controller := HealthcheckControllerImpl{healthcheckService}

	return controller
}

func (_ ServiceContainerImpl) GetRestaurantController() RestaurantController {
	restaurantService := RestaurantServiceImpl{}
	controller := RestaurantControllerImpl{restaurantService}

	return controller
}

func (_ ServiceContainerImpl) GetUserController() UserController {
	userService := UserServiceImpl{GetConnection()}
	controller := UserControllerImpl{userService}

	return controller
}

var serviceContainer ServiceContainer

func GetServiceContainer() ServiceContainer {
	if serviceContainer == nil {
		serviceContainer = ServiceContainerImpl{}
	}

	return serviceContainer
}
