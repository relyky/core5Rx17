import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { useTheme } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import WarningIcon from '@material-ui/icons/Warning'
import { ToastContainer as ToastContainerBase, toast as toastFn } from 'react-toastify';
import './toast.scss'; // 靜態調整css
//import 'react-toastify/dist/ReactToastify.css';

// 調整css，利用 styled.components 以取得 Material UI Theme 以JS程式調整css
const StyledToastContainerBase = styled(ToastContainerBase)`
  ${({ theme }) => `
    .Toastify__toast--info {
      background-color: ${theme.palette.info.light}
    }
    .Toastify__toast--success {
      background-color: ${theme.palette.success.light}
    }
    .Toastify__toast--error {
      background-color: ${theme.palette.error.light}
    }
    .Toastify__toast--warning {
      background-color: ${theme.palette.warning.light}
    }
  `}
`;

/**
 * toast container
 * 參考 https://fkhadra.github.io/react-toastify/introduction
 */
const ToastContainer = () => {
  const theme = useTheme()
  return (
    <ThemeProvider theme={theme}>
      <StyledToastContainerBase
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ThemeProvider>
  )
}

/**
 * toast wrapper
*/
const toast = {
  info: (msg: string) => toastFn.info(<span><InfoIcon style={{ verticalAlign: 'bottom' }} /> {msg}</span>),
  success: (msg: string) => toastFn.success(<span><CheckCircleIcon style={{ verticalAlign: 'bottom' }} /> {msg}</span>),
  error: (msg: string) => toastFn.error(<span><ErrorIcon style={{ verticalAlign: 'bottom' }} /> {msg}</span>),
  warning: (msg: string) => toastFn.warning(<span><WarningIcon style={{ verticalAlign: 'bottom' }} /> {msg}</span>)
}

export { ToastContainer, toast }

// toast("🦄 Wow so easy ! (defalut)");
// toast.info("🦄 Wow so easy ! (info)");
// toast.success("🦄 Wow so easy ! (success)");
// toast.error("🦄 Wow so easy ! (error)");
// toast.warning("🦄 Wow so easy ! (warning)");
// toast.dark("🦄 Wow so easy ! (dark)");

//function App() {
//  const notify = () => toast("Wow so easy !");
//  return (
//    <div>
//      <button onClick={notify}>Notify !</button>
//      <ToastContainer />
//    </div>
//  );
//}
