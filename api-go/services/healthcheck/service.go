package healthcheck

type HealthcheckService interface {
	Ping() interface{}
}

type HealthcheckServiceImpl struct {}

func (_ HealthcheckServiceImpl) Ping() interface{} {
	return nil
}
