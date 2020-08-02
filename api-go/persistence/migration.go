package persistence

import (
	"fmt"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

type Migration interface {
	Migrate()
}

type MigrationImpl struct {
	Database *gorm.DB
}

func (m MigrationImpl) Migrate() {
	fmt.Println("===== Starting database migration =====")

	runner := GetRunner(m.Database)

	runner.RunMigrations()

	fmt.Println("===== Database successfully migrated =====")
}

var migration Migration

func GetMigrator() Migration {
	if migration == nil {
		migration = MigrationImpl{Database: GetConnection()}
	}

	return migration
}
