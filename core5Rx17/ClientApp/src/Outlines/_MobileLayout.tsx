import React, { Suspense, useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Typography, AppBar, Toolbar, Button, IconButton, Drawer } from '@material-ui/core'
//import MenuIcon from '@material-ui/icons/Menu'
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import NavMenu from './NavMenu'
import RouteAppForms from './RouteAppForms'
import { AppContainer, AppFooter } from './OutlineWidgets';

//----------------------------------------------------------------------------------
const useStyles = makeStyles(theme => ({
  root: {
    dispaly: 'flex',
    flexDirection: 'column'
  },
  banner: {
    flexGrow: 1,
  },
  // content: {
  //   flexGrow: 1,
  //   padding: theme.spacing(2)
  // },
  // footer: {
  //   flexGrow: 1,
  //   textAlign: 'center'
  // },
  menu: {
    width: 240
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

//----------------------------------------------------------------------------------
export default function MobileLayout() {
  const [f_menu, setMenuFlag] = useState(false)
  const classes = useStyles()

  function toggleDrawer() {
    setMenuFlag(f => !f)
  }

  return (
    <div className={classes.root}>
      {/* header */}
      <AppBanner onMenuClick={toggleDrawer} />

      {/* nav */}
      <Drawer anchor={'right'} open={f_menu} onClose={toggleDrawer} >
        <NavMenu className={classes.menu} onClick={toggleDrawer} />
      </Drawer>

      <main>
        <AppContainer>
          <RouteAppForms />
        </AppContainer>
      </main>

      <AppFooter />
    </div>
  )
}

//----------------------------------------------------------------------------------
const AppBanner = (props: {
  onMenuClick: (event: any) => void
}) => {
  const classes = useStyles()
  return (
    <header className={classes.banner}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <PhoneIphoneIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Asvt React.v17 with TypeScript
          </Typography>
          <Button color="inherit" onClick={props.onMenuClick}>選單</Button>
        </Toolbar>
      </AppBar>
    </header>
  )
}
//----------------------------------------------------------------------------------
// const AppFooter = () => {
//   const classes = useStyles()
//   //const theme = useTheme()
//   return (
//     <footer className={classes.footer}>
//       <hr />
//       <p>
//         Copyright&nbsp;&copy;2021<a href="http://www.asiavista.com.tw" target="_blank" rel="noreferrer">&nbsp;Asia Vista Technology, Inc.&nbsp;</a>All rights reserved.
//       </p>
//     </footer>
//   )
// }
//----------------------------------------------------------------------------------
const Spinner = () => {
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
