import React, { useEffect } from 'react'
import { useStoreActions } from 'store/store'
import AppForm from './AppForm'
import { withOrientationChange } from 'react-device-detect'

///
/// 只給予常數初始化
///

const formProfile: AppFormProfile = {
  FORM_ID: 'ZZSYS102',
  FORM_TITLE: 'Detect Device',
  FORM_DESCRIPTION: '偵測裝置為手機或個人電腦等。'
}

const initFormData = {
  foo: 'foo',
  bar: 987654321
}

const initMeta = {}

/** 可定向偵測 AppForm */
const OrientedAppForm = withOrientationChange(AppForm)

export default function AppCtx() {
  const { assignAppInfo, setFormData, setMeta } = useStoreActions();

  ////## init form & 通報現在在那支作業
  useEffect(() => {
    assignAppInfo(formProfile)
    setFormData(initFormData)
    setMeta(initMeta)
  }, [])

  return (
    <OrientedAppForm formProfile={formProfile} />
  )
}
