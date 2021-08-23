import React, { ReactElement } from 'react'
import './index.less'
import { Form, Input, Button, Checkbox, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch, useRequest, history } from 'umi';
import { login } from '@/apis/admin_auth';
interface Props {

}
function Login({ }: Props): ReactElement {
  const dispatch = useDispatch()
  const { loading: loginLoading, run: submitLogin } = useRequest(login, {
    manual: true,
  })
  return (
    <div className='container'>
      <div className="header">
        {/* <img src={logoPng} className="logo" alt="logo" /> */}
        <div className="logo"></div>
        <span className="desc">后台管理系统</span>
      </div>
      <div className='main'>
        <div className='card-box'>
          <Card
            title='登录'
            className='loginCard'
            bodyStyle={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                // username: 'admin',
                // password: '123456',
                remember: true
              }}
              onFinish={async (val) => {
                try {
                  const logRep = await submitLogin(val)
                  message.success('登录成功')
                  dispatch({
                    type: 'user/setUser',
                    payload: {
                      user: logRep.user,
                      jwt_data: logRep.jwt_data
                    }
                  })
                  history.push("/")
                } catch (error) {
                  console.log(error)
                }
              }}
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: '请填写用户名' }]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请填写用户名" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: '请填写密码' }]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="请填写密码"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>记住用户名</Checkbox>
                </Form.Item>
              </Form.Item>

              <Form.Item>
                <Button loading={loginLoading} type="primary" htmlType="submit" className="login-form-button">
                  登录
              </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>

      </div>
      <div className="footer">
        <div className="footer-main">
          <div className="footer-record">
            <span className="copyright">
              FAST ADMIN版权所有
              &copy;2020-2021&emsp;网站备案号&nbsp;沪ICP备xxxxxxx号-1
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
