using System;
using System.Collections.Generic;

namespace core5Rx17.Dto
{
    /// <summary>
    /// 自訂錯誤訊息類別。
    /// </summary>
    public class LastErrMsg
    {
        #region String Enum of errType
        public const string SUCCESS = "SUCCESS";
        public const string INFO = "INFO";
        public const string WARNING = "WARNING";
        public const string ERROR = "ERROR";
        public const string FAIL = "FAIL";
        public const string EXCEPTION = "EXCEPTION";
        #endregion
        
        #region properties
        public string errType { get; set; }
        public string errMsg { get; set; }
        public DateTime errDtm { get; set; }
        public string errClass { get; set; }
        public Dictionary<string, string> errMsgDetailList { get; set; }
        #endregion

        public LastErrMsg(string errMsg = "預設失敗。", string errType = ERROR)
        {
            this.errType = errType;
            this.errMsg = errMsg;
            this.errDtm = DateTime.Now;
        }
    }

}
