import React, { useState, useEffect } from 'react';

// redux
import { useSelector } from 'react-redux';

// 样式
import { Alert, Tag, Skeleton } from 'antd';
import '@/style/home/delegation/field-test.styl';

// 请求
import proxyFetch from '@/util/request';
import {
  SELECT_TEST_DELEGATION_APPLY,
  SELECT_TEST_DELEGATION_SPECIMEN
} from '@/constants/api-constants';

// 路由
import { Link } from 'react-router-dom';
import { DELEGATION_DETAIL } from '@/constants/route-constants';

export default props => {
  const { enterpriseDelegationUuid, delegationSteps } = useSelector(
      state => state.enterpriseStore
    ),
    [getDataLoading, setGetDataLoading] = useState(false),
    [applyManagerStatus, setApplyManagerStatus] = useState(0),
    [specimenManagerStatus, setSpecimenManagerStatus] = useState(0);

  const getTagColor = status => {
    switch (status) {
      case 0:
        return 'gray';
      case 1:
        return 'blue';
      case 2:
        return 'blue';
      case 3:
        return 'blue';
      case 100:
        return 'green';
      case -1:
        return 'red';
      case -2:
        return 'red';
      case -3:
        return 'red';
      default:
        return 'gray';
    }
  };

  const getTagText = status => {
    switch (status) {
      case 0:
        return '未审核';
      case 1:
        return '审核中';
      case 2:
        return '审核中';
      case 3:
        return '审核中';
      case 100:
        return '审核通过';
      case -1:
        return '内容错误';
      case -2:
        return '内容错误';
      case -3:
        return '内容错误';
      default:
        return '未开始';
    }
  };

  // 将已有的数据回显
  useEffect(() => {
    if (enterpriseDelegationUuid) {
      (async () => {
        setGetDataLoading(true);
        const [delegationApply, delegationSpecimen] = await Promise.all([
          proxyFetch(
            SELECT_TEST_DELEGATION_APPLY,
            { delegationUuid: enterpriseDelegationUuid },
            'GET'
          ),
          proxyFetch(
            SELECT_TEST_DELEGATION_SPECIMEN,
            { delegationUuid: enterpriseDelegationUuid },
            'GET'
          )
        ]);

        if (delegationApply) {
          setApplyManagerStatus(delegationApply.managerStatus);
        }

        if (delegationSpecimen) {
          setSpecimenManagerStatus(delegationSpecimen.managerStatus);
        }

        setGetDataLoading(false);
      })();
    }
  }, [enterpriseDelegationUuid]);

  return (
    <div className='item-box process-item-box current-profile-box'>
      <p className='title-box'>
        <span>当前步骤</span>-<span>现场测试</span>
      </p>
      <div className='field-test-box'>
        <div className='test-info-alert-box'>
          <Alert
            message='请等待'
            description={`请等待现场测试,当前测试进度:${delegationSteps[3].statusText}`}
            type='info'
          />
        </div>
        <div className='field-test-detail-box'>
          <Skeleton loading={getDataLoading}>
            <div className='file-modify-title-box'>
              修改样品登记表和软件测试申请表
            </div>
            <div className='link-box'>
              <div className='link-left-box'>
                {specimenManagerStatus < 0 ? (
                  <Link to={`${DELEGATION_DETAIL.path}/specimenTest`}>
                    <span>样品登记表</span>
                  </Link>
                ) : (
                  <span>样品登记表</span>
                )}
                <Tag
                  color={getTagColor(specimenManagerStatus)}
                  className='tag-box'
                >
                  {getTagText(specimenManagerStatus)}
                </Tag>
              </div>
              <div className='link-right-box'>
                {applyManagerStatus < 0 ? (
                  <Link to={`${DELEGATION_DETAIL.path}/applyTest`}>
                    <span>软件测试申请表</span>
                  </Link>
                ) : (
                  <span>软件测试申请表</span>
                )}
                <Tag
                  color={getTagColor(applyManagerStatus)}
                  className='tag-box'
                >
                  {getTagText(applyManagerStatus)}
                </Tag>
              </div>
            </div>
          </Skeleton>
        </div>
      </div>
    </div>
  );
};
