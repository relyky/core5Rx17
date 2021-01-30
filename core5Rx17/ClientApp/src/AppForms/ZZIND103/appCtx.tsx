import React, { useEffect } from 'react'
import { useStoreActions } from 'store/store'
import { AppContainer, AppFooter, AppHeader } from 'Outlines/OutlineWidgets'
import AppForm from './AppForm'

///
/// 只給予常數初始化
///
const formProfile: AppFormProfile = {
  FORM_ID: 'ZZIND103',
  FORM_TITLE: '網路購物使用狀況調查問卷(試)',
  FORM_DESCRIPTION: '問券畫面試作。'
}

const initFormData = {}

const initMeta = {}

export default function AppCtx() {
  const { assignAppInfo, setFormData, setMeta } = useStoreActions();

  ////## init form & 通報現在在那支作業
  useEffect(() => {
    assignAppInfo(formProfile)
    setFormData(initFormData)
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
