import React from 'react';

// 样式
import { Icon, Input, Form, Button, message } from 'antd';
import '@/style/register.styl';

import proxyFetch from '@/util/request';
import { CREATE_NEW_ENTERPRISE } from '@/constants/api-constants';
import schema from 'async-validator';
// 路由
import { Link } from 'react-router-dom';

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(props => {
  const { getFieldDecorator } = props.form;
  /**
   *
   *  注册按钮
   */
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (values.password !== values.passwordAgain) {
        info();
      } else {
        if (!err) {
          delete values.passwordAgain;
          let data = await proxyFetch(CREATE_NEW_ENTERPRISE, values);
        }
      }
    });
  };

  const info = () => {
    message.info('两次密码必须相同');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item>
        {getFieldDecorator('code', {
          rules: [
            {
              required: true,
              message: '请输入统一社会信用代码！'
            },
            {
              pattern: /^[0-9]{6}[0-3][1-2][0-9]{6}[0-9]$/,
              message: '统一社会信用代码不符合规则'
            }
          ]
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="统一社会信用代码"
            size="large"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入企业名称！' }]
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="企业名称"
            size="large"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('phone', {
          rules: [
            {
              required: true,
              message: '请输入电话！'
            },
            {
              pattern: /^[1][0-9][0-9]{9}$/,
              message: '电话号码不符合规则'
            }
          ]
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="电话"
            size="large"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: '请输入密码！' }]
        })(
          <Input
            prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="密码"
            size="large"
            type="password"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('passwordAgain', {
          rules: [{ required: true, message: '请确认密码！' }]
        })(
          <Input
            prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="确认密码"
            size="large"
            type="password"
          />
        )}
      </Form.Item>
      <Form.Item>
        <div className="register-button-box">
          <Button type="primary" htmlType="submit">
            注册
          </Button>
          <Link to="/index/login">我有账号</Link>
        </div>
      </Form.Item>
    </Form>
  );
});

export default WrappedNormalLoginForm;
