import React from "react"
import { withStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Slider from "@material-ui/core/Slider"

export function CustomSlider(props: { name: string, value: number, onChange: ValueChangeHandler }) {
  const classes = useStyles();

  function handleChange(event: React.ChangeEvent<{}>, value: number | number[]) {
    props.onChange({
      name: props.name,
      value: value as number
    })
  }

  return (
    <div className={classes.root}>
      <PrettoSlider
        name={props.name}
        value={props.value}
        onChange={handleChange}
        min={0}
        max={10}
        step={1}
        defaultValue={5}
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
    width: 'calc(100% - 100px)'
  }
}))

//------------------------------------------------------------
export const PrettoSlider = withStyles({
  root: {
    //color: '#52af77',
    height: 8
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
})(Slider);

//------------------------------------------------------------
