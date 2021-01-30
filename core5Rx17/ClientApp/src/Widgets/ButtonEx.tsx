import React from 'react'
import clsx from 'clsx'
import { Button as ButtonBase, ButtonProps, Fab, useMediaQuery, useScrollTrigger, withStyles, Zoom } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@material-ui/icons'
import scrollIntoView from 'scroll-into-view'

///
/// 自訂專案中常用的按鈕
/// 如：OkButton, CancelButton, SaveButton, RejectButton
///

//type ColorX = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | undefined
export type ButtonPropsEx = ButtonProps & { colorx?: ColorX, label: string }

//===================================================================================

/**
 * Button helper, 為專案內常用的應用準備，非一般化。
 * 現不支援 outlined button 版本，因為很少用到。
 * 
 * <Button>Primary 預設第一種顏色</Button>
 * <Button color="secondary">Secondary 第二種顏色</Button>
 * <Button style={{ color: 'green', backgroundColor: 'yellowgreen' }}>Styled</Button>
 */
export const ButtonEx: React.FC<ButtonPropsEx> = ({ label, colorx, disabled, ...props }) => {
  const { breakpoints } = useTheme()
  const matchMd = useMediaQuery(breakpoints.up('md'))
  const classes = useButtonExStyles()

  //console.log('ButtonEx', { label, colorx, disabled, props } )
  return (
    <ButtonBase
      variant="contained"
      color="primary"
      size={matchMd ? "large" : "medium"}
      className={clsx(colorx !== undefined && classes[colorx])}
      disabled={disabled}
      {...props}
    >
      {label}
    </ButtonBase>
  )
}

//--------------------------------------------------------
const useButtonExStyles = makeStyles(({ palette }) => ({
  primary: {
    color: palette.primary.contrastText,
    backgroundColor: palette.primary.main,
    '&:hover': {
      backgroundColor: palette.primary.dark,
    }
  },
  secondary: {
    color: palette.secondary.contrastText,
    backgroundColor: palette.secondary.main,
    '&:hover': {
      backgroundColor: palette.secondary.dark,
    }
  },
  info: {
    color: palette.info.contrastText,
    backgroundColor: palette.info.main,
    '&:hover': {
      backgroundColor: palette.info.dark,
    }
  },
  success: {
    color: palette.success.contrastText,
    backgroundColor: palette.success.main,
    '&:hover': {
      backgroundColor: palette.success.dark,
    }
  },
  error: {
    color: palette.error.contrastText,
    backgroundColor: palette.error.main,
    '&:hover': {
      backgroundColor: palette.error.dark,
    }
  },
  warning: {
    color: palette.warning.contrastText,
    backgroundColor: palette.warning.main,
    '&:hover': {
      backgroundColor: palette.warning.dark,
    }
  },
}))

//===================================================================================
/**
 * 特殊自訂按鈕
 * 
 * 範例：
 * <AgreeButton label='我同意以下條款並開始身分驗證' onClick={() => void} />
 */
export const AgreeButton: React.FC<ButtonPropsEx> = ({ colorx, ...others }) => {
  const classes = useAgreeButtonStyles()

  return (
    <ButtonEx colorx={colorx || 'success'} classes={classes} {...others} />
  )
}

const useAgreeButtonStyles = makeStyles(({ palette, }) => ({
  root: {
    padding: '0.8em 1.8em',
    borderRadius: '2em',
    fontSize: '1.25em'
  },
}))

/**
 * 自訂常用按鈕
 * 
 * 範例：
 * <AgreeButton label='我同意以下條款並開始身分驗證' onClick={() => void} />
 */
export const CommandButton = withStyles(({ spacing, breakpoints }) => ({
  root: {
    width: '20%',
    minWidth: 100,
    margin: spacing(0.5),
    paddingLeft: spacing(1.5),
    paddingRight: spacing(1.5),
    borderRadius: spacing(3)
  }
}))(ButtonEx);


/**
 * 自訂常用按鈕
 * 
 * 範例：
 * <AgreeButton label='我同意以下條款並開始身分驗證' onClick={() => void} />
 */
export const OneCommandButton = withStyles(({ spacing, breakpoints }) => ({
  root: {
    minWidth: 300,
    margin: spacing(0.5),
    paddingLeft: spacing(5),
    paddingRight: spacing(5),
    borderRadius: spacing(3),
    [breakpoints.down('xs')]: {
      width: '80%',
      paddingLeft: 'inherit',
      paddingRight: 'inherit'
    }
  }
}))(ButtonEx);

//========================================================
/**
 * Scroll Top FAB
 * 
 * 範例：
 * <ScrollTopFab />
 */
export function ScrollTopFab() {
  const classes = useScrollTopFabStyles()
  const trigger = useScrollTrigger({ threshold: 100 });


  function scrollToTop() {
    const root = document.getElementById('root')
    if (root !== null) {
      scrollIntoView(root)
      console.log('scrollToTop')
    }
  }

  return (
    <Zoom in={trigger}>
      <Fab className={classes.fab} color="secondary" size="small" onClick={scrollToTop} >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  )
}

const useScrollTopFabStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}))
//========================================================
