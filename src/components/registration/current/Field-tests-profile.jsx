import React from 'react';

// redux
import { useSelector } from 'react-redux';

// 样式
import { Alert } from 'antd';
import '@/style/home/registration/payment.styl';

export default props => {
  const { steps } = useSelector(state => state.enterpriseStore);

  return (
    <div className='item-box process-item-box current-profile-box'>
      <p className='title-box'>
        <span>当前步骤</span>-<span>现场测试</span>
      </p>
      <div className='payment-info-alert-box'>
        <Alert
          message='请等待'
          description={`请等待现场测试,当前测试进度:${steps[3].statusText}`}
          type='info'
        />
      </div>
    </div>
  );
};
