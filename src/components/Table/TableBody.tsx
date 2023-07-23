import React from 'react'
import { TableHeaderTypes } from "./tableProps"
import TableRow from './TableRow';

const TableBody = (props: TableHeaderTypes) => {

    return (
        <tbody>
            {props.data.map((d, index) =>
                <React.Fragment key={`${index}tablebodyrow`} >
                    <TableRow d={d} {...props} />
                </React.Fragment>
            )}
        </tbody>
    )
}

export default TableBody