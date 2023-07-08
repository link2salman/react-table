import React from 'react'
import Input from 'Components/Input';
import TableCell from './TableCell'
import { TableHeaderTypes } from './tableProps';

interface RowTypes extends TableHeaderTypes {
    d: any,
}

const TableRow = (props: RowTypes) => {

    const isExpandableRow = props.expandable && props.onRowSelection?.selectedRowKeys.includes(props.d[props.rowKey])

    return (
        <React.Fragment >

            <tr className={`${props.onRowSelection?.selectedRowKeys.includes(props.d[props.rowKey]) ? "red" : ""} ${props.filteredValue.key ? props.d[props.filteredValue.key]?.includes(props.filteredValue.value) ? "" : "filter-row-hidden" : ""}`} >
                <td className='table-cell optional'> {<Input type='checkbox' checked={props.onRowSelection?.selectedRowKeys.includes(props.d[props.rowKey])} onChange={() => props.onRowSelection?.onChange(props.d[props.rowKey], props.d)} />} </td>
                {props.columns.map((col, index) =>
                    <TableCell data={props.d[col.dataKey]} onChange={props.onChange} row={props.d} column={col} key={`${index}tablecell`} />
                )}
            </tr>

            {<tr className={`${isExpandableRow ? "extend" : "collapsedrow"}`}>
                {props.expandable.expandedRowRender(props.d)}
            </tr>}
        </React.Fragment>
    )
}

export default TableRow