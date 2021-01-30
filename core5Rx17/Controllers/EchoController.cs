using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using core5Rx17.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace AsvtRx17.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EchoController : ControllerBase
    {
        private readonly ILogger<EchoController> _logger;

        public EchoController(ILogger<EchoController> logger)
        {
            _logger = logger;
        }

        [HttpGet("[Action]")]
        [HttpPost("[Action]")]
        public IActionResult Knock()
        {
            var now = DateTime.Now;

            var result = new
            {
                konck = $"{now.ToLongDateString()} {now.ToLongTimeString()}"
            };

            return Ok(result);
        }


        [HttpPost("[Action]")]
        public IActionResult WeatherForecast()
        {
            string[] Summaries = new[]
            {
                "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
            };

            var rng = new Random();

            var result = Enumerable.Range(1, 5).Select(index =>
            {
                int TemperatureC = rng.Next(-20, 55);
                return new
                {
                    Date = DateTime.Now.AddDays(index),
                    TemperatureC,
                    TemperatureF = 32 + (int)(TemperatureC / 0.5556),
                    Summary = Summaries[rng.Next(Summaries.Length)]
                };
            }).ToArray();

            return Ok(result);
        }

        [HttpPost("[Action]")]
        [ValidateAntiForgeryToken]
        public IActionResult WeatherForecastSafe()
        {
            string[] Summaries = new[]
            {
                "WeatherForecastSafe 1", "WeatherForecastSafe 2", "WeatherForecastSafe 3"
                //"Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
            };

            var rng = new Random();
            var result = Enumerable.Range(1, 5).Select(index =>
            {
                int TemperatureC = rng.Next(-20, 55);
                return new
                {
                    Date = DateTime.Now.AddDays(index),
                    TemperatureC,
                    TemperatureF = 32 + (int)(TemperatureC / 0.5556),
                    Summary = Summaries[rng.Next(Summaries.Length)]
                };
            }).ToArray();

            return Ok(result);
        }

        [HttpPost("[Action]")]
        public IActionResult TestLastErrMsg()
        {
            var result = new LastErrMsg()
            {
                errMsg = "測試看看1234567890。",
                errClass = "TestErrClass",
                errMsgDetailList = new Dictionary<string, string>()
            };
            result.errMsgDetailList.Add("foo", "FOO");
            result.errMsgDetailList.Add("bar", "BAR");

            return Ok(result);
        }

    }
}
