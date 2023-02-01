package initializers

import (
	"fmt"
	"log"

	"test/models"
)

func GetAllUsers() []models.User {
	row, err := Db.Query("SELECT * FROM users")
	if err != nil {
		log.Fatal(err)
	}
	use := models.User{}

	for row.Next() {
		err := row.Scan(&use.ID, &use.UserName, &use.Password, &use.Phone, &use.Role.Description)
		if err != nil {
			log.Fatal(err)
		}

		models.Users = append(models.Users, use)
	}
	return models.Users
}

func Insert(UserName string, Password string, Phone string) {

	stmt, err := Db.Prepare("INSERT INTO users(UserName,Password,Phone,role) VALUES (?,?,?,?)")
	if err != nil {
		log.Fatal(err)
	}
	role := models.Role{}

	Db.QueryRow("select description from role where id=1").Scan(&role.Description)

	r, err := stmt.Exec(UserName, Password, Phone, role.Description)
	if err != nil {
		log.Fatal(err)
	}

	affectedRows, err := r.RowsAffected()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("The statement affected %d rows\n", affectedRows)
}

func Update(id int, UserName string, Password string, Phone string) {

	stmt, err := Db.Prepare("UPDATE users SET UserName=?, Password=? ,Phone=? WHERE id=?")
	if err != nil {
		log.Fatal(err)
	}

	r, err := stmt.Exec(UserName, Password, Phone, id)
	if err != nil {
		log.Fatal(err)
	}

	affectedRows, err := r.RowsAffected()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("The statement affected %d rows\n", affectedRows)
}

func Delete(id int) {

	stmt, err := Db.Prepare("DELETE FROM users WHERE id=?")
	if err != nil {
		log.Fatal(err)
	}

	r, err := stmt.Exec(id)
	if err != nil {
		log.Fatal(err)
	}

	affectedRows, err := r.RowsAffected()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("The statement affected %d rows\n", affectedRows)

}
