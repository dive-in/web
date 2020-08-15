package authorization

import (
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"os"
	"strconv"
	"time"
)

const PrivateKeyEnvName = "PRIVATE_KEY"

var PrivateKey = os.Getenv(PrivateKeyEnvName)

type Claims struct {
	Id          string `json:"id"`
	AccessToken string `json:"accessToken"`
	jwt.StandardClaims
}

func CreateToken(id uint, accessToken string) (string, error) {
	claims := &Claims{
		Id:          strconv.FormatUint(uint64(id), 10),
		AccessToken: accessToken,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Minute * 60).Unix(),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte(PrivateKey))
	if err != nil {
		return "", err
	}
	return tokenString, nil
}

func VerifyToken(tokenString string) (*jwt.Token, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(PrivateKey), nil
	})
	if err != nil {
		return nil, err
	}
	return token, nil
}
