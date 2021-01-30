import React, { useEffect } from 'react'
import { useStoreActions } from 'store/store'
import { AppContainer } from 'Outlines/OutlineWidgets'
import AppForm from './AppForm'

///
/// 只給予常數初始化
///
const formProfile: AppFormProfile = {
  FORM_ID: 'ZZFRM101',
  FORM_TITLE: '表單範本１',
  FORM_DESCRIPTION: '表單樣本１的說明，描述表單樣本１的功能說明。'
}

const initFormData = {
  foo: 'foo',
  bar: 987654321
}

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
    <AppForm formProfile={formProfile} />
  )
}
