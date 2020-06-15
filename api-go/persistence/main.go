package persistence

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

type DatabaseTemplate interface {
	GetDB() *gorm.DB
}

type DatabaseTemplateImpl struct{}

// Connects to the database and returns the new database connection
// TODO 2020-06-14: RTFM https://gorm.io/docs/index.html
func (_ DatabaseTemplateImpl) GetDB() *gorm.DB {
	db, err := gorm.Open("postgres", "host=db port=5432 user=dev_user dbname=db password=dev_pass sslmode=disable")
	if err != nil {
		panic(err.Error())
	}
	if db == nil {
		panic("Database is not connected")
	}
	return db
}

// TODO 2020-06-14: This was used for testing purposes. Can be removed.
//func test() {
//em := models.Employee{
//	Name:     "Test",
//	Username: "test",
//	Password: "test",
//}

// CREATE TABLE...
//	db.CreateTable(&em)

// INSERT INTO ___ VALUES ___
//db.Create(&em)
//}
