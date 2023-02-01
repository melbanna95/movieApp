package controllers

import (
	"log"
	"net/http"
	"os"
	"strconv"

	"test/initializers"
	"test/models"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
)

func GetAllEvents(c *gin.Context) {

	c.Writer.Header().Set("Content-Type", "application/json")
	c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	c.Writer.Header().Set("Access-Control-Max-Age", "86400")
	c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, UPDATE")
	c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, X-Max")
	c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
	models.Users = nil
	initializers.GetAllUsers()
	c.JSON(200, gin.H{
		"data": models.Users,
	})
}
func CreateUser(c *gin.Context) {
	c.Writer.Header().Set("Content-Type", "application/json")
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.Writer.Header().Set("Access-Control-Max-Age", "86400")
	c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, UPDATE")
	c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, X-Max")
	c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
	c.Writer.Header().Get("origin")
	var newUser models.User
	if err := c.ShouldBind(&newUser); err != nil {
		c.JSON(404, gin.H{"error": err.Error()})
		return
	}
	// hash the password
	hash, err := bcrypt.GenerateFromPassword([]byte(newUser.Password), 10)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "faild to hash password",
		})
		return
	}
	newUser.Password = string(hash)
	if newUser.UserName != "" && newUser.Password != "" && newUser.Phone != "" {

		initializers.Insert(newUser.UserName, string(hash), newUser.Phone)

	}

	c.JSON(201, gin.H{
		"status":  201,
		"message": "new user was created",
		"user":    newUser,
	})

}

func Login(c *gin.Context) {
	c.Writer.Header().Set("Content-Type", "application/json")
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.Writer.Header().Set("Access-Control-Max-Age", "86400")
	c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, UPDATE")
	c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, X-Max")
	c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
	c.Writer.Header().Get("origin")
	var newUser models.User
	if err := c.ShouldBind(&newUser); err != nil {
		c.JSON(404, gin.H{"error": "invaled username or password"})
		return
	}

	for _, user := range models.Users {
		if user.UserName == newUser.UserName {
			err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(newUser.Password))
			if err != nil {
				c.JSON(404, gin.H{
					"error": "invaled password"})
				return
			}
			token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
				"sub": user.ID,
				"exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
			})
			tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))
			if err != nil {
				c.JSON(404, gin.H{
					"error": "faild to create token"})
				return
			}

			c.JSON(http.StatusOK, gin.H{
				"token": tokenString,
				"user":  user,
			})

			// c.SetSameSite(http.SameSiteLaxMode)
			// c.Writer.Header().Set("Authorization", extractedToken[0])
			// c.SetCookie("Authorization", tokenString, 3600*24*30, "", "", false, true)
			// c.Writer.Header().Set("Authorization", tokenString)

		}

	}

}
func Validate(c *gin.Context) {
	c.Writer.Header().Set("Content-Type", "application/json")
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.Writer.Header().Set("Access-Control-Max-Age", "86400")
	c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, UPDATE")
	c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, X-Max")
	c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
	c.Writer.Header().Get("origin")
	c.JSON(200, gin.H{

		"message": "you have loged",
	})
}
func UpdateUser(c *gin.Context) {

	c.Writer.Header().Set("Content-Type", "application/json")
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.Writer.Header().Set("Access-Control-Max-Age", "86400")
	c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, UPDATE")
	c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, X-Max")
	c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
	c.Writer.Header().Get("origin")
	var updatedUser models.User
	if err := c.ShouldBind(&updatedUser); err != nil {
		c.JSON(404, gin.H{"error": err.Error()})
		return
	}
	intUpdatedUserID, _err := strconv.Atoi(updatedUser.ID)
	if _err != nil {
		log.Fatal(_err)
	}

	initializers.Update(intUpdatedUserID, updatedUser.UserName, updatedUser.Password, updatedUser.Phone)

	c.JSON(200, gin.H{
		"status":  200,
		"message": "new Event was updated",
		"event":   updatedUser,
	})

}

func DeleteUser(c *gin.Context) {
	c.Writer.Header().Set("Content-Type", "application/json")
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.Writer.Header().Set("Access-Control-Max-Age", "86400")
	c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, UPDATE")
	c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, X-Max")
	c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
	c.Writer.Header().Get("origin")
	usertID := c.Param("id")
	// var deletedUser user
	// if err := c.ShouldBind(&deletedUser); err != nil {
	// 	c.JSON(404, gin.H{"error": err.Error()})
	// 	return
	// }

	for _, singleUser := range models.Users {
		if singleUser.ID == usertID {
			ID, err := strconv.Atoi(singleUser.ID)
			initializers.Delete(ID)
			if err != nil {
				log.Fatal(err)
			}

			c.JSON(200, gin.H{
				"status":  200,
				"message": "user has been deleted successfully",
				"event":   singleUser,
			})
		}
	}

}
