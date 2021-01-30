///
/// 擺放通用的 classNmae / classes / useStyles
///

import { makeStyles } from "@material-ui/core";

export default makeStyles(({ breakpoints }) => ({
  xsHide: {
    [breakpoints.down('xs')]: {
      display: 'none'
    }
  }
}))
