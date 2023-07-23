import TableBody from './TableBody'
import TableHeader from './TableHeader'

import { TableTypes } from './tableProps'

const Table = (props: TableTypes) => {
  return (
    <div className={''}>
      <table border={1} className="table">
        <TableHeader {...props} />
        <TableBody {...props} />
      </table>
    </div>
  )
}

export default Table
