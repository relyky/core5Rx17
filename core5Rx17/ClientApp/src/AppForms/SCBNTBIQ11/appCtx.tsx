import React, { useEffect } from 'react'
import { useStoreActions } from 'store/store'
import { AppHeader, AppContainer, AppFooter } from 'Outlines/OutlineWidgets'
import AppForm from './AppForm'

///
/// 只給予常數初始化
///
const formProfile: AppFormProfile = {
  FORM_ID: 'SCBNTBIQ11',
  FORM_TITLE: '簡訊驗證',
  FORM_DESCRIPTION: 'ＮＴＢ簡訊驗證。'
}

const initFormData = {
}

const initMeta = {}

export default function AppCtx() {
  const { assignAppInfo, assignProps, setMeta } = useStoreActions();

  ////## init form & 通報現在在那支作業
  useEffect(() => {
    assignAppInfo(formProfile)
    assignProps(initFormData)
    setMeta(initMeta)
  }, [])

  return (
    <React.Fragment>
      <AppHeader />
      <AppContainer>
        <AppForm formProfile={formProfile} />
      </AppContainer>
      <AppFooter />
    </React.Fragment>
  )
}
