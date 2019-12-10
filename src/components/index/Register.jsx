import React from 'react';

// 样式
import { Icon, Input, Form, Button } from 'antd';
import '@/style/register.styl';

// 路由
import { Link } from 'react-router-dom';

export default props => {
  return (
    <Form>
      <Form.Item>
        <Input
          prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder='统一社会信用代码'
          size='large'
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder='企业名称'
          size='large'
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type='key' style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder='密码'
          size='large'
          type='password'
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type='key' style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder='确认密码'
          size='large'
          type='password'
        />
      </Form.Item>
      <Form.Item>
        <div className='register-button-box'>
          <Button type='primary'>注册</Button>
          <Link to='/index/login'>我有账号</Link>
        </div>
      </Form.Item>
    </Form>
  );
};
