import React from 'react'
//import { withStyles } from '@material-ui/core/styles'
import { Box, Container, Link, makeStyles } from '@material-ui/core'
import { H1, P1 } from 'Widgets/TypographyEx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faInstagram, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import styles from './AppForm.module.scss'

export default function AppForm({ formProfile }: AppFormProps) {
  //const classes = useStyles()

  console.log(`${formProfile.FORM_ID}.render`, formProfile, styles)
  return (
    <div className={styles.root}>
      <H1 style={{
        display: 'block',
        position: 'absolute',
        top: 10,
        left: 10,
        color: 'white',
        zIndex: 1
      }}>{formProfile.FORM_TITLE}</H1>
      <P1 style={{
        display: 'block',
        position: 'absolute',
        top: 50,
        left: 10,
        color: 'white',
        zIndex: 1
      }}>{formProfile.FORM_DESCRIPTION}<Link target="_blank" href={`https://www.youtube.com/watch?v=wiIbol5tZaI&ab_channel=AdrianTwarog`}>參考自這裡</Link></P1>

      <div className={styles.box}>
        Hello World
      </div>

    </div>
  )
}

//------------------------------------------------------------
const useStyles = makeStyles(({ palette, spacing, transitions }) => ({
  root: {
    minHeight: '100vh',
    background: `url('/content/images/angelina-yan-joldj0Oan6Y-unsplash.jpg')`
  },
}))