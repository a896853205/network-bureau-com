import React from 'react';
//样式
import { Alert } from 'antd';
import '@/style/home/registration/electronic-contract.styl';

export default props => {
  return (
    <>
      <div className='electronic-contract-alert-box'>
        <Alert
          message='审查合格'
          description='电子签合同正在审核中,请耐心等待2-3个工作日,等待审核结果'
          type='info'
        />
      </div>
    </>
  );
};