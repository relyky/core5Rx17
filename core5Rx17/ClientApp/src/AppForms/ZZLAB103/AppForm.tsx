import React, { useRef } from 'react'
import { ButtonEx, ScrollTopFab } from 'Widgets/ButtonEx'
import { makeStyles, Paper, Container, Typography, Toolbar, AppBar, Box } from '@material-ui/core'
import { H4 } from 'Widgets/TypographyEx';
import { useMySwal } from 'hooks/useMySwal';

export default function AppForm({ formProfile }: AppFormProps) {
  const classes = useStyles();
  const { confirm } = useMySwal()
  const ref1 = useRef<HTMLElement>()
  const ref2 = useRef<HTMLElement>()
  const ref3 = useRef<HTMLElement>()
  const ref4 = useRef<HTMLElement>()
  const ref5 = useRef<HTMLElement>()
  const refZ = useRef<HTMLElement>()

  const element = document.getElementById("box");

  console.log(`${formProfile.FORM_ID}.render`, formProfile)
  return (
    <React.Fragment>
      <AppBar>
        <Toolbar>
          <H4>Lab: Scroll to next question</H4>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container>

        <Paper className={classes.scrollbox} ref={ref1} >
          <pre>A block 1 </pre>
          <ButtonEx label="Next" onClick={() => ref2.current && ref2.current.scrollIntoView({ behavior: 'smooth', block: 'start' })} />
        </Paper>

        <Paper className={classes.scrollbox} ref={ref2}>
          <pre>A block 2 </pre>
          <ButtonEx label="Next" onClick={() => ref3.current && ref3.current.scrollIntoView({ behavior: 'smooth', block: 'start' })} />
        </Paper>

        <Paper className={classes.scrollbox} ref={ref3} >
          <pre>A block 3 </pre>
          <ButtonEx label="Next" onClick={() => ref4.current && ref4.current.scrollIntoView({ behavior: 'smooth', block: 'start' })} />
        </Paper>

        <Paper className={classes.scrollbox} ref={ref4}>
          <pre>A block 4 </pre>
          <ButtonEx label="Next" onClick={() => ref5.current && ref5.current.scrollIntoView({ behavior: 'smooth', block: 'start' })} />
        </Paper>

        <Paper className={classes.scrollbox} ref={ref5} >
          <pre>A block 5 </pre>
          <ButtonEx label="Next" onClick={() => refZ.current && refZ.current.scrollIntoView({ behavior: 'smooth', block: 'start' })} />
        </Paper>

        <Paper className={classes.scrollbox} ref={refZ} style={{ textAlign: 'center' }}>
          <ButtonEx className={classes.bigbutton} label="感謝回答問券" onClick={() => confirm('感謝回答問券')} />
        </Paper>

      </Container>
    </React.Fragment>
  );
}

const useStyles = makeStyles(({ spacing, mixins }) => ({
  scrollbox: {
    height: '80vh',
    padding: spacing(2),
    margin: spacing(2),
    scrollMarginTop: `${spacing(12)}px`
  },
  bigbutton: {
    marginTop: '25vh',
    marginBottom: '25vh',
    fontSize: '10vh'
  }
}))