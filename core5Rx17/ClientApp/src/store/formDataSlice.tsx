import { createSlice } from '@reduxjs/toolkit';
import t from 'typy'

/// 注意：
/// Redux Toolkit allows us to write "mutating" logic in reducers. It
/// doesn't actually mutate the state because it uses the Immer library,
/// which detects changes to a "draft state" and produces a brand new
/// immutable state based off those changes

const initialState: IndexObject = {}

//export const formDataSlice = createSlice({
export default createSlice({
  name: 'formData',
  initialState: initialState,
  reducers: {
    /// actor: (state, action) => { ... }
    assignValue: (state, { payload }) => {
      const { name, value } = payload
      if (!t(name).isString) throw new Error('Invalid value type!')
      state[name] = value /// <--- Immmr 模式更新欄位
    },
    assignProps: (state, { payload /* object */ }) => {
      if (!t(payload).isObject) throw new Error('Invalid value type!')
      return { ...state, ...payload } /// <--- Spread Syntax也有效
    },
    setFormData: (state, { payload /* object */ }) => {
      if (!t(payload).isObject) throw new Error('Invalid value type!')
      return { ...payload } /// <--- Spread Syntax也有效
    },
    assignGroupValue: (state, { payload }) => {
      const [groupName, groupPayload /*any*/] = payload
      const { name, value /*any*/ } = groupPayload
      if (!t(groupName).isString) throw new Error('Invalid value type!')
      if (!t(name).isString) throw new Error('Invalid value type!')
      const groupValue = state[groupName] || {}
      state[groupName] = { ...groupValue, [name]: value } /// <--- Immmr 模式更新欄位
    },
    assignGroupProps: (state, { payload }) => {
      const [groupName, groupPayload /*any*/] = payload
      if (!t(groupName).isString) throw new Error('Invalid value type!')
      if (!t(groupPayload).isObject) throw new Error('Invalid value type!')
      const groupValue = state[groupName] || {}
      state[groupName] = { ...groupValue, ...groupPayload } /// <--- Immmr 模式更新欄位
    },
  }
});

//// export actions
//export const { assignValue, assignProps } = formDataSlice.actions;

//// export reducer
//export default formDataSlice.reducer;
