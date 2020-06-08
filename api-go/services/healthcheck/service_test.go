package healthcheck

import "testing"

func TestHealthcheckServiceImpl_Ping(t *testing.T) {
	service := HealthcheckServiceImpl{}

	result := service.Ping()

	if result != nil {
		t.Errorf("failed, expected %v, got %v", nil, result)
	} else {
		t.Logf("succeeded")
	}
}
