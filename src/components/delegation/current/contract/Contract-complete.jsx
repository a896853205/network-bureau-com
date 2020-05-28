import React from 'react';
//样式
import { Alert } from 'antd';
import '@/style/home/delegation/electronic-contract.styl';

export default props => {
  return (
    <>
      <div className='electronic-contract-alert-box'>
        <Alert
          message='审查合格'
          description='电子签合同审核通过,请耐心等待2-3个工作日,请等待合同生成并交付汇款'
          type='success'
        />
      </div>
    </>
  );
};
