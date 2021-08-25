package handler

import (
	"errors"
	"fmt"
	"net/http"

	"github.com/MatthewZito/zito.dev/api/db"
	"github.com/MatthewZito/zito.dev/api/util"
)

/*
RPC: LogEvent handles events logging by allocating events from the UI
into the system database
*/
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
		util.FError(w, err)
		return
	}

	defer db.Close()

	err = db.CreateEvent(&e)
	if err != nil {
		util.FError(w, http.StatusInternalServerError, "Database write failed")
		return
	}

	fmt.Println(e)

	util.FResponse(w, http.StatusCreated, "OK", "")
}
