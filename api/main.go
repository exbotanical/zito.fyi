package main

import (
	"errors"
	"log"
	"net/http"

	"github.com/MatthewZito/zito.dev/api/db"
	"github.com/MatthewZito/zito.dev/api/util"
)

// CreateEvent takes inbound events data and submits it to the database in an event entry
func CreateEvent(w http.ResponseWriter, r *http.Request) {
	var e db.Event

	err := util.DecodeJSONBody(w, r, &e)

	if err != nil {
		var mr *util.MalformedRequest

		if errors.As(err, &mr) {
			util.FError(w, mr.Status, mr.Message)
		} else {
			util.FError(w, http.StatusInternalServerError, http.StatusText(http.StatusInternalServerError))
		}

		return
	}

	db, err := db.Connect()
	if err != nil {
		util.FError(w, http.StatusInternalServerError, "Database connection failed")

		return
	}

	defer db.Close()

	err = db.CreateEvent(&e)
	if err != nil {
		util.FError(w, http.StatusInternalServerError, "Database write failed")

		return
	}

	util.FResponse(w, http.StatusCreated, "OK", "")
}

// WithCorsMiddleware intercepts inbound requests and sets CORS-enabling headers thereon
func WithCorsMiddleware(fn func(w http.ResponseWriter, r *http.Request)) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		fn(w, r)
	}
}

func main() {
	http.HandleFunc("/api/main", WithCorsMiddleware(CreateEvent))
	log.Fatal(http.ListenAndServe(":5000", nil))
}
