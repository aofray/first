package v1

import (
	"database/sql"
	"encoding/json"
	"fmt"
	_ "github.com/lib/djson"
	_ "github.com/lib/pq"
	"html/template"
	"io"
	"log"
	"net/http"
	"net/url"
	"reflect"
	_ "reflect"
	"strconv"
	_ "strconv"
	"strings"
	"time"
	"context"
)

const (
	DB_USER     = "postgres"
	DB_PASSWORD = "postgres"
	DB_NAME     = "postgres"
)

func requestHandler(w http.ResponseWriter, r *http.Request) {

	u, err := url.Parse(r.URL.String()) // Парсим строку запроса
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(reflect.TypeOf(u))

	//fmt.Println("r.URL.Path " + u.Path) // выводим путь после домена и до параметров
	//
	//fmt.Println("Scheme " +r.URL.Scheme)
	//fmt.Println("Host "+r.URL.Host) // Выводим хост
	//fmt.Println("ForceQuery ")
	//fmt.Println(u.ForceQuery)
	////
	//fmt.Println("RawPath " + u.RawPath)
	//fmt.Println("r.URL.Opaque")
	//fmt.Println(r.URL.Opaque)
	//fmt.Println("RawQuery ")      // параметры запроса после ?
	//fmt.Println(u.RawQuery)       // параметры запроса после ?
	//fmt.Println("r.URL.RawQuery") // параметры запроса после ?
	//fmt.Println(r.URL.RawQuery)   // параметры запроса после ?
	//fmt.Println("Fragment " + r.URL.Fragment)
	//fmt.Println("RequestURI() " + r.URL.RequestURI())
	//fmt.Println("u.RequestURI() " + u.RequestURI())
	//fmt.Println("u.String() " + u.String())
	////fmt.Println(u.Query()) //hashMap параметров запроса после ?
	//fmt.Println("path.Base(u.Path)")
	//fmt.Println(path.Base(u.Path))
	//for key, value := range u.Query() { // выводим параметры запроса ключ - значениеы
	//	fmt.Println(key)
	//	fmt.Println(value)
	//}

	//act = u.Query().Get("action")
	//if act != "" {
	//	fmt.Println("параметр action существует ")
	//	fmt.Println(act)
	//}
	var result_page string
	if action, ok := u.Query()["jaction"]; ok {

		//var action string = u.Query().Get("action")
		fmt.Println("параметр action существует ajax")
		fmt.Println(action[0])

	} else {
		fmt.Println("параметр jaction несуществует ")
		result_page = request_page(*u)
		fmt.Println(result_page)
	}

	//var result string
	//switch action[0] {
	//case "show_prod":
	//	result = show_prod(u.Query().Get("type"))
	//}
	//fmt.Println(result)
	if err != nil {
		http.Error(w, http.StatusText(500), 500)
		return
	}

	w.Header().Set("Content-Type", "text/html")
	w.WriteHeader(http.StatusOK)
	data := result_page
	if err != nil {
		panic(err)
	}
	w.Header().Set("Content-Length", fmt.Sprint(len(data)))
	fmt.Fprint(w, string(result_page))
	//fmt.Fprint(w, string(data))
}

func request_page(request_data url.URL) (response string) { //respons - ответ
	var (
		ctx    context.Context
		cancel context.CancelFunc
	)
	
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s sslmode=disable",
		DB_USER, DB_PASSWORD, DB_NAME)
	db, err := sql.Open("postgres", dbinfo)
	checkErr(err)
	defer db.Close()
	var req_page string
	var w io.Writer
	path_arr := strings.Split(request_data.Path, "/") // парсим url разбиваем по слэшу

	if request_data.Path == "/" {
		req_page = "index"
	} else {
		req_page = path_arr[1]
	}

	fmt.Println("req_page")
	fmt.Println(req_page)

	rows, err := db.Query("select request_page($1)", req_page)
	if nil != err {
		//panic(err)
		fmt.Println(err)
	}
	//checkErr(err)

	var page_data map[string]interface{}

	for rows.Next() {

		var result []byte
		rows.Scan(&result)

		if err := json.Unmarshal(result, &page_data); err != nil {
			fmt.Println(err)
		}

		if error, ok := page_data["error"]; ok {
			fmt.Println("error DB Страница не найдена")
			fmt.Println(error)
		} else {

			if blocks, ok := page_data["page_struct"].(map[string]interface{}); ok { // проверяем структуру страницы, порядок блоков это будет вставляться в content

				var strFiles []string
				for i := 1; i <= len(blocks); i++ { // создаём срез с именами файлов для генерации html
					var block_name = blocks[strconv.Itoa(i)].(string)
					strFiles = append(strFiles, "/blocks/"+block_name+".html")

				}
				var t = template.New("tpl")
				t, _ = template.ParseFiles(strFiles...)

				t.Execute(w, nil)
				//fmt.Printf("", strFiles)
				//
				//t, _ := template.ParseFiles(strFiles...)

			}
			if page_content, ok := page_data["block_content"].(map[string]interface{}); ok {
				//fmt.Println(page_content)
				var cont = page_content["product_list"].([]interface{})
				for key, value := range cont {
					fmt.Println(key)
					fmt.Println(value)
					for k, v := range value.(map[string]interface{}) {
						fmt.Println(k)
						fmt.Println(v)

					}
					fmt.Printf("", reflect.TypeOf(value))
					var map_val (map[string]interface{}) = value.(map[string]interface{})
					fmt.Println(map_val["user_prod_descr"])

				}
				//var cont1 = cont[0].(map[string]interface{})
				//fmt.Println(cont1["user_title"])

			}
		}

		//fmt.Println("page_data")
		//fmt.Println(page_data)
		//if err := json.Unmarshal(request_page, &data); err != nil {
		//	fmt.Println(err)
		//}
		//for _, thing := range data["blocks"] {
		//	fmt.Println("thing")
		//	fmt.Println(thing)
		//}
		//num := dat["blocks"]

		//return "responses"
	}
	return "responses"
}

func rednder_page(daеa string) (respons string) { //respons - ответ
	return "responses"
}

func show_prod(data string) (return_data string) {

	var enter_data string = data
	return enter_data
}

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
func main() {

	//s := http.StripPrefix("/files/", http.FileServer(http.Dir("./files/")))

	// для отдачи сервером статичных файлов
	//fs := http.FileServer(http.Dir("./static"))
	//http.Handle("/static/", http.StripPrefix("/static/", fs))

	http.HandleFunc("/static/", StaticHandler)
	http.HandleFunc("/", requestHandler)
	log.Fatal(http.ListenAndServe(":8080", nil))

}
