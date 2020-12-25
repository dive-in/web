package main

import (
	"fmt"

	"github.com/dive-in/web/api-go/controllers"
	"github.com/dive-in/web/api-go/middleware"
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
	userController := serviceContainer.GetUserController()

	apiRoutes := router.Group("/api")
	{
		healthCheckRoutes := apiRoutes.Group("/healthcheck")
		{
			healthCheckRoutes.GET("/ping", healthCheckController.Ping)
		}
		routesV1 := apiRoutes.Group("/v1")
		{
			routesV1.POST("/authenticate", middleware.ValidateAuthenticationUser, userController.Authenticate)
			authenticatedRoutes := routesV1.Group("/", middleware.Authorized)
			{
				restaurantRoutes := authenticatedRoutes.Group("/restaurant")
				{
					restaurantRoutes.GET("/", middleware.ValidateCoordinates, restaurantController.GetNearestRestaurants)
					restaurantRoutes.GET("/:id/menu", middleware.ValidateRestaurantId, restaurantController.GetMenuForRestaurant)
				}
			}
		}
	}

	if err := router.Run(); err != nil {
		panic("An error occurred while starting the server.")
	}
}
