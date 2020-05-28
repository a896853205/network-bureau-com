import React, { useState, useEffect } from 'react';

// 路由
import { useHistory } from 'react-router-dom';
import { DELEGATION_PROFILE } from '@/constants/route-constants';

// 请求
import {
  QUERY_DELEGATION,
  QUERY_SYS_DELEGATION_STEP
} from '@/constants/api-constants';
import proxyFetch from '@/util/request';

// 样式
import { Table, Button } from 'antd';

// localStorage
import { LOCAL_STORAGE } from '@/constants/app-constants';

// redux
import { useDispatch } from 'react-redux';
import enterpriseAction from '@/redux/action/enterprise';

const { Column } = Table;

export default props => {
  const [loading, setLoading] = useState(true),
    [enterpriseDelegationList, setEnterpriseDelegationList] = useState([]),
    [total, setTotal] = useState(0),
    [pageSize, setPageSize] = useState(1),
    [page, setPage] = useState(1),
    [sysDelegationStepList, setSysDelegationStepList] = useState([]),
    dispatch = useDispatch(),
    history = useHistory();

  useEffect(() => {
    (async () => {
      setLoading(true);

      const { enterpriseDelegationList, total, pageSize } = await proxyFetch(
        QUERY_DELEGATION,
        {
          page
        },
        'GET'
      );

      setEnterpriseDelegationList(enterpriseDelegationList);
      setTotal(total);
      setPageSize(pageSize);
      setLoading(false);
    })();
  }, [page]);

  useEffect(() => {
    (async () => {
      const sysDelegationStepList = await proxyFetch(
        QUERY_SYS_DELEGATION_STEP,
        {},
        'GET'
      );

      setSysDelegationStepList(sysDelegationStepList);
    })();
  }, []);

  return (
    <div className='query-registion-box'>
      <Table
        dataSource={enterpriseDelegationList}
        className='table'
        rowKey={record => record.uuid}
        loading={loading}
        pagination={{
          current: page,
          total,
          pageSize,
          onChange: page => {
            setPage(page);
          }
        }}
      >
        <Column title='委托测试项目名称' dataIndex='name' key='name' />
        <Column
          title='最新进展'
          dataIndex='currentStep'
          key='currentStep'
          render={(text, record) => (
            <span>
              {sysDelegationStepList[text - 1] &&
                sysDelegationStepList[text - 1].name}
            </span>
          )}
        />
        <Column
          align='center'
          title='查看详情'
          dataIndex='uuid'
          key='uuid'
          render={(text, record) => (
            <Button
              type='link'
              onClick={() => {
                localStorage.setItem(
                  `${LOCAL_STORAGE}-delegationUuid`,
                  record.uuid
                );
                // dispatch
                dispatch(
                  enterpriseAction.setEnterpriseDelegationUuid(record.uuid)
                );
                // 跳转页面
                history.push(`${DELEGATION_PROFILE.path}`);
              }}
            >
              查看详情
            </Button>
          )}
        />
      </Table>
    </div>
  );
};
