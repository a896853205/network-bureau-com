import React from 'react';
import '@/style/login.styl';

// 样式
import { Icon, Input, Form, Button } from 'antd';

export default props => {
  return (
    <div className='login-box'>
      <div className='login-inner-box'>
        <div className='left-box'>
          <h1 className='logo'><Icon type="reconciliation" /> <span>业务管理系统</span></h1>
          <div className='nav'>
            <button className='login button'>登录</button>
            <button className='register button'>注册</button>
          </div>
          <Form className='form'>
            <Form.Item>
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
                size="large"
              />
            </Form.Item>
            <Form.Item>
              <Input
                prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Password"
                size="large"
                type='password'
              />
            </Form.Item>
            <Form.Item>
              <a href="/" target="_blank" className='register-link'>没有账号?</a>
              <Button className='button' type='primary'>登录</Button>
            </Form.Item>
          </Form>
          <ul className='performance'>
            <li><Icon type="clock-circle" className='icon' /><span>更快捷的业务办理</span></li>
            <li><Icon type="bug" className='icon' /><span>更稳定的测试流程</span></li>
            <li><Icon type="safety-certificate" className='icon' /><span>更安全的项目管理</span></li>
          </ul>
        </div>
        <div className='right-box'>
          <div>
            <p className='main-describe'>欢迎使用</p>
            <p className='main-describe'>软件测试</p>
            <p className='main-describe'>业务管理系统</p>
            <p className='sub-describe'>欢迎使用软件测试业务管理系统,使您快速方便地办理各类软件测试。</p>
          </div>
        </div>
      </div>
    </div>
  );
};
