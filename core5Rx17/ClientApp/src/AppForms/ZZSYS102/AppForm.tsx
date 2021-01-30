import React, { useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Container, Paper, Grow, Collapse, Slide, Zoom, Fade } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faPortrait } from '@fortawesome/free-solid-svg-icons'
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
  deviceDetect,
  deviceType
} from "react-device-detect"
import { Blockquote, H1, H2, H4, P1, Pre } from 'Widgets/TypographyEx';
import { AppContainer } from 'Outlines/OutlineWidgets';

const useStyles = makeStyles(({ palette, spacing }) => ({
  root: {
  },
  orientedBox: {
    width: spacing(10),
    //minHeight: spacing(10),
    margin: `${spacing(2)}px auto`,
    padding: spacing(1, 0),
    background: palette.primary.main,
    color: palette.primary.contrastText,
    fontSize: 'larger',
    textAlign: 'center',
    transition: '2s',
  },
  Landscape: {
    width: spacing(20),
    background: palette.primary.main,
    color: palette.primary.contrastText,
  },
  Portrait: {
    padding: spacing(5, 0),
    background: palette.secondary.main,
    color: palette.secondary.contrastText,
  }
}));

export default function AppForm({ formProfile, isLandscape, isPortrait }: AppFormProps) {
  const classes = useStyles()
  const [deviceInfo] = useState(() => deviceDetect())

  console.log(`${formProfile.FORM_ID}.render`, { formProfile })
  return (
    <div className={classes.root}>
      <h1>{`${formProfile.FORM_ID}:${formProfile.FORM_TITLE}`}</h1>
      <p>{`${formProfile.FORM_DESCRIPTION}`}</p>

      <AppContainer>

        <WellPaper>
          <H4>定向偵測<small>(withOrientationChange)</small></H4>
          <Blockquote colorx='secondary'>於 mobile 裝置定向偵測才有效。</Blockquote>
          <P1>{`isLandscape: ${isLandscape}`}</P1>
          <P1>{`isPortrait: ${isPortrait}`}</P1>

          <Box className={clsx(classes.orientedBox, isLandscape && classes.Landscape, isPortrait && classes.Portrait)}>
            {/* {isLandscape ? 'Landscape' : isPortrait ? 'Portrait' : 'Box'}<br />  */}
            {isLandscape &&
              <Grow in timeout={2000}>
                <div>Landscape<br />
                  <FontAwesomeIcon icon={faImage} size='3x' />
                </div>
              </Grow>}
            {isPortrait &&
              <Grow in timeout={2000}>
                <div>Portrait<br />
                  <FontAwesomeIcon icon={faPortrait} size='3x' />
                </div>
              </Grow>}
            {!isLandscape && !isPortrait && 'None'}
          </Box>
        </WellPaper>

        <BrowserView>
          <WellPaper>
            <H1> This is rendered only in browser </H1>
            <P1>放置 Browser 專用元件,如：DatePicker或FilterSelector</P1>
          </WellPaper>
        </BrowserView>
        <MobileView>
          <WellPaper>
            <H2> This is rendered only on mobile </H2>
            <P1>放置 Mobile 專用元件,如：DatePicker或FilterSelector</P1>
          </WellPaper>
        </MobileView>

        <WellPaper>
          <P1>{`isBrowser: ${isBrowser}`}</P1>
          <P1>{`isMobile: ${isMobile}`}</P1>
          <P1>{`deviceType: ${deviceType}`}</P1>
        </WellPaper>

        <WellPaper>
          <H4>Device Information</H4>
          <Pre>
            {JSON.stringify(deviceInfo, null, '  ')}
          </Pre>
        </WellPaper>
      </AppContainer>
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
//------------------------------------------------------------
const WellPaper = withStyles(({ spacing }) => ({
  root: {
    margin: spacing(3),
    padding: spacing(1)
  }
}))(Paper)
//------------------------------------------------------------
const WellBox = withStyles(({ spacing }) => ({
  root: {
    margin: spacing(3),
    padding: spacing(1)
  }
}))(Box)
//------------------------------------------------------------
