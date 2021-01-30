import React, { useMemo, useState, useEffect, useContext, createContext, useCallback } from 'react'
//import t from 'typy'
import { debug } from 'console'

//=============================================================================
// #region useLocalStorage, useSessionStorage

/// 應用範例
/// import { LocalStorageProvider } from 'hooks/useWindowResource'
/// ReactDOM.render(
///   <LocalStorageProvider>
///         <App />
///   </LocalStorageProvider>,
///   document.getElementById('root')
/// );
/// 
/// import { useLocalStorage } from 'hooks/useWindowResource'
/// const [f_mobile, setMobileFlag] = useLocalStorage<boolean>('f_mobile', false)

const WindowResourceContext = createContext(null as any)

export function WindowResourceProvider(props: { children: React.ReactNode }) {
  const [f_localStorageToggle, setLocalStorageToggle] = useState(true)
  const [f_sessionStorageToggle, setSessionStorageToggle] = useState(true)

  function __useLocalStorage<TValue>(key: string, initValue?: TValue)
    : [TValue, (newValue: TValue) => void] {

    //# fill initial value
    useState(() => {
      if (initValue !== undefined && window.localStorage.getItem(key) === null) {
        /// 若非字串則轉成JSON字串，因為localStorage只能存字串。
        if (typeof initValue === 'string') {
          window.localStorage.setItem(key, initValue)
        } else {
          window.localStorage.setItem(key, JSON.stringify(initValue))
        }
      }
    })

    //# add listener
    useEffect(() => {
      // DidMount
      window.addEventListener("storage", storageEventListener)
      // UnMount
      return () =>
        window.removeEventListener("storage", storageEventListener)
    }, [])

    function storageEventListener(event: StorageEvent) {
      // console.log('useLocalStorage:StorageEvent', event)
      if (event.type === "storage")
        setLocalStorageToggle(f_toggle => !f_toggle)
    }

    //# setValue
    function setValue(newValue: TValue): void {
      /// 若非字串則轉成JSON字串，因為localStorage只能存字串。
      if (typeof newValue === 'string') {
        window.localStorage.setItem(key, newValue)
        setLocalStorageToggle(f_toggle => !f_toggle)
      } else {
        window.localStorage.setItem(key, JSON.stringify(newValue))
        setLocalStorageToggle(f_toggle => !f_toggle)
      }
    }

    //# getValue
    const value = useMemo(() => {
      const _value = window.localStorage.getItem(key)
      if (_value === null) return null;
      try {
        /// 解析JSON字串
        return JSON.parse(_value);
      } catch (ex) {
        /// 若不是JSON字串，就是一般的字串
        return _value
      }
    }, [f_localStorageToggle])

    return [value, setValue]
  }

  function __useSessionStorage<TValue>(key: string, initValue?: TValue)
    : [TValue, (newValue: TValue) => void] {

    //# fill initial value
    useState(() => {
      if (initValue !== undefined && window.sessionStorage.getItem(key) === null) {
        /// 若非字串則轉成JSON字串，因為sessionStorage只能存字串。
        if (typeof initValue === 'string') {
          window.sessionStorage.setItem(key, initValue)
        } else {
          window.sessionStorage.setItem(key, JSON.stringify(initValue))
        }
      }
    })

    //# setValue
    function setValue(newValue: TValue): void {
      /// 若非字串則轉成JSON字串，因為sessionStorage只能存字串。
      if (typeof newValue === 'string') {
        window.sessionStorage.setItem(key, newValue)
        setSessionStorageToggle(f_toggle => !f_toggle)
      } else {
        window.sessionStorage.setItem(key, JSON.stringify(newValue))
        setSessionStorageToggle(f_toggle => !f_toggle)
      }
    }

    //# getValue
    const value = useMemo(() => {
      const _value = window.sessionStorage.getItem(key)
      if (_value === null) return null;
      try {
        /// 解析JSON字串
        return JSON.parse(_value);
      } catch (ex) {
        /// 若不是JSON字串，就是一般的字串
        return _value
      }
    }, [f_sessionStorageToggle])

    return [value, setValue]
  }

  return (
    <WindowResourceContext.Provider value={{ __useLocalStorage, __useSessionStorage }}>
      {props.children}
    </WindowResourceContext.Provider>)
}

/**
 * 使用 window.localStorage 資源，需與 WindowResourceProvider 搭配應用。
 * @param key
 * @param initValue
 */
export function useLocalStorage<TValue>(key: string, initValue?: TValue)
  : [TValue, (newValue: TValue) => void] {
  const { __useLocalStorage } = useContext(WindowResourceContext);
  return __useLocalStorage(key, initValue)
}

/**
 * 使用 window.sessionStorage 資源，需與 WindowResourceProvider 搭配應用。
 * @param key
 * @param initValue
 */
export function useSessionStorage<TValue>(key: string, initValue?: TValue)
  : [TValue, (newValue: TValue) => void] {
  const { __useSessionStorage } = useContext(WindowResourceContext);
  return __useSessionStorage(key, initValue)
}

//-----------------------------------------------------------------------------
/**
 * 使用 window.localStorage 資源。(可獨立運作。不需搭配WindowResourceProvider)
 * @param key
 * @param initValue
 */
export function useLocalStorageV2<TValue>(key: string, initValue?: TValue | (() => TValue))
  : [TValue, (newValue: TValue) => void] {
  const [f_toggle, setToggle] = useState(true)

  //# fill initial value
  useState(() => {
    if (initValue !== undefined && window.localStorage.getItem(key) === null) {
      /// 若非字串則轉成JSON字串，因為localStorage只能存字串。
      if (typeof initValue === 'string') {
        window.localStorage.setItem(key, initValue as string)
      } else if (typeof initValue === 'function') {
        const initFunc = initValue as () => TValue
        window.localStorage.setItem(key, JSON.stringify(initFunc()))
      } else {
        window.localStorage.setItem(key, JSON.stringify(initValue))
      }
    }
  })

  // //# fill initial value
  // useState(() => {
  //   if (initValue !== undefined && window.localStorage.getItem(key) === null) {
  //     /// 若非字串則轉成JSON字串，因為localStorage只能存字串。
  //     if (typeof initValue === 'string') {
  //       window.localStorage.setItem(key, initValue)
  //     } else {
  //       window.localStorage.setItem(key, JSON.stringify(initValue))
  //     }
  //   }
  // })

  //# add listener
  useEffect(() => {
    // DidMount
    window.addEventListener("storage", storageEventListener)
    window.addEventListener("custom_local_storage", localStorageEventListener)
    // UnMount
    return () => {
      window.removeEventListener("storage", storageEventListener)
      window.removeEventListener("custom_local_storage", localStorageEventListener)
    }
  }, [])

  function storageEventListener(event: StorageEvent) {
    if (event.type === "storage" && event.key === key) {
      setToggle(f_toggle => !f_toggle)
      console.log('useLocalStorage:StorageEvent', event)
    }
  }

  const localStorageEventListener: EventListenerOrEventListenerObject = (event: Event) => {
    const ce = event as CustomEvent;
    if (ce.type === "custom_local_storage" && ce.detail.key === key) {
      setToggle(f_toggle => !f_toggle)
      console.log('useLocalStorage:CustomEvnet', !f_toggle, event as CustomEvent)
    }
  }

  //# setValue
  function setValue(newValue: TValue): void {
    /// 若非字串則轉成JSON字串，因為localStorage只能存字串。
    if (typeof newValue === 'string') {
      window.localStorage.setItem(key, newValue)
    } else {
      window.localStorage.setItem(key, JSON.stringify(newValue))
    }
    window.dispatchEvent(new CustomEvent('custom_local_storage', { detail: { key, newValue } }))
  }

  //# getValue
  const value = useMemo(() => {
    const _value = window.localStorage.getItem(key)
    console.log('useLocalStorage:value', _value)
    if (_value === null) return null;
    try {
      /// 解析JSON字串
      return JSON.parse(_value);
    } catch (ex) {
      /// 若不是JSON字串，就是一般的字串
      return _value
    }
  }, [f_toggle])

  return [value, setValue]
}

//-----------------------------------------------------------------------------
/**
 * 使用 window.sessionStorage 資源。(可獨立運作。不需搭配WindowResourceProvider)
 * @param key
 * @param initValue
 */
export function useSessionStorageV2<TValue>(key: string, initValue?: TValue)
  : [TValue, (newValue: TValue) => void] {
  const [f_toggle, setToggle] = useState(true)

  //# fill initial value
  useState(() => {
    if (initValue !== undefined && window.sessionStorage.getItem(key) === null) {
      /// 若非字串則轉成JSON字串，因為sessionStorage只能存字串。
      if (typeof initValue === 'string') {
        window.sessionStorage.setItem(key, initValue)
      } else {
        window.sessionStorage.setItem(key, JSON.stringify(initValue))
      }
    }
  })

  //# add listener
  useEffect(() => {
    // DidMount
    window.addEventListener("custom_session_storage", localSessionEventListener)
    // UnMount
    return () =>
      window.removeEventListener("custom_session_storage", localSessionEventListener)
  }, [])

  const localSessionEventListener: EventListenerOrEventListenerObject = (event: Event) => {
    const ce = event as CustomEvent;
    if (ce.type === "custom_session_storage" && ce.detail.key === key) {
      setToggle(f_toggle => !f_toggle)
      console.log('useSessionStorage:CustomEvnet', !f_toggle, event as CustomEvent)
    }
  }

  //# setValue
  function setValue(newValue: TValue): void {
    /// 若非字串則轉成JSON字串，因為sessionStorage只能存字串。
    if (typeof newValue === 'string') {
      window.sessionStorage.setItem(key, newValue)
      //setToggle(f_toggle => !f_toggle)
    } else {
      window.sessionStorage.setItem(key, JSON.stringify(newValue))
      //setToggle(f_toggle => !f_toggle)
    }
    window.dispatchEvent(new CustomEvent('custom_session_storage', { detail: { key, newValue } }))
  }

  //# getValue
  const value = useMemo(() => {
    const _value = window.sessionStorage.getItem(key)
    if (_value === null) return null;
    try {
      /// 解析JSON字串
      return JSON.parse(_value);
    } catch (ex) {
      /// 若不是JSON字串，就是一般的字串
      return _value
    }
  }, [f_toggle])

  return [value, setValue]
}

// #endregion 

//=============================================================================
export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  function handleMouseMove(e: MouseEvent) {
    setPosition({ x: e.pageX, y: e.pageY })
  }

  //useDebugValue(position)
  return position
}

//=============================================================================
/// 應用範例
/// const size = useWindowSize()

//export function useWindowSize() {
//  const [size, setSize] = useState({ w: 0, h: 0 })
//
//  useEffect(() => {
//    window.addEventListener("resize", handleResize)
//    return () => window.removeEventListener("resize", handleResize)
//  }, []) // 等同 componentDidMount
//
//  function handleResize(e) {
//    setSize({ w: e.target.innerWidth, h: e.target.innerHeight })
//  }
//
//  //useDebugValue(size)
//  return size
//}

//=============================================================================
/// 應用範例
/// useInterval(2000, () => {
///    setCount(currentCount => currentCount + 1);
/// });

/**
 * 定時觸發
 * @param delay
 * @param onInterval
 * @param f_immediately
 */
export function useInterval(delay: number, onInterval: () => void, f_immediately?: boolean) {

  useEffect(() => {
    // invoke immediately
    let timer = 0
    if (f_immediately) {
      timer = setImmediate(onInterval)
    }
    return () => {
      if (timer > 0) clearImmediate(timer)
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(onInterval, delay)
    return () => clearInterval(timer)
  }, []);
}

//=============================================================================

/**
 * 定時觸發
 * @param initialDelay 需為大於0的常數數字
 * @param delay 需為大於0的常數數字
 * @param onInterval
 * @param enable
 *
 * 應用範例:
 * const [countDown, setCountDown] = useState(20)
 * useTimer(3000, 1000, () => {
 *   // do action
 *   setCountDown(c => c - 1)
 * }, countDown > 0)
 */
export function useTimer(initialDelay: number, delay: number, onInterval: () => void, enable: boolean = true) {
  const [timeoutId, setTimeoutId] = useState(0)
  const [intervalId, setIntervalId] = useState(0)

  function resetTimout() {
    setTimeoutId(t => {
      if (t > 0) {
        clearTimeout(t)
        return 0
      }
      return t
    })
  }

  function resetInterval() {
    setIntervalId(t => {
      if (t > 0) {
        clearInterval(t)
        return 0
      }
      return t
    })
  }

  useEffect(() => {
    if (enable) {
      console.log('useTimer.enable')
      if (initialDelay > 0) {
        resetTimout()
        //# turn on timeout
        const newTimeoutId = setTimeout(() => {
          //# turn on intervale
          if (delay > 0) {
            resetInterval()
            const newIntervalId = setInterval(onInterval, delay)
            setIntervalId(newIntervalId)
          }

          // first invoke callback
          onInterval()
        }, initialDelay);

        setTimeoutId(newTimeoutId);
      }
    }
    else {
      resetTimout()
      resetInterval()
    }

    return () => {
      resetTimout()
      resetInterval()
    }
  }, [enable]);
}


//=============================================================================
/** 測量一個 DOM node
 * 參考：[我該如何測量一個 DOM node](https://zh-hant.reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node)
 */
export function useClientRect(): [DOMRect, (node: any) => void] {
  const [rect, setRect] = useState<DOMRect>()
  const [f_resize, setResizeFlag] = useState(true)

  const ref = useCallback(node => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, [f_resize]);

  useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, []) // 等同 componentDidMount

  function handleResize() {
    setResizeFlag(f => !f)
  }

  return [rect as DOMRect, ref];
}
//=============================================================================