import React, { useEffect } from 'react'
import { useStoreActions } from 'store/store'
import { AppContainer } from 'Outlines/OutlineWidgets'
import AppForm from './AppForm'

///
/// 只給予常數初始化
///
const formProfile: AppFormProfile = {
  FORM_ID: 'ZZLAB102',
  FORM_TITLE: 'DataTable Lab',
  FORM_DESCRIPTION: 'DataTable 試作。'
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
