import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TableFooter, TablePagination } from '@material-ui/core';

interface DataTableProps {
  dataList: Array<IndexObject>
  fieldDef: FieldDef[]
  dense?: boolean,
  onSelect?: (item: IndexObject, index: number) => void,
  pageSize?: number
}

interface FieldDef {
  name: string
  label: string
  formatter?: (item: IndexObject, index: number) => string
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
}


//export type CellValue = string | number | boolean | Date | null | undefined | object

export default function DataTable(props: DataTableProps) {
  const classes = useStyles();
  const [selIndex, setSelIndex] = useState(-1)
  const [page, setPage] = React.useState(0);

  function handleTableRowClick(item: IndexObject, index: number) {
    // update UI status
    setSelIndex(index)
    // invoke event up
    props.onSelect && (props.onSelect)(item, index)
  }

  const pageDataList = props.pageSize !== undefined
    ? props.dataList.slice(page * props.pageSize, (page + 1) * props.pageSize)
    : props.dataList

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size={props.dense ? 'small' : 'medium'}>
        <TableHead>

          <TableRow>
            {props.fieldDef.map((field, x) => (
              <TableCell key={x} align={field.align}>{field.label}</TableCell>
            ))}

            {/* <TableCell>ID</TableCell>
            <TableCell>First name</TableCell>
            <TableCell>Last name</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell>Full name</TableCell> */}

          </TableRow>

        </TableHead>
        <TableBody>
          {pageDataList.map((item, y) => (
            <TableRow key={y} hover
              selected={selIndex === y}
              onClick={() => handleTableRowClick(item, y)}>
              {props.fieldDef.map((field, x) => {
                const displayText = (field.formatter /* is exists */) ? (field.formatter)(item, y) : item[field.name]
                return <TableCell key={x} align={field.align} >{displayText}</TableCell>
              })}

              {/* <TableCell component="th" scope="row">{row.id}</TableCell>
              <TableCell>{row.firstName}</TableCell>
              <TableCell>{row.lastName}</TableCell>
              <TableCell align="right">{row.age}</TableCell>
              <TableCell>{`${row.firstName} ${row.lastName}`}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
        </TableFooter>
      </Table>
      {props.pageSize !== undefined &&
        <TablePagination component='div'
          rowsPerPageOptions={[props.pageSize]}
          count={props.dataList.length}
          rowsPerPage={props.pageSize as number}
          page={page}
          SelectProps={{
             inputProps: { 'aria-label': 'rows per page' },
             native: true,
          }}
          onChangePage={(e, page) => setPage(page)}
          labelDisplayedRows={({ from, to, count, page }) => `第${page+1}/${Math.ceil(count / (props.pageSize as number))}頁`} 
          /* 第 page/totalPage 頁  */
        />
      }
    </TableContainer>
  );
}

//------------------------------------------------------------
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});