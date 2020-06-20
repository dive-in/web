package main

import (
	"fmt"
	"github.com/dive-in/web/api-go/controllers"
	"github.com/dive-in/web/api-go/persistence"
	"github.com/dive-in/web/api-go/utils"
)

func main() {
	fmt.Println("Starting application...")

	migrator := persistence.GetMigrator()
	migrator.Migrate()

	router := utils.GetRouter(false)

	serviceContainer := controllers.GetServiceContainer()

	healthCheckController := serviceContainer.GetHealthcheckController()
	restaurantController := serviceContainer.GetRestaurantController()

	routesV1 := router.Group("/v1")
	{
		healthCheckRoutes := routesV1.Group("/healthcheck")
		{
			healthCheckRoutes.GET("/ping", healthCheckController.Ping)
		}

		restaurantRoutes := routesV1.Group("/restaurant")
		{
			restaurantRoutes.GET("/", restaurantController.GetNearestRestaurants)
			restaurantRoutes.GET("/:id/menu", restaurantController.GetMenuForRestaurant)
		}
	}

	if err := router.Run(); err != nil {
		panic("An error occurred while starting the server.")
	}
}
