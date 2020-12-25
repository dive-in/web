package controllers

import (
	restaurantController "github.com/dive-in/web/api-go/controllers/restaurant"
	restaurantRepository "github.com/dive-in/web/api-go/repositories/restaurant"
	locationService "github.com/dive-in/web/api-go/services/location"
	restaurantService "github.com/dive-in/web/api-go/services/restaurant"

	. "github.com/dive-in/web/api-go/controllers/healthcheck"

	. "github.com/dive-in/web/api-go/controllers/user"

	. "github.com/dive-in/web/api-go/persistence"

	. "github.com/dive-in/web/api-go/services/healthcheck"

	. "github.com/dive-in/web/api-go/services/user"
)

type ServiceContainer interface {
	GetHealthcheckController() HealthcheckController
	GetRestaurantController() restaurantController.Controller
	GetUserController() UserController
}

type ServiceContainerImpl struct{}

func (_ ServiceContainerImpl) GetHealthcheckController() HealthcheckController {
	databaseTemplate := DatabaseTemplateImpl{}
	healthcheckService := HealthcheckServiceImpl{databaseTemplate}
	controller := HealthcheckControllerImpl{healthcheckService}

	return controller
}

func (ServiceContainerImpl) GetRestaurantController() restaurantController.Controller {
	db := GetConnection()
	restaurantRepository := restaurantRepository.GetRepository(db)
	locationService := locationService.GetService()
	restaurantService := restaurantService.GetService(restaurantRepository, locationService)
	controller := restaurantController.GetController(restaurantService)

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
