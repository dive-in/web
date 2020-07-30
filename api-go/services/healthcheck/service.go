package healthcheck

import (
	"github.com/dive-in/web/api-go/models"
	"github.com/dive-in/web/api-go/persistence"
)

type HealthcheckService interface {
	Ping() models.HealthCheck
}

type HealthcheckServiceImpl struct {
	DatabaseTemplate persistence.DatabaseTemplate
}

func (s HealthcheckServiceImpl) Ping() models.HealthCheck {
	dbHealth := s.DatabaseTemplate.CheckHealth()

	down := false
	components := []models.HealthComponent{dbHealth}
	for i := range components {
		if components[i].Status == models.Failure {
			down = true
			break
		}
	}
	message := models.Success
	if down {
		message = models.Failure
	}

	response := models.HealthCheck{
		Message:    message,
		Components: components,
	}

	return response
}
