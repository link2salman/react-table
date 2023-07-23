import React, { useState } from 'react'

import Table from 'Components/Table'

import { rowSelectionHandler } from 'Components/Table/helper'

import { HeaderTypes } from 'Components/Table/tableProps'

const App = () => {
  const [selectedRowKeys, setSelectedRows] = useState<string[]>([])

  const onSort = (key: string, order: string | null) => {
    console.log(key, '==> ', order, '==> sorting is supported')
  }

  const onHeadChange = (key: string, value: React.ChangeEvent | string | string[]) => {
    console.log(key, '==> ', value, '==> header filter is supported')
  }

  const onRowChange = (col: any, row: any, value: any) => {
    console.log('col', col, '==> ', 'row', row, 'valeu', value, '==> row Change is supported')
  }

  const columns = [
    {
      header: { title: 'Post Title', filterType: 'input' } as HeaderTypes,
      dataKey: 'post_title',
      sort: true,
      sortKey: 'post_title',
      width: 20,
    },
    {
      header: 'Post Description',
      dataKey: 'post_description',
      sort: true,
      sortKey: 'post_description',
      width: 20,
    },
    {
      header: 'Post Likes',
      dataKey: 'post_likes',
      sort: true,
    },
    {
      header: 'New Post',
      dataKey: 'new_post',
      textAlign: 'center',
      width: 15,
      render: (data: any, row: any, onChange: any) => <input type="text" onChange={(e) => onChange(data, row, e)} />,
    },
    {
      header: 'Community Id',
      dataKey: 'community_id',
    },
    {
      header: 'Billee Id',
      dataKey: 'billee_id',
      sort: true,
    },
    {
      header: 'Company',
      dataKey: 'compnay_name',
    },
  ]

  const data = [
    {
      post_title: 'abcdef ipsum dolor sit amet, consectetur adipiscing',
      post_description: 'lorem ipsum dolor sit amet, consectetur adipiscing',
      post_likes: '10',
      new_post: 'new post',
      community_id: 'H52566',
      billee_id: 'Y5898',
      compnay_name: 'New Company',
      onetwo: [{ name: 'salman' }, { name: 'rizwan' }],
    },
    {
      post_title: 'xyz ipsum dolor sit amet, consectetur adipiscing',
      post_description: 'lorem ipsum dolor sit amet, consectetur adipiscing, lorem ipsum dolor sit amet',
      post_likes: '10',
      new_post: 'new post',
      community_id: 'H52566',
      billee_id: 'Y5898',
      compnay_name: 'New Company',
      onetwo: [{ name: 'salman' }, { name: 'rizwan' }],
    },
  ]

  return (
    <Table
      columns={columns}
      data={data}
      onSort={onSort}
      onHeadChange={onHeadChange}
      onRowChange={onRowChange}
      expandable={{
        expandedRowRender: (record: any) => (
          <td colSpan={columns.length + 1}>
            {record?.onetwo?.map((item: any, index: any) => (
              <p key={`${item.name}${index}`}>{item.name}</p>
            ))}{' '}
          </td>
        ),
      }}
      onRowSelection={{
        type: 'chekbox',
        selectedRowKeys,
        onChange: (newSelectedKeys: string | string[]) => {
          setSelectedRows((prev) => rowSelectionHandler(prev, newSelectedKeys))
        },
      }}
      rowKey={'post_description'}
    />
  )
}

export default App
