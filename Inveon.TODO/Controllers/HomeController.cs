using Inveon.TODO.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inveon.TODO.Controllers
{
    public class HomeController : Controller
    {
        List<TodoModel> todos = new List<TodoModel>();
        public HomeController()
        {
            if (System.Web.HttpContext.Current.Session["todos"] != null)
                todos = JsonConvert.DeserializeObject<List<TodoModel>>(System.Web.HttpContext.Current.Session["todos"].ToString());
            // Say Hello is an default example
            if (todos.Count == 0)
            {
                DateTime currentTime = DateTime.Now;
                DateTime TodoDatetime = currentTime.AddMinutes(3);
                todos.Add(new TodoModel { ID = 1, Todo = "Say Hello", TodoDatetime = TodoDatetime });

            }
        }

        public ActionResult Index()
        {
            return View(todos);
        }

        public JsonResult InserTodo(TodoModel model_)
        {
            try
            {
                if (System.Web.HttpContext.Current.Session["todos"] != null)
                    todos = JsonConvert.DeserializeObject<List<TodoModel>>(System.Web.HttpContext.Current.Session["todos"].ToString());
                var id = todos.Max(x => x.ID) + 1;
                todos.Add(new TodoModel { ID = id, Todo = model_.Todo, TodoDatetime = model_.TodoDatetime });
                System.Web.HttpContext.Current.Session["todos"] = JsonConvert.SerializeObject(todos.OrderBy(x => x.TodoDatetime));
                return Json("true");
            }
            catch (Exception ex)
            {
                return Json(ex);
            }

        }

        public JsonResult UpdateTodo(TodoModel model_)
        {
            try
            {
                if (System.Web.HttpContext.Current.Session["todos"] != null)
                    todos = JsonConvert.DeserializeObject<List<TodoModel>>(System.Web.HttpContext.Current.Session["todos"].ToString());
                var todo = todos.FirstOrDefault(x => x.ID == model_.ID);
                todos.Remove(todo);
                todo.Todo = model_.Todo;
                todo.TodoDatetime = model_.TodoDatetime;
                todos.Add(todo);
                System.Web.HttpContext.Current.Session["todos"] = JsonConvert.SerializeObject(todos.OrderBy(x => x.TodoDatetime));
                return Json("true");
            }
            catch (Exception ex)
            {
                return Json(ex);
            }

        }

        public JsonResult DeleteTodo(TodoModel model_)
        {
            try
            {
                if (System.Web.HttpContext.Current.Session["todos"] != null)
                    todos = JsonConvert.DeserializeObject<List<TodoModel>>(System.Web.HttpContext.Current.Session["todos"].ToString());
                var todo = todos.FirstOrDefault(x => x.ID == model_.ID);
                todos.Remove(todo);
                System.Web.HttpContext.Current.Session["todos"] = JsonConvert.SerializeObject(todos.OrderBy(x=>x.TodoDatetime));
                return Json("true");
            }
            catch (Exception ex)
            {
                return Json(ex);
            }

        }
    }
}