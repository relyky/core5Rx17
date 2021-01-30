import React from 'react'
import { FormControlLabel, Switch } from '@material-ui/core'
import { FormProvider, FieldSet } from './FormCtrl'
import TextField from './TextField'

export {
  FormProvider,
  FieldSet,
  TextField,
  LabelSwitch
}

//==================================================
function LabelSwitch(props: {
  name?: string,
  label: string,
  checked: boolean,
  onChange: ValueChangeHandler
}) {

  function handleChange(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) {
    props.onChange({
      name: props.name ?? '',
      value: checked
    })
  }

  return (
    <FormControlLabel
      control={<Switch checked={props.checked} onChange={handleChange} name={props.name} />}
      label={props.label}
    />
  )
}
//==================================================
