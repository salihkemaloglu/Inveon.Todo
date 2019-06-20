$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
    var actions = $("table td:last-child").html();

    // Edit Todo on edit button click
    $(document).on("click", ".edit", function (event) {
        var todoId = "todoUpdate" + $(this).attr("id"); 
        var todoDatetimeId = "todoDatetimeUpdate" + $(this).attr("id");
        var check = true;
        var date = "";
        $(this).parents("tr").find("td:not(:last-child)").each(function () {
            if (check) {
                $(this).html('<input type="text" class="form-control" id="' + todoId + '" value="' + $(this).text() + '">');
                check = false;
            } else {
                date = $(this).text();
                $(this).html('<div class="input-group date" id="datetimepicker2"><input type="text" class="form-control" id="' + todoDatetimeId + '" /><span class="input-group-addon"><span class="fa fa-calendar"></span></span></div>');
            }
        });
        $(this).parents("tr").find(".delete").css('display', 'none');
        $(this).parents("tr").find(".edit").css('display', 'none');

        $(this).parents("tr").find(".add").css('display', 'block');
        $(this).parents("tr").find(".cancel").css('display', 'block');
        $('#datetimepicker2').datetimepicker({
            defaultDate: new Date(date)
        });
         
    });

    // Delete Todo on delete button click
    $(document).on("click", ".delete", function () {
        var TodoModel = {
            ID: $(this).attr("id"),
        };
        $.ajax({
            url: "/Home/DeleteTodo",
            type: "POST",
            dataType: "json",
            data: TodoModel,
            success: function (data) {
                if (data == "true") {
                    location.reload();
                }
                else {
                    alert("Todo coult not be deleted!=>" + data);
                }

            }
        });   
    });
    SetAndUpdateCountdown();
    $('#datetimepicker1').datetimepicker();

});
// Add new todo 
function AddTodo() {
    $("#btnAddTodo").attr("disabled", true);
    if ($('#todo').val() == "")
        alert("Todo can not be empty!")
    else if ($('#datetimepicker').val() == "")
        alert('Todo Datetime can not be empty!');
    else {
        var TodoModel = {
            Todo: $('#todo').val(),
            TodoDatetime: $('#datetimepicker').val()
        };
        $.ajax({
            url: "/Home/InserTodo",
            type: "POST",
            dataType: "json",
            data: TodoModel,
            success: function (data) {
                if (data == "true") {
                    location.reload();
                }
                else {
                    alert("Todo coult not be inserted!=>" + data);
                }

            }
        });
    }
    $("#btnAddTodo").attr("disabled", false);
}
// Update Todo
function UpdateTodo(event) {
    var todoId = "#todoUpdate" + $(event).attr("id");
    var todoDatetimeId = "#todoDatetimeUpdate" + $(event).attr("id");
    var todo = $(todoId).val();
    var todoDatetime = $(todoDatetimeId).val();
    if (todo == "")
        alert("Todo can not be empty!")
    else if (todoDatetime == "")
        alert('Todo Datetime can not be empty!');
    else {
        var TodoModel = {
            Todo: todo,
            TodoDatetime: todoDatetime,
            ID: $(event).attr("id"),
        };
        $.ajax({
            url: "/Home/UpdateTodo",
            type: "POST",
            dataType: "json",
            data: TodoModel,
            success: function (data) {
                if (data == "true") {
                    location.reload();
                }
                else {
                    alert("Todo coult not be inserted!=>" + data);
                }
            }
        });
    }
}
// Delete Todo
function DeleteTodo() {
    $("#btnAddTodo").attr("disabled", true);
    if ($('#todo').val() == "")
        alert("Todo can not be empty!")
    else if ($('#datetimepicker').val() == "")
        alert('Todo Datetime can not be empty!');
    else {
        var TodoModel = {
            Todo: $('#todo').val(),
            TodoDatetime: $('#datetimepicker').val()
        };
        $.ajax({
            url: "/Home/DeleteTodo",
            type: "POST",
            dataType: "json",
            data: TodoModel,
            success: function (data) {
                if (data == "true") {
                   
                    location.reload();
                }
                else {
                    alert("Todo coult not be deleted!=>" + data);
                }

            }
        });
    }
    $("#btnAddTodo").attr("disabled", false);
}
// Format string datetime to Date object
function formatDate(date_) {
    var itemId = date_.substring(1, date_.length);
    str = itemId.slice(0, -1);
    var date = new Date(+str.replace(/\D/g, ''));
    return date;
}
