/// <reference types="react-scripts" />
///
/// 此處只能宣告原生的介面，並將被預設全域引用。
///

interface AppFormProfile {
  FORM_ID: string,
  FORM_TITLE: string,
  FORM_DESCRIPTION: string
}

interface AppFormProps {
  formProfile: AppFormProfile,
  isLandscape?: boolean, // withOrientationChange 
  isPortrait?: boolean   // withOrientationChange 
}

//------------------------------------------
/**
 * override TypeScript type
 */
type Override<T1, T2> = Omit<T1, keyof T2> & T2;

//------------------------------------------

type ErrType = "SUCCESS" | "INFO" | "WARNING" | "ERROR" | "FAIL" | "EXCEPTION";

/// ## Msg Type Mapping
/// #LastErrMsg  #Swal      #LogLevel     #toast
/// SUCCESS      success    Information
/// INFO         info       Information   info
/// WARNING      warning    Warning       warning
/// ERROR        error      Error
/// FAIL         error      Critical
/// EXCEPTION    error      Critical

interface ErrMsg {
  errType: ErrType;
  errMsg: string;
  errDtm?: Date;
  errClass?: string;
  errMsgDetailList?: Record<string, string>; // IndexSignature<name,message>
}

//------------------------------------------

interface NameValue {
  name: string,
  value: string | number | boolean | object | null,
}

/**
 * onValueChange: ValueChangeHandler
 */
type ValueChangeHandler = (v: NameValue) => void

//------------------------------------------

interface LabelValue {
  label: string,
  value: string // | number | boolean | object | null,
}

//------------------------------------------

/**
 * Declaring an index signature
 */
// interface IndexSignature {
//   [key: string]: any
// }

//type IndexObject = Object & IndexSignature
type IndexObject = Object & Record<string, any>

//------------------------------------------

type GridLayoutMode = 'item123' | 'item122' | 'item223' | 'fullrow'

/** 
* for: GridLayoutMode to map to Grid Layout properties
*/
type GridLayoutAttrs = {
  xs?: boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  sm?: boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  md?: boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  lg?: boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  xl?: boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
}

// const mapGridAttrs: Record<GridLayoutMode, GridLayoutAttrs> = {
//   fullrow: { xs: 12, sm: 12, md: 12 },
//   item123: { xs: 12, sm: 6, md: 4 },
//   item122: { xs: 12, sm: 6, md: 6 },
//   item223: { xs: 6, sm: 6, md: 4 }
// }

//type GN12 = boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

//------------------------------------------

/** Paleete Color */
type ColorX = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' 
