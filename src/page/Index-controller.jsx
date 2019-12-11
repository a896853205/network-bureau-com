import React from 'react';
import '@/style/index.styl';

// 路由
import { Link } from 'react-router-dom';

// 样式
import { Icon } from 'antd';

// 组件
import LoginComponent from '@/components/index/Login.jsx';
import RegisterComponent from '@/components/index/Register.jsx';

export default ({ params }) => {
  const { type } = params;
  const isRegister = type === 'register';

  return (
    <div className="index-box">
      <div className="index-inner-box">
        <div className="left-box">
          <h1 className="logo">
            <Icon type="reconciliation" /> <span>业务管理系统</span>
          </h1>
          <div className="nav">
            <Link
              to="/index/login"
              className={`${!isRegister ? 'focus' : 'unfocus'} button`}
            >
              登录
            </Link>
            <Link
              to="/index/register"
              className={`${isRegister ? 'focus' : 'unfocus'} button`}
            >
              注册
            </Link>
          </div>
          <div className="form">
            {isRegister ? <RegisterComponent /> : <LoginComponent />}
          </div>
          {isRegister ? (
            undefined
          ) : (
            <ul className="performance">
              <li>
                <Icon type="clock-circle" className="icon" />
                <span>更快捷的业务办理</span>
              </li>
              <li>
                <Icon type="bug" className="icon" />
                <span>更稳定的测试流程</span>
              </li>
              <li>
                <Icon type="safety-certificate" className="icon" />
                <span>更安全的项目管理</span>
              </li>
            </ul>
          )}
        </div>
        <div className="right-box">
          <div>
            <p className="main-describe">欢迎使用</p>
            <p className="main-describe">软件测试</p>
            <p className="main-describe">业务管理系统</p>
            <p className="sub-describe">
              欢迎使用软件测试业务管理系统,使您快速方便地办理各类软件测试。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
