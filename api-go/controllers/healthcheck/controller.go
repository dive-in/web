package healthcheck

import (
	"github.com/dive-in/web/api-go/services/healthcheck"
	"github.com/gin-gonic/gin"
	"net/http"
)

type HealthcheckController interface {
	Ping(ctx *gin.Context)
}

type HealthcheckControllerImpl struct {
	HealthcheckService healthcheck.HealthcheckService
}

func (c HealthcheckControllerImpl) Ping(ctx *gin.Context) {
	response := c.HealthcheckService.Ping()

	ctx.JSON(http.StatusOK, response)
}
