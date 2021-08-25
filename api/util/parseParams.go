package util

import (
	"fmt"
	"net/http"
	"strings"
)

// parseParams accepts a req and returns the `num` path tokens found after the `prefix`.
// returns an error if the number of tokens are less or more than expected
func ParseParams(r *http.Request, prefix string, num int) ([]string, error) {
	url := strings.TrimPrefix(r.URL.Path, prefix)
	params := strings.Split(url, "/")

	if len(params) != num || len(params[0]) == 0 || len(params[1]) == 0 {
		return nil, fmt.Errorf("Malformed path; expecting exactly %d params", num)
	}

	return params, nil
}
