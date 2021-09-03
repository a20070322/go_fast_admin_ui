/*
 * @Author: 赵忠洋
 * @Date: 2021-08-20 15:16:12
 * @LastEditTime: 2021-08-23 19:15:18
 * @LastEditors: 赵忠洋
 * @Description:
 * @FilePath: /goAdminUI2/src/pages/tools/auto-curd/components/EditableTable.tsx
 */
import { FieldsType } from '@/apis/admin_auto_curd'
import { useDict } from '@/hooks/useDict'
import { Button, Checkbox, Form, Select, Space, Switch } from 'antd'
import { Input, Table } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'

interface Props {
  value?: FieldsType[]
  onChange?: (value: FieldsType[]) => void;
}
const EditableTable = (props: Props) => {
  const [tableData, setTableData] = useState<FieldsType[]>(props.value || [])
  const dictAutoCurdFieldType = useDict("auto_curd_field_type")
  const dictAutoCurdSearchType = useDict("auto_curd_search_type")
  const dictAutoCurdShowType = useDict("auto_curd_show_type")
  const dictOptions = useDict()
  useEffect(() => {
    props.onChange && props.onChange(tableData)
  }, [tableData])
  useEffect(() => {
    if (props.value&&(JSON.stringify(props.value || [])!==JSON.stringify(tableData))) {
      setTableData(props.value || [])
    }
  }, [props.value])
  return (
    <Fragment>
      <Button type="primary" onClick={
        () => {
          let arr = tableData.slice(0)
          arr.push({
            id: new Date().getTime(),
            field_type: "Int",
            field_name: "",
            field_comment: "",
            field_default: "",
            is_sensitive: false,
            is_optional: true,
            is_unique: false,
            is_insert: true,
            is_edit: true,
            is_list_show: true,
            is_list_default_show: true,
            is_search: false,
            search_type: "",
            show_type: "1",
            show_config: "",
            dict_type: ""
          })
          setTableData(arr)
        }}
      >新建一行</Button>
      <Table
        showSorterTooltip
        rowKey="id"
        dataSource={tableData}
        pagination={false}
        scroll={{
          x: 'true',
          scrollToFirstRowOnChange: true,
        }}
        columns={[
          {
            title: '字段名称',
            dataIndex: 'field_name',
            width: 200,
            ellipsis: true,
            fixed: 'left',
            render: (val, _, index) => {
              return (
                <Input
                  value={val}
                  required
                  onChange={(e) => {
                    let arr = tableData.slice(0)
                    arr[index]['field_name'] = e.target.value
                    setTableData(arr)
                  }}
                  placeholder="请输入字段名称"
                />
              )
            }
          },
          {
            title: '字段描述',
            dataIndex: 'field_comment',
            width: 250,
            ellipsis: true,
            render: (val, _, index) => {
              return (
                <Input
                  value={val}
                  required
                  onChange={(e) => {
                    let arr = tableData.slice(0)
                    arr[index]['field_comment'] = e.target.value
                    setTableData(arr)
                  }}
                  placeholder="请输入字段描述"
                />
              )
            }
          },
          {
            title: '字段类型',
            dataIndex: 'field_type',
            width: 150,
            ellipsis: true,
            render: (val, _, index) => {
              return (
                <Select
                  value={val}
                  onChange={(val) => {
                    let arr = tableData.slice(0)
                    arr[index]['field_type'] = val
                    setTableData(arr)
                  }}
                  options={dictAutoCurdFieldType}
                  placeholder="字段类型"
                />
              )
            }
          },
          {
            title: '字段默认值',
            dataIndex: 'field_default',
            width: 200,
            ellipsis: true,
            render: (val, _, index) => {
              return (
                <Input
                  value={val}
                  required
                  onChange={(e) => {
                    let arr = tableData.slice(0)
                    arr[index]['field_default'] = e.target.value
                    setTableData(arr)
                  }}
                  placeholder="请输入字段默认值"
                />
              )
            }
          },
          {
            title: '敏感字段',
            dataIndex: 'is_sensitive',
            width: 90,
            ellipsis: true,
            render: (val, _, index) => {
              return (
                <Switch
                  checked={val}
                  onChange={(val) => {
                    let arr = tableData.slice(0)
                    arr[index]['is_sensitive'] = val
                    setTableData(arr)
                  }}
                />
              )
            }
          },
          {
            title: '可以为空',
            dataIndex: 'is_optional',
            width: 90,
            ellipsis: true,
            render: (val, _, index) => {
              return (
                <Switch
                  checked={val}
                  onChange={(val) => {
                    let arr = tableData.slice(0)
                    arr[index]['is_optional'] = val
                    setTableData(arr)
                  }}
                />
              )
            }
          },
          {
            title: '唯一值',
            dataIndex: 'is_unique',
            width: 90,
            ellipsis: true,
            render: (val, _, index) => {
              return (
                <Switch
                  checked={val}
                  onChange={(val) => {
                    let arr = tableData.slice(0)
                    arr[index]['is_unique'] = val
                    setTableData(arr)
                  }}
                />
              )
            }
          },
          {
            title: '插入',
            dataIndex: 'is_insert',
            width: 90,
            ellipsis: true,
            render: (val, _, index) => {
              return (
                <Switch
                  checked={val}
                  onChange={(val) => {
                    let arr = tableData.slice(0)
                    arr[index]['is_insert'] = val
                    setTableData(arr)
                  }}
                />
              )
            }
          },
          {
            title: '编辑',
            dataIndex: 'is_edit',
            width: 90,
            ellipsis: true,
            render: (val, _, index) => {
              return (
                <Switch
                  checked={val}
                  onChange={(val) => {
                    let arr = tableData.slice(0)
                    arr[index]['is_edit'] = val
                    setTableData(arr)
                  }}
                />
              )
            }
          },
          {
            title: '列展示',
            dataIndex: 'is_list_show',
            width: 90,
            ellipsis: true,
            render: (val, _, index) => {
              return (
                <Switch
                  checked={val}
                  onChange={(val) => {
                    let arr = tableData.slice(0)
                    arr[index]['is_list_show'] = val
                    setTableData(arr)
                  }}
                />
              )
            }
          },
          {
            title: '列展示(默认)',
            dataIndex: 'is_list_default_show',
            width: 120,
            ellipsis: true,
            render: (val, _, index) => {
              return (
                <Switch
                  checked={val}
                  onChange={(val) => {
                    let arr = tableData.slice(0)
                    arr[index]['is_list_default_show'] = val
                    setTableData(arr)
                  }}
                />
              )
            }
          },
          {
            title: '搜索字段',
            dataIndex: 'is_search',
            width: 90,
            ellipsis: true,
            render: (val, _, index) => {
              return (
                <Switch
                  checked={val}
                  onChange={(val) => {
                    let arr = tableData.slice(0)
                    arr[index]['is_search'] = val
                    setTableData(arr)
                  }}
                />
              )
            }
          },
          {
            title: '搜索方式',
            dataIndex: 'search_type',
            width: 150,
            ellipsis: true,
            render: (val, _, index) => {
              return (
                <Select
                  value={val}
                  onChange={(val) => {
                    let arr = tableData.slice(0)
                    arr[index]['search_type'] = val
                    setTableData(arr)
                  }}
                  options={dictAutoCurdSearchType}
                  placeholder="搜索方式"
                />
              )
            }
          },
          {
            title: '展示方式',
            dataIndex: 'show_type',
            width: 150,
            ellipsis: true,
            render: (val, _, index) => {
              return (
                <Select
                  value={val}
                  onChange={(val) => {
                    let arr = tableData.slice(0)
                    arr[index]['show_type'] = val
                    setTableData(arr)
                  }}
                  options={dictAutoCurdShowType}
                  placeholder="展示方式"
                />
              )
            }
          },
          {
            title: '展示配置',
            dataIndex: 'show_config',
            width: 250,
            ellipsis: true,
            render: (val, _, index) => {
              return (
                <Input
                  value={val}
                  required
                  onChange={(e) => {
                    let arr = tableData.slice(0)
                    arr[index]['show_config'] = e.target.value
                    setTableData(arr)
                  }}
                  placeholder="请输入展示配置"
                />
              )
            }
          },
          {
            title: '字典类型',
            dataIndex: 'dict_type',
            width: 250,
            ellipsis: true,
            render: (val, _, index) => {
              return (
                <Select
                  value={val}
                  onChange={(val) => {
                    let arr = tableData.slice(0)
                    arr[index]['dict_type'] = val
                    setTableData(arr)
                  }}
                  options={dictOptions}
                  placeholder="字典类型"
                />
              )
            }
          },
          {
            title: '操作',
            width: 150,
            fixed: 'right',
            render: (_v, row, index) => {
              return (
                <Space>
                  <Button
                    type="link"
                    danger
                    size="small"
                    onClick={() => {
                      let arr = tableData.slice(0)
                      arr.splice(index, 1)
                      setTableData(arr)
                    }}
                  >删除</Button>
                  <Button
                    type="link"
                    size="small"
                    onClick={() => {
                      let arr = tableData.slice(0)
                      arr.push({
                        ...arr[index],
                        id: new Date().getTime()
                      })
                      setTableData(arr)
                    }}
                  >复制</Button>
                </Space>
              )
            }
          },
        ]}
      >
      </Table>
    </Fragment>
  )

}
export default EditableTable
