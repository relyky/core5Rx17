import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Divider, Paper, Grid, Container, Typography, Button } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTimer } from 'hooks/useWindowResource'
//import { LastErrMsg, showMsgBox } from 'common/LastErrMsg'
import OtpInput from "react-otp-input"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  //logo: {
  //  display: 'block',
  //  marginLeft: 'auto',
  //  marginRight: 'auto',
  //  marginBottom: 30
  //},
  //title: {
  //  textAlign: 'center'
  //},
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.primary,
  },
  /////
  //card: {
  //  display: 'flex',
  //  flexDirection: 'row'
  //},
  //card_midia: {
  //  height: 140,
  //  width: 140,
  //  objectFit: 'contain'
  //},
  //card_content: {
  //},
  /////
  form: {
    margin: '2em'
  },
  //form_input: {
  //  width: '100%'
  //},
  //form_command: {

  //},
}));

export default function AppForm({ formProfile }: AppFormProps) {
  const classes = useStyles();
  const matchWidth600 = useMediaQuery('(min-width:600px)');

  const [f_note, setNoteFlag] = useState(false)
  const [countDown, setCountDown] = useState(60)
  const [otp, setOtp] = useState('')

  useTimer(2000, 1000, () => {
    if (countDown > 0)
      setCountDown((c) => c - 1)
  }, countDown > 0)

  console.log(`${formProfile.FORM_ID}.render`, formProfile)
  return (
    <div className={classes.root}>
      <h1>{`${formProfile.FORM_ID}:${formProfile.FORM_TITLE}`}</h1>
      <p>{`${formProfile.FORM_DESCRIPTION}`}</p>
      <Divider />

      <Container fixed>
        <header>
          <Typography variant='h2' component='h2'>
            簡訊驗證
          </Typography>
        </header>

        <section /* content:BEGIN */>

          <Paper className={classes.paper}>
            <Typography variant='h3' component='h3'>
              請輸入簡訊驗證碼
            </Typography>
            <Divider variant="middle" />

            <Typography variant='body1' color='textPrimary' >
              你現為本行客戶<br />
              我們將寄送簡訊驗證碼至 <span style={{ color: 'blue', fontWeight: 800 }}>{`${'098*****21'}`}</span>
            </Typography>

            <Typography variant='body1' color='textPrimary' >
              網頁識別碼 <span style={{ fontSize: '1.25rem', color: 'blue', fontWeight: 800 }}>{`${'4250'}`}</span>
            </Typography>

            <form className={classes.form} noValidate autoComplete="off">
              <Typography variant='h6' component='h6' >
                簡訊密碼
              </Typography>
              <Grid container spacing={1} >
                <Grid item xs={12} >

                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    isInputSecure={false}
                    numInputs={6}
                    separator={<span>-</span>}
                    containerStyle={{ justifyContent: matchWidth600 ? 'flex-start' : 'center' }}
                    inputStyle={{ width: '1.8rem', height: '2.4rem', fontSize: '1.25rem', margin: '0.25em', border:'solid 2px', borderRadius:8 }}
                  />

                </Grid>
              </Grid>
            </form>

            <Typography variant='body1' color='textPrimary' >
              {`請於${countDown} 秒內輸入6位數密碼。`}<br />
              <Button variant="text" color="primary" href="#outlined-buttons">
                重新傳送驗證碼
              </Button>
            </Typography>

            <Typography variant='body2' color='textSecondary' >
              若輸入錯誤達三次，將無法完成本驗證，請謹慎填寫，另請確認您的行動電話為正常使用狀態，簡訊容量是否足夠。
            </Typography>
          </Paper>

        </section /* content:END */>

      </Container>



    </div>
  )
}

///----------------------------

function MySection(props: { title: string }) {
  return (
    <section>
      <div>{props.title}</div>
    </section>
  )
}
