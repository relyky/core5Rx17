import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { FormGroup, FormLabel, FormControl, FormControlLabel, RadioGroup, Radio, RadioProps, Box, Grid, RadioGroupProps, Checkbox } from '@material-ui/core';
import { fade } from '@material-ui/core/styles'
import { mapGridAttrs } from 'Widgets/mics';

type LabelValuePair = { label: string, value: string }
type RadioGroupChangeEvent = (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
type NameCheckedRecord = Record<string, boolean> // { name: string, checked: boolean }

// export function CustomRadio(props: { name: string, value: string, onChange: RadioGroupChangeEvent }) {
//   return (
//     <FormControl component="fieldset" style={{ width: '100%' }} >
//       <RadioGroup row name={props.name} value={props.value} onChange={props.onChange}>
//         <Grid item xs={6} sm={4}>
//           <FormControlLabel value="M" control={<Radio />} label="男性" />
//         </Grid>
//         <Grid item xs={6} sm={4}>
//           <FormControlLabel value="F" control={<Radio />} label="女性" />
//         </Grid>
//         <Grid item xs={6} sm={4}>
//           <FormControlLabel value="X" control={<Radio />} label="第三性" />
//         </Grid>
//       </RadioGroup>
//     </FormControl >
//   );
// }

//==========================================================================
export function RadioCtrl(props: {
  name: string,
  value: string,
  onChange: ValueChangeHandler,
  optionList: LabelValuePair[],
  layout?: GridLayoutMode
}) {
  const classes = useStyles()

  function handleChange(event: React.ChangeEvent<HTMLInputElement>, value: string) {
    props.onChange({
      name: props.name,
      value: value
    })
  }

  return (
    <FormControl component="fieldset" style={{ width: '100%' }} >
      <RadioGroup row name={props.name} value={props.value || ''} onChange={handleChange}>
        {props.optionList.map((item, index) => (
          <Grid item key={index} {...mapGridAttrs[props.layout || 'item123']} >
            <FormControlLabel
              label={item.label}
              control={<Radio />}
              value={item.value}
              className={classes.controlLabel}
            />
          </Grid>
        ))}
      </RadioGroup>
    </FormControl >
  );
}

//==========================================================================
export function CheckGroupCtrl(props: {
  name: string,
  checkGroup: NameCheckedRecord,
  onChange: ValueChangeHandler,
  optionList: LabelValuePair[],
  layout?: GridLayoutMode
}) {
  const classes = useStyles()

  function handleItemChange(item: LabelValuePair) {
    return (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      props.onChange({
        name: item.value,
        value: checked
      })
    }
  }

  return (
    <FormControl component="fieldset" style={{ width: '100%' }} >
      <FormGroup row>
        {props.optionList.map((item, index) => (
          <Grid item key={index} {...mapGridAttrs[props.layout || 'item123']} >
            <FormControlLabel
              label={item.label}
              control={<Checkbox checked={(props.checkGroup ?? {})[item.value] ?? false} onChange={handleItemChange(item)} />}
              className={classes.controlLabel}
            />
          </Grid>
        ))}
      </FormGroup>
    </FormControl >
  );
}

//==========================================================================
export function CheckListCtrl(props: {
  name: string,
  value: String[], /* checked value list */
  onChange: ValueChangeHandler,
  optionList: LabelValuePair[],
  layout?: GridLayoutMode,
  max?: number,
  onMatchMax?: ()=>void
}) {
  const classes = useStyles()
  const currentCheckedList = props.value ?? []

  function handleItemChange(item: LabelValuePair) {
    return (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      if (checked === true) {
        //# 加入項目，且有數量上限 
        const newCheckList = [item.value, ...currentCheckedList].slice(0, props.max)
        props.onChange({
          name: props.name,
          value: newCheckList
        })
        //# check:已達勾選項目上限
        if(props.max !== undefined && newCheckList.length >= props.max) {
          props.onMatchMax && props.onMatchMax() 
        }
      }
      else {
        //# 移除項目
        const newCheckList = currentCheckedList.filter(v => v !== item.value)
        props.onChange({
          name: props.name,
          value: newCheckList
        })        
      }
    }
  }

  return (
    <FormControl component="fieldset" style={{ width: '100%' }} >
      <FormGroup row>
        {props.optionList.map((item, index) => (
          <Grid item key={index} {...mapGridAttrs[props.layout || 'item123']} >
            <FormControlLabel
              label={item.label}
              control={<Checkbox checked={currentCheckedList.includes(item.value)} onChange={handleItemChange(item)} />}
              className={classes.controlLabel}
            />
          </Grid>
        ))}
      </FormGroup>
    </FormControl >
  );
}

//==========================================================================
const useStyles = makeStyles(({ palette }) => ({
  root: {

  },
  controlLabel: {
    width: '100%',
    '&:hover': {
      backgroundColor: fade(palette.secondary.light, 0.05),
    }
  }
}))

//==========================================================================
