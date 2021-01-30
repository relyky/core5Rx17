import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
//import FaceIcon from '@material-ui/icons/Face';

//import logo from 'assets/logo.svg'
import { useStoreActions } from 'store/store'

const useStyles = makeStyles((theme) => ({
  segment: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function AboutUs() {
  const classes = useStyles();
  const { assignAppInfo } = useStoreActions()

  //## init.
  useEffect(() => {
    // 通報現在在那支作業
    assignAppInfo({ FORM_ID: 'AboutUs', FORM_TITLE: '關於我們', FORM_DESCRIPTION: '噓，這是一個祕密唷！' })
  }, [])

  //console.log('Home', { appInfo })
  return (
    <React.Fragment>
      <p style={{ textAlign: 'center' }}>噓， 這是一個祕密唷！</ p>
      <div className={classes.segment}>
        <Chip
          variant="outlined"
          label="史瑞克"
          avatar={<Avatar src="https://e.blog.xuite.net/e/a/2/0/12273374/blog_17052/txt/21196810/5.jpg" />}
          color="primary"
          clickable
        />
        <Chip
          variant="outlined"
          label="驢子"
          avatar={<Avatar src="https://www.bomb01.com/upload/news/original/4afbf8cd17749c9c8ed5b18808ef1771.jpg" />}
          color="secondary"
          clickable
        />
        <Chip
          variant="outlined"
          label="長靴貓"
          avatar={<Avatar src="https://p2.bahamut.com.tw/B/2KU/60/b030315c9955b016522cf5b1fa12vfg5.JPG" />}
          color="default"
          clickable
        />
      </div>
    </React.Fragment>
  );
}
