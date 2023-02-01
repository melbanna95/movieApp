package main

import (
	"test/controllers"
	"test/initializers"
	"test/middleware"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

func main() {
	initializers.DbConn()
	initializers.GetAllUsers()
	r := gin.Default()

	v1 := r.Group("/api/v1")
	{
		// /api/v1/
		v1.GET("/", func(c *gin.Context) {
			c.JSON(200, gin.H{
				"message": "Hello world",
			})
		})
		// /api/v1/events
		go v1.GET("/users", controllers.GetAllEvents)
		go v1.POST("/users/create", controllers.CreateUser).OPTIONS("/users/create", controllers.CreateUser)
		go v1.POST("/users/login", controllers.Login)
		go v1.POST("/users/update", controllers.UpdateUser)
		go v1.DELETE("/users/delete/:id", controllers.DeleteUser).OPTIONS("/users/delete/:id", controllers.DeleteUser)
		go v1.GET("/users/validate", middleware.Rquirauth, controllers.Validate).OPTIONS("/users/validate", controllers.Validate)

	}

	r.Run()

}
