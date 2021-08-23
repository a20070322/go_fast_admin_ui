/*
 * @Author: 赵忠洋
 * @Date: 2021-08-09 12:56:01
 * @LastEditTime: 2021-08-19 16:43:01
 * @LastEditors: 赵忠洋
 * @Description:
 * @FilePath: /goAdminUI2/src/pages/system/dict/components/DictFormSearch.tsx
 */
import ProCard from '@ant-design/pro-card';
import { QueryFilter, ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { DictListReq } from '@/apis/admin_dict';
import { useDict } from '@/hooks/useDict';

interface Props {
  onChange?: (val: DictListReq) => void
  loading?: boolean
}

const DictFormSearch = (props: Props) => {
  return (
    <ProCard>
      <QueryFilter<DictListReq>
        layout="inline"
        defaultCollapsed={false}
        labelWidth="auto"
        submitter={{
          submitButtonProps: {
            loading: props.loading
          },
          resetButtonProps: {
            loading: props.loading
          }
        }}
        onFinish={async (val: DictListReq) => {
          if (typeof props?.onChange === "function") {
            props.onChange(val)
          }
          return true
        }}
        onReset={() => {
          if (typeof props?.onChange === "function") {
            props.onChange({})
          }
        }}
      >
        <ProFormText name="dict_name" label="字典名称" placeholder="请输入字典名称" />
        <ProFormText name="dict_type" label="字典类型" placeholder="请输入字典类型" />
        <ProFormSelect name="is_enable" label="启用状态" placeholder="请选择启用状态"
          options={useDict("sys_com_enable")}
        />
      </QueryFilter>
    </ProCard>
  )
}

export default DictFormSearch
