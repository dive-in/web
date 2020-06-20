package persistence

import (
	"fmt"
	"github.com/dive-in/web/api-go/models/dto"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"reflect"
)

type Migration interface {
	Migrate()
}

type MigrationImpl struct {
	Database *gorm.DB
}

func (m MigrationImpl) Migrate() {
	fmt.Println("===== Starting database migration =====")

	// TODO: Migrate all models
	models := []interface{}{
		&dto.Shift{},
		&dto.Employee{},
	}

	for i := range models {
		model := models[i]
		name := reflect.TypeOf(model).Elem().Name()
		fmt.Printf("Migrating model %s\n", name)

		//WARNING: AutoMigrate will ONLY create tables, missing columns and missing indexes,
		//and WON’T change existing column’s type or delete unused columns to protect your data.
		m.Database.AutoMigrate(model)

		fmt.Printf("Model %s migration finished\n", name)
	}

	// Create foreign keys
	// TODO: Create all required foreign keys
	m.Database.Model(&dto.Shift{}).AddForeignKey("employee_id", "employees(id)", "RESTRICT", "RESTRICT")

	fmt.Println("===== Database successfully migrated =====")
}

var migration Migration

func GetMigrator() Migration {
	if migration == nil {
		migration = MigrationImpl{Database: GetConnection()}
	}

	return migration
}
