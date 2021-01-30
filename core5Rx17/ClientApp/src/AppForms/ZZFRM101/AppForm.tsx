import React, { useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
//import { useInit, postEvent } from 'hooks/useHttp'
//import { LastErrMsg, showMsgBox } from 'common/LastErrMsg'
import { Avatar, Box, Button, Card, CardContent, CardHeader, Collapse, IconButton, withStyles } from '@material-ui/core'
import { Blockquote, H1, H4, H5, H6, P1, P2, Subtitle1, Subtitle2 } from 'Widgets/TypographyEx'
import { FormProvider, FieldSet, TextField } from 'FormCtrl/all';
import CardActions from '@material-ui/core/CardActions/CardActions';
import { CommandButton } from 'Widgets/ButtonEx'
import swal, { useMySwal } from 'hooks/useMySwal'
import {
  ExpandMore as ExpandMoreIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  MoreVert as MoreVertIcon
} from '@material-ui/icons'

import SelectField from 'FormCtrl/SelectFieldBase'

export default function AppForm({ formProfile }: AppFormProps) {
  const classes = useStyles();
  const [f_expanded, setExpandedFlag] = React.useState(false);
  const [f_more, setMoreFlag] = React.useState(false);
  const { confirm } = useMySwal()

  //const [value, setValue] = useState<LabelValue | null>(null)
  const [value, setValue] = useState<string>('')

  console.log(`${formProfile.FORM_ID}.render`, formProfile)
  return (
    <FormProvider readOnly={false} disabled={false}>
      <RootBox className={classes.root}>
        <H1>{formProfile.FORM_TITLE}</H1>
        <P1>{formProfile.FORM_DESCRIPTION}</P1>
        <MainCard>
          <MainCardHeader
            avatar={<Avatar>Asvt</Avatar>}
            title={<H4>請輸入簡訊驗證碼</H4>}
            subheader="請輸入簡訊驗證碼 "
            action={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            } />
          <CardContent>
            <FieldSet row>
              <TextField name="fieldValue1" label="欄位名稱１" />

              {/* <SelectField
                name="selectField1"
                label="Test 1"
                variant="outlined"
                optionList={optionList}
                value={value}
                onChange={v => setValue(v.value as string)}
              /> */}

              <SelectField
                name="selectField1"
                group="mygroup"
                label="Test 1"
                optionList={optionList}
              />

              <SelectField
                name="selectField1"
                group="mygroup"
                label="Test 2"
                optionList={optionList}
                disabled
                readOnly
              />

              {/* <SelectField
                name="selectValue1"
                label="Select Value 1"
                optionList={optionList}
              /> */}

              <TextField name="fieldValue2" label="欄位名稱２" />
              <TextField name="fieldValue3" label="欄位名稱３" />
              <TextField name="fieldValue4" label="欄位名稱４" />
              <TextField name="fieldValue5" label="欄位名稱５" />
              <TextField name="fieldValue6" label="欄位名稱６" />
            </FieldSet>

            <FieldSet row>
              <TextField name="fieldValue7" label="欄位名稱７" layout="item122" />
              <TextField name="fieldValue8" label="欄位名稱８" layout="item122" />
              <TextField name="fieldValue9" label="欄位名稱９" layout="fullrow" />
              <TextField name="fieldValueA" label="欄位名稱Ａ" />
              <TextField name="fieldValueB" label="欄位名稱Ｂ" />
            </FieldSet>

            <Collapse in={f_more} timeout="auto" unmountOnExit>
              <FieldSet row>
                <TextField name="fieldValue1" label="欄位名稱１" group="myGroup2" />
                <TextField name="fieldValue2" label="欄位名稱２" group="myGroup2" />
                <TextField name="fieldValue3" label="欄位名稱３" group="myGroup2" />
                <TextField name="fieldValue4" label="欄位名稱４" group="myGroup2" />
                <TextField name="fieldValue5" label="通訊地址" group="myGroup2" layout="fullrow" />
                <TextField name="fieldValue6" label="戶籍地址" group="myGroup2" layout="fullrow" />
                <TextField name="fieldValue7" label="欄位名稱７" group="myGroup2" />
              </FieldSet>
            </Collapse>
            <Button fullWidth color="secondary" onClick={() => setMoreFlag(f => !f)}
              startIcon={f_more ? <RemoveIcon /> : <AddIcon />}>
              {f_more ? `收合選填欄位` : `選填欄位`}
            </Button>

          </CardContent>

          <CardActions disableSpacing={true}>
            <H5 onClick={() => setExpandedFlag(f => !f)}>
              <ExpandIconButton expanded={f_expanded} />
              資料段落二
            </H5>
            <ExpandIconButton expanded={f_expanded}
              onClick={() => setExpandedFlag(f => !f)} />
          </CardActions>
          <Collapse in={f_expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <FieldSet row>
                <TextField name="fieldValue1" label="欄位名稱１" group="myGroup2" />
                <TextField name="fieldValue2" label="欄位名稱２" group="myGroup2" />
                <TextField name="fieldValue3" label="欄位名稱３" group="myGroup2" />
                <TextField name="fieldValue4" label="欄位名稱４" group="myGroup2" />
                <TextField name="fieldValue5" label="通訊地址" group="myGroup2" layout="fullrow" />
                <TextField name="fieldValue6" label="戶籍地址" group="myGroup2" layout="fullrow" />
                <TextField name="fieldValue7" label="欄位名稱７" group="myGroup2" />
              </FieldSet>
            </CardContent>
          </Collapse>

          <CardContent>
            <Blockquote>
              <Subtitle1 color="primary" >謹慎理財 信用至上</Subtitle1>
              <P1>若輸入錯誤達三次，將無法完成本驗證，請謹慎填寫，另請確認您的行動電話為正常使用狀態，簡訊容量是否足夠。</P1>
            </Blockquote>
            <Blockquote >
              <Subtitle2 color="primary" >謹慎理財 信用至上</Subtitle2>
              <P2>若輸入錯誤達三次，將無法完成本驗證，請謹慎填寫，另請確認您的行動電話為正常使用狀態，簡訊容量是否足夠。</P2>
            </Blockquote>
            <Blockquote colorx="warning" >
              <H6 color="primary" >謹慎理財 信用至上</H6>
              <P2 colorx="warning">若輸入錯誤達三次，將無法完成本驗證，請謹慎填寫，另請確認您的行動電話為正常使用狀態，簡訊容量是否足夠。</P2>
            </Blockquote>
          </CardContent>

        </MainCard>

        <Subtitle2>[ 謹慎理財 信用至上 ]</Subtitle2>
        <P2>一般消費及預借現金循環利率為 7.9%~15%，循環利率之基準日為 2020年8月2日，預借現金手續費為預借金額 X 3.5% + NT$100， 其他費用請上渣打網站查詢</P2>

        <Box textAlign="center">
          <CommandButton label="確認" onClick={() => confirm('確認')} />
          <CommandButton colorx="secondary" label="回首頁" onClick={() => confirm("回首頁")} />
        </Box>
      </RootBox>
    </FormProvider>
  )
}
//-------------------------------------------------------------------
const useStyles = makeStyles(({ palette, spacing, transitions }) => ({
  root: {
    '& > *': {
      margin: spacing(1),
    },
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: transitions.create('transform', {
      duration: transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}))
//-------------------------------------------------------------------
const RootBox = withStyles(() => ({
  root: {
    marginTop: '3vmin',
    marginBottom: '3vmin'
  }
}))(Box);

const MainCard = withStyles(({ spacing, breakpoints }) => ({
  root: {
    margin: spacing(1),
    padding: spacing(1)
  }
}))(Card);

const MainCardHeader = withStyles(({ palette }) => ({
  root: {
    borderBottom: 'solid thin',
    borderBottomColor: palette.grey[200]
  }
}))(CardHeader);

//-------------------------------------------------------------------
const useExpandIconButtonStyles = makeStyles(({ transitions }) => ({
  expand: {
    transform: 'rotate(270deg)',
    marginLeft: 'auto',
    transition: transitions.create('transform', {
      duration: transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(0deg)',
  },
}))

const ExpandIconButton: React.FC<{
  expanded: boolean,
  onClick?: () => void
}> = props => {
  const classes = useExpandIconButtonStyles()
  console.log('CheckedIconButton', { props, classes })
  return (
    <IconButton
      className={clsx(classes.expand, {
        [classes.expandOpen]: props.expanded,
      })}
      onClick={props.onClick}
    >
      <ExpandMoreIcon />
    </IconButton>
  )
}

//-------------------------------------------------------------------

//============================================================
const optionList: LabelValue[] = Array.from(Array(100)).map((__, i) => ({
  value: `${101 + i}`,
  label: `我是項目${101 + i}的名稱`
}))