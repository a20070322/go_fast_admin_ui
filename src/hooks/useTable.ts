import { useRequest } from 'umi';
/*
 * @Author: 赵忠洋
 * @Date: 2021-08-09 17:45:38
 * @LastEditTime: 2021-08-19 11:03:17
 * @LastEditors: 赵忠洋
 * @Description:
 * @FilePath: /goAdminUI2/src/hooks/useTable.ts
 */
import React, { useEffect, useRef, useState } from 'react'
import { TablePaginationConfig } from 'antd';

interface DataSourceType<D> {
  total: number,
  data: D[],
  [key: string]: any
}
interface PagerType {
  current: number
  pageSize: number
}

interface UseTableType<T, S> {
  /**
   * 数据接口
   */
  service: any,
  /**
   * 数据处理
   */
  interceptRequest?: (data: any) => T
  /**
   * 是否首次加载数据
   */
  manual?: boolean
  /**
   * 默认参数
   */
  defaultParam?: S
  formatResult?: (data: any) => T
}
// rep req 数据类型
export const useTable = <T extends RepCommon<DataSourceType<D>>, S extends PageType, D = any>(option: UseTableType<T, S>) => {
  const [param, setParam] = useState<S | null>(option.defaultParam || null)
  const [pager, setPager] = useState<PagerType>({ current: 1, pageSize: 10 })
  const [firstLoad, setfirstLoad] = useState(true)
  let formRef = useRef<S>()
  let req = useRequest<T, Array<S | PageType>, T>(option.service, {
    manual: true,
    loadingDelay: 300,
    formatResult(val) {
      if (typeof option.formatResult === "function") {
        return option.formatResult(val)
      }
      return val
    },
    onError(err) {
      console.log(err)
    }
  })
  useEffect(() => {
    if (option.manual && firstLoad) {
      setfirstLoad(false)
      return
    }
    req.run({
      page: pager.current,
      size: pager.pageSize,
      ...(param || {})
    })
  }, [param, pager])
  return {
    refresh: req.refresh,
    insideAction: {
      request: req,
      setParam,
      setPager
    },
    formSearchConfig: {
      loading: req.loading,
      // 搜索表单数据缓存
      onChange: (param: S) => { setParam(param) },
      //表单ref
      formRef,
    },
    tableConfig: {
      loading: req.loading,
      scroll: {
        x: 'true',
        scrollToFirstRowOnChange: true
      },
      pagination: {
        defaultCurrent: 1,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50', '100'],
        total: req.data?.data?.total || 0,
        pageSize: pager.pageSize,
      },
      // 分页数据缓存
      onChange: (param: TablePaginationConfig) => setPager({ current: param.current || 1, pageSize: param.pageSize || 10 }),
      dataSource: req.data?.data?.data || []
    }
  }
}
