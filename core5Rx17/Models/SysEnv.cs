//using AccountSvc;
//using AsvtToturBizSvc;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Net.Http.Headers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace core5Rx17.Models
{
    /// <summary>
    /// 將用於取用登入者資訊、環境參數、兼 Factory 等等
    /// </summary>
    public interface ISysEnv
    {
        /// <summary>
        /// current http context
        /// </summary>
        HttpContext Current { get; }

        /// <summary>
        /// 取得並儲存AntiforgeryTokens至Cookie。
        /// </summary>
        void GetAndStoreAntiforgeryTokens(HttpContext context);
    }

    public class SysEnv : ISysEnv
    {
        private readonly IConfiguration _config;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IMemoryCache _cache;
        private readonly IAntiforgery _antiforgery;

        public SysEnv(IHttpContextAccessor httpContextAccessor, IMemoryCache cache, IConfiguration config, IAntiforgery antiforgery)
        {
            _httpContextAccessor = httpContextAccessor;
            _cache = cache;
            _config = config;
            _antiforgery = antiforgery;
        }

        public HttpContext Current => _httpContextAccessor.HttpContext;

        public void GetAndStoreAntiforgeryTokens(HttpContext context)
        {
            var tokens = _antiforgery.GetAndStoreTokens(context);
            context.Response.Cookies.Append(tokens.FormFieldName, tokens.RequestToken,
                new CookieOptions()
                {
                    HttpOnly = false, // 只能透過Http操作，需設成false，不然無法被 browser 取得。
                    SameSite = Microsoft.AspNetCore.Http.SameSiteMode.Strict,
                    Expires = new DateTimeOffset(DateTime.Now.AddMinutes(20d))
                });
        }

    }
}
