import React, { useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
//import { useInit, postEvent } from 'hooks/useHttp'
//import { LastErrMsg, showMsgBox } from 'common/LastErrMsg'
import { Avatar, Box, Button, Card, CardContent, CardHeader, CardActions, FormControlLabel, IconButton, Switch, withStyles, useMediaQuery, useTheme, ButtonProps } from '@material-ui/core'
import { H1, H4, H5, P1, P2, Subtitle1 } from 'Widgets/TypographyEx'
import { FormProvider, FieldSet, TextField } from 'FormCtrl/all';
import { ButtonEx } from 'Widgets/ButtonEx'
import { useMySwal } from 'hooks/useMySwal'
import DataTable from './DataTable'

import {
  ExpandMore as ExpandMoreIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  MoreVert as MoreVertIcon
} from '@material-ui/icons';

export default function AppForm({ formProfile }: AppFormProps) {
  const classes = useStyles();
  const { breakpoints } = useTheme()
  const matchXs = useMediaQuery(breakpoints.down('xs'))
  //const [f_dense, setDenseFlag] = React.useState(false);
  const { confirm } = useMySwal()

  // const columns: ColDef[] = [
  //   { field: 'id', headerName: 'ID', width: 70 },
  //   { field: 'firstName', headerName: 'First name', width: 130 },
  //   { field: 'lastName', headerName: 'Last name', width: 130 },
  //   {
  //     field: 'age',
  //     headerName: 'Age',
  //     type: 'number',
  //     width: 90,
  //   },
  //   {
  //     field: 'fullName',
  //     headerName: 'Full name',
  //     description: 'This column has a value getter and is not sortable.',
  //     sortable: false,
  //     width: 160,
  //     valueGetter: (params: ValueGetterParams) =>
  //       `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''
  //       }`,
  //   },
  // ];

  // 30天內打卡紀錄
  const dataList = [
    { itemSn: 1, workDate: '2020/11/16', workTime: '0900', offWorkDate: '2020/11/16', offWorkTime: '18:30' },
    { itemSn: 2, workDate: '2020/11/17', workTime: '0900', offWorkDate: '2020/11/17', offWorkTime: '18:30' },
    { itemSn: 3, workDate: '2020/11/18', workTime: '0900', offWorkDate: '2020/11/18', offWorkTime: '18:30' },
    { itemSn: 4, workDate: '2020/11/19', workTime: '0900', offWorkDate: '2020/11/19', offWorkTime: '18:30' },
    { itemSn: 5, workDate: '2020/11/20', workTime: '0900', offWorkDate: '2020/11/20', offWorkTime: '18:30' },
    { itemSn: 6, workDate: '2020/11/21', workTime: '0900', offWorkDate: '2020/11/21', offWorkTime: '18:30' },
    { itemSn: 7, workDate: '2020/11/22', workTime: '0900', offWorkDate: '2020/11/22', offWorkTime: '18:30' },
    { itemSn: 8, workDate: '2020/11/23', workTime: '0900', offWorkDate: '2020/11/23', offWorkTime: '18:30' },
    { itemSn: 9, workDate: '2020/11/24', workTime: '0900', offWorkDate: '2020/11/24', offWorkTime: '18:30' },
    { itemSn: 10, workDate: '2020/11/25', workTime: '0900', offWorkDate: '2020/11/25', offWorkTime: '18:30' },
    { itemSn: 11, workDate: '2020/11/26', workTime: '0900', offWorkDate: '2020/11/26', offWorkTime: '18:30' },
    { itemSn: 12, workDate: '2020/11/27', workTime: '0900', offWorkDate: '2020/11/27', offWorkTime: '18:30' },
    { itemSn: 13, workDate: '2020/11/28', workTime: '0900', offWorkDate: '2020/11/28', offWorkTime: '18:30' },
    { itemSn: 14, workDate: '2020/11/29', workTime: '0900', offWorkDate: '2020/11/29', offWorkTime: '18:30' },
    { itemSn: 15, workDate: '2020/11/30', workTime: '0900', offWorkDate: '2020/11/30', offWorkTime: '18:30' },
    { itemSn: 16, workDate: '2020/12/01', workTime: '0900', offWorkDate: '2020/12/01', offWorkTime: '18:30' },
    { itemSn: 17, workDate: '2020/12/02', workTime: '0900', offWorkDate: '2020/12/02', offWorkTime: '18:30' },
    { itemSn: 18, workDate: '2020/12/03', workTime: '0900', offWorkDate: '2020/12/03', offWorkTime: '18:30' },
    { itemSn: 19, workDate: '2020/12/04', workTime: '0900', offWorkDate: '2020/12/04', offWorkTime: '18:30' },
    { itemSn: 20, workDate: '2020/12/05', workTime: '0900', offWorkDate: '2020/12/05', offWorkTime: '18:30' },
    { itemSn: 21, workDate: '2020/12/06', workTime: '0900', offWorkDate: '2020/12/06', offWorkTime: '18:30' },
    { itemSn: 22, workDate: '2020/12/07', workTime: '0900', offWorkDate: '2020/12/07', offWorkTime: '18:30' },
    { itemSn: 23, workDate: '2020/12/08', workTime: '0900', offWorkDate: '2020/12/08', offWorkTime: '18:30' },
    { itemSn: 24, workDate: '2020/12/09', workTime: '0900', offWorkDate: '2020/12/09', offWorkTime: '18:30' },
    { itemSn: 25, workDate: '2020/12/10', workTime: '0900', offWorkDate: '2020/12/10', offWorkTime: '18:30' },
    { itemSn: 26, workDate: '2020/12/11', workTime: '0900', offWorkDate: '2020/12/11', offWorkTime: '18:30' },
    { itemSn: 27, workDate: '2020/12/12', workTime: '0900', offWorkDate: '2020/12/12', offWorkTime: '18:30' },
    { itemSn: 28, workDate: '2020/12/13', workTime: '0900', offWorkDate: '2020/12/13', offWorkTime: '18:30' },
    { itemSn: 29, workDate: '2020/12/14', workTime: '0900', offWorkDate: '2020/12/14', offWorkTime: '18:30' },
    { itemSn: 30, workDate: '2020/12/15', workTime: '0900', offWorkDate: '2020/12/15', offWorkTime: '18:30' },
  ];

  function handleSelect(item: IndexObject, index: number) {
    console.log('handleSelect', { item, index })
  }

  // const fullNameValueFormatter = (item: IndexObject, index: number) => {
  //   return `${item['firstName']} ${item['lastName']}`
  // }

  console.log(`${formProfile.FORM_ID}.render`, formProfile)
  return (
    <FormProvider readOnly={false} disabled={false}>
      <RootBox className={classes.root}>
        <H1>{formProfile.FORM_TITLE}</H1>
        <P1>{formProfile.FORM_DESCRIPTION}</P1>

        <MainCard>
          <MainCardHeader
            avatar={<Avatar>Asvt</Avatar>}
            title={<H4>打卡功能</H4>}
            action={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            } />

          <CardActions style={{ justifyContent: 'space-evenly' }} >
            <CustomButton variant='contained' color='primary' onClick={() => confirm('當天上班')} >
              <span style={{ whiteSpace: 'nowrap' }}>
                當天<br />上班
              </span><br />
            </CustomButton>
            <CustomButton variant='contained' color='primary' onClick={() => confirm('當天下班')} >
              <span style={{ whiteSpace: 'nowrap' }}>
                當天<br />下班
              </span><br />
            </CustomButton>
            <CustomButton variant='contained' color='secondary' onClick={() => confirm('跨夜下班')} >
              <span style={{ whiteSpace: 'nowrap' }}>
                跨夜<br />下班
              </span><br />
            </CustomButton>
            <CustomButton variant='contained' color='secondary' onClick={() => confirm('補打卡')} >
              <span style={{ whiteSpace: 'nowrap' }}>
                補打<br />卡
              </span><br />
            </CustomButton>
          </CardActions>

          <CardContent>
            <H4>30天內打卡紀錄</H4>
            <DataTable dataList={dataList} dense={matchXs} onSelect={handleSelect}
              fieldDef={matchXs ?
                [
                  { name: 'workDate', label: '上班日期', align: 'center' },
                  { name: 'workTime', label: '上班時間', align: 'center' },
                  { name: 'offWorkTime', label: '下班時間', align: 'center' }
                ] :
                [
                  { name: 'itemSn', label: '項目序號', align: 'center' },
                  { name: 'workDate', label: '上班日期', align: 'center' },
                  { name: 'workTime', label: '上班時間', align: 'center' },
                  { name: 'offWorkDate', label: '下班日期', align: 'center' },
                  { name: 'offWorkTime', label: '下班時間', align: 'center' }
                ]} />
          </CardContent>

        </MainCard>

        <Subtitle1>根據勞動基準法第32條規定：<br />
        According to Taiwan Labor Standards Law Article 32： </Subtitle1>
        <P1 colorx="warning" style={{ margin: '0.5em' }}>雇主延長勞工之工作時間連同正常工作時間，一日不得超過十二小時。延長之工作時間，一天不得超過四小時，一個月不得超過四十六小時。<br />
        The extension of working hours, combined with the regular working hours, shall not exceed twelve hours a day. The total number of overtime shall not exceed four hours a day and forty-six hours a month.</P1>

        <Subtitle1>請注意，若違反上述規定將致使貴單位及公司暴露於下列風險：<br />
        Noncompliance of the regulation may cause your department and the company exposure in following risks:</Subtitle1>
        <ol>
          <li><P1>引發主管機關的勞動檢查以及相關的罰款。<br />Trigger of labor inspection and penalty by authorities.</P1></li>
          <li><P1>影響公司的聲譽。<br />Impact on company reputation.</P1></li>
          <li><P1>影響員工工作及家庭健康均衡。<br />Affect the work/life balance of the employee.</P1></li>
        </ol>

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

const CustomButton = withStyles(() => ({
  root: {
    width: '18vmin',
    height: '18vmin',
    borderRadius: '9vmin',
    fontSize: '6vmin',
    lineHeight: '1em'
  }
}))(({ children, ...props }: ButtonProps) => (
  <Button {...props}>
    {children}
  </Button>
))

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
