import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Container, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup } from '@material-ui/core'
//import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { LabelSwitch } from 'FormCtrl/all'
import {
  Check as BlankIcon,
  Check as CheckedIcon
} from '@material-ui/icons'
import { H4, H5, H6, Subtitle2 } from 'Widgets/TypographyEx'
import { CustomSlider, PrettoSlider } from './PrettoSlider'
import { useStoreActions, useTypedSelector } from 'store/store'

const useStyles = makeStyles((theme) => ({
  root: {
  },
}));

export default function AppForm({ formProfile }: AppFormProps) {
  const classes = useStyles();
  const [f_collapse, setCollapseFlag] = useState(true)
  const [f_fade, setFadeFlag] = useState(true)
  const [f_grow, setGrowFlag] = useState(true)
  const [f_slide, setSlideFlag] = useState(true)
  const [f_zoom, setZoomFlag] = useState(true)

  const { formData } = useTypedSelector(store => store)
  const { assignValue } = useStoreActions()
  const [q2Answer, setQ2Answer] = useState('')


  console.log(`${formProfile.FORM_ID}.render`, formProfile)
  return (
    <div className={classes.root}>
      <h1>{`${formProfile.FORM_ID}:${formProfile.FORM_TITLE}`}</h1>
      <p>{`${formProfile.FORM_DESCRIPTION}`}</p>

      <FormContainer>
        <Box>
          <LabelSwitch checked={f_zoom} label='Zoom' onChange={v => setZoomFlag(v.value as boolean)} />
          <LabelSwitch checked={f_grow} label='Grow' onChange={v => setGrowFlag(v.value as boolean)} />
          <LabelSwitch checked={f_fade} label='Fade' onChange={v => setFadeFlag(v.value as boolean)} />
          <LabelSwitch checked={f_slide} label='Slide' onChange={v => setSlideFlag(v.value as boolean)} />
          <LabelSwitch checked={f_collapse} label='Collapse' onChange={v => setCollapseFlag(v.value as boolean)} />
        </Box>

        <Box display="flex" flexDirection="column" >

          <H4>您對於今日用餐的滿意程度：</H4>

          <Box display="flex" flexWrap="nowrap" flexDirection="row" >
            <LabelBox><Subtitle2>非常滿意</Subtitle2></LabelBox>
            <LabelBox><Subtitle2>滿意</Subtitle2></LabelBox>
            <LabelBox><Subtitle2>普通</Subtitle2></LabelBox>
            <LabelBox><Subtitle2>不滿意</Subtitle2></LabelBox>
            <LabelBox><Subtitle2>非常不滿意</Subtitle2></LabelBox>
          </Box>

          <H5>整體</H5>
          <RankRadioGroup
            name="q1answer"
            value={formData.q1answer}
            onChange={assignValue}
          />

          <H5>環境</H5>
          <RankRadioGroup
            name="q1answer"
            value={formData.q1answer}
            onChange={assignValue}
          />

          <H5>餐點</H5>
          <RankRadioGroup
            name="q1answer"
            value={formData.q1answer}
            onChange={assignValue}
          />

          <H5>價位</H5>
          <RankRadioGroup
            name="q1answer"
            value={formData.q1answer}
            onChange={assignValue}
          />

          <CustomSlider
            name='myslider' 
            value={formData.myslider || 3}
            onChange={assignValue}
          />

          <PrettoSlider
            min={0}
            max={10}
            step={1}
            defaultValue={5}
            valueLabelDisplay="auto"
            marks
            style={{ width: 'calc(100% - 100px)' }}
          />

          <FormControl component="fieldset" >
            <RadioGroup
              name="q2Answer"
              value={q2Answer}
              onChange={(event, value) => setQ2Answer(value)}
              row
            >
              <FormControlLabel value="A" control={<Radio />} label="A" />
              <FormControlLabel value="B" control={<Radio />} label="B" />
              <FormControlLabel value="C" control={<Radio />} label="C" />
              <FormControlLabel value="D" control={<Radio />} label="D" />
              <FormControlLabel value="E" control={<Radio />} label="E" />
            </RadioGroup>
          </FormControl>


        </Box>
      </FormContainer>

    </div>
  )
}

//------------------------------------------------------------
const FormContainer = withStyles(theme => ({
  root: {
    maxWidth: 800,
    borderLeft: 'solid thin',
    borderRight: 'solid thin',
  }
}))(Container)
//------------------------------------------------------------
const FormPaper = withStyles(theme => ({
  root: {
    margin: theme.spacing(0.5),
    width: theme.spacing(8),
    height: theme.spacing(8),
  }
}))(Paper)
//------------------------------------------------------------
const ItemBox = withStyles(theme => ({
  root: {
    flexBasis: '20%',
    flexGrow: 1,
    margin: theme.spacing(0.5),
    border: 'solid thin',
    textAlign: 'center'
  }
}))(Box)
//------------------------------------------------------------
const LabelBox = withStyles(({ spacing }) => ({
  root: {
    flexBasis: '20%',
    flexGrow: 1,
    margin: spacing(0.5, 0),
    padding: spacing(0.5, 0),
    borderBottom: 'outset thin',
    textAlign: 'center',
  }
}))(Box)
//------------------------------------------------------------
const RankRadioGroup = (props: {
  name: string,
  value: string,
  onChange: ValueChangeHandler
}) => {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) {
    if (checked) {
      props.onChange({
        name: props.name,
        value: event.target.value
      })
    }
  }

  return (
    <Box display="flex" flexWrap="nowrap" flexDirection="row" >
      <ItemBox><Radio icon={<BlankIcon />} checkedIcon={<CheckedIcon />} onChange={handleChange} value='非常滿意' checked={props.value == '非常滿意'} /></ItemBox>
      <ItemBox><Radio icon={<BlankIcon />} checkedIcon={<CheckedIcon />} onChange={handleChange} value='滿意' checked={props.value == '滿意'} /></ItemBox>
      <ItemBox><Radio icon={<BlankIcon />} checkedIcon={<CheckedIcon />} onChange={handleChange} value='普通' checked={props.value == '普通'} /></ItemBox>
      <ItemBox><Radio icon={<BlankIcon />} checkedIcon={<CheckedIcon />} onChange={handleChange} value='不滿意' checked={props.value == '不滿意'} /></ItemBox>
      <ItemBox><Radio icon={<BlankIcon />} checkedIcon={<CheckedIcon />} onChange={handleChange} value='非常不滿意' checked={props.value == '非常不滿意'} /></ItemBox>
    </Box>
  )
}