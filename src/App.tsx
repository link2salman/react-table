import { useState } from 'react'

import Table from "Components/Table"
import { rowSelectionHandler } from 'Components/Table/helper'
import { ColumnsTypes, OnChangeEventType } from 'Components/Table/tableProps'

const App = () => {

    const [order, setOrder] = useState({ key: "", order: "asc" })
    const [selectedRowKeys, setSelectedRows] = useState<string[]>([])

    const onSort = (val: string) => {
        setOrder(prev => ({ key: val, order: prev.order === "asc" ? "desc" : "asc" }))
    }

    const columns = [
        {
            header: "Post Title",
            dataKey: "post_title",
            sort: true,
            sortKey: "post_title",
            with: 40,
            // headRender: (content: ColumnsTypes, callback: OnChangeEventType) => <input onChange={(e) => callback({"post_title", e.target.value})} type="text" />,
            // render: (value: any, content: any, callback: OnChangeEventType) => <input type='checkbox' onChange={(e) => callback(content, e.target.checked)} />
            headRender: (content: ColumnsTypes, callback: OnChangeEventType) => <input onChange={(e) => callback({ key: "post_title", value: e.target.value })} type="text" />,
        },
        {
            header: "Post Decription",
            dataKey: "post_description",
            sort: true,
            sortKey: "post_description",
            with: 15,
        },
        {
            header: "Post Likes",
            dataKey: "post_likes",
            sort: true,

        },
        {
            header: "New Post",
            dataKey: "new_post",
        },
        {
            header: "Community Id",
            dataKey: "community_id",
        },
        {
            header: "Billee Id",
            dataKey: "billee_id",
            sort: true,
        },
        {
            header: "Company",
            dataKey: "compnay_name",
        },
    ]

    const data = [
        {
            post_title: "abcdef ipsum dolor sit amet, consectetur adipiscing",
            post_description: "lorem ipsum dolor sit amet, consectetur adipiscing",
            post_likes: "10",
            new_post: "new post",
            community_id: "H52566",
            billee_id: "Y5898",
            compnay_name: "New Company",
            onetwo: [{ name: "salman" }, { name: "rizwan" }]
        },
        {
            post_title: "xyz ipsum dolor sit amet, consectetur adipiscing",
            post_description: "lorem ipsum dolor sit amet, consectetur adipiscing, lorem ipsum dolor sit amet",
            post_likes: "10",
            new_post: "new post",
            community_id: "H52566",
            billee_id: "Y5898",
            compnay_name: "New Company",
            onetwo: [{ name: "salman" }, { name: "rizwan" }]
        },
    ]

    return (
        <Table
            columns={columns}
            data={data}
            onSort={onSort}
            order={order}
            // onChange={(key, value) => console.log(key, value)}
            expandable={{ expandedRowRender: (record: any) => <td colSpan={columns.length + 1}>{record?.onetwo?.map((item: any, index: any) => <p key={`${item.name}${index}`}>{item.name}</p>)} </td> }}
            onRowSelection={{
                type: "chekbox",
                selectedRowKeys,
                onChange: (newSelectedKeys: string | string[]) => {
                    setSelectedRows(prev => rowSelectionHandler(prev, newSelectedKeys));
                }
            }}
            rowKey={"post_description"}
        />
    )
}

export default App