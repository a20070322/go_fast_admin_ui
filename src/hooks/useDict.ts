/*
 * @Author: 赵忠洋
 * @Date: 2021-08-19 16:27:43
 * @LastEditTime: 2021-08-20 17:38:20
 * @LastEditors: 赵忠洋
 * @Description:
 * @FilePath: /goAdminUI2/src/hooks/useDict.ts
 */

import { useSelector } from "@/.umi/plugin-dva/exports"
import { DictModelState } from "@/models/dict"

export const useDict = (key?: string) => {
  const dictModel = useSelector((state: { dict: DictModelState }) => ({
    ...state.dict,
  }))
  if (key && key in dictModel.dictMap) {
    return dictModel.dictMap[key]
  }
  if (key) return []

  return Object.keys(dictModel.dictMap).map(val => ({
    label: val,
    value: val,
  }))
}
