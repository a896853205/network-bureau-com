import React, { useState, useEffect } from 'react';

// 请求
import { QUERY_SYS_REGISTRATION_STEP } from '@/constants/api-constants';
import proxyFetch from '@/util/request';

// 样式
import { Timeline, Skeleton, Tag } from 'antd';

// redux
import { useSelector } from 'react-redux';

export default props => {
  const { steps } = useSelector(state => state.enterpriseStore),
    [sysRegistrationStepList, setSysRegistrationStepList] = useState([]),
    [loading, setLoading] = useState(true),
    [stepStatus, setStepStatus] = useState([]);

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

  useEffect(() => {
    setStepStatus(
      steps.map(step => {
        let color = '';

        switch (step.status) {
          case 1:
            color = 'gray';
            break;
          case 2:
            color = 'blue';
            break;
          case 3:
            color = 'green';
            break;
          case 4:
            color = 'red';
            break;
          default:
            color = 'blue';
        }

        return {
          ...step,
          color
        };
      })
    );
  }, [steps]);

  return (
    <div className='item-box process-item-box'>
      <p className='title-box'>测试进度</p>
      <div className='process-profile-bottom-box'>
        <Skeleton loading={loading}>
          <Timeline>
            {sysRegistrationStepList
              ? sysRegistrationStepList.map((item, i) => (
                  <Timeline.Item
                    key={i}
                    color={stepStatus[i] ? stepStatus[i].color : 'gray'}
                  >
                    <span style={{ marginRight: '5px' }}>{item.name}</span>
                    <Tag color={stepStatus[i] ? stepStatus[i].color : 'gray'}>
                      {stepStatus[i] ? stepStatus[i].statusText : ''}
                    </Tag>
                  </Timeline.Item>
                ))
              : null}
          </Timeline>
        </Skeleton>
      </div>
    </div>
  );
};
