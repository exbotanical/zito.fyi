package handler

import (
	"errors"
	"net/http"

	"github.com/MatthewZito/zito.dev/srv/db"
	"github.com/MatthewZito/zito.dev/srv/util"
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
