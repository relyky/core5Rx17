import React, { useEffect } from 'react'
import { useStoreActions } from 'store/store'
import AppForm from './AppForm'

///
/// 只給予常數初始化
///

const formProfile: AppFormProfile = {
  FORM_ID: 'APRA0202',
  FORM_TITLE: 'Rx.js Lab',
  FORM_DESCRIPTION: 'Rx.js 應用。'
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
