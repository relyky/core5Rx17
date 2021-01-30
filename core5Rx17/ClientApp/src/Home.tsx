import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { useMediaQuery, Container, Card, CardContent, Typography, FormGroup, FormControlLabel, Checkbox, Grid } from '@material-ui/core'
import { AppFooter } from 'Outlines/OutlineWidgets'
import DividerWithText from 'Widgets/DividerWithText'
import logo from './logo.svg'
import styles from 'Home.module.scss'
import {
  FindInPage as FindInPageIcon,
  CreditCard as CreditCardIcon,
  FormatPaintTwoTone as PaintIcon
} from '@material-ui/icons'

export default function Home() {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const theme = useTheme();
  const matchXs = useMediaQuery(theme.breakpoints.down('xs'))

  useEffect(() => {
    setDense(matchXs)
    setSecondary(!matchXs)
  }, [matchXs])

  return (
    <React.Fragment>
      <Container className={classes.root}>
        <Card className={classes.mainblock}>
          <CardContent>

            <Logo />
            <DividerWithText>
              <Typography variant={matchXs ? 'h5' : 'h4'} color="textPrimary" className={classes.title} >渣打信用卡線上申辦</Typography>
            </DividerWithText>

            {/* 
            <FormGroup row>
              <FormControlLabel
                control={<Checkbox checked={dense} onChange={(event) => setDense(event.target.checked)} />}
                label="Enable dense"
              />
              <FormControlLabel
                control={<Checkbox checked={secondary} onChange={(event) => setSecondary(event.target.checked)} />}
                label="Enable secondary text"
              />
            </FormGroup>
            */}

            <Grid container spacing={2}>

              <Grid item xs={12} sm={6}>
                <Typography variant="h6" className={classes.subtitle}>
                  ETP
                </Typography>
                <List dense={dense} className={classes.list}>
                  <ListItem button>
                    <ListItemIcon><CreditCardIcon /></ListItemIcon>
                    <ListItemText
                      primary="申請信用卡"
                      secondary={secondary ? 'Secondary text' : null}
                    />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon><FindInPageIcon /></ListItemIcon>
                    <ListItemText
                      primary="進度查詢"
                      secondary={secondary ? 'Secondary text' : null}
                    />
                  </ListItem>
                </List>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="h6" className={classes.subtitle}>
                  ETB
                </Typography>
                <List dense={dense} className={classes.list}>
                  <ListItem button>
                    <ListItemIcon><CreditCardIcon /></ListItemIcon>
                    <ListItemText
                      primary="申請信用卡"
                      secondary={secondary ? 'Secondary text' : null}
                    />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon><FindInPageIcon /></ListItemIcon>
                    <ListItemText
                      primary="進度查詢"
                      secondary={secondary ? 'Secondary text' : null}
                    />
                  </ListItem>
                </List>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="h6" className={classes.subtitle}>
                  NTB
                </Typography>
                <List dense={dense} className={classes.list}>
                  <ListItem button>
                    <ListItemIcon><CreditCardIcon /></ListItemIcon>
                    <ListItemText
                      primary="申請信用卡"
                      secondary={secondary ? 'Secondary text' : null}
                    />
                  </ListItem>
                  <ListItem button component={Link} to='/scbntbiq01' >
                    <ListItemIcon><FindInPageIcon /></ListItemIcon>
                    <ListItemText
                      primary="進度查詢"
                      secondary={secondary ? 'Secondary text' : null}
                    />
                  </ListItem>
                </List>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="h6" className={classes.subtitle}>
                  MyData
                </Typography>
                <List dense={dense} className={classes.list}>
                  <ListItem button component={Link} to='/test' >
                    <ListItemIcon><FindInPageIcon /></ListItemIcon>
                    <ListItemText
                      primary="MyData"
                      secondary={secondary ? 'Secondary text' : null}
                    />
                  </ListItem>
                </List>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="h6" className={classes.subtitle}>
                  畫面樣板
                </Typography>
                <List dense={dense} className={classes.list}>

                  <ListItem button component={Link} to='/apzz0102' >
                    <ListItemIcon children={<PaintIcon />} />
                    <ListItemText
                      primary="調色盤"
                      secondary={secondary ? 'Secondary text' : null}
                    />
                  </ListItem>

                  <ListItem button component={Link} to='/zzsys102' >
                    <ListItemIcon children={<PaintIcon />} />
                    <ListItemText
                      primary="偵測裝置"
                      secondary={secondary ? '偵測裝置為手機或個人電腦等。' : null}
                    />
                  </ListItem>

                  <ListItem button component={Link} to='/zzsys103' >
                    <ListItemIcon children={<PaintIcon />} />
                    <ListItemText
                      primary="Grid/Flexbox Demo"
                      secondary={secondary ? 'RWD部局展示。' : null}
                    />
                  </ListItem>

                  <ListItem button component={Link} to='/login' >
                    <ListItemIcon children={<PaintIcon />} />
                    <ListItemText
                      primary="登入範本"
                      secondary={secondary ? 'Sign-in side template' : null}
                    />
                  </ListItem>

                  <ListItem button component={Link} to='/zzfrm101' >
                    <ListItemIcon children={<PaintIcon />} />
                    <ListItemText
                      primary="表單範本１"
                      secondary={secondary ? 'Secondary text' : null}
                    />
                  </ListItem>

                  <ListItem button component={Link} to='/zzfrm102' >
                    <ListItemIcon children={<PaintIcon />} />
                    <ListItemText
                      primary="員工出勤工作紀錄"
                      secondary={secondary ? 'Secondary text' : null}
                    />
                  </ListItem>

                  <ListItem button component={Link} to='/zzind103' >
                    <ListItemIcon children={<PaintIcon />} />
                    <ListItemText
                      primary="網路購物使用狀況調查問卷"
                      secondary={secondary ? 'Secondary text' : null}
                    />
                  </ListItem>
                  
                  <ListItem button component={Link} to='/zzind104' >
                    <ListItemIcon children={<PaintIcon />} />
                    <ListItemText
                      primary="用餐滿意度調查"
                      secondary={secondary ? 'Secondary text' : null}
                    />
                  </ListItem>

                  <ListItem button component={Link} to='/zzind105' >
                    <ListItemIcon children={<PaintIcon />} />
                    <ListItemText
                      primary="玻璃鏡面"
                      secondary={secondary ? 'Glassmorphism | Shiny Glass Social Media Icon Hover Effects' : null}
                    />
                  </ListItem>

                  <ListItem button component={Link} to='/zzind106' >
                    <ListItemIcon children={<PaintIcon />} />
                    <ListItemText
                      primary="玻璃鏡面2"
                      secondary={secondary ? 'Glassmorphism | Backdrop Filter CSS Blur' : null}
                    />
                  </ListItem>

                </List>
              </Grid>

            </Grid>
          </CardContent>
        </Card>
      </Container>
      <AppFooter />
    </React.Fragment>
  );
}

//--------------------------------
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 920,
  },
  title: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '1em',
      fontWeight: 600
    }
  },
  mainblock: {
    marginTop: '3vmin',
    marginBottom: '3vmin'
  },
  subtitle: {
    margin: theme.spacing(4, 0, 2),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(2, 0, 1)
    }
  },
  list: {
    color: theme.palette.info.main
  }
}));

//-----------------------------------------
function Logo() {
  return (
    <div style={{ textAlign: 'center' }}>
      <img src={logo} className={styles["App-logo"]} alt="logo" />
    </div>
  )
}
