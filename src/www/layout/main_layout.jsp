
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@page pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta property="og:image" content="" />
    <meta charset="utf-8">
    <title>Заголовок документа</title>

    <link rel="stylesheet" href="../resources/style/main_style.css">
    <link rel="stylesheet" href="../resources/style/font/flaticon.css">

    <script type="application/javascript" src="../resources/js/js.js"></script>
    <script type="application/javascript" src="../resources/js/ready.js"></script>

</head>
<body >

<div id="main_wrapper" class="white">
    <header id="top_nav">
        Вернхняя панель 3
        <div class="search">
            <form action="search" id="search">
                <input type="text">
                <button type="submyt">Найти</button>
            </form>
        </div>
        <div class="fast_nav">
            <a href="">Корзина</a>
            <a href="">Избранное</a>
            <a href="">Профиль</a>
        </div>
    </header>
    <aside id="left_side">
        <div class="side_wrapper">
            <div id="logo">
                <%--<img src="resources/img/jana_logo_b.png" alt="">--%>
            </div>
            <nav id="main_nav">
                <a href="" class="nav_link curent">Главная</a>
                <a href="" class="nav_link">Мой профиль</a>
                <a href="" class="nav_link">Мои заказы</a>
                <a href="" class="nav_link">Мой магазин</a>

            </nav>
        </div>
    </aside>
    <div class="content_wrapper" id="main_contet">

        <div id="content" class="grid full_list compact_list">
<%--<%--%>
    <%--Map<String, String> url_data = (Map<String, String>) request.getAttribute("url_data");--%>
    <%--String includ_blocks[]= (String[]) request.getAttribute("includ_blocks");--%>
    <%--for (String block: includ_blocks){--%>

        <%--String incl_block = block+".jsp";--%>

<%--%>--%>
            <%--<jsp:include page="<%= incl_block %>"/>--%>
     <%--<% }--%>
<%--%>--%>


        </div>

    </div>
    <aside id="right_side">

    </aside>



</div>
</body>
</html>