package restaurant

import (
	"encoding/json"
	"github.com/dive-in/web/api-go/services/restaurant"
	"github.com/dive-in/web/api-go/utils"
	"net/http"
	"net/http/httptest"
	"testing"
)

func mockController() RestaurantController {
	// TODO 2020-06-15: Mock the restaurant service once the logic is implemented.
	restaurantService := restaurant.RestaurantServiceImpl{}
	controller := RestaurantControllerImpl{restaurantService}

	return controller
}

func TestRestaurantControllerImpl_GetNearestRestaurants_Success(t *testing.T) {
	w := httptest.NewRecorder()
	router := utils.GetRouter(true)
	controller := mockController()

	endpoint := "/v1/restaurant"

	router.GET(endpoint, controller.GetNearestRestaurants)

	req, _ := http.NewRequest("GET", "/v1/restaurant?latitude=23.456&longitude=64.53", nil)

	router.ServeHTTP(w, req)

	var body []map[string]interface{}

	if err := json.Unmarshal(w.Body.Bytes(), &body); err != nil {
		t.Errorf("failed, expected valid JSON body")
		return
	}

	if w.Code != http.StatusOK {
		t.Errorf("failed, expected %v, got %v", http.StatusOK, w.Code)
		return
	}

	t.Logf("Test succeeded")
}

func TestRestaurantControllerImpl_GetNearestRestaurants_Error(t *testing.T) {
	w := httptest.NewRecorder()
	router := utils.GetRouter(true)
	controller := mockController()

	endpoint := "/v1/restaurant"

	router.GET(endpoint, controller.GetNearestRestaurants)

	req, _ := http.NewRequest("GET", "/v1/restaurant?latitude=test&longitude=", nil)

	router.ServeHTTP(w, req)

	var body map[string]interface{}

	if err := json.Unmarshal(w.Body.Bytes(), &body); err != nil {
		t.Errorf("failed, expected valid JSON body")
		return
	}

	if w.Code != http.StatusBadRequest {
		t.Errorf("failed, expected %v, got %v", http.StatusBadRequest, w.Code)
		return
	}

	if body["payload"] == nil {
		t.Error("failed, expected payload message")
		return
	}

	if body["errors"] == nil {
		t.Error("failed, expected errors in the response")
		return
	}

	t.Logf("Test succeeded")
}

func TestRestaurantControllerImpl_GetMenuForRestaurant_Success(t *testing.T) {
	w := httptest.NewRecorder()
	router := utils.GetRouter(true)
	controller := mockController()

	endpoint := "/v1/restaurant/:id/menu"

	router.GET(endpoint, controller.GetMenuForRestaurant)

	req, _ := http.NewRequest("GET", "/v1/restaurant/1/menu", nil)

	router.ServeHTTP(w, req)

	var body map[string]interface{}

	if err := json.Unmarshal(w.Body.Bytes(), &body); err != nil {
		t.Errorf("failed, expected valid JSON body")
		return
	}

	if w.Code != http.StatusOK {
		t.Errorf("failed, expected %v, got %v", http.StatusOK, w.Code)
		return
	}

	t.Logf("Test succeeded")
}

func TestRestaurantControllerImpl_GetMenuForRestaurant_Failure(t *testing.T) {
	w := httptest.NewRecorder()
	router := utils.GetRouter(true)
	controller := mockController()

	endpoint := "/v1/restaurant/:id/menu"

	router.GET(endpoint, controller.GetMenuForRestaurant)

	req, _ := http.NewRequest("GET", "/v1/restaurant/test/menu", nil)

	router.ServeHTTP(w, req)

	var body map[string]interface{}

	if err := json.Unmarshal(w.Body.Bytes(), &body); err != nil {
		t.Errorf("failed, expected valid JSON body")
		return
	}

	if w.Code != http.StatusBadRequest {
		t.Errorf("failed, expected %v, got %v", http.StatusBadRequest, w.Code)
		return
	}

	if body["payload"] == nil {
		t.Error("failed, expected payload message")
		return
	}

	if body["errors"] == nil {
		t.Error("failed, expected errors in the response")
		return
	}

	t.Logf("Test succeeded")
}