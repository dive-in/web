package utils

import "github.com/gin-gonic/gin"

var router *gin.Engine

func GetRouter(testMode bool) *gin.Engine {
	if testMode {
		router := gin.New()
		return router
	}

	if router == nil {
		router = gin.Default()
	}

	return router
}
