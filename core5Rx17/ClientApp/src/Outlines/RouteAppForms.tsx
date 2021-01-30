import React, { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useTheme } from '@material-ui/core/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'

//## to register AppForms
const Home = lazy(() => import('Home'))
const AboutUs = lazy(() => import('AboutUs'))
const APZZ0101 = lazy(() => import('AppForms/APZZ0101/appCtx'))
const APZZ0102 = lazy(() => import('AppForms/APZZ0102/appCtx'))
const APRA0201 = lazy(() => import('AppForms/APRA0201/appCtx'))
const APRA0202 = lazy(() => import('AppForms/APRA0202/appCtx'))
const APSCB101 = lazy(() => import('AppForms/APSCB101/appCtx'))
const APSCB102 = lazy(() => import('AppForms/APSCB102/appCtx'))
const ZZFRM101 = lazy(() => import('AppForms/ZZFRM101/appCtx'))
const ZZFRM102 = lazy(() => import('AppForms/ZZFRM102/appCtx'))
const ZZLAB102 = lazy(() => import('AppForms/ZZLAB102/appCtx'))

export default function RouteAppForms() {
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route path="/zzfrm101" component={ZZFRM101} />
        <Route path="/zzfrm102" component={ZZFRM102} />
        <Route path="/apzz0101" component={APZZ0101} />
        <Route path="/apzz0102" component={APZZ0102} />
        <Route path="/apra0201" component={APRA0201} />
        <Route path="/apra0202" component={APRA0202} />
        <Route path="/apscb101" component={APSCB101} />
        <Route path="/apscb102" component={APSCB102} />
        <Route path="/zzlab102" component={ZZLAB102} />
        <Route path="*">
          <NotMatch />
        </Route>
      </Switch>
    </Suspense>
  )
}

//----------------------------------------------------------------------------------
function NotMatch() {
  return (
    <div style={{ textAlign: 'center', fontSize: 72, fontWeight: 800 }}>
      404 Not Found!
    </div>
  )
}
//----------------------------------------------------------------------------------
const Spinner = () => {
  const theme = useTheme()
  return (
    <div style={{ textAlign: 'center' }}>
      <FontAwesomeIcon icon={faCog} spin style={{
        fontSize: '8em',
        color: theme.palette.primary.main,
        marginTop: '8%',
        marginBottom: '8%'
      }} />
    </div>
  )
}
//----------------------------------------------------------------------------------
