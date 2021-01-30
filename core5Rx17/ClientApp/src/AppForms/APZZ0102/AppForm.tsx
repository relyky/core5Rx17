import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Switch, FormControlLabel, Divider } from '@material-ui/core'
import { FormControl, FormLabel, RadioGroup, Radio, IconButton } from '@material-ui/core'
import { Card, CardHeader, CardContent, Avatar, Typography, CardActions } from '@material-ui/core'
import { AgreeButton, ButtonEx, CommandButton } from 'Widgets/ButtonEx'
import { ProgressBar } from 'Widgets/ProgressEx'
import { toast } from 'Widgets/toast'
import {
  MoreVert as MoreVertIcon
} from '@material-ui/icons'

// hooks
import { useLocalStorageV2 } from 'hooks/useWindowResource'
//import { showMsgBox } from 'common/LastErrMsg'
import { H2 } from 'Widgets/TypographyEx'
import { useMySwal } from 'hooks/useMySwal'


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function AppForm({ formProfile }: AppFormProps) {
  const classes = useStyles();
  const [f_disabled, setDisabledFlag] = useState(false)
  const [myTheme, setMyTheme] = useLocalStorageV2<string>('myTheme', 'defaultTheme')
  const {confirm} = useMySwal()

  console.log(`${formProfile.FORM_ID}.render`, formProfile)
  return (
    <div className={classes.root}>
      <h1>{`${formProfile.FORM_ID}:${formProfile.FORM_TITLE}`}</h1>
      <p>{`${formProfile.FORM_DESCRIPTION}`}</p>

      <FormControl component="fieldset">
        <FormLabel component="legend">切換 Theme</FormLabel>
        <RadioGroup row name="myTheme" value={myTheme} onChange={e => setMyTheme(e.target.value)}>
          <FormControlLabel value="defaultTheme" control={<Radio />} label="defaultTheme" />
          <FormControlLabel value="asvtTheme" control={<Radio />} label="asvtTheme" />
        </RadioGroup>
      </FormControl>

      <Divider variant="middle" />

      <FormControlLabel label="disabled" control={
        <Switch checked={f_disabled}
          onChange={() => setDisabledFlag(!f_disabled)} />
      } />

      <ButtonEx label='預設為第一主色' disabled={f_disabled} onClick={() => console.log('第一主色')} />
      <ButtonEx label="第二主色" color="secondary" disabled={f_disabled} onClick={() => console.log('第二主色')} />
      <ButtonEx label="調色盤顏色 info" colorx="info" disabled={f_disabled} onClick={() => console.log('調色盤顏色 info')} />
      <ButtonEx label="調色盤顏色 success" colorx="success" disabled={f_disabled} onClick={() => console.log('調色盤顏色 success')} />
      <ButtonEx label="調色盤顏色 warning" colorx="warning" disabled={f_disabled} onClick={() => console.log('調色盤顏色 warning')} />
      <ButtonEx label="調色盤顏色 error" colorx="error" disabled={f_disabled} onClick={() => console.log('調色盤顏色 error')} />

      <ButtonEx label='大型空心按鈕' variant='outlined' size='large' disabled={f_disabled} onClick={() => confirm('大型按鈕')} />
      <ButtonEx label='中型空心按鈕' variant='outlined' disabled={f_disabled} onClick={() => confirm('小型按鈕')} />
      <ButtonEx label='小型空心按鈕' variant='outlined' size='small' disabled={f_disabled} onClick={() => confirm('小型按鈕')} />

      <Divider variant="middle" />
      <H2>為專案而生</H2>

      <AgreeButton label="我同意以下條款 並 開始身分驗證" disabled={f_disabled} onClick={() => confirm('全客制化按鈕')} />
      <CommandButton label="存檔" disabled={f_disabled} onClick={() => confirm('命令案鈕')} />
      <CommandButton label="回首頁" disabled={f_disabled} colorx="secondary" onClick={() => confirm('命令案鈕')} />

      <Divider variant="middle" />

      <ProgressBar value={35} />

      <br />
      <ButtonEx label='show all toast' onClick={() => {
        toast.info("訊息 Wow so easy ! (info)");
        toast.success("成功 Wow so easy ! (success)");
        toast.error("錯誤 Wow so easy ! (error)");
        toast.warning("警告 Wow so easy ! (warning)");
      }} />
      <ButtonEx label='show 1 toast' onClick={() => {
        toast.info("訊息 Wow so easy ! (info)");
      }} />

      <Typography variant='h1'>h1:今天天氣真好 Show Me the Money</Typography>
      <Typography variant='h2'>h2:今天天氣真好 Show Me the Money</Typography>
      <Typography variant='h3'>h3:今天天氣真好 Show Me the Money</Typography>
      <Typography variant='h4'>h4:今天天氣真好 Show Me the Money</Typography>
      <Typography variant='h5'>h5:今天天氣真好 Show Me the Money</Typography>
      <Typography variant='h6'>h6:今天天氣真好 Show Me the Money</Typography>
      <Typography variant='subtitle1'>subtitle1: 今天天氣真好 Show Me the Money 12345678.90</Typography>
      <Typography variant='subtitle2'>subtitle2: 今天天氣真好 Show Me the Money 12345678.90</Typography>
      <Typography variant='body1'>body1: 今天天氣真好 Show Me the Money 12,345,678.90</Typography>
      <Typography variant='body2'>body2: 今天天氣真好 Show Me the Money 12,345,678.90</Typography>
      <Typography variant='button'>button: 今天天氣真好 Show Me the Money 12,345,678.90</Typography>
      <Typography variant='caption'>caption: 今天天氣真好 Show Me the Money 12,345,678.90</Typography>
      <Typography variant='overline'>overline: 今天天氣真好 Show Me the Money 12,345,678.90</Typography>

      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe">R</Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            This impressive paella is a perfect party dish and a fun meal to cook together with your
            guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <ButtonEx color='primary' label="Command1" onClick={() => { }} />
          <ButtonEx color='primary' label="Command2" onClick={() => { }} />
        </CardActions>


        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            This impressive paella is a perfect party dish and a fun meal to cook together with your
            guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <ButtonEx color='primary' label="Command1" onClick={() => { }} />
          <ButtonEx color='primary' label="Command2" onClick={() => { }} />
        </CardActions>

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            This impressive paella is a perfect party dish and a fun meal to cook together with your
            guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <ButtonEx color='primary' label="Command1" onClick={() => { }} />
          <ButtonEx color='primary' label="Command2" onClick={() => { }} />
        </CardActions>

      </Card>

    </div>
  )
}
