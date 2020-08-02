package persistence

import (
	"fmt"
	"github.com/dive-in/web/api-go/models/dto"
	"github.com/jinzhu/gorm"
	"reflect"
)

type MigrationRunner interface {
	RunMigrations()
}

type MigrationRunnerImpl struct {
	Database *gorm.DB
}

func (runner MigrationRunnerImpl) M01_CreateUserTable_01082020() {
	runner.Database.AutoMigrate(&dto.User{})
}

func (runner MigrationRunnerImpl) M02_CreateRestaurantTable_01082020() {
	runner.Database.AutoMigrate(&dto.Restaurant{})
}

func (runner MigrationRunnerImpl) M03_CreateRestaurantTableTable_01082020() {
	runner.Database.AutoMigrate(&dto.RestaurantTable{})

	runner.Database.Model(&dto.RestaurantTable{}).AddForeignKey("restaurant_id", "restaurants(id)", "CASCADE", "CASCADE")
}

func (runner MigrationRunnerImpl) M04_CreateEmployeeTable_01082020() {
	runner.Database.AutoMigrate(&dto.Employee{})
}

func (runner MigrationRunnerImpl) M05_CreateShiftTable_01082020() {
	runner.Database.AutoMigrate(&dto.Shift{})

	runner.Database.Model(&dto.Shift{}).AddForeignKey("employee_id", "employees(id)", "CASCADE", "CASCADE")
}

func (runner MigrationRunnerImpl) M06_CreateOrderTable_01082020() {
	runner.Database.AutoMigrate(&dto.Order{})

	runner.Database.Model(&dto.Order{}).AddForeignKey("user_id", "users(id)", "SET NULL", "CASCADE")
	runner.Database.Model(&dto.Order{}).AddForeignKey("restaurant_table_id", "restaurant_tables(id)", "SET NULL", "CASCADE")
}

func (runner MigrationRunnerImpl) M07_CreateMenuTable_01082020() {
	runner.Database.AutoMigrate(&dto.Menu{})

	runner.Database.Model(&dto.Menu{}).AddForeignKey("restaurant_id", "restaurants(id)", "CASCADE", "CASCADE")
}

func (runner MigrationRunnerImpl) M08_CreateCategoryTable_01082020() {
	runner.Database.AutoMigrate(&dto.Category{})

	runner.Database.Model(&dto.Category{}).AddForeignKey("menu_id", "menus(id)", "CASCADE", "CASCADE")
}

func (runner MigrationRunnerImpl) M09_CreateMenuItemTable_01082020() {
	runner.Database.AutoMigrate(&dto.MenuItem{})

	runner.Database.Model(&dto.MenuItem{}).AddForeignKey("category_id", "categories(id)", "CASCADE", "CASCADE")
}

func (runner MigrationRunnerImpl) M10_CreateOrderItemTable_01082020() {
	runner.Database.AutoMigrate(&dto.OrderItem{})

	runner.Database.Model(&dto.OrderItem{}).AddForeignKey("order_id", "orders(id)", "CASCADE", "CASCADE")
	runner.Database.Model(&dto.OrderItem{}).AddForeignKey("menu_item_id", "menu_items(id)", "SET NULL", "CASCADE")
}

func (runner MigrationRunnerImpl) RunMigrations() {
	v := reflect.ValueOf(runner)

	typeOfRunner := v.Type()

	for i := 0; i < v.NumMethod(); i++ {
		methodName := typeOfRunner.Method(i).Name

		if methodName != "RunMigrations" {
			fmt.Printf("Running migration %s\n", methodName)
			v.Method(i).Call([]reflect.Value{})
		}
	}
}

var runner MigrationRunner = nil

func GetRunner(db *gorm.DB) MigrationRunner {
	if runner == nil {
		runner = MigrationRunnerImpl{db}
	}

	return runner
}
