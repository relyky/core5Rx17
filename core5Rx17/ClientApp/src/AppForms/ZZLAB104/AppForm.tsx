import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Collapse, Container, Fade, Grow, Paper, Slide, Zoom } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { LabelSwitch } from 'FormCtrl/all';

const useStyles = makeStyles((theme) => ({
  root: {
  },
}));

export default function AppForm({ formProfile }: AppFormProps) {
  const classes = useStyles();
  const [f_collapse, setCollapseFlag] = useState(true)
  const [f_fade, setFadeFlag] = useState(true)
  const [f_grow, setGrowFlag] = useState(true)
  const [f_slide, setSlideFlag] = useState(true)
  const [f_zoom, setZoomFlag] = useState(true)
  const [timeout, setTimeout] = useState(undefined)

  console.log(`${formProfile.FORM_ID}.render`, formProfile)
  return (
    <div className={classes.root}>
      <h1>{`${formProfile.FORM_ID}:${formProfile.FORM_TITLE}`}</h1>
      <p>{`${formProfile.FORM_DESCRIPTION}`}</p>

      <FormContainer>
        <Box>
          <LabelSwitch checked={f_zoom} label='Zoom' onChange={v => setZoomFlag(v.value as boolean)} />
          <LabelSwitch checked={f_grow} label='Grow' onChange={v => setGrowFlag(v.value as boolean)} />
          <LabelSwitch checked={f_fade} label='Fade' onChange={v => setFadeFlag(v.value as boolean)} />
          <LabelSwitch checked={f_slide} label='Slide' onChange={v => setSlideFlag(v.value as boolean)} />
          <LabelSwitch checked={f_collapse} label='Collapse' onChange={v => setCollapseFlag(v.value as boolean)} />
        </Box>
        <Box display="flex" flexWrap="wrap" >

          <FormPaper>
            None Transition
          </FormPaper>

          <Zoom in={f_zoom} timeout={timeout} >
            <FormPaper>
              Zoom
            </FormPaper>
          </Zoom>

          <Grow in={f_grow} timeout={timeout} >
            <FormPaper>
              Grow
          </FormPaper>
          </Grow>

          <Fade in={f_fade} timeout={timeout} >
            <FormPaper>
              Fade
          </FormPaper>
          </Fade>

          <Slide in={f_slide} direction={f_slide ? 'left' : 'right'} timeout={timeout} >
            <FormPaper>
              Slide right → left
          </FormPaper>
          </Slide>

          <Collapse in={f_collapse} timeout={timeout} >
            <FormPaper>
              Collapse
          </FormPaper>
          </Collapse>

          <Collapse in={f_collapse} timeout={timeout} collapsedHeight={60} >
            <FormPaper>
              Collapse some
          </FormPaper>
          </Collapse>

        </Box>

      </FormContainer>

    </div>
  )
}

//------------------------------------------------------------
const FormContainer = withStyles(theme => ({
  root: {
    maxWidth: 800,
    borderLeft: 'solid thin',
    borderRight: 'solid thin',
  }
}))(Container)
//------------------------------------------------------------
const FormPaper = withStyles(theme => ({
  root: {
    margin: theme.spacing(1),
    width: theme.spacing(24),
    height: theme.spacing(24),
  }
}))(Paper)
