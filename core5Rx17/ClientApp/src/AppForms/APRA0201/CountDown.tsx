import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardContent, CardHeader, CardActions, Button, Chip } from '@material-ui/core'
import { red, green, orange, grey, pink } from '@material-ui/core/colors'
import HotelIcon from '@material-ui/icons/Hotel';
import { createMachine, invoke, state, transition, state as final, interpret, immediate, reduce, guard, action } from 'robot3';
import { useMachine } from 'hooks/useMachine'
//import { useInit, postEvent } from 'hooks/useHttp'
//import { LastErrMsg, showMsgBox } from 'common/LastErrMsg'

//----------------------------------------------------------------------------------
interface MachineContext {
  count: number
}

interface MachineEvent {
  type: string,
  data: MachineContext
}

const machineContext = () => ({
  count: 10
});

/**
 * waiting
 * @param ms
 */
function doCountDown(ms: number = 1000) {
  return async (ctx: MachineContext, ev: any) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        ctx.count -= 1
        resolve(ctx)
      }, ms)
    })
  }
}

function toDispatchEvent(ctx: MachineContext) {
  window.dispatchEvent(new Event('custom_countdown'))
}

const CountdownZeroMachine = createMachine({
  INIT: state(immediate('COUNTDOWN')),
  COUNTDOWN: invoke(
    doCountDown(),
    transition('error', 'ERROR'),
    transition('done', 'COUNTDOWN', guard((ctx: MachineContext) => ctx.count > 0), action(toDispatchEvent)),
    transition('done', 'FINISH')
  ),
  ERROR: state(),
  FINISH: state(
    transition('reset', 'INIT', reduce((ctx: MachineContext, ev: MachineEvent) => ({ count: 10 })))
  )
}, machineContext);

//----------------------------------------------------------------------------------
export function CountDown() {
  const classes = useStyles()
  const [current, send] = useMachine(CountdownZeroMachine, undefined)
  const stateLiteral: string = current.name
  const state: MachineContext = current.context

  return (
    <Card className={classes.root}>
      <CardHeader title="Count Down" />
      <CardContent>
        <StateChip state={stateLiteral} /><br/>
        <ValueColorChip value={state.count} lowerBound={2} upperBound={5} />
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" size="small" disabled={stateLiteral !== 'FINISH'}
          onClick={() => send('reset')}
        >重生</Button>
      </CardActions>
    </Card>
  )
}

function StateChip(props: { state: string }) {
  const pinkChipStyle = useShipStyles(pink[500])
  return (
    <Chip classes={pinkChipStyle} icon={<HotelIcon />} label={props.state} />
  )
}

function ValueColorChip(props: { value: number, lowerBound:number, upperBound: number }) {
  const classes = useStyles()

  const className = props.value <= 0 ? classes.blackBg
    : props.value <= props.lowerBound ? classes.redBg
      : props.value <= props.upperBound ? classes.orangeBg
        : classes.greenBg

  return (
    <Chip className={className}
      label={props.value}
      size="small"
      color="primary"
      style={{ width: props.value * 10, minWidth: '2em', maxWidth: '50%' }}
    />
  )
}

//----------------------------------------------------------------------------------
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  greenBg: {
    background: 'green',
    color: 'white'
  },
  orangeBg: {
    background: 'orange',
    color: 'white'
  },
  redBg: {
    background: 'red',
    color: 'white'
  },
  blackBg: {
    background: 'darkgrey',
    color: 'white'
  }
});

function useShipStyles(color: any) {
  const makeIt = makeStyles({
    root: {
      backgroundColor: color,
      color: 'white',
    },
    icon: { color: 'white' }
  })
  return makeIt();
}

