package requestHendler

import (
	"context"
	"dbs"
	"fmt"
	"log"
	"net/http"
	"net/url"
	"reflect"
)

func RequestHandler(ctx context.Context, w http.ResponseWriter, r *http.Request) {

	uri, err := url.Parse(r.URL.String()) // Парсим строку запроса
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(reflect.TypeOf(uri))

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
	ctx = context.WithValue(ctx, "url", uri)
	if action, ok := uri.Query()["jaction"]; ok {

		//var action string = u.Query().Get("action")
		fmt.Println("параметр jaction существует ajax")
		fmt.Println(action[0])

	} else {
		fmt.Println("параметр jaction несуществует ")
		result_page = dbs.Request_page(ctx)
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
