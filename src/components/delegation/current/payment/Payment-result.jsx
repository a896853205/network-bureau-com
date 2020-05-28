import React from 'react';
// 样式
import { Alert } from 'antd';
import '@/style/home/delegation/payment.styl';

export default props => {
  return (
    <div className='payment-info-alert-box'>
      <Alert
        message='请等待'
        description='请等待2-3个工作日,汇款信息正在等待相关财务人员审核'
        type='info'
      />
    </div>
  );
};
