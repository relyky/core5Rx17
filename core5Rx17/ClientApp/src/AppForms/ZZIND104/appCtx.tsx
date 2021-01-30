import React, { useEffect } from 'react'
import { useStoreActions } from 'store/store'
import AppForm from './AppForm'

///
/// 只給予常數初始化
///

const formProfile: AppFormProfile = {
  FORM_ID: 'ZZIND104',
  FORM_TITLE: '問券Layout 2 LAB',
  FORM_DESCRIPTION: '問券Layout 2 LAB'
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
    <AppForm formProfile={formProfile} />
  )
}
