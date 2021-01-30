import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Collapse, Container, Fade, Grow, Input, InputAdornment, Paper, Slide, TextField, TextFieldProps, Zoom, IconButton, FormControl } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { LabelSwitch } from 'FormCtrl/all';
import { P1, Pre } from 'Widgets/TypographyEx';
import { SelectFieldBase, SelectInput } from 'FormCtrl/SelectFieldBase';

const useStyles = makeStyles(({ spacing }) => ({
  root: {
  },
  margin: {
    margin: spacing(1)
  },
}));

//type LabelValue = { label: string, value: string }

export default function AppForm({ formProfile }: AppFormProps) {
  const classes = useStyles();
  const [value, setValue] = useState<LabelValue | null>(null)
  const [inputValue, setInputValue] = useState('');

  console.log(`${formProfile.FORM_ID}.render`, formProfile)
  return (
    <div className={classes.root}>
      <h1>{`${formProfile.FORM_ID}:${formProfile.FORM_TITLE}`}</h1>
      <p>{`${formProfile.FORM_DESCRIPTION}`}</p>

      <FormPaper>
        <Pre>{JSON.stringify({ value, inputValue }, null, '  ')}</Pre>
{/* 
        <Autocomplete className={classes.margin}
          options={optionList}
          getOptionLabel={c => c.label}
          renderInput={params => <TextField {...params} label="Combo box" variant="outlined" />}
          value={value}
          onChange={(e, v) => setValue(v)}
          inputValue={inputValue}
          onInputChange={(e, v) => { setInputValue(v) }}
        /> */}

        <SelectFieldBase className={classes.margin}
          label="Test 1"
          variant="outlined"
          optionList={optionList}
          value={value}
          onChange={v => setValue(v)}
        />

        <SelectFieldBase className={classes.margin}
          label="測試 2"
          variant="outlined"
          optionList={optionList}
          value={value}
          onChange={v => setValue(v)}
        />

        {/* <Autocomplete className={classes.margin} fullWidth
          options={optionList}
          getOptionLabel={c => c.label}
          renderInput={params =>
            <FormControl ref={params.InputProps.ref} >
              <Input {...params.inputProps} endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={() => setOpenFlag(f => !f)}>
                    {f_open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                  </IconButton>
                </InputAdornment>
              } />
            </FormControl>
          }
          value={value}
          onChange={(e, v) => setValue(v)}
          inputValue={inputValue}
          onInputChange={(e, v) => { setInputValue(v) }}
          onOpen={e => setOpenFlag(true)}
          onClose={e => setOpenFlag(false)}
        /> */}

        <SelectInput className={classes.margin}
          optionList={optionList}
          value={value}
          onChange={v => setValue(v)}
        />

        <SelectInput className={classes.margin}
          optionList={optionList}
          value={value}
          onChange={v => setValue(v)}
        />

        {/* <Autocomplete className={classes.margin}
          options={optionList}
          getOptionLabel={c => c.label}
          renderInput={params => <TextField {...params} label="Combo box" variant="standard" />}
          value={value}
          onChange={(e, v) => setValue(v)}
          inputValue={inputValue}
          onInputChange={(e, v) => { setInputValue(v) }}
        />

        <Autocomplete className={classes.margin}
          options={optionList}
          getOptionLabel={c => c.label}
          renderInput={params => <TextField {...params} label="Combo box" variant="filled" />}
          value={value}
          onChange={(e, v) => setValue(v)}
          inputValue={inputValue}
          onInputChange={(e, v) => { setInputValue(v) }}
        /> */}

      </FormPaper>

    </div>
  )
}

//------------------------------------------------------------
const FormPaper = withStyles(({ spacing }) => ({
  root: {
    margin: spacing(2),
    padding: spacing(1)
  }
}))(Paper)

//============================================================
const optionList: LabelValue[] = Array.from(Array(100)).map((__, i) => ({
  value: `${101 + i}`,
  label: `我是項目${101 + i}的名稱`
}))
