package db

import (
	"database/sql"
	"os"

	_ "github.com/lib/pq"
)

/* Constants */
const dbConn = "DB_CONN"

/* TypeDefs */
type Db struct {
	*sql.DB
}

type Event struct {
	Type     string `json:"type"`
	Category string `json:"category"`
	Info     string `json:"info"`
}

// Connect initializes a database connection, pings said connection to ensure liveness,
// and returns either a pointer to the connection or an error
func Connect() (*Db, error) {
	connStr := os.Getenv(dbConn)

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		return nil, err
	}

	if err = db.Ping(); err != nil {
		return nil, err
	}

	return &Db{db}, nil
}

// CreateEvent attempts to create an event log in the Postgres database
func (db *Db) CreateEvent(e *Event) error {
	sql := `
	INSERT INTO event_log (event_type, category, info)
	VALUES ($1, $2, $3)`

	// `Exec` uses `ctxDriverPrepare` under the hood and will escape special chars, so we're good here
	if _, err := db.Exec(sql, e.Type, e.Category, e.Info); err != nil {
		return err
	}

	return nil
}
