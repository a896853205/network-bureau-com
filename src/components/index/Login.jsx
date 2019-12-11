import React from 'react';

// 样式
import { Icon, Input, Form, Button } from 'antd';
import '@/style/login.styl';

// 路由
import { Link } from 'react-router-dom';

// redux
import { useSelector, useDispatch } from 'react-redux';
import enterpriseAction from '@/redux/action/enterprise';

export default Form.create({ name: 'login' })(props => {
  const { getFieldDecorator } = props.form;
  const { loginLoading } = useSelector(state => state.enterpriseStore);
  const dispatch = useDispatch();

  const handleSubmitLogin = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        // 使用redux-saga
        dispatch(enterpriseAction.asyncSetEnterprise(values));
      }
    });
  };

  return (
    <Form onSubmit={handleSubmitLogin}>
      <Form.Item>
        {getFieldDecorator('code', {
          rules: [{ required: true, message: '请输入企业统一信用代码!' }]
        })(
          <Input
            prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder='企业统一信用代码'
            size='large'
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: '请输入密码!' }]
        })(
          <Input
            prefix={<Icon type='key' style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder='密码'
            size='large'
            type='password'
          />
        )}
      </Form.Item>
      <Form.Item>
        <div className='login-button-box'>
          <Button type='primary' loading={loginLoading} htmlType='submit'>
            登录
          </Button>
          <Link to='/index/register'>没有账号?</Link>
        </div>
      </Form.Item>
    </Form>
  );
});
