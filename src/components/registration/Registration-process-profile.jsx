import React from 'react';

// 样式
import { Timeline } from 'antd';

export default props => {
  return (
    <div className='process-item-box'>
      <p className='title-box'>测试进度</p>
      <div className='process-profile-bottom-box'>
        <Timeline>
          <Timeline.Item color='green' className='process-profile-step'>
            提交上传7种材料
          </Timeline.Item>
          <Timeline.Item color='green' className='process-profile-step'>
            电子签合同
          </Timeline.Item>
          <Timeline.Item color='green' className='process-profile-step'>
            支付汇款
          </Timeline.Item>
          <Timeline.Item color='yellow' className='process-profile-step'>
            现场测试
          </Timeline.Item>
          <Timeline.Item color='gray' className='process-profile-step'>
            接收原始记录和测试报告
          </Timeline.Item>
          <Timeline.Item color='gray' className='process-profile-step'>
            给予打分
          </Timeline.Item>
        </Timeline>
      </div>
    </div>
  );
};
