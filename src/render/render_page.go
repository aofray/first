package render

import (
	"context"
	"database/sql"
	"fmt"
	"reflect"
	"encoding/json"
	"strconv"
	"html/template"
)

func Render_page(ctx context.Context, rows *sql.Rows) {
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

				//t.Execute(t, nil)
				fmt.Printf("", strFiles)
				fmt.Printf("", t)

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
}
