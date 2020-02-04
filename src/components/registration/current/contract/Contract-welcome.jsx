import React from 'react';
//样式
import { Alert } from 'antd';
import '@/style/home/registration/electronic-contract.styl';

export default props => {
  return (
    <>
      <div className='electronic-contract-alert-box'>
        <Alert
          message='请等待合同生成'
          description='管理员正在生成合同,请耐心等待2-3个工作日'
          type='info'
          showIcon
        />
      </div>
    </>
  );
};
