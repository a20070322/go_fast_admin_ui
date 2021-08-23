import ProCard from '@ant-design/pro-card'
import { Button, Checkbox, Col, Divider, Dropdown, Menu, Row, Space, Table, Tooltip } from 'antd'
import { TableProps } from 'antd'
import React, { useState } from 'react'
import { ReactNode } from 'react'
import { SettingOutlined, ReloadOutlined, ColumnHeightOutlined } from '@ant-design/icons';
import styles from './index.less'
import { Fragment } from 'react'
import { SizeType } from 'antd/lib/config-provider/SizeContext'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
interface Props<T> extends TableProps<T> {
  cardConfig?: {
    title?: string
    tooltip?: string
  }
  header?: ReactNode
  toolsRender?: ReactNode
  refresh?: () => void
  isHiddenTools?: boolean
}
const tableSizeArr: {
  key: SizeType
  title: string
}[] = [
    {
      key: "large",
      title: "默认"
    },
    {
      key: "middle",
      title: "中等"
    },
    {
      key: "small",
      title: "紧凑"
    },
  ]

const AdminTable = <RecordType extends object = any>(props: Props<RecordType>) => {
  // 表格密度设置
  const [tableSize, setTableSize] = useState<SizeType>("large")

  // 列选择是否开启
  const [columnsVisible, setColumnsVisible] = useState(false)

  // 列选择部分
  const [checkedList, setCheckedList] = React.useState<string[]>(props.columns?.map(item => item.key as string) || []);
  const [indeterminate, setIndeterminate] = React.useState(false);
  const [checkAll, setCheckAll] = React.useState(true);
  const onChange = (list: string[]) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < (props?.columns?.length || 0));
    setCheckAll(list.length === (props?.columns?.length || 0));
  }
  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? props.columns?.map(item => item.key as string) || [] : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  }

  return (
    <div className={styles.AdminTableBox}>
      {props.header}
      <ProCard {...props.cardConfig || {}}
        extra={[
          <Space size={16} key="tools">
            {props.toolsRender}
            {
              !props.isHiddenTools && (
                <Fragment>
                  {
                    props.refresh && (
                      <Tooltip title="刷新">
                        <ReloadOutlined
                          className={styles.AdminTableBoxToolsIcon}
                          onClick={() => {
                            (typeof props.refresh === "function" && !props.loading) && props?.refresh()
                          }} />
                      </Tooltip>
                    )
                  }
                  <Tooltip title="密度">
                    <Dropdown
                      trigger={['click']}
                      overlayStyle={{ width: 70 }}
                      overlay={
                        <Menu selectedKeys={[tableSize || ""]}>
                          {
                            tableSizeArr.map(item => (
                              <Menu.Item key={item.key} onClick={() => setTableSize(item.key)}>
                                {item.title}
                              </Menu.Item>
                            ))
                          }
                        </Menu>
                      }
                    >
                      <ColumnHeightOutlined className={styles.AdminTableBoxToolsIcon} />
                    </Dropdown>
                  </Tooltip>
                  <Tooltip title="列设置">
                    <Dropdown
                      visible={columnsVisible}
                      overlayStyle={{ width: 160 }}
                      overlay={
                        <div style={{ background: "#fff", boxSizing: "border-box", padding: 10, border: "1px solid #eee" }} onClick={(e) => {
                          e.stopPropagation()
                        }}>
                          <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                            列名称
                          </Checkbox>
                          <Button type="link" onClick={() => {
                            setCheckedList(props.columns?.map(item => item.key as string) || []);
                            setIndeterminate(false);
                            setCheckAll(true);
                          }}>重置</Button>
                          <Divider style={{ padding: 0, margin: 5 }} />
                          <Checkbox.Group value={checkedList} onChange={(keys: CheckboxValueType[]) => onChange(keys as string[])}
                          >
                            <Row>
                              {
                                props.columns?.map((item, index) => {
                                  return (
                                    <Col span={24} key={index}>
                                      <Checkbox key={item.key} value={item.key}>{item.title}</Checkbox>
                                    </Col>
                                  )
                                })
                              }
                            </Row>
                          </Checkbox.Group>
                        </div>
                      }
                    >
                      <SettingOutlined onClick={() => setColumnsVisible(!columnsVisible)} className={styles.AdminTableBoxToolsIcon} />
                    </Dropdown>
                  </Tooltip>
                </Fragment>
              )
            }
          </Space>
        ]}
      >
        <Table<RecordType>
          size={tableSize}
          {...props}
          columns={props.columns?.filter(item => checkedList.includes(item.key as string))}
        />
      </ProCard>
    </div>
  )
}

export default AdminTable
