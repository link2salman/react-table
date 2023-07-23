import Input from 'Components/Input'
import TableHead from './TableHead'
import { TableHeaderTypes } from './tableProps'

const TableHeader = (props: Omit<TableHeaderTypes,'onRowChange'>) => {
  return (
    <thead>
      <tr>
        <th className="table-heading optional">
          {props.onRowSelection && props.onRowSelection.type && (
            <Input
              type="checkbox"
              checked={props.data.length == props.onRowSelection.selectedRowKeys.length}
              onChange={() => props.onRowSelection?.onChange(props.data.map((item) => item[props.rowKey]))}
            />
          )}
        </th>
        {props.columns.map((col, index) => (
          <TableHead
            key={`${index}colhead`}
            sortIcon={props.sortIcon}
            column={col}
            onSort={props.onSort}
            order={props.order}
            onHeadChange={props.onHeadChange}
          />
        ))}
      </tr>
    </thead>
  )
}

export default TableHeader
