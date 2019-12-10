import React from 'react';

// 样式
import { Icon, Input, Form, Button } from 'antd';
import '@/style/login.styl';

// 路由
import { Link } from 'react-router-dom';

export default props => {
  return (
    <Form>
      <Form.Item>
        <Input
          prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder='Username'
          size='large'
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type='key' style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder='Password'
          size='large'
          type='password'
        />
      </Form.Item>
      <Form.Item>
        <div className='login-button-box'>
          <Button type='primary'>登录</Button>
          <Link to='/index/register'>没有账号?</Link>
        </div>
      </Form.Item>
    </Form>
  );
};
