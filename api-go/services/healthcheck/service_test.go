package healthcheck

import (
	"github.com/dive-in/web/api-go/models"
	"github.com/jinzhu/gorm"
	"testing"
)

type DatabaseTemplateMock struct{}

func (c DatabaseTemplateMock) GetDB() *gorm.DB {
	return nil
}

func (c DatabaseTemplateMock) CheckHealth() models.HealthComponent {
	return models.HealthComponent{
		Name:   "Database",
		Status: models.Success,
	}
}

func TestHealthcheckServiceImpl_Ping(t *testing.T) {
	service := HealthcheckServiceImpl{DatabaseTemplateMock{}}

	health := service.Ping()

	if health.Message != models.Success {
		t.Errorf("Healthcheck failed. Incorrect health status")
		return

	}
	t.Logf("Succeeded")
}
