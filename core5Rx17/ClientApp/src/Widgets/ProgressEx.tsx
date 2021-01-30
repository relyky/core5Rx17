import React from 'react';
import { makeStyles, withStyles, Theme } from '@material-ui/core/styles'
import { green, orange, red, grey } from '@material-ui/core/colors'
import { LinearProgress, Box, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme:Theme) =>( {
  barRoot: { height: 10, borderRadius: 5 },
  greenBar: { backgroundColor: green[800], borderRadius: 5},
  orangeBar: { backgroundColor: orange[800], borderRadius: 5 },
  redBar: { backgroundColor: red[800], borderRadius: 5 }
}))

export function ProgressBar(props: { value: number}) {
  const classes = useStyles();
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" value={props.value}
          classes={{
            root: classes.barRoot,
            bar: classes.redBar
          }}
        />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{props.value}%</Typography>
      </Box>
    </Box>
  );
}
