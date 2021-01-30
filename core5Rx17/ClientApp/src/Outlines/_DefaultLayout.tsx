import React, { Suspense, useState } from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Typography, Backdrop, CircularProgress, AppBar, Toolbar, Divider, IconButton, Drawer } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import NavMenu from './NavMenu'
import RouteAppForms from './RouteAppForms'
import { AppContainer, AppFooter } from './OutlineWidgets'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menu: {
    width: 240
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  footer: {
    flexGrow: 1,
    textAlign: 'center'
  },
}))

//----------------------------------------------------------------------------------
//export default function DefaultLayout(props: { children?: React.ReactNode }) {
export default function DefaultLayout() {
  const classes = useStyles();
  const theme = useTheme();
  const [f_menu, setMenuFlag] = useState(false)

  function toggleDrawer() {
    setMenuFlag(f => !f)
  }

  return (
    <div className={classes.root}>

      {/* header */}
      <AppBanner f_menu={f_menu} onMenuClick={toggleDrawer} />

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={f_menu}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={toggleDrawer}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <NavMenu className={classes.menu} />
      </Drawer>

      <div className={clsx(classes.content, { [classes.contentShift]: f_menu })}>
        <main >
          <div className={classes.drawerHeader} />
          <AppContainer>
            <RouteAppForms />
          </AppContainer>          
        </main>
        <AppFooter />
      </div>
    </div>
  );
}

//----------------------------------------------------------------------------------
const AppBanner = (props: {
  f_menu: boolean
  onMenuClick: (event: any) => void
}) => {
  const classes = useStyles()
  return (
    <header>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: props.f_menu,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={props.onMenuClick}
            edge="start"
            className={clsx(classes.menuButton, props.f_menu && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Asvt React.v17 with TypeScript
          </Typography>
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
const BlockUI = (props: { open: boolean }) => {
  const classes = useStyles()
  return (
    <Backdrop className={classes.backdrop} open={props.open}>
      <div style={{ textAlign: 'center' }}>
        <CircularProgress color="primary" />
        <Typography variant="h5">
          載入中
        </Typography>
      </div>
    </Backdrop>
  )
}
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
