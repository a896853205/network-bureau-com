import React, { useState, useEffect } from 'react';

// 请求
import { QUERY_REGISTRATION } from '@/constants/api-constants';
import proxyFetch from '@/util/request';

// 样式
import { Table } from 'antd';

const { Column } = Table;

export default props => {
  const [loading, setLoading] = useState(true),
    [enterpriseRegistrationList, setEnterpriseRegistrationList] = useState([]),
    [total, setTotal] = useState(0),
    [pageSize, setPageSize] = useState(1),
    [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const { enterpriseRegistrationList, total, pageSize } = await proxyFetch(
        QUERY_REGISTRATION,
        {
          page
        },
        'GET'
      );

      setEnterpriseRegistrationList(enterpriseRegistrationList);
      setTotal(total);
      setPageSize(pageSize);
      setLoading(false);
    })();
  }, [page]);

  return (
    <div className='query-registion-box'>
      <Table
        dataSource={enterpriseRegistrationList}
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
        <Column title='登记测试项目名称' dataIndex='name' key='name' />
        <Column title='最新进展' dataIndex='currentStep' key='currentStep' />
      </Table>
    </div>
  );
};
