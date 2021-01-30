import React from 'react'
//import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Paper, useMediaQuery, useTheme, PaperProps } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Blockquote, H1, H2, H4, P1, Pre, Subtitle2 } from 'Widgets/TypographyEx'
import { AppContainer } from 'Outlines/OutlineWidgets'
import { useLocalStorageV2 } from 'hooks/useWindowResource';
import { ButtonEx } from 'Widgets/ButtonEx';
import { FlexboxColumnLines } from './FlexboxColumnLines';
import GridDemo from './GridDemo'

const useStyles = makeStyles(({ palette, spacing }) => ({
  root: {
  },
}));

export default function AppForm({ formProfile, isLandscape, isPortrait }: AppFormProps) {
  const classes = useStyles()
  const [randSize23, setRandSize23] = useLocalStorageV2('randSize23', () => makeRandArray(23))

  console.log(`${formProfile.FORM_ID}.render`, { formProfile })
  return (
    <div className={classes.root}>
      <h1>{`${formProfile.FORM_ID}:${formProfile.FORM_TITLE}`}</h1>
      <p>{`${formProfile.FORM_DESCRIPTION}`}</p>

      <AppContainer>
        <ShowRwdBreakpoint />

        <WellPaper>
          <H4>Grid</H4>
          <GridDemo />
        </WellPaper>

        <WellPaper>
          <H4>Flexbox - 固定長寬</H4>
          <Box display='flex' flexDirection='row' flexWrap='wrap' >
            {Array.from(Array(23)).map((__, i) => (
              <FixSizeItem key={i}>
                {`${i + 1}`}
              </FixSizeItem>))
            }
          </Box>
        </WellPaper>

        <ButtonEx label='重新亂數生成項目大小' onClick={() => setRandSize23(makeRandArray(23))} />

        <WellPaper>
          <H4>Flexbox - 變動寬度</H4>
          <FlexBox flexDirection='row' flexWrap='wrap' >
            {randSize23.map((size, i) => (
              <Box key={i} flex='1 0 auto' >
                <SimsItem width={size}>
                  {`${i + 1}`}
                </SimsItem>
              </Box>))
            }
          </FlexBox>
        </WellPaper>

        <WellPaper>
          <H4>Flexbox - 變動高度(column))</H4>
          <FlexboxColumnLines itemList={randSize23} columnWidth={176} />
        </WellPaper>

      </AppContainer>
    </div>
  )
}

//------------------------------------------------------------
// const WellPaper = withStyles(({ spacing }) => ({
//   root: {
//     margin: spacing(3),
//     padding: spacing(1)
//   }
// }))(Paper)

const WellPaper = React.forwardRef<typeof Paper, PaperProps>((props, ref) => {
  const classes = useWellPaperStyles()
  return (
    <Paper classes={classes} ref={ref} {...props} />
  )
})

const useWellPaperStyles = makeStyles(({ spacing }) => ({
  root: {
    margin: spacing(3),
    padding: spacing(1)
  }
}))

//------------------------------------------------------------
const WellBox = withStyles(({ spacing }) => ({
  root: {
    margin: spacing(3),
    padding: spacing(1)
  }
}))(Box)
//------------------------------------------------------------
const FixSizeItem = withStyles(({ spacing }) => ({
  root: {
    border: 'solid thin grey',
    width: spacing(16),
    height: spacing(9),
    margin: spacing(1),
    padding: spacing(1)
  }
}))(Box)
//------------------------------------------------------------
const FlexBox = withStyles(({ spacing }) => ({
  root: {
    display: 'flex',
    '&:after': {
      display: 'block',
      flex: '999 999 auto',
      content: "''"
    }
  }
}))(Box)
//===========================================================
/** 取模擬變動寬度的項目 */
const ShowRwdBreakpoint: React.FC = (props) => {
  const { breakpoints } = useTheme()

  const matchXs = useMediaQuery(breakpoints.down('xs'))
  const matchSm = useMediaQuery(breakpoints.only('sm'))
  const matchMd = useMediaQuery(breakpoints.only('md'))
  const matchLg = useMediaQuery(breakpoints.only('lg'))
  const matchXl = useMediaQuery(breakpoints.up('xl'))

  const rwdWidth = matchXs ? `xs ${breakpoints.values.xs}<${breakpoints.values.sm}`
    : matchSm ? `sm ${breakpoints.values.sm}<${breakpoints.values.md}`
      : matchMd ? `md ${breakpoints.values.md}<${breakpoints.values.lg}`
        : matchLg ? `lg ${breakpoints.values.lg}<${breakpoints.values.xl}`
          : matchXl ? `xl ${breakpoints.values.xl}<~`
            : '--'

  return (
    <H1>RWD: {rwdWidth}</H1>
  )
}

//===========================================================
// /** 模擬變動寬度的項目 */
const SimsItem: React.FC<{ width?: number, height?: number }> = (props) => {
  const { spacing } = useTheme()
  return (
    <Box style={{
      border: 'solid thin grey',
      width: props.width === undefined ? spacing(20) : props.width,
      height: props.height === undefined ? spacing(20) : props.height,
      margin: spacing(1),
      padding: spacing(1),
    }}>
      {props.children}
    </Box>
  )
}
//===========================================================
function makeRandArray(length: number) {
  console.log('ON:makeRandArray', length)
  //debugger
  return Array.from(Array(length)).map(() => randSize())
}

function randSize() {
  return 16 * (11 + Math.floor(Math.random() * 8))
}
