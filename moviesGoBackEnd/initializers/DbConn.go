package initializers

import (
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

var Db *sql.DB
var err error

func DbConn() {
	dbDriver := "mysql"
	dbUser := "root"
	dbPass := "01231678358"
	dbName := "users"

	Db, err = sql.Open(dbDriver, dbUser+":"+dbPass+"@/"+dbName)

	if err != nil {
		log.Fatal(err)
	}
}
