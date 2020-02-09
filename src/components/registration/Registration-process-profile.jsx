import React, { useEffect } from 'react';

// 样式
import { Timeline, Skeleton, Tag } from 'antd';

// redux
import { useSelector, useDispatch } from 'react-redux';
import enterpriseAction from '@/redux/action/enterprise';

export default props => {
  const {
      steps,
      sysRegistrationStepLoading: loading,
      sysRegistrationStep
    } = useSelector(state => state.enterpriseStore),
    dispatch = useDispatch();

  useEffect(() => {
    dispatch(enterpriseAction.asyncSetSysRegistrationStep());
  }, [dispatch]);

  return (
    <div className='item-box process-item-box'>
      <p className='title-box'>测试进度</p>
      <div className='process-profile-bottom-box'>
        <Skeleton loading={loading}>
          <Timeline>
            {sysRegistrationStep.length && steps.length
              ? sysRegistrationStep.map((item, i) => (
                  <Timeline.Item key={i} color={steps[i].color}>
                    <span style={{ marginRight: '5px' }}>{item.name}</span>
                    <Tag color={steps[i].color}>{steps[i].statusText}</Tag>
                  </Timeline.Item>
                ))
              : null}
          </Timeline>
        </Skeleton>
      </div>
    </div>
  );
};
