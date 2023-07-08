import { TableHeadingTypes } from "./tableProps"

const TableHead = (props: TableHeadingTypes) => {

    const headClasses = props.column.textAlign ? `text-align-${props.column.textAlign}` : ""
    const columnFIxedClass = props.column.fixed ? props.column.fixed : ""

    const sortKey = props.column.sortKey ? props.column.sortKey : props.column.dataKey

    const sortIconClass = (props.sortIcon && props.column.sort) ? "sort-icon" : `default-sort-icon ${props.order ? props.order.key == sortKey ? props.order.order : "" : ""}`

    const sortIcon = props.column.sort && <div className={sortIconClass} >{props.sortIcon && <img src={props.sortIcon} alt="" />}</div>

    return (
        <th className={`table-heading ${headClasses} ${columnFIxedClass} `} style={{ width: `${props.column.with}%`, verticalAlign: `${props.column.headRender ? "top" : "baseline"}` }}>
            <div className="table-heading-wrapper">
                <div className="column-heading" onClick={() => props.onSort && props.onSort(sortKey)}>
                    <div className="table-heading-title" >{props.column.header}</div>
                    {sortIcon}
                </div>
                {/* {props.column.headRender && props.onChange && <div className="rendered-heading-element">{props.column.headRender(props.column, props.onChange)}</div>} */}

                {props.column.headRender && props.onHeaderChange && <div className="rendered-heading-element">{props.column.headRender(props.column, props.onHeaderChange)}</div>}

            </div>
        </th>
    )
}

export default TableHead