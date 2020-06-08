package main

import (
	"github.com/dive-in/web/api-go/controllers"
	"github.com/dive-in/web/api-go/utils"
)

func main() {
	router := utils.GetRouter(false)

	serviceContainer := controllers.GetServiceContainer()

	healthcheckController := serviceContainer.GetHealthcheckController()

	healthcheckRoutes := router.Group("/healthcheck")
	{
		healthcheckRoutes.GET("/ping", healthcheckController.Ping)
	}

	if err := router.Run(); err != nil {
		panic("An error occurred while starting the server.")
	}
}
