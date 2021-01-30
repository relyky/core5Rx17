import React from 'react'
//import styled from 'styled-components'
import SwalBase from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faInfoCircle, faExclamationTriangle, faTimesCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { makeStyles, useTheme } from '@material-ui/core/styles'

const swal = withReactContent(SwalBase)

type IconType = 'success' | 'error' | 'info' | 'warning' | 'question'

export default swal;

export function useMySwal() {
    const theme = useTheme()
    const classes = useStyles()

    const Icon: React.FC<{ type: IconType }> = props => {
        const { palette } = theme
        switch (props.type) {
            case 'success':
                return <FontAwesomeIcon icon={faCheckCircle} color={palette.success.main} />
            case 'error':
                return <FontAwesomeIcon icon={faTimesCircle} color={palette.error.main} />
            case 'info':
                return <FontAwesomeIcon icon={faInfoCircle} color={palette.info.main} />
            case 'warning':
                return <FontAwesomeIcon icon={faExclamationTriangle} color={palette.warning.main} />
            case 'question':
                return <FontAwesomeIcon icon={faQuestionCircle} color={palette.secondary.main} />
        }
    }

    function confirm(title: string, message: string = '', type: IconType = 'info') {
        return swal.fire({
            title: <span><Icon type={type} /> {title}</span>,
            text: message,
            confirmButtonText: `確認`,
            buttonsStyling: false,
            customClass: {
                container: classes.container,
                confirmButton: classes.confirmButton
            },
        })
    }

    // swal.clickCancel()
    // swal.clickConfirm()
    function reconfirm(title: string, message: string, type: IconType) {
        return swal.fire(title, message, type)
    }

    function showMsgBox(msg: ErrMsg) {
        return swal.fire({
            title: <span><Icon type={mapIcon(msg.errType)} /> {msg.errType}</span>,
            text: msg.errMsg,
            confirmButtonText: `確認`,
            buttonsStyling: false,
            customClass: {
                container: classes.container,
                confirmButton: classes.confirmButton
            },
        })
    }

    return { confirm, reconfirm, showMsgBox, swal }
}

//--------------------------------------------------------
const useStyles = makeStyles(({ palette, zIndex }) => ({
    container: {
        zIndex: `${zIndex.modal}!important` as any /* 把 SweetAlert2的高度從1060拉高 */
    },
    confirmButton: {
        color: palette.primary.contrastText,
        backgroundColor: palette.primary.main,
        padding: '0.5em 3em',
        borderRadius: '6em',
        border: 'unset',
        '&:focus': {
            outline: 'unset'
        },
        '&:hover': {
            backgroundColor: palette.primary.dark,
        }
    }
}))

/// ================================================
/// resource:
/// helper: mapping dictionary
function mapIcon(errType: ErrType) {
    /// ## Msg Type Mapping
    /// #LastErrMsg  #Swal      #LogLevel     #toast
    /// SUCCESS      success    Information
    /// INFO         info       Information   info
    /// WARNING      warning    Warning       warning
    /// ERROR        error      Error
    /// FAIL         error      Critical
    /// EXCEPTION    error      Critical
  
    const err2IconMap: Record<ErrType, IconType> = {
      SUCCESS: 'success',
      INFO: 'info',
      WARNING: 'warning',
      ERROR: 'error',
      FAIL: 'error',
      EXCEPTION: 'error'
    }
  
    const icon = err2IconMap[errType]
    return icon
  }
  