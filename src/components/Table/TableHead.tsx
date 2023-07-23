import HeaderChange from './HeaderChange'

import { classNames, orderMapper } from './helper'

import { TableHeadingTypes } from './tableProps'

const TableHead = (props: TableHeadingTypes) => {
  const {
    column: { textAlign, sortKey: sortBy, dataKey, fixed, sort, header: title, width },
    sortIcon: customIcon,
  } = props

  const headClasses = classNames('table-heading', { [`text-align-${textAlign}`]: textAlign, [`${fixed}`]: fixed })

  const sortKey = sortBy ? sortBy : dataKey

  const sortIconClass = customIcon && sort ? 'sort-icon' : `default-sort-icon`

  const sortIcon = sort && (
    <div className={sortIconClass} onClick={() => props.onSort && props.onSort(sortKey, orderMapper(sortKey))}>
      {customIcon && <img src={customIcon} alt="" />}
    </div>
  )

  const header = typeof title === 'string' ? title : <HeaderChange header={title} onHeadChange={props.onHeadChange} dataKey={dataKey} />

  return (
    <th className={headClasses} style={{ width: `${width}%` }}>
      <div className="table-heading-wrapper">
        <div className="column-heading">
          <div className="table-heading-title">{header}</div>
          {sortIcon}
        </div>
      </div>
    </th>
  )
}

export default TableHead
