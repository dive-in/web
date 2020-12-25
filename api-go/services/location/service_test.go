package location

import (
	"testing"

	"github.com/dive-in/web/api-go/models"
)

func TestLocationServiceImpl_GetDistanceBetween_SamePoint(t *testing.T) {
	service := ServiceImpl{}

	coordinate := models.Coordinate{Latitude: 40.7486, Longitude: -73.9864}

	distance := service.GetDistanceBetween(&coordinate, &coordinate)

	if distance != 0 {
		t.Errorf("failed, expected %f got %f", 0.0, distance)
	}

	t.Logf("Succeeded")
}

func TestLocationServiceImpl_GetDistanceBetween_DifferentPoints(t *testing.T) {
	service = ServiceImpl{}

	firstCoordinate := models.Coordinate{Latitude: 40.7486, Longitude: -73.9864}
	secondCoordinate := models.Coordinate{Latitude: 40.75, Longitude: -73.9912}

	distance := service.GetDistanceBetween(&firstCoordinate, &secondCoordinate)

	if distance != 433.28 {
		t.Errorf("failed, expected %f got %f", 433.28, distance)
	}

	t.Logf("succeeded")
}
