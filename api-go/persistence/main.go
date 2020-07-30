package persistence

import (
	"fmt"
	"github.com/dive-in/web/api-go/models"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"os"
)

type DatabaseTemplate interface {
	GetDB() *gorm.DB
	CheckHealth() models.HealthComponent
}

type DatabaseTemplateImpl struct{}

const ConnectionString = "host=%s port=%s user=%s dbname=%s password=%s sslmode=disable"

const DbHostEnvName = "DB_HOST"
const DbPortEnvName = "DB_PORT"
const DbUserEnvName = "DB_USER"
const DbPassEnvName = "DB_PASS"
const DbDatabaseEnvName = "DB_DATABASE_NAME"

var host = os.Getenv(DbHostEnvName)
var port = os.Getenv(DbPortEnvName)
var username = os.Getenv(DbUserEnvName)
var database = os.Getenv(DbDatabaseEnvName)
var password = os.Getenv(DbPassEnvName)

var db *gorm.DB
var err error

func (_ DatabaseTemplateImpl) GetDB() *gorm.DB {
	if db == nil {
		connectionString := fmt.Sprintf(ConnectionString, host, port, username, database, password)
		db, err = gorm.Open("postgres", connectionString)
		if err != nil {
			panic(err.Error())
		}
		if db == nil {
			panic("Database is not connected")
		}
	}
	return db
}

func (_ DatabaseTemplateImpl) CheckHealth() models.HealthComponent {
	health := models.HealthComponent{
		Name:   "Database",
		Status: models.Success,
	}

	con, dbError := gorm.Open("postgres", fmt.Sprintf(ConnectionString, host, port, username, database, password))
	if dbError != nil {
		health.Error = dbError.Error()
		health.Status = models.Failure
	}
	if con != nil {
		closeError := con.Close()
		if closeError != nil {
			panic(closeError)
		}
	}

	return health
}

var databaseTemplate DatabaseTemplate

func GetConnection() *gorm.DB {
	if databaseTemplate == nil {
		databaseTemplate = DatabaseTemplateImpl{}
	}

	return databaseTemplate.GetDB()
}
