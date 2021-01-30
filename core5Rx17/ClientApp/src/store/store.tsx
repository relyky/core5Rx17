import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import appInfoSlice from './appInfoSlice'
import formDataSlice from './formDataSlice'
import metaDataSlice from './metaDataSlice'

///------------------------------------------

export default configureStore({
  reducer: {
    appInfo: appInfoSlice.reducer,
    formData: formDataSlice.reducer,
    meta: metaDataSlice.reducer,
    //counter,
  },
  devTools: process.env.NODE_ENV !== 'production'
});

///------------------------------------------

/**
 *  自訂型別化的 Store Interface
 */
interface RootStore {
  appInfo: Object,
  formData: IndexObject,
  dataList: Array<any>,
  meta: Object
}

/**
 *  使用型別化的 Store Interface
 */
export const useTypedSelector: TypedUseSelectorHook<RootStore> = useSelector

//-----------------------------------------------------------------------

// action list
const { assignAppInfo, resetAppInfo, setBlocking } = appInfoSlice.actions
const { assignValue, assignProps, setFormData, assignGroupValue, assignGroupProps } = formDataSlice.actions
const { assignMeta, setMeta } = metaDataSlice.actions

/**
 * StoreActions, 包裝 dispatch(action) 讓使用上更方便。
 * wrapping "dispatch(action)" with useDispatch more higher
*/
export function useStoreActions() {
  const dispatch = useDispatch()
  return {
    // appInfo actions
    assignAppInfo: (payload: any) => dispatch(assignAppInfo(payload)),
    resetAppInfo: () => dispatch(resetAppInfo()),
    setBlocking: (f_blocking: boolean) => dispatch(setBlocking(f_blocking)),

    // formData actions
    assignValue: (v: NameValue) => dispatch(assignValue(v)),
    //assignValue: (name: string, value: any) => dispatch(assignValue({ name, value })),
    assignProps: (payload: any) => dispatch(assignProps(payload)),
    setFormData: (payload: any) => dispatch(setFormData(payload)),
    assignGroupValue: (groupName: string, groupPayload: NameValue) => dispatch(assignGroupValue([groupName, groupPayload])),
    assignGroupProps: (groupName: string, groupPayload: object) => dispatch(assignGroupProps([groupName, groupPayload])),

    // metaData actions
    assignMeta: (payload: any) => dispatch(assignMeta(payload)),
    setMeta: (payload: any) => dispatch(setMeta(payload)),
  }
}

//-----------------------------------------------------------------------
/**
 * helpaer:方便存取 FormData 中的群組資料(GroupData)
 * @param groupName
 */
export function useFormGroupData(groupName: string /* const */): FormGroupData {
  const groupValue = useTypedSelector(store => store.formData[groupName])
  const { assignGroupValue, assignGroupProps } = useStoreActions()

  function assignValue(v: NameValue) {
    assignGroupValue(groupName, v)
  }

  function assignProps(props: object) {
    assignGroupProps(groupName, props)
  }

  return [groupValue || {}, assignValue, assignProps];
}

/**
 *  自訂型別化的 Interface
 */
type FormGroupData = [
  groupValue: IndexObject,
  assignValue: (v: NameValue) => void,
  assignProps: (props: object) => void
]
