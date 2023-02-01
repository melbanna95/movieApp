package middleware

import (
	"fmt"
	"net/http"
	"os"
	"strings"

	"test/initializers"
	"test/models"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
)

func Rquirauth(c *gin.Context) {
	tokenString := c.Request.Header.Get("Authorization")
	tokenstr := strings.TrimSpace(strings.Replace(tokenString, "Bearer", " ", 1))

	// Parse takes the token string and a function for looking up the key. The latter is especially

	token, _ := jwt.Parse(tokenstr, func(token *jwt.Token) (interface{}, error) {
		// Don't forget to validate the alg is what you expect:

		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			x := fmt.Errorf("unexpected signing method: %W", token.Header["alg"])
			return nil, x
		}

		// hmacSampleSecret is a []byte containing your secret, e.g. []byte("my_secret_key")
		return []byte(os.Getenv("SECRET")), nil
	})

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		if float64(time.Now().Unix()) > claims["exp"].(float64) {
			c.AbortWithStatus(http.StatusUnauthorized)
			c.JSON(200, gin.H{

				"message": "you have s",
			})
		}
		// find the user with token sub
		var user models.User
		initializers.Db.QueryRow("select * from users where id = ?", claims["sub"]).Scan(&user)
		if user.ID == "0" {
			c.AbortWithStatus(http.StatusUnauthorized)
			c.JSON(200, gin.H{

				"message": "you have f",
			})
		}
		//attach the req
		c.Set("user", user)

		c.Next()
	} else {
		c.AbortWithStatus(http.StatusBadRequest)
		c.JSON(200, gin.H{

			"message": "you have a",
		})
		c.Next()
	}

}
