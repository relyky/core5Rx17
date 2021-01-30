import React, { useContext } from 'react'
import { TextField as TextFieldBase, TextFieldProps, Grid, useTheme } from '@material-ui/core'
import { useTypedSelector, useStoreActions } from 'store/store'
import { FormFieldSetContext } from './FormCtrl'
import { mapGridAttrs } from 'Widgets/mics'

/// 覆寫與擴充屬性 override & extend properties
export type TextFieldPropsEx = Override<TextFieldProps, { onChange?: ValueChangeHandler }> & { group?: string, readOnly?: boolean, layout?: GridLayoutMode }

export default function TextField(props: TextFieldPropsEx) {
  const { name, value, disabled, group, readOnly, layout, onChange, ...others } = props
  const fieldset = useContext(FormFieldSetContext)
  const formData = useTypedSelector(store => store.formData)
  const { assignValue, assignGroupValue } = useStoreActions()
  const { spacing } = useTheme()

  /// InputProps: readOnly於內層input才有效果
  const inputProps = {
    readOnly: (readOnly !== undefined) ? readOnly : fieldset.readOnly
  }

  // helper: determine the onValueChange handler
  const changeHandler: ValueChangeHandler = (onChange !== undefined) ? onChange
    : typeof (group) === 'string' ? (v: NameValue) => assignGroupValue(group, v)
      : assignValue

  // helper: determine the render value.
  const renderValue = (value !== undefined) ? value
    : typeof (group) === 'string' ? (formData[group] || {})[name as string]
      : formData[name as string]

  // layout properties
  const _layout = (layout !== undefined) ? layout : fieldset.layout
  const layoutProps = mapGridAttrs[_layout || 'item123']
  
  // const layoutProps = _layout === 'fullrow' ? { xs: 12 as GN12 }
  //   : _layout === 'item122' ? { xs: 12 as GN12, sm: 6 as GN12, md: 6 as GN12}
  //     : { xs: 12 as GN12, sm: 6 as GN12, md: 4 as GN12 } // default 'item123'

  //console.log('TextField', props)
  return (
    <Grid item {...layoutProps} >
      <TextFieldBase
        variant="outlined"
        style={{ padding: spacing(0.5) }}
        fullWidth
        {...others}
        name={name}
        disabled={disabled || fieldset.disabled}
        value={renderValue || ''}
        InputProps={inputProps}
        onChange={e => changeHandler({
          name: e.target.name,
          value: e.target.value
        })}
      />
    </Grid>
  )
}
