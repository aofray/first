package dbs

import (
	"context"
	"database/sql"

	"fmt"

	"net/url"
	"reflect"

	"render"
	"strings"
)

func Request_data(request_data url.URL, ctx context.Context) (response string) {
	return string(ctx)
}

func Request_page(ctx context.Context) (response string) { //respons - ответ

	var req_page string
	uri := ctx.Value("url")
	path_arr := strings.Split(uri.Path, "/") // парсим url разбиваем по слэшу

	if uri.Path == "/" {
		req_page = "index"
	} else {
		req_page = path_arr[1]
	}

	fmt.Println("req_page")
	fmt.Println(req_page)

	db := ctx.Value("db").(*sql.DB)
	rows, err := db.Query("select request_page($1)", req_page)

	render.Render_page(ctx, rows)

	return "responses"
}
