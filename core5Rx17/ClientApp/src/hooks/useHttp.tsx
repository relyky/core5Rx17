import { useState, useDebugValue, useEffect } from 'react'
import axios from 'axios'

//axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'; // mark as an ajax request
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//axios.defaults.withCredentials = true

/// # 用於載入資料檔或相關資料，如：code-name map, codeList
/// sample:
/// const [f_reload, toggleToReload] = useState(false)
/// <AttachmentList artGuid={artGuid} toggleToReload={f_reload} >
///     { const [attachList] = useLoad('api/Handout/GetFormAttachList', loadArgs, {}, toggleToReload);  
///     }
/// </AttachmentList>
export default function useLoad(url:string, args?:object, initState?:any, toggleToReload?:boolean) {
  const [f_loading, setLoading] = useState(false)
  const [data, setData] = useState(initState || null)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    //console.info('useLoad', url, args)
    axios({
      method: 'POST',
      url: url,
      data: args,
      //withCredentials:
    }).then(resp => {
      setData(resp.data)
      setError(null)
    }).catch(xhr => {
      console.error('useLoad:ERROR', { xhr })
      setError(xhr)
    }).finally(() => {
      setLoading(false)
    })
  }, [args, url, toggleToReload])

  useDebugValue(`url:${url}`)
  return [data, f_loading, error]
}

/// # 只執行一次，用於UI初始化取基本資料。參數皆是常數。
/// sample:
/// const [data, f_loading, error] = useInit('api/Ecoh/WeatherForecast', constArgs, initState)
export function useInit(url: string, constArgs?: object, initState?: any) {
  const [f_loading, setLoading] = useState(false)
  const [data, setData] = useState(initState || null)
  const [error, setError] = useState(null)

  useState(() => {
    // console.log('useInit', url, constArgs)
    setLoading(true)
    axios({
      method: 'POST',
      url: url,
      data: constArgs,
      //withCredentials:
    }).then(resp => {
      setData(resp.data)
      setError(null)
    }).catch(xhr => {
      console.error('useInit:ERROR', xhr)
      setError(xhr)
    }).finally(() => {
      setLoading(false)
    })
  })

  useDebugValue(`url:${url}`)
  return [data, f_loading, error]
}

/// 只是送出一個(背景)訊息，比如用於記LOG。
export function postEvent(url: string, args ?: object)
{
  return axios({
    method: 'POST',
    url: url,
    data: args,
    //withCredentials:
  })
}
