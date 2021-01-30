import React, { useMemo, Suspense, lazy } from 'react'
import { Route, Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import { useLocalStorageV2 } from 'hooks/useWindowResource'
import { ToastContainer } from 'Widgets/toast'
import { defaultTheme, asvtTheme } from 'AppTheme'
import { Spinner } from 'Outlines/OutlineWidgets'
import { ScrollTopFab } from 'Widgets/ButtonEx';
import DefaultLayout from 'Outlines/_DefaultLayout'
import MobileLayout from 'Outlines/_MobileLayout'

//import './App.scss'

const Home = lazy(() => import('Home'))
const AboutUs = lazy(() => import('AboutUs'))
const Signin = lazy(() => import('Signin'))
const SCBNTBIQ01 = lazy(() => import('AppForms/SCBNTBIQ01/appCtx'))
const SCBNTBIQ11 = lazy(() => import('AppForms/SCBNTBIQ11/appCtx'))
const SCBNTBIQ21 = lazy(() => import('AppForms/SCBNTBIQ21/appCtx'))
const ZZIND103 = lazy(() => import('AppForms/ZZIND103/appCtx'))
const ZZIND104 = lazy(() => import('AppForms/ZZIND104/appCtx'))
const ZZIND105 = lazy(() => import('AppForms/ZZIND105/appCtx'))
const ZZIND106 = lazy(() => import('AppForms/ZZIND106/appCtx'))
const ZZSYS102 = lazy(() => import('AppForms/ZZSYS102/appCtx'))
const ZZSYS103 = lazy(() => import('AppForms/ZZSYS103/appCtx'))
const ZZLAB101 = lazy(() => import('AppForms/ZZLAB101/appCtx'))
const ZZLAB103 = lazy(() => import('AppForms/ZZLAB103/appCtx'))
const ZZLAB104 = lazy(() => import('AppForms/ZZLAB104/appCtx'))
const ZZLAB105 = lazy(() => import('AppForms/ZZLAB105/appCtx'))
const ZZLAB106 = lazy(() => import('AppForms/ZZLAB106/appCtx'))

export default function App() {
  const [f_mobile] = useLocalStorageV2<boolean>('f_mobile', false)
  const [themeName] = useLocalStorageV2<string>('myTheme', 'defaultTheme')
  const theme = useMemo(() => themeName === 'asvtTheme' ? asvtTheme : defaultTheme, [themeName])

  //console.log('App.f_mobile', f_mobile)
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* contnet:BEGIN */}
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Signin} />
          <Route path="/about" component={AboutUs} />
          <Route path="/zzsys102" component={ZZSYS102} />
          <Route path="/zzsys103" component={ZZSYS103} />
          <Route path="/zzind103" component={ZZIND103} />
          <Route path="/zzind104" component={ZZIND104} />
          <Route path="/zzind105" component={ZZIND105} />
          <Route path="/zzind106" component={ZZIND106} />
          <Route path="/scbntbiq01" component={SCBNTBIQ01} />
          <Route path="/scbntbiq11" component={SCBNTBIQ11} />
          <Route path="/scbntbiq21" component={SCBNTBIQ21} />
          <Route path="/zzlab101" component={ZZLAB101} />
          <Route path="/zzlab103" component={ZZLAB103} />
          <Route path="/zzlab104" component={ZZLAB104} />
          <Route path="/zzlab105" component={ZZLAB105} />
          <Route path="/zzlab106" component={ZZLAB106} />
          <Route path="*">
            {f_mobile
              ? <MobileLayout />
              : <DefaultLayout />}
          </Route>
        </Switch>
      </Suspense>
      {/* contnet:END */}
      <ToastContainer />
      <ScrollTopFab />
    </ThemeProvider>
  )
}
//----------------------------------------------------------------------------------
