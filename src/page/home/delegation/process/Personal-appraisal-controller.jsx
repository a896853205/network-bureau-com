import React, { useState, useEffect } from 'react';

// redux
import { useSelector } from 'react-redux';

// 请求
import { GET_DELEGATION_MANAGER_INFO } from '@/constants/api-constants';
import proxyFetch from '@/util/request';

// 路由
import { Link } from 'react-router-dom';
import { DELEGATION_PROFILE } from '@/constants/route-constants';

import '@/style/home/delegation/personal-apprasial.styl';
import { Icon, Skeleton, Rate } from 'antd';

export default props => {
  const { enterpriseDelegationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    [getDataLoading, setGetDataLoading] = useState(false),
    [projectManager, setProjectManager] = useState(null),
    [accountantManager, setAccountantManager] = useState(null),
    [techLeaderManager, setTechLeaderManager] = useState(null),
    [techManager, setTechManager] = useState(null),
    [certifierManager, setCertifierManager] = useState(null);

  useEffect(() => {
    (async () => {
      if (enterpriseDelegationUuid) {
        setGetDataLoading(true);
        const {
          projectManager,
          accountantManager,
          techLeaderManager,
          techManager,
          certifierManager
        } = await proxyFetch(
          GET_DELEGATION_MANAGER_INFO,
          { DelegationUuid: enterpriseDelegationUuid },
          'GET'
        );
        setProjectManager(projectManager);
        setAccountantManager(accountantManager);
        setTechLeaderManager(techLeaderManager);
        setTechManager(techManager);
        setCertifierManager(certifierManager);
        setGetDataLoading(false);
      }
    })();
  }, [enterpriseDelegationUuid]);

  return (
    <div className='item-box apprasial-item-box'>
      <p className='title-box'>人员评价</p>
      <div className='subtitle-box'>
        <Link to={`${DELEGATION_PROFILE.path}`}>
          <Icon type='left' className='exit-icon' />
        </Link>
        <p className='subtitle-title'>管理人员评价打分</p>
      </div>
      <div className='responsible-person-list'>
        <Skeleton loading={getDataLoading}>
          <ul className='responsible-person-ul'>
            <li>
              <span>管理员姓名</span>
              <span>管理员职务</span>
              <span>评价</span>
            </li>
            <li>
              <span>
                {projectManager?.name ? projectManager?.name : '未分配'}
              </span>
              <span>{getAuthortyNameByCode(10)}</span>
              <Rate className='rate' />
            </li>
            <li>
              <span>
                {accountantManager?.name ? accountantManager?.name : '未分配'}
              </span>
              <span>{getAuthortyNameByCode(5)}</span>
              <Rate className='rate' />
            </li>
            <li>
              <span>
                {techLeaderManager?.name ? techLeaderManager?.name : '未分配'}
              </span>
              <span>{getAuthortyNameByCode(15)}</span>
              <Rate className='rate' />
            </li>
            <li>
              <span>{techManager?.name ? techManager?.name : '未分配'}</span>
              <span>{getAuthortyNameByCode(20)}</span>
              <Rate className='rate' />
            </li>
            <li>
              <span>
                {certifierManager?.name ? certifierManager?.name : '未分配'}
              </span>
              <span>{getAuthortyNameByCode(25)}</span>
              <Rate className='rate' />
            </li>
          </ul>
        </Skeleton>
      </div>
    </div>
  );
};

const getAuthortyNameByCode = code => {
  switch (code) {
    case 1:
      return '超级管理员';
    case 5:
      return '财务';
    case 10:
      return '项目管理人员';
    case 15:
      return '技术负责人';
    case 20:
      return '技术人员';
    case 25:
      return '批准人';
    default:
      return '';
  }
};
