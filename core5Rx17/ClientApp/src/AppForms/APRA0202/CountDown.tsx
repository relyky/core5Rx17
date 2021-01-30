import React, { useEffect, useState, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Card, CardContent, CardHeader, CardActions, Button, Chip } from '@material-ui/core'
import { red, green, orange, grey, pink } from '@material-ui/core/colors'
import HotelIcon from '@material-ui/icons/Hotel';
//import { showMsgBox } from 'common/LastErrMsg'
// rxjs
import { useObservable } from "rxjs-hooks";
import { interval, Subject, timer, of, from } from "rxjs";
import { map, startWith, scan, takeUntil, tap, delay } from "rxjs/operators";
import { useMySwal } from 'hooks/useMySwal';
// hooks
//import { useInit, postEvent } from 'hooks/useHttp'

class GeorgeEvent {
  type: 'heartbeat' | 'hungry'
  constructor(_type: 'heartbeat' | 'hungry') {
    this.type = _type
  }
}

const george$ = new Subject<GeorgeEvent>();

interval(1000).subscribe(() => george$.next(new GeorgeEvent('heartbeat')))

//---------------------------------------------------------------------------.-------
export function CountDown() {
  const event = useObservable(() => george$);
  const {confirm} = useMySwal()

  const [george, setGeorge] = useState({
    firstName: 'George',
    health: 9,
    money: 9,
    goods: 9,
  })

  useEffect(() => {
    if (event?.type === 'heartbeat')
      doHeartBeat()
    if (event?.type === 'hungry')
      doEating()
  }, [event]);

  function doHeartBeat() {
    setGeorge({ ...george, health: george.health - 1 })
    if (george.health <= 5)
      george$.next(new GeorgeEvent('hungry'))
  }

  function doEating() {
    if (george.goods >= 3) {
      setGeorge({
        ...george,
        health: george.health + 3,
        goods: george.goods - 3
      })
    }
    else {
      //reject('食物不足。')
    }
  }

  const status = useMemo(() => {
    if (george === undefined)
      return 'undefined'

    if (george.health <= 0) {
      return 'DEATH'
    } else if (george.health <= 5) {
      return 'HUNGRY'
    }
    return 'IDLE'
  }, [george])

  return (
    <Card>
      <CardHeader title="Count Down" />
      <CardContent>
        status: {status}
        <pre>{JSON.stringify(george, null, '  ')}</pre>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" size="small"
          onClick={() => confirm('重生')}
        >重生</Button>
      </CardActions>
    </Card>
  )
}

//----------------------------------------------------------------------------------
