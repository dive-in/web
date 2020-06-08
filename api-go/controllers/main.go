package controllers

import (
	. "github.com/dive-in/web/api-go/controllers/healthcheck"
	. "github.com/dive-in/web/api-go/services/healthcheck"
)

type ServiceContainer interface {
	GetHealthcheckController() HealthcheckController
}

type ServiceContainerImpl struct {}

func(_ ServiceContainerImpl) GetHealthcheckController() HealthcheckController {
	healthcheckService := HealthcheckServiceImpl{}
	controller := HealthcheckControllerImpl{healthcheckService}

	return controller
}

var serviceContainer ServiceContainer

func GetServiceContainer() ServiceContainer {
	if serviceContainer == nil {
		serviceContainer = ServiceContainerImpl{}
	}

	return serviceContainer
}
