package healthcheck

import (
	"encoding/json"
	"github.com/dive-in/web/api-go/models"
	"github.com/dive-in/web/api-go/utils"
	"net/http"
	"net/http/httptest"
	"testing"
)

type HealthCheckServiceMock struct{}

func (s HealthCheckServiceMock) Ping() models.HealthCheck {
	return models.HealthCheck{
		Message:    models.Success,
		Components: []models.HealthComponent{},
	}
}

func mockController() HealthcheckController {
	healthcheckService := HealthCheckServiceMock{}
	controller := HealthcheckControllerImpl{healthcheckService}

	return controller
}

func TestHealthcheckControllerImpl_Ping(t *testing.T) {
	w := httptest.NewRecorder()
	router := utils.GetRouter(true)
	controller := mockController()

	endpoint := "/v1/healthcheck/ping"

	router.GET(endpoint, controller.Ping)

	req, _ := http.NewRequest("GET", endpoint, nil)

	router.ServeHTTP(w, req)

	var body models.HealthCheck

	if err := json.Unmarshal(w.Body.Bytes(), &body); err != nil {
		t.Errorf("failed, expected valid JSON body")
		return
	}

	if w.Code != http.StatusOK {
		t.Errorf("failed, expected %v, got %v", http.StatusOK, w.Code)
		return
	}

	if body.Message != models.Success {
		t.Errorf("failed, expected %v, got %v", models.Success, body.Message)
		return
	}

	t.Logf("succeeded")
}
