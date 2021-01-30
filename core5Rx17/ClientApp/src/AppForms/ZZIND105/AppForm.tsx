import React from 'react'
//import { withStyles } from '@material-ui/core/styles'
import { Box, Container, Link, makeStyles } from '@material-ui/core'
import { H1, P1 } from 'Widgets/TypographyEx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faInstagram, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons'

export default function AppForm({ formProfile }: AppFormProps) {
  const classes = useStyles()

  console.log(`${formProfile.FORM_ID}.render`, formProfile)
  return (
    <div className={classes.root}>
      <H1 style={{
        display: 'block',
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1
      }}>{formProfile.FORM_TITLE}</H1>
      <P1 style={{
        display: 'block',
        position: 'absolute',
        top: 50,
        left: 10,
        zIndex: 1
      }}>{formProfile.FORM_DESCRIPTION}<Link target="_blank" href={`https://www.youtube.com/watch?v=yh6lyefeUKc&ab_channel=OnlineTutorials`}>參考自這裡</Link></P1>

      <section className={classes.section}>
        <div className={classes.color}></div>
        <div className={classes.color}></div>
        <div className={classes.color}></div>
        <ul className={classes.ul}>
          <li className={classes.li}><a className={classes.icon}><FontAwesomeIcon icon={faFacebook} /></a></li>
          <li className={classes.li}><a className={classes.icon}><FontAwesomeIcon icon={faTwitter} /></a></li>
          <li className={classes.li}><a className={classes.icon}><FontAwesomeIcon icon={faInstagram} /></a></li>
          <li className={classes.li}><a className={classes.icon}><FontAwesomeIcon icon={faLinkedin} /></a></li>
          <li className={classes.li}><a className={classes.icon}><FontAwesomeIcon icon={faWhatsapp} /></a></li>
        </ul>
      </section>

    </div>
  )
}

//------------------------------------------------------------
const useStyles = makeStyles(({ palette, spacing, transitions }) => ({
  root: {
    '& > *': {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    },
  },
  section: {
    position: 'absolute',
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(to bottom, #ff4f8b, #dff1ff)',
    overflow: 'hidden',
    '&:before': {
      content: '""',
      position: 'absolute',
      width: '100%',
      height: '50%',
      bottom: 0,
      zIndex: 1,
      // background:'#000',
      borderTop: '1px solid rgba(255,255,255,0.5)',
      backdropFilter: 'blur(5px)'
    },
    '& $color:nth-child(1)': {
      background: '#ff359b',
      width: 600,
      height: 600,
      top: -350
    },
    '& $color:nth-child(2)': {
      background: '#00d2ff',
      width: 500,
      height: 600,
      bottom: -150,
      left: 100
    },
    '& $color:nth-child(3)': {
      background: '#fffd87',
      width: 300,
      height: 300,
      bottom: 50,
      right: 0
    },
  },
  color: {
    position: 'absolute',
    filter: 'blur(150px)'
  },
  ul: {
    position: 'relative',
    display: 'flex',
    zIndex: 2,
    '& $li': {
      position: 'relative',
      listStyle: 'none',
      margin: 10
    },
  },
  li: {},
  icon: {
    position: 'relative',
    width: 80,
    height: 80,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#fff',
    fontSize: '3em',
    border: '1px solid rgba(255,255,255,0.4)',
    borderRight: '1px solid rgba(255,255,255,0.2)',
    borderBottom: '1px solid rgba(255,255,255,0.2)',
    boxShadow: '0 5px 45px rgba(0,0,0,0.1)',
    backdropFilter: 'blur(2px)',
    transition: '0.5s',
    overflow: 'hidden',
    '&:hover': {
      transform: 'translateY(-20px)'
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: 50,
      height: '100%',
      background: 'rgba(255,255,255,0.5)',
      transform: 'skewX(45deg) translateX(150px)',
      transition: '0.5s'
    },
    '&:hover:before': {
      transform: 'skewX(45deg) translateX(-150px)',
    },
  },
}))