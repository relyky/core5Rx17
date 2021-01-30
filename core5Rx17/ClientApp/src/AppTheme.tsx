import { createMuiTheme } from '@material-ui/core/styles'

/// to customize theme
/// ref→[Default Theme](https://material-ui.com/customization/default-theme/#default-theme)
/// ref→[COLOR TOOL](https://material.io/resources/color/#!/?view.left=0&view.right=0)

// #region customize theme sample
/*
const theme = createMuiTheme({
  //# 變更預設的 theme
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: 14,
    htmlFontSize: 16
  },
  palette: {
    primary: {
      light: '#7986cb',
      main: '#3f51b5',
      dark: '#303f9f',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff4081',
      main: '#f50057',
      dark: '#c51162',
      contrastText: '#fff'
    },
    success: {
      light: '#81c784',
      main: '#4caf50',
      dark: '#388e3c',
      contrastText: 'rgba(0,0,0,0.87)'
    },
    warning: {
      light: '#ffb74d',
      main: '#ff9800',
      dark: '#f57c00',
      contrastText: 'rgba(0,0,0,0.87)',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
  }
}, {
  //# 可擴增預設的 theme 
  palette: {
    // 第三種主色 
    tertiary: { light: "#45FFFF", main: "#00E6E6", dark: "#00B2B2", contrastText: "#fff" }
  }
})
*/
// #endregion

export const defaultTheme = createMuiTheme({

}, {
  ////# 可擴增預設的 theme 
  //palette: {
  //  // 第三種主色 
  //  tertiary: { light: "#45FFFF", main: "#00E6E6", dark: "#00B2B2", contrastText: "#fff" }
  //}
})

export const asvtTheme = createMuiTheme({
  breakpoints: {
    values: { xs: 0, sm: 576, md: 960, lg: 1280, xl: 1600 } // custom 
    //values: { xs: 0, sm: 576, md: 768, lg: 1200, xl: 1400 } // Bootstrap 5
    //values: { xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920 } // Material UI 4
    //values: { xs: 0, sm: 425, md: 768, lg: 1024, xl: 1440 } // Chrome
  },
  typography: {
    fontFamily: `-apple-system, BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","微軟正黑體","Microsoft JhengHei","微软雅黑","Microsoft YaHei","標楷體";`,
    fontSize: 14,
    htmlFontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      //fontFamily: 'inherit',
      fontWeight: 500,
      fontSize: '2rem', // 6rem
      lineHeight: 1.167,
      letterSpacing: "-0.01562em"
    },
    h2: {
      //fontFamily: 'inherit',
      fontWeight: 500,
      fontSize: '1.75rem', // 3.75rem
      lineHeight: 1.2,
      letterSpacing: '-0.00833em'
    },
    h3: {
      //fontFamily: 'inherit',
      fontWeight: 500,
      fontSize: "1.5rem", // 3rem
      lineHeight: 1.167,
      letterSpacing: "0em"
    },
    h4: {
      //fontFamily: 'inherit',
      fontWeight: 600,
      fontSize: "1.25rem", // 2.125rem
      lineHeight: 1.235,
      letterSpacing: "0.00735em"
    },
    h5: {
      //fontFamily: 'inherit',
      fontWeight: 600,
      fontSize: "1.125rem", // 1.5rem
      lineHeight: 1.334,
      letterSpacing: "0em"
    },
    h6: {
      //fontFamily: 'inherit',
      fontWeight: 600,
      fontSize: "1rem", // 1.25rem
      lineHeight: 1.6,
      letterSpacing: "0.0075em"
    },
    body1: {
      //fontFamily: 'inherit',
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.5,
      letterSpacing: "0.00938em"
    }
  },
  palette: {
    common: {
      black: '#000',
      white: '#fff'
    },
    type: "light",
    primary: {
      light: '#cf5ce2',
      main: '#9b27af',
      dark: '#69007f',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff77a9',
      main: '#ec407a',
      dark: '#b4004e',
      contrastText: '#fff'
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
      contrastText: '#fff'
    },
    warning: {
      light: '#ffb74d',
      main: '#ff9800',
      dark: '#f57c00',
      contrastText: '#fff'
    },
    info: {
      light: '#64b5f6',
      main: '#2196f3',
      dark: '#1976d2',
      contrastText: '#fff'
    },
    success: {
      light: '#81c784',
      main: '#4caf50',
      dark: '#388e3c',
      contrastText: '#fff'
    },
    background: {
      paper: '#fff',
      default: '#f6e5f3'
    }
  },
}, {
  ////# 可擴增預設的 theme 
  //palette: {
  //  // 第三種主色 
  //  tertiary: { light: "#45FFFF", main: "#00E6E6", dark: "#00B2B2", contrastText: "#fff" }
  //}
})
