import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/core/styles'
//import { useInit, postEvent } from 'hooks/useHttp'
import { useMediaQuery, Divider, Paper, Link, Grid, Box } from '@material-ui/core'
import { OneCommandButton } from 'Widgets/ButtonEx'
import { H1, P1 } from 'Widgets/TypographyEx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faHourglassHalf, faChevronRight } from '@fortawesome/free-solid-svg-icons'

/// resource: prepare icons
const DoneIcon = () => <FontAwesomeIcon icon={faCheck} />
const BuzyIcon = () => <FontAwesomeIcon icon={faHourglassHalf} />
const GotoIcon = () => <FontAwesomeIcon icon={faChevronRight} />

export default function AppForm({ formProfile }: AppFormProps) {
  const classes = useStyles();
  const history = useHistory()
  const theme = useTheme();
  const matchXs = useMediaQuery(theme.breakpoints.down('xs'))

  function handleGoIndex() {
    history.push('/scbntbiq01')
  }

  console.log(`${formProfile.FORM_ID}.render`, formProfile)
  return (
    <Box className={classes.root}>
      <H1>{formProfile.FORM_TITLE}</H1>
      <P1>{formProfile.FORM_DESCRIPTION}</P1>

      <Paper variant='outlined' className={classes.darkwell} >
        <Grid container>
          <Grid item container xs={12} className={classes.tcaption}>
            <Box flexGrow={1} className={classes.t_cntr}>
              <BuzyIcon /> 本案審核中
            </Box>
            <Box flexGrow={0} className={classes.t_side}>
              我要補件 <GotoIcon />
            </Box>
          </Grid>
          <Grid item container xs={12} md={6} className={classes.trow}>
            <Grid item xs={6} className={classes.th}>案件編號</Grid>
            <Grid item xs={6} className={classes.td}>AFE55236</Grid>
          </Grid>
          <Grid item container xs={12} md={6} className={classes.trow}>
            <Grid item xs={6} className={classes.th}>申請日期</Grid>
            <Grid item xs={6} className={classes.td}>2019/12/27</Grid>
          </Grid>
        </Grid>
      </Paper>

      <Paper variant='outlined' className={classes.well} >
        <Grid container>
          <Grid item container xs={12} className={classes.tcaption}>
            <Box flexGrow={1} className={classes.t_cntr_chk}>
              <DoneIcon />案件已核准
            </Box>
            <Box flexGrow={0} className={classes.t_side}>
            </Box>
          </Grid>
          <Grid item container xs={12} md={6} className={classes.trow}>
            <Grid item xs={6} className={classes.th}>案件編號</Grid>
            <Grid item xs={6} className={classes.td}>AFE55236</Grid>
          </Grid>
          <Grid item container xs={12} md={6} className={classes.trow}>
            <Grid item xs={6} className={classes.th}>申請日期</Grid>
            <Grid item xs={6} className={classes.td}>2019/12/27</Grid>
          </Grid>
        </Grid>
      </Paper>

      <Paper variant='outlined' className={classes.darkwell} >
        <Grid container>
          <Grid item container xs={12} className={classes.tcaption}>
            <Box flexGrow={1} className={classes.t_cntr}>
              <BuzyIcon /> 本案審核中
            </Box>
            <Box flexGrow={0} className={classes.t_side}>
              我要補件 <GotoIcon />
            </Box>
          </Grid>
          <Grid item container xs={12} md={6} className={classes.trow}>
            <Grid item xs={6} className={classes.th}>案件編號</Grid>
            <Grid item xs={6} className={classes.td}>AFE55236</Grid>
          </Grid>
          <Grid item container xs={12} md={6} className={classes.trow}>
            <Grid item xs={6} className={classes.th}>申請日期</Grid>
            <Grid item xs={6} className={classes.td}>2019/12/27</Grid>
          </Grid>
        </Grid>
      </Paper>

      <Box textAlign="center">
        <OneCommandButton colorx="success" label="回首頁" onClick={handleGoIndex} />
      </Box>
    </Box>
  )
}
//------------------------------------------------------------
const useStyles = makeStyles(theme => {
  const { palette } = theme
  return {
    root: {
      marginTop: '3vmin',
      marginBottom: '3vmin'
    },
    well: {
      margin: theme.spacing(1),
      padding: theme.spacing(1)
    },
    darkwell: {
      margin: theme.spacing(1),
      padding: theme.spacing(1),
      backgroundColor: palette.grey[200]
    },
    tcaption: {
      padding: theme.spacing(1),
      borderBottom: 'solid thin',
      borderBottomColor: palette.grey[100],
    },
    t_cntr: {
      fontSize: '1.125em',
      fontWeight: 'bold'
    },
    t_cntr_chk: {
      fontSize: '1.125em',
      fontWeight: 'bold',
      color: palette.success.main
    },
    t_side: {
      color: palette.success.main
    },
    trow: {
      padding: theme.spacing(1)
    },
    th: {
      padding: theme.spacing(1),
      fontWeight: 'bold'
    },
    td: {
      padding: theme.spacing(1)
    }
  }
});
//------------------------------------------------------------

