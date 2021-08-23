/*
 * @Author: 赵忠洋
 * @Date: 2021-08-12 17:57:40
 * @LastEditTime: 2021-08-12 18:10:11
 * @LastEditors: 赵忠洋
 * @Description:
 * @FilePath: /goAdminUI2/src/utils/formRules.ts
 */
export const rulesIsRequired = { required: true, message: '请填写此字段' }

export const rulesPhone = {
  pattern: /(^\d{11}$)|(^$)/,
  message: '请输入正确的手机号码'
}
