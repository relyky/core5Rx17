import React, { useMemo } from 'react'
//import clsx from 'clsx'
import { Box, useTheme, RootRef } from '@material-ui/core';
import { useClientRect } from 'hooks/useWindowResource';

/** 顯示變動高度的項目 */
export function FlexboxColumnLines(props: {
  itemList: number[], // 模擬項目清單
  columnWidth: number // 列的寬度
}) {
  const [rootRect, domRef] = useClientRect()

  // 計算行數
  const lineCount = useMemo(() => rootRect !== undefined ? Math.floor(rootRect.width / props.columnWidth) : 1
    , [rootRect, props.columnWidth])

  // 項目依序放入各個line
  const lines = useMemo(()=>{
    console.log('項目依序放入各個line')
    const lines = Array.from(Array(lineCount)).map(() => new Array())    
    props.itemList.forEach((__, i) => {
      const lx = i % lineCount
      lines[lx].push(i)
    })
    return lines  
  },[lineCount])

  return (
    <RootRef rootRef={domRef}>
      <Box display='flex' flexDirection='row'>
        {lines.map((line, cx) => (
          <Box key={cx} display='flex' flexDirection='column' >

            {line.map((ix, i) => {
              const size = props.itemList[ix]
              return (
                <Box key={i} flex='0 0 auto' >
                  <SimsItem height={size}>
                    {`${ix + 1}`}
                  </SimsItem>
                </Box>
              )
            })}

          </Box>
        ))}
      </Box>
    </RootRef>
  )
}

//===========================================================
// /** 模擬變動寬度的項目 */
const SimsItem: React.FC<{ width?: number, height?: number }> = (props) => {
  const { spacing } = useTheme()
  return (
    <Box style={{
      border: 'solid thin grey',
      width: props.width === undefined ? spacing(20) : props.width,
      height: props.height === undefined ? spacing(20) : props.height,
      margin: spacing(1),
      padding: spacing(1),
    }}>
      {props.children}
    </Box>
  )
}
