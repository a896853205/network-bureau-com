import React, { useState, useEffect } from 'react';

// 请求
import { QUERY_SYS_REGISTRATION_STEP } from '@/constants/api-constants';
import proxyFetch from '@/util/request';

// 样式
import { Timeline, Skeleton } from 'antd';

export default props => {
  const [sysRegistrationStepList, setSysRegistrationStepList] = useState([]),
    [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const sysRegistrationStepList = await proxyFetch(
        QUERY_SYS_REGISTRATION_STEP,
        {},
        'GET'
      );

      setSysRegistrationStepList(sysRegistrationStepList);
      setLoading(false);
    })();
  }, []);

  return (
    <div className='process-item-box'>
      <p className='title-box'>测试进度</p>
      <div className='process-profile-bottom-box'>
        <Skeleton loading={loading}>
          <Timeline>
            {sysRegistrationStepList
              ? sysRegistrationStepList.map((item, i) => (
                  <Timeline.Item key={i}>{item.name}</Timeline.Item>
                ))
              : null}
          </Timeline>
        </Skeleton>
      </div>
    </div>
  );
};
