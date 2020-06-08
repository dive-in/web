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
	err := c.HealthcheckService.Ping()

	if err != nil {
		ctx.Status(http.StatusInternalServerError)
		return
	}

	ctx.JSON(http.StatusOK, gin.H{ "message": "Online" })
}
