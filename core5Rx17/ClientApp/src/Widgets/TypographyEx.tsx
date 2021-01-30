import React from 'react'
import clsx from 'clsx'
import { Box, BoxProps, makeStyles, Typography, TypographyProps, useMediaQuery, useTheme } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
//import styled, { ThemeProvider } from 'styled-components'

/**
* TypographyProps 擴充屬性
*/
type TypographyPropsEx = TypographyProps & { colorx?: ColorX }

/**
 * Typography variant="h1"
 */
export const H1: React.FC<TypographyPropsEx> = ({ style, colorx, ...props }) => {
  const { palette } = useTheme()
  const color = colorx !== undefined ? palette[colorx].main : undefined
  return (
    <Typography style={{ color, ...style }} variant="h1" {...props} />
  )
}

/**
 * Typography variant="h2"
 */
export const H2: React.FC<TypographyPropsEx> = ({ style, colorx, ...props }) => {
  const { palette } = useTheme()
  const color = colorx !== undefined ? palette[colorx].main : undefined
  return (
    <Typography style={{ color, ...style }} variant="h2" {...props} />
  )
}

/**
 * Typography variant="h3"
 */
export const H3: React.FC<TypographyPropsEx> = ({ style, colorx, ...props }) => {
  const { palette } = useTheme()
  const color = colorx !== undefined ? palette[colorx].main : undefined
  return (
    <Typography style={{ color, ...style }} variant="h3" {...props} />
  )
}

/**
 * Typography variant="h4"
 */
export const H4: React.FC<TypographyPropsEx> = ({ style, colorx, ...props }) => {
  const { palette } = useTheme()
  const color = colorx !== undefined ? palette[colorx].main : undefined
  return (
    <Typography style={{ color, ...style }} variant="h4" {...props} />
  )
}

/**
 * Typography variant="h5"
 */
export const H5: React.FC<TypographyPropsEx> = ({ style, colorx, ...props }) => {
  const { palette } = useTheme()
  const color = colorx !== undefined ? palette[colorx].main : undefined
  return (
    <Typography style={{ color, ...style }} variant="h5" {...props} />
  )
}

/**
 * Typography variant="h6"
 */
export const H6: React.FC<TypographyPropsEx> = ({ style, colorx, ...props }) => {
  const { palette } = useTheme()
  const color = colorx !== undefined ? palette[colorx].main : undefined
  return (
    <Typography style={{ color, ...style }} variant="h6" {...props} />
  )
}

/**
 * Typography variant="subtitle1"
 */
export const Subtitle1: React.FC<TypographyPropsEx> = ({ style, colorx, ...props }) => {
  const { palette } = useTheme()
  const color = colorx !== undefined ? palette[colorx].main : undefined
  return (
    <Typography style={{ color, ...style }} variant="subtitle1" {...props} />
  )
}

/**
 * Typography variant="subtitle2"
 */
export const Subtitle2: React.FC<TypographyPropsEx> = ({ style, colorx, ...props }) => {
  const { palette } = useTheme()
  const color = colorx !== undefined ? palette[colorx].main : undefined
  return (
    <Typography style={{ color, ...style }} variant="subtitle2" {...props} />
  )
}

/**
 * Typography variant="body1"
 */
export const P1: React.FC<TypographyPropsEx> = ({ style, colorx, ...props }) => {
  const { palette } = useTheme()
  const color = colorx !== undefined ? palette[colorx].main : undefined
  return (
    <Typography style={{ color, ...style }} variant="body1" {...props} />
  )
}

/**
 * Typography variant="body2"
 */
export const P2: React.FC<TypographyPropsEx> = ({ style, colorx, ...props }) => {
  const { palette } = useTheme()
  const color = colorx !== undefined ? palette[colorx].main : undefined
  return (
    <Typography style={{ color, ...style }} variant="body2" {...props} />
  )
}

/**
 * Typography variant="caption"
 */
export const Caption: React.FC<TypographyPropsEx> = ({ style, colorx, ...props }) => {
  const { palette } = useTheme()
  const color = colorx !== undefined ? palette[colorx].main : undefined
  return (
    <Typography style={{ color, ...style }} variant="caption" {...props} />
  )
}

/**
 * Typography variant="button"
 */
export const Button: React.FC<TypographyPropsEx> = ({ style, colorx, ...props }) => {
  const { palette } = useTheme()
  const color = colorx !== undefined ? palette[colorx].main : undefined
  return (
    <Typography style={{ color, ...style }} variant="button" {...props} />
  )
}

/**
 * Typography variant="overline"
 */
export const Overline: React.FC<TypographyPropsEx> = ({ style, colorx, ...props }) => {
  const { palette } = useTheme()
  const color = colorx !== undefined ? palette[colorx].main : undefined
  return (
    <Typography style={{ color, ...style }} variant="overline" {...props} />
  )
}

/**
 * blockquote
 */
export const Blockquote = withStyles(({ palette, spacing }) => ({
  root: {
    margin: spacing(1, 1, 2, 1),
    padding: spacing(1),
    borderLeftStyle: 'solid',
    borderLeftWidth: spacing(1) * 0.5,
    borderLeftColor: palette.primary.main,
    backgroundColor: palette.grey[50]
  }
}))((props: BoxProps & { classes: Record<string, string>, colorx?: ColorX }) => {
  const { classes, colorx, style, ...others } = props
  const { palette } = useTheme()
  const borderLeftColor = colorx !== undefined ? palette[colorx].main : undefined
  return (
    <Box component={'blockquote'} className={classes.root} style={{ borderLeftColor, ...style }} {...others} />
  )
})


// /**
//  * blockquote
//  */
// export const Blockquote = styled('blockquote')`
// color: rgb(116, 129, 141);
// margin: 0px 0px 24px;
// padding: 0px 0px 0px 12px;
// border-left: 4px solid rgb(230, 236, 241);
// border-top-color: rgb(230, 236, 241);
// border-right-color: rgb(230, 236, 241);
// border-bottom-color: rgb(230, 236, 241);
// `;

//------------------------------------------------------------
/**
 * pre
 */
export const Pre: React.FC = (props) => {
  const classes = usePreStyles()
  return (
    <pre className={classes.root} {...props} />
  )
}

const usePreStyles = makeStyles(({ palette }) => ({
  root: {
    whiteSpace: 'break-spaces',
    '&:hover': {
      backgroundColor: palette.grey[100]
    }
  }
}))

//------------------------------------------------------------
/**
 * 範例: \<BR xsHide /> 
 */
export const BR = withStyles(({ breakpoints }) => ({
  xsHide: {
    [breakpoints.down('xs')]: {
      display: 'none'
    }
  }
}))((props: {
  classes: Record<string, string>,
  xsHide?: boolean
}) => {
  return (
    <br className={clsx(props.xsHide && props.classes.xsHide)} />
  )
})

// export function BR(props: { xsHide: boolean | undefined }) {
//   const { breakpoints } = useTheme()
//   const matchXs = useMediaQuery(breakpoints.down('xs'))
//
//   // xsHide
//   if(props.xsHide && matchXs)
//     return (<></>)
//
//   // default
//   return (<br />)
// }