/*
 * @Author: 赵忠洋
 * @Date: 2021-08-18 14:34:22
 * @LastEditTime: 2021-08-19 18:27:35
 * @LastEditors: 赵忠洋
 * @Description:
 * @FilePath: /goAdminUI2/src/pages/system/dict/DictList.tsx
 */
import { useRequest } from '@/.umi/plugin-request/request'
import { dictDelete, dictList, DictListItem, DictListRep, DictListReq, dictRefresh } from '@/apis/admin_dict'
import AdminTable from '@/components/admin-table/AdminTable'
import DeleteButton from '@/components/admin-table/DeleteButton'
import AuthShow from '@/components/auth-show/AuthShow'
import ToolsTime from '@/components/tools/ToolsTime'
import { useTable } from '@/hooks/useTable'
import { Button, message, Modal, Space, Switch } from 'antd'
import React, { useState } from 'react'
import { Fragment } from 'react'
import DictFormAdd from './components/DictFormAdd'
import DictFormSearch from './components/DictFormSearch'
import DictFormUpdate from './components/DictFormUpdate'
import DictKeyList from './components/DictKeyList'

interface Props {

}

const DictList = (props: Props) => {
  let table = useTable<RepCommon<DictListRep>, DictListReq, DictListItem>({
    service: dictList
  })
  const [fid, setFid] = useState<number | undefined>()
  const dictRefreshReq = useRequest(dictRefresh, {
    manual: true,
    onSuccess: () => {
      message.success("清理成功")
    },
    onError: (err) => {
      message.error(err.message);
    }
  })
  return (
    <Fragment>
      <Modal
        visible={!!fid}
        width="70vw"
        onCancel={() => setFid(undefined)}
        footer={false}
      >
        {fid && <DictKeyList fid={fid}></DictKeyList>}
      </Modal>
      <AdminTable
        refresh={table.refresh}
        header={<DictFormSearch {...table.formSearchConfig}></DictFormSearch>}
        rowKey="id"
        {
        ...table.tableConfig
        }
        cardConfig={{
          title: "字典列表",
        }}
        toolsRender={[
          <AuthShow authKey="admin:dict:refresh" key="DictRefresh">
            <Button type="primary" size="middle" danger onClick={() => dictRefreshReq.run()}>清理缓存</Button>
          </AuthShow>,
          <AuthShow authKey="admin:dict:create" key="DictFormAdd">
            <DictFormAdd onSuccess={table.refresh}>
              <Button type="primary" size="middle">新增字典</Button>
            </DictFormAdd>
          </AuthShow>
        ]}
        columns={[
          {
            "title": "字典名称",
            "dataIndex": "dict_name",
            "key": "dict_name",
            "width": 140,
            "ellipsis": true
          },
          {
            "title": "字典类型",
            "dataIndex": "dict_type",
            "key": "dict_type",
            "width": 140,
            "ellipsis": true
          },
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
          {
            "title": "更新时间",
            "dataIndex": "updated_at",
            "key": "updated_at",
            "width": 200,
            "ellipsis": true,
            render: (val) => <ToolsTime>{val}</ToolsTime>
          },
          {
            "title": "操作",
            "width": 250,
            align: "center",
            fixed: 'right',
            render: (_, row) => {
              return (
                <Space>
                  <AuthShow authKey="admin:dict:key:list">
                    <Button
                      type="link"
                      onClick={() => {
                        setFid(row.id)
                      }}
                    >修改属性</Button>
                  </AuthShow>
                  <AuthShow authKey="admin:dict:update">
                    <DictFormUpdate itemData={row} onSuccess={table.refresh}>
                      <Button type="link">修改</Button>
                    </DictFormUpdate>
                  </AuthShow>
                  <AuthShow authKey="admin:dict:delete">
                    <DeleteButton upDateFn={dictDelete} payload={{ id: row.id }} onSuccess={table.refresh}></DeleteButton>
                  </AuthShow>
                </Space>
              )
            }
          }
        ]}
      >
      </AdminTable>
    </Fragment>
  )
}

export default DictList
