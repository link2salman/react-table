import React from 'react'

export type headRenderContentType = {
  [key: string | number]: string | number | string[] | number[] | Record<string, string | number | string[] | number[]>
}

export type headerRenderProps = (key: string, value: React.ChangeEvent | string | string[]) => void

export type rowRenderTypes = (columns: Omit<ColumnsTypes, 'render'>, rowData: any, value:React.ChangeEvent) => void

export type RowSelectionType = {
  type: string
  selectedRowKeys: string[]
  onChange: (newSelectedKeys: string | string[], data?: any) => void
}

export type TableHeadingTypes = {
  column: ColumnsTypes
  sortIcon?: string
  order?: Record<string, string>
  onSort?: (key: string, order: string | null) => void
  onHeadChange?: headerRenderProps
}

export interface TableHeaderTypes {
  columns: ColumnsTypes[]
  sortIcon?: string
  onSort?: (key: string, order: string | null) => void
  order?: Record<string, string>
  onHeadChange?: headerRenderProps
  onRowChange?: rowRenderTypes
  data: any[]
  expandable?: any
  onRowSelection?: RowSelectionType
  rowKey: string
}

export interface ColumnsTypes {
  header: string | HeaderTypes
  dataKey: string
  fixed?: string
  sort?: boolean
  sortKey?: string
  width?: number
  textAlign?: string
  render?: (value: any, content: any, callback: headerRenderProps) => React.ReactElement
}

export interface TableTypes {
  className?: string
  columns: ColumnsTypes[]
  sortIcon?: string
  onSort?: (key: string, order: string | null) => void
  order?: Record<string, string>
  data: any[]
  onHeadChange?: headerRenderProps
  onRowChange?: rowRenderTypes
  expandable?: any
  onRowSelection?: RowSelectionType
  rowKey: string
}

export type HeaderChangeTypes = {
  header: HeaderTypes
  onHeadChange?: headerRenderProps
  dataKey: string
}

export type HeaderTypes = {
  title: string
  filterType: 'input' | 'select' | 'range' | 'date' | 'time' | 'datetime' | 'week'
  Options?: { label: string; value: string }[]
  values?: string | string[]
}
