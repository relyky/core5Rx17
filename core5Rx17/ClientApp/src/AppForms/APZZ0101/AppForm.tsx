import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useInit, postEvent } from 'hooks/useHttp'
import { useMySwal } from 'hooks/useMySwal';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function AppForm({ formProfile }: AppFormProps) {
  const classes = useStyles();
  const [weatherForecast] = useInit('api/Echo/WeatherForecast')
  const { showMsgBox } = useMySwal()

  function handlePostEvent() {
    postEvent('api/Echo/TestLastErrMsg').then(resp => {
      console.log('TestLastErrMsg', resp.data)
      const msg = resp.data;

      showMsgBox(msg)
    })
  }

  function handleTestLastErrMsg() {
    const msg: ErrMsg = {
      errType: 'ERROR',
      errMsg: '測試訊息。',
      errDtm: new Date(),
      errClass: "YourClass",
      errMsgDetailList: {
        ['1']: 'FOOOOO',
        ['2']: 'BARBAR吧吧吧',
        ['3']: '12345678'
      }
    }

    showMsgBox(msg)
  }

  console.log(`${formProfile.FORM_ID}.render`, formProfile)
  return (
    <div className={classes.root}>
      <h1>{`${formProfile.FORM_ID}:${formProfile.FORM_TITLE}`}</h1>
      <p>{`${formProfile.FORM_DESCRIPTION}`}</p>

      <Counter />

      <button onClick={handlePostEvent}>post event</button>
      <button onClick={handleTestLastErrMsg}>test lastErrMsg</button>

      <h2>模擬天氣預報</h2>
      <pre>
        {JSON.stringify(weatherForecast, null, '  ')}
      </pre>

    </div>
  )
}

//-----------------------------------------
function Counter() {
  const [count, setCount] = useState(0)
  const [echo, setEcho] = useState('none')

  function handleEcho() {
    fetch('api/Echo/Knock')
      .then(resp => resp.json())
      .then(data => {
        console.log('data', data)
        setEcho(data)
      })
  }

  return (
    <div>
      <p style={{ fontSize: '2em' }}>{count}</p>
      <button onClick={() => setCount(count + 1)}>累加</button>

      <button onClick={handleEcho}>Echo</button>
      <p>echo:{JSON.stringify(echo)}</p>

      <div className="alert">
        警告，我是alert。
      </div>
    </div>
  );
}

//-----------------------------------------



