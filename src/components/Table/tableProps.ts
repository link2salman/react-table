import React from "react"

export type headRenderContentType = {
    [key: string | number]: string | number | string[] | number[] | Record<string, string | number | string[] | number[]>
}

export type OnChangeEventType = (value: string | boolean | number, key?: string | boolean) => void

export type RowSelectionType = {
    type: string,
    selectedRowKeys: string[]
    onChange: (newSelectedKeys: string | string[], data?: any) => void
}


export type TableHeadingTypes = {
    column: ColumnsTypes,
    sortIcon?: string,
    order?: Record<string, string>,
    onSort?: (val: string) => void,
    onChange?: OnChangeEventType
}

export interface TableHeaderTypes {
    columns: ColumnsTypes[],
    sortIcon?: string,
    onSort?: (val: string) => void,
    order?: Record<string, string>,
    onChange?: OnChangeEventType,
    data: any[],
    expandable?: any,
    onRowSelection?: RowSelectionType,
    rowKey: string


}

export interface HeadRenderContentTypes {
    header: string,
    dataKey: string,
    fixed?: string,
    sort?: boolean,
    sortKey?: string
    with?: number,
    textAlign?: string,
}

export interface ColumnsTypes {
    header: string,
    dataKey: string,
    fixed?: string,
    sort?: boolean,
    sortKey?: string
    with?: number,
    textAlign?: string,
    headRender?: (content: HeadRenderContentTypes, callback: OnChangeEventType) => React.ReactElement,
    render?: (value: any, content: any, callback: OnChangeEventType) => React.ReactElement,
}

export interface TableTypes {
    className?: string,
    columns: ColumnsTypes[],
    sortIcon?: string,
    onSort?: (val: string) => void,
    order?: Record<string, string>,
    data: any[],
    onChange?: OnChangeEventType,
    expandable?: any,
    onRowSelection?: RowSelectionType,
    rowKey: string,
}