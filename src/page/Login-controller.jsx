import React from 'react';
import '@/style/login.styl';

export default props => {
  return (
    <div className='login-box'>
      <div className='login-inner-box'>
        <div className='left-box'>
          <img src='' alt='' />
          <div>
            <div>
              <h5>登录</h5>
              <span></span>
            </div>
            <input type='text' />
            <input type='text' />
            {/* <a href=''></a> */}
            <button></button>
          </div>
          <ol>
            <li></li>
            <li></li>
            <li></li>
          </ol>
        </div>
        <div className='right-box'>
          <h1>业务管理系统</h1>
          <p>欢迎使用业务管理系统,使您快速方便地办理各类软件测试。</p>
        </div>
      </div>
    </div>
  );
};
