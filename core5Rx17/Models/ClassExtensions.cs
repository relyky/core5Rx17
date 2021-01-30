using Microsoft.AspNetCore.Http;
using System.Text.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace core5Rx17.Models
{
    public static class ClassExtensions
    {
        public static void SetObject(this ISession session, string key, object value)
        {
            session.SetString(key, JsonSerializer.Serialize(value));
            //session.SetString(key, JsonConvert.SerializeObject(value));
            //session.Set(key, Utilities.SerializeToMemory(value));
        }

        public static T GetObject<T>(this ISession session, string key)
        {
            return JsonSerializer.Deserialize<T>(session.GetString(key));
            //return JsonConvert.DeserializeObject<T>(session.GetString(key));
            //return Utilities.DeserializeFromMemory<T>(session.Get(key));
        }

        public static string ToJson(this Object obj)
        {
            return JsonSerializer.Serialize(obj);
            //return JsonConvert.SerializeObject(obj);
        }
    }
}
