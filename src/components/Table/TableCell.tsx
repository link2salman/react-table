import { classNames } from './helper'

const TableCell = (props: any) => {
  const classes = classNames('table-cell', {
    [`text-align-${props.column.textAlign}`]: props.column.textAlign,
    [`${props.column.fixed}`]: props.column.fixed,
  })

  const {render, ...rest} = props.column

  return (
    <td className={classes}>
      <div className="table-cell-wrapper">
        <div className="table-data">
          {props.column.render && props.column.render(rest, props.row, props.onRowChange)}
          {!props.column.render && props.data}
        </div>
      </div>
    </td>
  )
}

export default TableCell
