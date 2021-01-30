import React, { useContext } from 'react'
import { Grid } from '@material-ui/core'

//---------------------------------------------
type FormFieldSetContextValue = Partial<{
  disabled: boolean,
  readOnly: boolean,
  layout: GridLayoutMode,
}>

const initValue: FormFieldSetContextValue = {
  disabled: false,
  readOnly: false,
  layout: 'item123',
}

export const FormFieldSetContext = React.createContext(initValue)

//---------------------------------------------
export const FormProvider: React.FC<FormFieldSetContextValue> = (props) => {
  const value: FormFieldSetContextValue = {
    disabled: props.disabled,
    readOnly: props.readOnly,
    layout: props.layout
  }

  return (
    <FormFieldSetContext.Provider value={value}>
      {props.children}
    </FormFieldSetContext.Provider>
  )
}

//---------------------------------------------
export const FieldSet: React.FC<FormFieldSetContextValue & { row?: boolean /* Grid-Row */, item?: boolean }> = (props) => {
  const upper = useContext(FormFieldSetContext)

  const value: FormFieldSetContextValue = {
    disabled: props.disabled !== undefined ? props.disabled : upper.disabled,
    readOnly: props.readOnly !== undefined ? props.readOnly : upper.readOnly,
    layout: props.layout !== undefined ? props.layout : upper.layout
  }

  return (
    <FormFieldSetContext.Provider value={value}>
      {props.row === true || props.item === true ?
        (<Grid item={props.item} container={props.row} alignItems='baseline' >
          {props.children}
        </Grid>) :
        (<React.Fragment>
          {props.children}
        </React.Fragment>)
      }
    </FormFieldSetContext.Provider>
  )
}
