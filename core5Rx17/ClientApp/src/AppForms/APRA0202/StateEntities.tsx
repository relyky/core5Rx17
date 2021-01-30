import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Card, CardContent, CardHeader, CardActions, Button, Chip } from '@material-ui/core'
import { red, green, orange, grey, pink } from '@material-ui/core/colors'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun'
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk'
import AccessibleForwardIcon from '@material-ui/icons/AccessibleForward'
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar'
import HotelIcon from '@material-ui/icons/Hotel';
import { createMachine, invoke, state, transition, state as final, interpret, immediate, reduce, guard } from 'robot3';
import { useMachine } from 'hooks/useMachine'
//import { useInit, postEvent } from 'hooks/useHttp'
//import { LastErrMsg, showMsgBox } from 'common/LastErrMsg'

//----------------------------------------------------------------------------------
interface StateContext {
  firstName: string,
  health: number,
  money: number,
  goods: number
}

interface MachineEvent {
  type: string,
  data: StateContext
}

const machineContext = () => ({
  firstName: 'George',
  health: 9,
  money: 9,
  goods: 9
});

/**
 * waiting
 * @param ms
 */
function heartBeating(ms: number = 1000) {
  return async (ctx: StateContext, ev: any) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        ctx.health = ctx.health - 1
        resolve(ctx)
      }, ms)
    })
  }
}

function eating(ms: number = 2000) {
  return async (ctx: StateContext, ev: any) => {
    console.log('eating', { ctx, ev })
    return new Promise((resolve, reject) => {
      if (ctx.goods >= 3) {
        setTimeout(() => {
            ctx.goods -= 3
            ctx.health += 3
            resolve(ctx)
        }, ms)
      }
      else {
        reject('食物不足。')
      }
    })
  }
}

const CountdownZeroMachine = createMachine({
  INIT: state(immediate('IDLE')),
  IDLE: invoke(
    heartBeating(),
    transition('done', 'DEATH', guard((ctx: StateContext) => ctx.health <= 0)),
    transition('done', 'EATING', guard((ctx: StateContext) => ctx.health <= 5)), // hungry -> EATING
    //    transition('done', 'WEAK', guard((ctx: StateContext) => ctx.health <= 2)), // 150)
    //    transition('done', 'HUNGRY', guard((ctx: StateContext) => ctx.health <= 5)), // 500
    //    transition('done', 'VITALITY'),
    transition('done', 'IDLE')
  ),
  EATING: invoke(
    eating(),
    transition('done', 'IDLE'),
    transition('error', 'IDLE')
  ),
  VITALITY: invoke(
    heartBeating(),
    transition('done', 'IDLE')
  ),
  HUNGRY: invoke(
    heartBeating(),
    transition('done', 'IDLE')
  ),
  WEAK: invoke(
    heartBeating(),
    transition('done', 'IDLE')
  ),
  WORK: state(),
  PLAY: state(),
  DEATH: final(
    transition('rebirth', 'INIT', reduce((ctx: StateContext, ev: MachineEvent) => ({ ...ctx, health: ev.data.health })))
  )
}, machineContext);

//----------------------------------------------------------------------------------
export function Adam() {
  const classes = useStyles()
  const [current, send] = useMachine(CountdownZeroMachine, undefined)
  const stateLiteral: string = current.name
  const state: StateContext = current.context

  // console.log('Adam.render')
  return (
    <Card className={classes.root}>
      <CardHeader title={state.firstName} />
      <CardContent>
        <StateChip state={stateLiteral} />

        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row" align="right" >
                health
                </TableCell>
              <TableCell>
                <ValueColorChip value={state.health} lowerBound={2} upperBound={5} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" align="right">
                goods
                </TableCell>
              <TableCell>
                <ValueColorChip value={state.goods} lowerBound={2} upperBound={5} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" align="right">
                money
                </TableCell>
              <TableCell>
                <ValueColorChip value={state.money} lowerBound={2} upperBound={5} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" size="small" disabled={stateLiteral !== 'DEATH'}
          onClick={() => send({ type: 'rebirth', data: { health: 9 } })}
        >重生</Button>
      </CardActions>
    </Card>
  )
}

//function HeaderIcon(props: { state: string }) {
//  return (
//    <React.Fragment>
//      {props.state === 'VITALITY' && <DirectionsRunIcon style={{ color: green[500], verticalAlign: 'middle' }} />}
//      {props.state === 'HUNGRY' && <DirectionsWalkIcon style={{ color: orange[500], verticalAlign: 'middle' }} />}
//      {props.state === 'WEAK' && <AccessibleForwardIcon style={{ color: red[500], verticalAlign: 'middle' }} />}
//      {props.state === 'DEATH' && <PermContactCalendarIcon style={{ color: grey[500], verticalAlign: 'middle' }} />}
//    </React.Fragment>
//  )
//}

function StateChip(props: { state: string }) {
  const greenChipStyle = useShipStyles(green[500])
  const orangeChipStyle = useShipStyles(orange[500])
  const redChipStyle = useShipStyles(red[500])
  const greyChipStyle = useShipStyles(grey[500])
  const pinkChipStyle = useShipStyles(pink[500])

  switch (props.state) {
    case 'VITALITY':
      return (<Chip classes={greenChipStyle} icon={<DirectionsRunIcon />} label="活力" />)
    case 'HUNGRY':
      return (<Chip classes={orangeChipStyle} icon={<DirectionsWalkIcon />} label="飢餓" />)
    case 'WEAK':
      return (<Chip classes={redChipStyle} icon={<AccessibleForwardIcon />} label="虛弱" />)
    case 'DEATH':
      return (<Chip classes={greyChipStyle} icon={<PermContactCalendarIcon />} label="死亡" />)
    default:
      return (<Chip classes={pinkChipStyle} icon={<HotelIcon />} label={props.state} />)
  }
}

function ValueChip(props: { value: number }) {
  return (
    <Chip
      label={props.value}
      size="small"
      color="primary"
      style={{ width: props.value * 10, minWidth: '2em', maxWidth: '50%' }}
    />
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

//const useGreenChipStyles = makeStyles({
//  root: {
//    backgroundColor: green[500],
//    color: 'white',
//  },
//  icon: { color: 'white' }
//});
