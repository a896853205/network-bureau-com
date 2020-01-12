import React, { useState, useEffect } from 'react';

// 请求
import { QUERY_SYS_REGISTRATION_STEP } from '@/constants/api-constants';
import proxyFetch from '@/util/request';

// 样式
import { Timeline } from 'antd';

export default props => {
  const [sysRegistrationStepList, setSysRegistrationStepList] = useState(null);

  useEffect(() => {
    (async () => {
      const sysRegistrationStepList = await proxyFetch(
        QUERY_SYS_REGISTRATION_STEP,
        {},
        'GET'
      );

    
      console.log(sysRegistrationStepList);

      setSysRegistrationStepList(sysRegistrationStepList);
    })();
  }, []);


  let list = sysRegistrationStepList
    ? sysRegistrationStepList.map((item, i) => (
        <Timeline.item key={i}>{item.name}</Timeline.item>
      ))
    : null;

  return (
    <div className='process-item-box'>
      <p className='title-box'>测试进度</p>
      <div className='process-profile-bottom-box'>
        <Timeline>{list}</Timeline>}
      </div>
    </div>
  );
};
