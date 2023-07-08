// import { useState } from 'react'
// import TableBody from "./TableBody"
// import TableHeader from "./TableHeader"

// import { TableTypes } from "./tableProps"

// const Table = (props: TableTypes) => {
//     const [value, onChange] = useState({})
//     return (
//         <div className={""}>
//             <table border={1} className="table">
//                 <TableHeader {...props} onHeaderChange={onChange} />
//                 <TableBody {...props} filteredValue={value} />
//             </table>
//         </div>
//     )
// }

// export default Table

import { useState } from 'react'
import TableBody from "./TableBody"
import TableHeader from "./TableHeader"

import { TableTypes } from "./tableProps"

const Table = (props: TableTypes) => {
    const [value, onChange] = useState({})
    return (
        <div className={""}>
            <table border={1} className="table">
                <TableHeader {...props} onHeaderChange={onChange} />
                <TableBody {...props} filteredValue={value} />
            </table>
        </div>
    )
}

export default Table