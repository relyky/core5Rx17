import React from 'react'
//import clsx from 'clsx'
import { useMediaQuery, Divider, Container, Typography, AppBar, withStyles, ContainerProps } from '@material-ui/core'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import DividerWithText from 'Widgets/DividerWithText'
import logo from 'logo.svg'
import styles from 'Home.module.scss'
import appbarLogo from 'assets/scb/logo.png'

//----------------------------------------------------------------------------------
const useStyles = makeStyles(theme => ({
  title: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '1em',
      fontWeight: 600
    }
  },
  appbarLogoCntr: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  appbarLogoImg: {
    height: '7vmin',
    maxHeight: 50,
    minHeight: 30
  }
}));
//----------------------------------------------------------------------------------
export const AppContainer = withStyles(({ breakpoints }) => ({
  root: {
    flexGrow: 1,
    [breakpoints.down('xs')]: {
      paddingLeft: 0,
      paddingRight: 0
    }
  }
}))(Container)

// export const AppContainer = withStyles(({ breakpoints }) => ({
//   root: {
//     flexGrow: 1,
//     [breakpoints.down('xs')]: {
//       paddingLeft: 0,
//       paddingRight: 0
//     }
//   }
// }))((props: ContainerProps) => (
//   <Container maxWidth='xl' {...props} />
// ))

//----------------------------------------------------------------------------------
export function AppHeader() {
  const classes = useStyles()
  return (
    <AppBar position="static">
      {/* 以 AppContainer 對齊主內容ｘ座標位置 */}
      <AppContainer className={classes.appbarLogoCntr}>
        <img src={appbarLogo} className={classes.appbarLogoImg} />
      </AppContainer>
    </AppBar>
  )
}
//----------------------------------------------------------------------------------
export function AppFooter() {
  //const classes = useStyles()
  //const theme = useTheme()
  return (
    <footer style={{ textAlign: 'center' }}>
      <Divider />
      <p>
        Copyright&nbsp;&copy;2021<a href="http://www.asiavista.com.tw" target="_blank" rel="noreferrer">&nbsp;Asia Vista Technology, Inc.&nbsp;</a>All rights reserved.
      </p>
    </footer>
  )
}
//----------------------------------------------------------------------------------

/**
 * 您目前申請卡別為
 * @param {string} cardName
 */
//export function ApplyType({ cardName }) {
//  return (
//    <div className="l-applyType">
//      <div className="c-applyType">
//        <div className="c-applyType__head">您目前申請卡別為</div>
//        <div className="c-applyType__content">
//          <div className="c-applyType__cardName">{cardName}</div>
//        </div>
//      </div>
//    </div >
//  )
//}

//----------------------------------------------------------------------------------
/**
 * 有步驟訊息的 AppHeader
 * @param {string} stepName
 * @param {number} step only 1 | 2 | 3 ，只支援三步驟
 */
//export function AppStepHeader({ stepName, step }) {
//  return (
//    <header className="l-header">
//      <div className="l-header__wrap">
//        <div className="l-header__logo">
//          <a className="c-logo"></a>
//        </div>
//        <div className="l-header__info">{stepName}</div>
//        <div className="l-header__step">{`第${step}/3 步`}</div>
//      </div>
//      <div className="l-header__progress">
//        <div className={clsx("c-progressBox",
//          step === 1 && "c-progressBox--step1",
//          step === 2 && "c-progressBox--step2",
//          step === 3 && "c-progressBox--step3"
//        )}></div>
//      </div>
//    </header>
//  )
//}
//----------------------------------------------------------------------------------
export const Spinner: React.FC = () => {
  const theme = useTheme()
  return (
    <div style={{ textAlign: 'center' }}>
      <FontAwesomeIcon icon={faCog} spin style={{
        fontSize: '8em',
        color: theme.palette.primary.main,
        marginTop: '8%',
        marginBottom: '8%'
      }} />
    </div>
  )
}
//----------------------------------------------------------------------------------
export function Logo() {
  return (
    <div style={{ textAlign: 'center' }}>
      <img src={logo} className={styles["App-logo"]} alt="logo" />
    </div>
  )
}
//----------------------------------------------------------------------------------
export const LogoAndTitle: React.FC<{ title: string }> = (props) => {
  const classes = useStyles()
  const theme = useTheme()
  const matchXs = useMediaQuery(theme.breakpoints.down('xs'))
  return (
    <>
      <Logo />
      <DividerWithText>
        <Typography variant={matchXs ? 'h5' : 'h4'} color="textPrimary" className={classes.title}>
          {props.title}
        </Typography>
      </DividerWithText>
    </>
  )
}
