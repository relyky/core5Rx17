import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
//import { useInit, postEvent } from 'hooks/useHttp'
//import { LastErrMsg, showMsgBox } from 'common/LastErrMsg'
import { Adam } from './StateEntities'
import { CountDown } from './CountDown'
import { toast } from 'Widgets/toast'

export default function AppForm({ formProfile }: AppFormProps) {
  const classes = useStyles();
  //const [weatherForecast] = useInit('api/Echo/WeatherForecast')

  useEffect(() => {
    // 接收 <CountDown /> 元件送出的訊息
    window.addEventListener('custom_countdown', handleCountDownEvnet)
    return () => window.removeEventListener('custom_countdown', handleCountDownEvnet)
  }, [])

  function handleCountDownEvnet() {
    //console.log('handleCustomCountDownEvnet', new Date())
    toast.info('倒數訊息');
  }

  console.log(`${formProfile.FORM_ID}.render`, formProfile)
  return (
    <div className={classes.root}>
      <h1>{`${formProfile.FORM_ID}:${formProfile.FORM_TITLE}`}</h1>
      <p>{`${formProfile.FORM_DESCRIPTION}`}</p>

      <CountDown />

      <Adam />

    </div>
  )
}

//-----------------------------------------
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));
