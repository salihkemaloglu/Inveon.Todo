$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
    var actions = $("table td:last-child").html();

    // Edit row on edit button click
    $(document).on("click", ".edit", function (event) {
        var todoId = "todoUpdate" + $(this).attr("id"); 
        var todoDatetimeId = "todoDatetimeUpdate" + $(this).attr("id");
        var check = true;
        $(this).parents("tr").find("td:not(:last-child)").each(function () {
            if (check) {
                $(this).html('<input type="text" class="form-control" id="' + todoId + '" value="' + $(this).text() + '">');
                check = false;
            } else {
                $(this).html('<input type="text" class="form-control" id="' + todoDatetimeId + '" value="' + $(this).text() + '">');
            }
        });
        $(this).parents("tr").find(".delete").css('display', 'none');
        $(this).parents("tr").find(".edit").css('display', 'none');

        $(this).parents("tr").find(".add").css('display', 'block');
        $(this).parents("tr").find(".cancel").css('display', 'block');

    });

    // Delete row on delete button click
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
   
    $('#datetimepicker1').datetimepicker();
});

function addTodo() {
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
                    var row = '<tr>' +
                        '<td>' + TodoModel.Todo + '</td>' +
                        '<td>' + TodoModel.TodoDatetime + '</td>' +
                        ' <td><a class="add" title="Update Todo" data-toggle="tooltip" style="cursor:pointer;display:none" id="@item.ID" onclick="UpdateTodo(this)" > <i class="material-icons">&#xE03B;</i></a ><a class="edit" title="Edit Todo" style="cursor:pointer;" id="@item.ID"><i class="material-icons">&#xE254;</i></a><a class="delete" title="Delete Todo" style="cursor:pointer;" id="@item.ID"><i class="material-icons" >&#xE872;</i></a> <a href="@Url.Action("index","Home")" title="Cancel Todo" class="cancel" style="cursor:pointer;display:none;margin-top:-29px;margin-left:28px"><i class="material-icons cancel">&#xe5c9;</i></a></td >' +
                        '</tr>';
                    $("table").append(row);
                }
                else {
                    alert("Todo coult not be inserted!=>" + data);
                }

            }
        });
    }
    $("#btnAddTodo").attr("disabled", false);
}

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