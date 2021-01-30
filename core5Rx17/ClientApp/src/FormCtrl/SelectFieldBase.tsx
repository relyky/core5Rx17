import React, { useState, useContext, useMemo, useCallback } from 'react'
//import { makeStyles } from '@material-ui/core/styles'
import { Input, InputAdornment, TextField, IconButton, FormControl, makeStyles, Grid, useTheme } from '@material-ui/core'
import { Autocomplete, useAutocomplete } from '@material-ui/lab'
import { FormFieldSetContext } from './FormCtrl'
import { useStoreActions, useTypedSelector } from 'store/store'
import { mapGridAttrs } from 'Widgets/mics'
import {
  ArrowDropDown as ArrowDropDownIcon,
  ArrowDropUp as ArrowDropUpIcon
} from '@material-ui/icons'

//============================================================

export function SelectFieldBase(props: {
  label: string,
  variant?: 'filled' | 'outlined' | 'standard'
  className?: string
  style?: React.CSSProperties
  optionList: LabelValue[],
  value: LabelValue | null,
  onChange?: (v: LabelValue | null) => void
}) {
  const [inputValue, setInputValue] = useState('')

  return (
    <Autocomplete className={props.className}
      options={props.optionList}
      getOptionLabel={c => c.label}
      renderInput={params => <TextField {...params} style={props.style} label={props.label} variant={props.variant} />}
      value={props.value}
      onChange={(e, v, r, d) => props.onChange && props.onChange(v)}
      inputValue={inputValue}
      onInputChange={(e, v) => { setInputValue(v) }}
    />
  )
}

//============================================================

export function SelectInput(props: {
  className?: string,
  optionList: LabelValue[],
  value: LabelValue | null,
  onChange?: (v: LabelValue | null) => void
}) {
  const [inputValue, setInputValue] = useState('')
  const [f_open, setOpenFlag] = useState(false)

  return (
    <Autocomplete className={props.className} fullWidth
      options={props.optionList}
      getOptionLabel={c => c.label}
      renderInput={params =>
        <FormControl ref={params.InputProps.ref} >
          <Input {...params.inputProps} endAdornment={
            <InputAdornment position="end">
              <IconButton className="MuiAutocomplete-popupIndicator"
                onClick={() => setOpenFlag(f => !f)}>
                {f_open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </IconButton>
            </InputAdornment>
          } />
        </FormControl>
      }
      value={props.value}
      onChange={(e, v, r, d) => props.onChange && props.onChange(v)}
      inputValue={inputValue}
      onInputChange={(e, v) => { setInputValue(v) }}
      onOpen={e => setOpenFlag(true)}
      onClose={e => setOpenFlag(false)}
    />
  )
}

//===========================================================
interface SelectFieldProps {
  label: string,
  variant?: 'filled' | 'outlined' | 'standard'
  className?: string,
  optionList: LabelValue[],
  group?: string
  name?: string
  value?: string
  onChange?: ValueChangeHandler
  layout?: GridLayoutMode
  disabled?: boolean
  readOnly?: boolean
}

export default function SelectField(props: SelectFieldProps) {
  //const { name, value, disabled, group, readOnly, layout, onChange, ...others } = props
  const { layout, ...others } = props
  const [inputValue, setInputValue] = useState('')

  const fieldset = useContext(FormFieldSetContext)
  const formData = useTypedSelector(store => store.formData)
  const { assignValue, assignGroupValue } = useStoreActions()
  const { spacing } = useTheme()

  // layout properties
  const _layout = (layout !== undefined) ? layout : fieldset.layout
  const layoutProps = mapGridAttrs[_layout || 'item123']

  // helper: get the selected item to render
  const selectedItem = useMemo(() => {
    // helper: determine the render value.
    const renderValue = (props.value !== undefined) ? props.value
      : typeof (props.group) === 'string' ? (formData[props.group] || {})[props.name as string]
        : formData[props.name as string]

    // get the selected item to render
    return props.optionList.find(c => c.value === renderValue)
  }, [props.value, props.group, props.name, props.optionList, formData])

  // helper: determine the onValueChange handler
  const changeHandler: ValueChangeHandler = useMemo(() => {
    return (props.onChange !== undefined) ? props.onChange
      : typeof (props.group) === 'string' ? (nv: NameValue) => assignGroupValue(props.group as string, nv)
        : assignValue;
  }, [props.onChange, props.group])

  return (
    <Grid item {...layoutProps} >
      <Autocomplete className={props.className}
        options={props.optionList}
        getOptionLabel={c => c.label}
        renderInput={params => (
          <TextField {...params}
            name={props.name}
            style={{ padding: spacing(0.5) }}
            label={props.label}
            variant={props.variant || 'outlined'}
          />
        )}
        value={selectedItem || null}
        onChange={(e, v, r, d) => changeHandler({
          name: props.name || '',
          value: v === null ? null : v.value
        })}
        inputValue={inputValue}
        onInputChange={(e, v) => setInputValue(v)}
        disabled={props.disabled}
      />
    </Grid>
  )
}
