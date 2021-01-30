import React, { useEffect, useState } from "react"
import { withStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Slider from "@material-ui/core/Slider"

export function CustomSlider(props: { name: string, value: number, onChange: ValueChangeHandler }) {
  const classes = useStyles();
  const [_value, _setValue] = useState(props.value)
  
  function handleChange(event: React.ChangeEvent<{}>, value: number | number[]) {
    //console.log('handleChange',{event, value})
    _setValue(value as number)
  }

  function handleChangeCommitted(event: React.ChangeEvent<{}>, value: number | number[]) {
    //console.log('handleChangeCommitted',{event, value})
    props.onChange({
      name: props.name,
      value: value as number
    })
  }

  return (
    <div className={classes.root}>
      <PrettoSlider
        name={props.name}
        value={_value}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
        min={0}
        max={10}
        step={1}
        valueLabelDisplay="auto"
        marks={marks}
      />
    </div>
  );
}

const marks = [
  { value: 0, label: "0" },
  { value: 1 },
  { value: 2 },
  { value: 3, },
  { value: 4 },
  { value: 5, label: '5' },
  { value: 6, },
  { value: 7 },
  { value: 8 },
  { value: 9 },
  { value: 10, label: "10" }
];

//------------------------------------------------------------
const useStyles = makeStyles(theme => ({
  root: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
}))

//------------------------------------------------------------
export const PrettoSlider = withStyles(({spacing})=>({
  root: {
    //color: '#52af77',
    height: 8,
    marginTop: spacing(2),
    marginBottom: spacing(2)
  },
  thumb: {
    height: 16,
    width: 16,
    backgroundColor: "#fff",
    border: "2px solid",
    marginTop: -4,
    marginLeft: -8,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit"
    }
  },
  active: {},
  valueLabel: {
    left: "calc(-50% - 4px)"
  },
  track: {
    height: 8
    //borderRadius: 2,
  },
  rail: {
    height: 8
    //borderRadius: 2,
  },
  mark: {
    width: 2,
    height: 8,
    position: "absolute",
    //borderRadius: 1,
    backgroundColor: "#fff" //'currentColor'
  }
}))(Slider);

//------------------------------------------------------------
