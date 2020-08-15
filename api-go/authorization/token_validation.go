package authorization

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"
)

const FacebookAccessTokenEnvName = "FACEBOOK_APP_ACCESS_TOKEN"

var FacebookAccessToken = os.Getenv(FacebookAccessTokenEnvName)

func IsTokenValid(token string) (bool, error) {
	url := "https://graph.facebook.com/debug_token"
	request, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		return false, err
	}

	query := request.URL.Query()
	query.Add("input_token", token)
	query.Add("access_token", FacebookAccessToken)
	request.URL.RawQuery = query.Encode()

	client := http.Client{Timeout: 5 * time.Second}
	response, err := client.Do(request)
	if err != nil {
		return false, err
	}

	defer response.Body.Close()

	var jsonResponse map[string]interface{}
	err = json.NewDecoder(response.Body).Decode(&jsonResponse)
	if err != nil {
		return false, err
	}

	data := jsonResponse["data"]

	if data != nil {
		isValidResponse := data.(map[string]interface{})["is_valid"]
		isValid := isValidResponse.(bool)
		fmt.Printf("Facebook token check is: %t", isValid)
		return isValid, nil
	}

	return false, nil
}
