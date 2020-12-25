package location

import (
	"math"

	"github.com/dive-in/web/api-go/models"
)

type Service interface {
	GetDistanceBetween(firstCoordinate *models.Coordinate, secondCoordinate *models.Coordinate) float64
}

type ServiceImpl struct{}

func (service ServiceImpl) GetDistanceBetween(firstCoordinate *models.Coordinate, secondCoordinate *models.Coordinate) float64 {
	earthRadius := 6371e3
	latitudeRadFirst := firstCoordinate.Latitude * math.Pi / 180
	latitudeRadSecond := secondCoordinate.Latitude * math.Pi / 180

	deltaLatitudeRad := latitudeRadSecond - latitudeRadFirst
	deltaLongitudeRad := (secondCoordinate.Longitude - firstCoordinate.Longitude) * math.Pi / 180

	// I honestly have no idea what `a` and `c` are so I'm just reusing the names from the formula
	a := math.Sin(deltaLatitudeRad/2)*math.Sin(deltaLatitudeRad/2) + math.Cos(latitudeRadFirst)*math.Cos(latitudeRadSecond)*math.Sin(deltaLongitudeRad/2)*math.Sin(deltaLongitudeRad/2)

	c := 2 * math.Atan2(math.Sqrt(a), math.Sqrt(1-a))

	distance := c * earthRadius

	// Golang doesn't have built-in rounding to decimal places so this is a workaround
	distanceRounded := math.Round(distance*100) / 100

	return distanceRounded
}

var service Service = nil

func GetService() Service {
	if service == nil {
		service = ServiceImpl{}
	}

	return service
}
