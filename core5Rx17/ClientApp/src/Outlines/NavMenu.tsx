import React from 'react'
import { Link } from 'react-router-dom'
import { List, Divider, ListItem, ListItemIcon, ListItemText, Switch } from '@material-ui/core'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import { useLocalStorageV2 } from 'hooks/useWindowResource'

export default function NavMenu(props: {
  className: string,
  onClick?: (event:any)=>void
}) {
  const [f_mobile, setMobileFlag] = useLocalStorageV2<boolean>('f_mobile', false)
  return (
    <nav className={props.className}
      onClick={props.onClick}
      role="presentation" >
      <List>
        <ListItem button component={Link} to='/apzz0101'>
          <ListItemIcon children={<InboxIcon />} />
          <ListItemText primary={'哈囉世界好'} />
        </ListItem>
        <ListItem button component={Link} to='/apzz0102'>
          <ListItemIcon children={<MailIcon />} />
          <ListItemText primary={'調色盤'} />
        </ListItem>
        <ListItem button component={Link} to='/apzz0103'>
          <ListItemIcon children={<MailIcon />} />
          <ListItemText primary={'測試HOOKS'} />
        </ListItem>
        <ListItem button component={Link} to='/apzz0104'>
          <ListItemIcon children={<MailIcon />} />
          <ListItemText primary={'apzz0104'} />
        </ListItem>
        <ListItem button component={Link} to='/apscb101'>
          <ListItemIcon children={<MailIcon />} />
          <ListItemText primary={'渣打信用卡線上申辦(試作)'} />
        </ListItem>
        <ListItem button component={Link} to='/apra0201'>
          <ListItemIcon children={<MailIcon />} />
          <ListItemText primary={'狀態機應用'} />
        </ListItem>
        <ListItem button component={Link} to='/apra0202'>
          <ListItemIcon children={<MailIcon />} />
          <ListItemText primary={'Rx.js 應用'} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button component={Link} to='/'>
          <ListItemIcon children={<InboxIcon />} />
          <ListItemText primary={'首頁'} />
        </ListItem>
        <ListItem button component={Link} to='/about'>
          <ListItemIcon children={<MailIcon />} />
          <ListItemText primary={'關於我們'} />
        </ListItem>
        <ListItem button onClick={() => setMobileFlag(!f_mobile)}>
          <ListItemIcon
            children={<Switch color="primary" checked={f_mobile} />}
          />
          <ListItemText primary={'行動版'} />
        </ListItem>
      </List>
    </nav>
  )
}
