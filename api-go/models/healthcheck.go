package models

type HealthCheck struct {
	Message    Status            `json:"message"`
	Components []HealthComponent `json:"components"`
}

type HealthComponent struct {
	Name   string `json:"name"`
	Status Status `json:"status"`
	Error  string `json:"error"`
}

type Status string

const (
	Success Status = "Online"
	Failure Status = "Error"
)
