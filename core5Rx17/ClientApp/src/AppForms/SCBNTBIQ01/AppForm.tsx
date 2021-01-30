import React from 'react'
import t from 'typy'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
//import { useInit, postEvent } from 'hooks/useHttp'
import { Card, CardContent, Link, CardActions, CardMedia } from '@material-ui/core'
import { LogoAndTitle } from 'Outlines/OutlineWidgets'
import { FormProvider, FieldSet, TextField } from 'FormCtrl/all'
import { AgreeButton, OneCommandButton /*, CancelButton, YesButton, NoButton */ } from 'Widgets/ButtonEx'
import { Subtitle1, P1 } from 'Widgets/TypographyEx'
import { useTypedSelector } from 'store/store'
import inquire3x from 'assets/images/picture/inquire__3x.png'
import { useMySwal } from 'hooks/useMySwal'

interface Step1Data {
  nid: string,
  birthDate: string
}

export default function AppForm({ formProfile }: AppFormProps) {
  const classes = useStyles()
  const history = useHistory()
  const {confirm} = useMySwal()

  const step1:Step1Data = useTypedSelector(store => store.formData['step1'] || {})

  function handleNext() {
    let errMsg = ''
    if (!t(step1.nid).isString || t(step1.nid).isEmptyString)
      errMsg = errMsg.concat(`身份證字號未輸入！`)

    if (!t(step1.birthDate).isString || t(step1.birthDate).isEmptyString)
      errMsg = errMsg.concat(`出生日期未輸入！`)

    if (errMsg !== '') {
      confirm("格式錯誤", errMsg, "error")
      return
    }

    // go next
    history.push('/scbntbiq11') 
  }

  console.log(`${formProfile.FORM_ID}.render`, formProfile, step1)
  return (
    <FormProvider layout='item122'>
    <Card className={classes.root}>
      <CardContent>
        <LogoAndTitle title='信用卡申請進度查詢' />
      </CardContent>
      <CardMedia
        component='img'
        className={classes.media}
        image={inquire3x}
        title="credit card"
      />
      <CardContent>
        <FieldSet row layout='item122'>
          <TextField name='nid' label='身份證字號' group='step1' placeholder="A123456789" />
          <TextField name='birthDate' label='出生日期' group='step1' placeholder="YYYY/MM/DD"  />
        </FieldSet>
      </CardContent>
      <CardActions style={{ justifyContent:'center' }}>
        <AgreeButton label='我同意以下條款 並 開始身分驗證' onClick={handleNext} />
      </CardActions>
      <CardContent>
        <Subtitle1>告知事項及服務約定條款</Subtitle1>
        <ul>
          <li><P1><Link>渣打國際商業銀行線上申辦金融業務服務約定條款。</Link></P1></li>
          <li><P1 color='textSecondary'>渣打國際商業銀行線上申辦金融業務服務約定條款。</P1></li>
          <li><P1 className={classes.literm}>渣打國際商業銀行線上申辦金融業務服務約定條款。</P1></li>
        </ul>
      </CardContent>
    </Card>
    </FormProvider>
  )
}
//------------------------------------------------------------
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '3vmin',
    marginBottom: '3vmin'
  },
  media: {
    padding: '0 23vmin'
  },
  literm: {
    color: theme.palette.info.main
  }
}));
//------------------------------------------------------------

