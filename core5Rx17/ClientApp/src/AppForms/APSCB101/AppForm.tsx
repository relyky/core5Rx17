import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles'
import { Divider, Paper, Grid, Container, Typography, Button, Link, Collapse } from '@material-ui/core'
import { Card, CardContent, CardMedia } from '@material-ui/core'
import { TextField } from '@material-ui/core'
//import { useInit, postEvent } from 'hooks/useHttp'
import logoImage from 'assets/scb/logo.png'
import creditCardImage from 'assets/scb/credit-card-2.jpg'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 30
  },
  title: {
    textAlign: 'center'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.primary,
  },
  ///
  card: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  card_midia: {
    height: 140,
    width: 140,
    objectFit: 'contain'
  },
  card_content: {
  },
  ///
  form: {
    margin: '2em'
  },
  form_input: {
    width: '100%'
  },
  form_command: {

  },
}));

export default function AppForm({ formProfile }: AppFormProps) {
  const history = useHistory();
  const classes = useStyles();
  const [f_note, setNoteFlag] = useState(false)

  function gotoNextStep() {
    history.push('/apscb102')
  }

  console.log(`${formProfile.FORM_ID}.render`, formProfile)
  return (
    <div className={classes.root}>
      <h1>{`${formProfile.FORM_ID}:${formProfile.FORM_TITLE}`}</h1>
      <p>{`${formProfile.FORM_DESCRIPTION}`}</p>
      <Divider />

      <Container fixed>

        <header>
          <img className={classes.logo} src={logoImage} alt="logo" />
          <h2 className={classes.title}>渣打信用卡線上申辦</h2>
        </header>

        <section /* content:BEGIN */>

          <Card className={classes.card}>
            <CardMedia className={classes.card_midia}
              component="img"
              alt="現金回饋御璽卡"
              image={creditCardImage} />
            <CardContent className={classes.card_content}>
              <Typography component="h5" variant="h5">
                現金回饋御璽卡
                </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                最大優惠6.88%現金回饋
                </Typography>
            </CardContent>
          </Card>

          <form className={classes.form} noValidate autoComplete="off">
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <TextField className={classes.form_input} label="身份證字號" variant="outlined" placeholder="請輸入身份證字號" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField className={classes.form_input} label="出生日期" variant="outlined" placeholder="(如民國72年1月1日，請輸入720101)" />
              </Grid>
              <Button variant="contained" color="primary" fullWidth size="large" onClick={gotoNextStep} >
                我同意以下條款 並 開始身份驗證
              </Button>
            </Grid>
          </form>

          <Paper className={classes.paper}>
            <Typography component="h5" variant="h5">
              告知事項及服務約定條款
            </Typography>
            <ul>
              <li><Link href='#'>渣打國際商業銀行個人資料蒐集、處理、利用告知事項</Link></li>
              <li><Link href='#'>線上申辦金融業務服務約定條款_我是動態的</Link></li>
              <li><Link href='#'>渣打信用卡合約條款</Link></li>
              <li><Link href='#'>信用卡聲明及注意事項</Link></li>
              <li><Link href='#'>OnlineCCPL 信用卡契約/電子月結單</Link></li>
            </ul>
          </Paper>

          <Paper className={classes.paper}>
            <Collapse in={f_note} collapsedHeight={80}>
              <Typography variant='body1' color='textPrimary'>
                本人同意渣打銀行得以本人與渣打銀行往來資料(例如原申請信用卡/貸款使用之財力證明、存款與基金等等)作為本次申請信用卡之財力證明文件，且同意渣打銀行援引最近一次業務往來所提供之個人資料作為本次申請使用。
              </Typography>
              <Typography variant='body2' color='textSecondary' >
                為維護您的權益，請詳細閱讀渣打國際商業銀行(簡稱「渣打銀行」或本行)之個人資料蒐集、處理、利用告知事項及線上申辦金融業務服務約定條款(合稱「個資告知事項與線上服務約定條款」) 及信用卡合約條款。點選「我同意以上條款並申請信用卡」即表示您已閱讀並同意本行依個資告知事項與線上服務約定條款蒐集、處理與利用您的各項資料進行確認、信用查詢、與您聯絡或提醒等信用卡申請相關各項事宜，若您於申請流程中未完成申請書資料填寫，後續亦將由專人依該等資料與您聯絡。
              </Typography>
            </Collapse>
            <Button variant="text" color="primary" fullWidth size="large" onClick={() => setNoteFlag(!f_note)}>
              {f_note ? `－收合部分` : `＋展開全部`}
            </Button>
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
