package restaurant

import (
	"github.com/dive-in/web/api-go/models/dto"
	"github.com/jinzhu/gorm"
)

type Repository interface {
	GetAll() []dto.Restaurant
	GetByID(id uint) dto.Restaurant
}

type RepositoryImpl struct {
	db *gorm.DB
}

func (repository RepositoryImpl) GetAll() []dto.Restaurant {
	var restaurants []dto.Restaurant
	repository.db.Find(&restaurants)

	return restaurants
}

func (repository RepositoryImpl) GetByID(id uint) dto.Restaurant {
	var restaurant dto.Restaurant
	repository.db.Preload("Menu").First(&restaurant, id)

	return restaurant
}

var repository Repository = nil

func GetRepository(db *gorm.DB) Repository {
	if repository == nil {
		repository = RepositoryImpl{db: db}
	}

	return repository
}
