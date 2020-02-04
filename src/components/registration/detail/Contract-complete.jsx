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
          description='电子签合同审查通过,下一步流程:交付汇款'
          type='success'
          showIcon
        />
      </div>
    </>
  );
};
