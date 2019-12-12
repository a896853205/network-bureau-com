import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// 样式
import { Icon, Input, Form, Button } from 'antd';
import '@/style/register.styl';

import proxyFetch from '@/util/request';
import { CREATE_NEW_ENTERPRISE } from '@/constants/api-constants';

// 路由
import { Link } from 'react-router-dom';

// 加密
import md5 from 'md5';

export default Form.create({ name: 'register' })(props => {
  const [loading, setLoading] = useState(false),
    { getFieldDecorator } = props.form,
    history = useHistory();
  /**
   * 注册按钮绑定事件
   */
  const handleSubmitRegister = e => {
    e.preventDefault();

    props.form.validateFields(async (err, values) => {
      if (!err) {
        // 处理form中的数据
        delete values.passwordAgain;
        values.password = md5(values.password);
        setLoading(true);
        const res = await proxyFetch(CREATE_NEW_ENTERPRISE, values);
        setLoading(false);

        // 如果用户已存在就不跳转页面
        if (res) {
          history.push('/index/login');
        }
      }
    });
  };

  return (
    <Form onSubmit={handleSubmitRegister}>
      <Form.Item>
        {getFieldDecorator('code', {
          rules: [
            {
              required: true,
              message: '请输入统一社会信用代码！'
            },
            {
              pattern: /^[0-9]{6}[0-3][1-2][0-9]{6}[0-9A-Z]$/,
              message: '统一社会信用代码不符合规则'
            }
          ]
        })(
          <Input
            prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder='统一社会信用代码'
            size='large'
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入企业名称！' }]
        })(
          <Input
            prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder='企业名称'
            size='large'
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
            prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder='电话'
            size='large'
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [
            { required: true, message: '请输入密码！' },
            {
              pattern: /^\S{6,12}$/,
              message: '密码需要是6-12位数字或字符'
            }
          ]
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
        {getFieldDecorator('passwordAgain', {
          rules: [
            { required: true, message: '请确认密码！' },
            {
              validator: (rule, value, callback) => {
                if (value && value !== props.form.getFieldValue('password')) {
                  callback('密码和确认密码要一致！');
                } else {
                  callback();
                }
              }
            }
          ]
        })(
          <Input
            prefix={<Icon type='key' style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder='确认密码'
            size='large'
            type='password'
          />
        )}
      </Form.Item>
      <Form.Item>
        <div className='register-button-box'>
          <Button type='primary' htmlType='submit' loading={loading}>
            注册
          </Button>
          <Link to='/index/login'>我有账号</Link>
        </div>
      </Form.Item>
    </Form>
  );
});
