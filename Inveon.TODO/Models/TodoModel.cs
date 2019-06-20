using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inveon.TODO.Models
{
    public class TodoModel
    {
        public int ID { get; set; }
        public string Todo { get; set; }
        public DateTime TodoDatetime { get; set; }
    }
}