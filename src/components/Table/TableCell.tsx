const TableCell = (props: any) => {

    const headClasses = props.column.textAlign ? `text-align-${props.column.textAlign}` : ""
    const columnFIxedClass = props.column.fixed ? props.column.fixed : ""

    return (
        <td className={`table-cell ${headClasses} ${columnFIxedClass} `}>
            <div className="table-cell-wrapper">
                <div className="table-data">
                    {props.column.render && props.column.render(
                        props.data,
                        props.row,
                        props.onChange,
                    )}
                    {!props.column.render && props.data}
                </div>
            </div>
        </td>
    )
}

export default TableCell