/*
 * @Author: 赵忠洋
 * @Date: 2021-08-18 14:34:22
 * @LastEditTime: 2021-08-19 11:34:49
 * @LastEditors: 赵忠洋
 * @Description:
 * @FilePath: /goAdminUI2/src/pages/system/dict/components/DictKeyList.tsx
 */
import { dictKeyList, DictKeyListItem, DictKeyListRep, DictKeyListReq, dictKeyDelete } from '@/apis/admin_dict'
import AdminTable from '@/components/admin-table/AdminTable'
import DeleteButton from '@/components/admin-table/DeleteButton'
import AuthShow from '@/components/auth-show/AuthShow'
import { useTable } from '@/hooks/useTable'
import { Button, Space, Switch } from 'antd'
import React, { useEffect } from 'react'
import DictKeyFormAdd from './DictKeyFormAdd'
import DictKeyFormUpdate from './DictKeyFormUpdate'

interface Props {
  fid: number
}

const DictKeyList = (props: Props) => {
  let table = useTable<RepCommon<DictKeyListRep>, DictKeyListReq, DictKeyListItem>({
    manual: true,
    service: dictKeyList,
  })
  useEffect(() => {
    if (!props.fid) return
    table.insideAction.setParam({
      fid: props.fid
    })
    table.insideAction.setPager({
      current: 1,
      pageSize: 10
    })
  }, [props.fid])
  return (
    <AdminTable
      refresh={table.refresh}
      rowKey="id"
      {
      ...table.tableConfig
      }
      cardConfig={{
        title: "属性列表",
      }}
      scroll={{
        x: 'true',
        scrollToFirstRowOnChange: true,
        y: "50vh"
      }}
      toolsRender={[
        <AuthShow authKey="admin:dict:create" key="DictFormAdd">
          <DictKeyFormAdd onSuccess={table.refresh} fid={props.fid}>
            <Button type="primary" size="middle">新增属性</Button>
          </DictKeyFormAdd>
        </AuthShow>
      ]}
      columns={[
        {
          "title": "字典标签",
          "dataIndex": "dict_label",
          "key": "dict_label",
          "width": 140,
          "ellipsis": true
        },
        {
          "title": "字典键值",
          "dataIndex": "dict_code",
          "key": "dict_code",
          "width": 140,
          "ellipsis": true
        },
        // {
        //   "title": "排序",
        //   "dataIndex": "sort",
        //   "key": "sort",
        //   "width": 140,
        //   "ellipsis": true
        // },
        {
          "title": "描述",
          "dataIndex": "remarks",
          "key": "remarks",
          "width": 140,
          "ellipsis": true
        },
        {
          "title": "是否启用",
          "dataIndex": "is_enable",
          "key": "is_enable",
          "width": 100,
          "ellipsis": true,
          render(val) {
            return <Switch disabled checked={val}></Switch>
          }
        },
        // {
        //   "title": "更新时间",
        //   "dataIndex": "updated_at",
        //   "key": "updated_at",
        //   "width": 200,
        //   "ellipsis": true,
        //   render: (val) => <ToolsTime>{val}</ToolsTime>
        // },
        {
          "title": "操作",
          "width": 200,
          align: "center",
          fixed: 'right',
          render: (_, row) => {
            return (
              <Space>
                <AuthShow authKey="admin:dict:key:update">
                  <DictKeyFormUpdate itemData={row} onSuccess={table.refresh}>
                    <Button type="link">修改</Button>
                  </DictKeyFormUpdate>
                </AuthShow>
                <AuthShow authKey="admin:dict:key:delete">
                  <DeleteButton upDateFn={dictKeyDelete} payload={{ id: row.id }} onSuccess={table.refresh}></DeleteButton>
                </AuthShow>
              </Space>
            )
          }
        }
      ]}
    >
    </AdminTable>
  )
}

export default DictKeyList
