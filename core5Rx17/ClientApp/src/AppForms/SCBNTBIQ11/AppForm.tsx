import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/core/styles'
//import { useInit, postEvent } from 'hooks/useHttp'
import { useMediaQuery, Card, CardContent, CardHeader, Divider, Paper, Link, Box } from '@material-ui/core'
//import { LastErrMsg, showMsgBox } from 'common/LastErrMsg'
//import { Form, TextField } from 'FormDataControls/all'
import { H1, H6, P1, P2 } from 'Widgets/TypographyEx'
import OtpInput from "react-otp-input"
import { useTimer } from 'hooks/useWindowResource'

export default function AppForm({ formProfile }: AppFormProps) {
  const classes = useStyles();
  const history = useHistory()
  const theme = useTheme();
  const matchXs = useMediaQuery(theme.breakpoints.down('xs'))
  const [countDown, setCountDown] = useState(60)
  const [otp, setOtp] = useState('')

  useTimer(2000, 1000, () => {
    setCountDown(c => c > 0 ? c - 1 : 0)
  }, countDown > 0)

  useEffect(() => {
    if (otp === '123456')
      history.push('/scbntbiq21')
  }, [otp])

  //console.log(`${formProfile.FORM_ID}.render`, formProfile)
  return (
    <Box className={classes.root}>
      <H1>{formProfile.FORM_TITLE}</H1>
      <P1>{formProfile.FORM_DESCRIPTION}</P1>

      <Card className={classes.mainwell}>
        <CardHeader title="請輸入簡訊驗證碼" subheader="請輸入簡訊驗證碼 " />
        <Divider variant="middle" />
        <CardContent>
          <P1>我們將寄送簡訊驗證碼至<span className={classes.lightfont}>0900-125-***</span></P1>
        </CardContent>
        <CardContent>
          <Box className={classes.well}>
            <P1>網頁識別碼 <span className={classes.lightfont2}>8304</span></P1>
          </Box>
          <Box className={classes.well}>
            <H6>簡訊密碼</H6>
            <OtpInput
              value={otp}
              onChange={setOtp}
              isInputSecure={false}
              numInputs={6}
              containerStyle={{ justifyContent: matchXs ? 'flex-start' : 'center' }}
              inputStyle={{ width: '1.8rem', height: '2.6rem', fontSize: '1.5rem', margin: '0.125em', border: 'solid 1px', padding: 0 }}
              isInputNum={true}
            />
          </Box>
          <P1>請於 {countDown} 秒內輸入6位數密碼。 <Link className={classes.sendotp}>重新傳送驗證碼</Link></P1>
        </CardContent>
        <CardContent>
          <P2 colorx="warning">若輸入錯誤達三次，將無法完成本驗證，請謹慎填寫，另請確認您的行動電話為正常使用狀態，簡訊容量是否足夠。</P2>
        </CardContent>
      </Card>
    </Box>
  )
}
//------------------------------------------------------------
const useStyles = makeStyles(theme => {
  const { palette } = theme
  return {
    root: {
      marginTop: '3vmin',
      marginBottom: '3vmin'
    },
    mainwell: {
      margin: theme.spacing(1),
      padding: theme.spacing(1)
    },
    lightfont: {
      color: palette.info.main,
      fontWeight: "bold",
      whiteSpace: 'nowrap'
    },
    lightfont2: {
      color: palette.info.main,
      fontWeight: "bold",
      whiteSpace: 'nowrap',
      fontSize: '1.25rem'
    },
    well: {
      padding: '0.5em 0.5em',
      margin: '0.5em 0.5em',
      backgroundColor: palette.grey[100]
    },
    sendotp: {
      whiteSpace: 'nowrap',
      color: palette.success.main
    }
  }
});
//------------------------------------------------------------

