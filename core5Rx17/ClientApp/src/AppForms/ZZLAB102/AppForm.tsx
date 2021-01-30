import React, { useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
//import { useInit, postEvent } from 'hooks/useHttp'
//import { LastErrMsg, showMsgBox } from 'common/LastErrMsg'
import { Avatar, Box, Button, Card, CardContent, CardHeader, CardActions, FormControlLabel, IconButton, Switch, withStyles } from '@material-ui/core'
import { H1, H4, H5, P1, P2 } from 'Widgets/TypographyEx'
import { FormProvider, FieldSet, TextField } from 'FormCtrl/all';
import { CommandButton, ScrollTopFab } from 'Widgets/ButtonEx'
import { useMySwal } from 'hooks/useMySwal'
import EnhancedTable from './EnhancedTable'
import DataTable from './DataTable'

import {
  ExpandMore as ExpandMoreIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  MoreVert as MoreVertIcon
} from '@material-ui/icons';

export default function AppForm({ formProfile }: AppFormProps) {
  const classes = useStyles();
  const [f_expanded, setExpandedFlag] = React.useState(false);
  const [f_dense, setDenseFlag] = React.useState(false);
  const { confirm } = useMySwal()

  const rows = [
    { id: 1, lastName: 'SnowX', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 10, lastName: 'Foo', firstName: null, age: 150 },
    { id: 11, lastName: 'Bar', firstName: 'Ferrara', age: 44 },
    { id: 12, lastName: 'Bzr', firstName: 'Rossini', age: 36 },
    { id: 13, lastName: 'Qoo', firstName: 'Harvey', age: 65 },
  ];

  function handleSelect(item: IndexObject, index: number) {
    console.log('handleSelect', { item, index })
  }

  const fullNameValueFormatter = (item: IndexObject, index: number) => {
    return `${item['firstName']} ${item['lastName']}`
  }

  console.log(`${formProfile.FORM_ID}.render`, formProfile)
  return (
    <FormProvider readOnly={false} disabled={false}>
      <RootBox className={classes.root}>
        <H1>{formProfile.FORM_TITLE}</H1>
        <P1>{formProfile.FORM_DESCRIPTION}</P1>

        <MainCard>
          <MainCardHeader
            avatar={<Avatar>Asvt</Avatar>}
            title={<H4>查詢清單</H4>}
            subheader="查詢清單畫面。"
            action={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            } />

          <CardActions>
            <FormControlLabel label="dense" labelPlacement="start"
              control={<Switch checked={f_dense} onChange={() => setDenseFlag(f => !f)} />}
            />
          </CardActions>

          <CardContent>
            <DataTable dataList={rows} dense={f_dense} onSelect={handleSelect}
              fieldDef={[
                { name: 'id', label: 'ID', align: 'center' },
                { name: 'firstName', label: 'First name' },
                { name: 'lastName', label: 'Last name' },
                { name: 'age', label: 'Age', align: 'right' },
                { name: 'fullName', label: 'Full Name', formatter: item => `${item['firstName']} ${item['lastName']}` }
              ]} />
          </CardContent>

          <CardContent>
            <DataTable dataList={rows} dense={f_dense} pageSize={5} onSelect={handleSelect}
              fieldDef={[
                { name: 'id', label: 'ID', align: 'center' },
                { name: 'firstName', label: 'First name' },
                { name: 'lastName', label: 'Last name' },
                { name: 'age', label: 'Age', align: 'right' },
                { name: 'fullName', label: 'Full Name', formatter: item => `${item['firstName']} ${item['lastName']}` }
              ]} />
          </CardContent>

          <CardContent>
            <EnhancedTable />
          </CardContent>

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

          <CardContent>
            <P2 colorx="warning">若輸入錯誤達三次，將無法完成本驗證，請謹慎填寫，另請確認您的行動電話為正常使用狀態，簡訊容量是否足夠。</P2>
          </CardContent>

        </MainCard>
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

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}

const dataList = [
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Donut', 452, 25.0, 51, 4.9),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Honeycomb', 408, 3.2, 87, 6.5),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Jelly Bean', 375, 0.0, 94, 0.0),
  createData('KitKat', 518, 26.0, 65, 7.0),
  createData('Lollipop', 392, 0.2, 98, 0.0),
  createData('Marshmallow', 318, 0, 81, 2.0),
  createData('Nougat', 360, 19.0, 9, 37.0),
  createData('Oreo', 437, 18.0, 63, 4.0),
];

//-------------------------------------------------------------------

