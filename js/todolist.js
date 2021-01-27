$(function () {
    load()
    $("#title").on("keydown", function (e) {
        if (e.keyCode === 13) {
            if ($(this).val() === "") {
                alert("内容不能为空!!!")
                return
            }
            var local = getData()
            console.log(local);
            local.push({ title: $(this).val(), done: false })
            saveData(local)
            load()
            $(this).val("")
        }

    })
    $("#todolist,#donelist").on("click", "a", function () {
        var data = getData()
        var index = $(this).attr("id")
        console.log(index);
        data.splice(index, 1)
        saveData(data)
        load()
    })
    $("#todolist,#donelist").on("change", "input", function () {
        var data = getData()
        var index = $(this).siblings("a").attr("id")//获取id号
        data[index].done = $(this).prop("checked")
        saveData(data)
        load()
    })
    function getData() {//获取数据
        return JSON.parse(localStorage.getItem("todolist")) || []
    }
    function saveData(data) {//保存数据
        localStorage.setItem("todolist", JSON.stringify(data))
    }
    function load() {//渲染页面
        var data = getData()
        $("#todolist,#donelist").empty()
        var todocount = 0//正在进行的数量
        var donecount = 0//已经完成的数量
        $.each(data, function (i, e) {
            if (e.done) {
                $("#donelist").prepend("<li><input type='checkbox' checked='checked'> <p>" + e.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>")
                donecount++
                return
            }
            $("#todolist").prepend("<li><input type='checkbox' > <p>" + e.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>")
            todocount++
        })
        $("#todocount").text(todocount)
        $("#donecount").text(donecount)
    }
})