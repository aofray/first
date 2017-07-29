package main

import (
	"context"
	"database/sql"
	_ "encoding/json"
	"fmt"
	_ "github.com/lib/djson"
	_ "github.com/lib/pq"
	"io"
	"log"
	"net/http"
	_ "net/url"
	_ "reflect"
	req "requestHendler"
	_ "strconv"
	_ "strings"
	"time"
)

const (
	DB_USER     = "postgres"
	DB_PASSWORD = "postgres"
	DB_NAME     = "postgres"
)

func StaticHandler(w http.ResponseWriter, req *http.Request) {
	//fmt.Println("StaticHandler")
	static_file := req.URL.Path[len("/static/"):]
	//fmt.Println("static_file " + static_file)
	if len(static_file) != 0 {
		f, err := http.Dir("www/static/").Open(static_file)
		//fmt.Println(f)
		if err == nil {
			content := io.ReadSeeker(f)
			http.ServeContent(w, req, static_file, time.Now(), content)
			return
		}
	}
	http.NotFound(w, req)
}

func checkErr(err error) {
	if err != nil {
		fmt.Printf("", err)
		panic(err)
	}
}

func (ca *ContextAdapter) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ca.handler.ServeHTTPContext(ca.ctx, w, r)
}

type ContextAdapter struct {
	ctx     context.Context
	handler ContextHandler
}

type ContextHandler interface {
	ServeHTTPContext(context.Context, http.ResponseWriter, *http.Request)
}
type ContextHandlerFunc func(context.Context, http.ResponseWriter, *http.Request)

func (h ContextHandlerFunc) ServeHTTPContext(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	h(ctx, w, r)
}

func main() {
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME)
	db, err := sql.Open("postgres", dbinfo)
	ctx := context.WithValue(context.Background(), "db", db)
	checkErr(err)
	defer db.Close()

	http.HandleFunc("/static/", StaticHandler)
	http.Handle("/", &ContextAdapter{ctx, ContextHandlerFunc(req.RequestHandler)})
	log.Fatal(http.ListenAndServe(":8080", nil))

}
