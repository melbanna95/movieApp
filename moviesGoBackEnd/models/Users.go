package models

type Role struct {
	Description string
}
type User struct {
	ID       string
	UserName string
	Password string
	Phone    string
	Role     Role
}
type AllUsers []User

var Users = AllUsers{}
