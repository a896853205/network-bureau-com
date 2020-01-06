import React, { useState, useEffect } from 'react';

// 请求
import { QUERY_REGISTION_BYUUID } from '@/constants/api-constants';
import proxyFetch from '@/util/request';

// 样式
import { Table } from 'antd';
import '@/style/home/registion/query.styl';

const { Column } = Table;

export default props => {
  const [loading, setLoading] = useState(true),
    [enterpriseRegistionList, setEnterpriseRegistionList] = useState([]),
    [total, setTotal] = useState(0),
    [pageSize, setPageSize] = useState(1),
    [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      setLoading(true);
        const { enterpriseRegistionList, total, pageSize } = await proxyFetch(
          QUERY_REGISTION_BYUUID,
          {
            page
          },
          'GET'
        );

        setEnterpriseRegistionList(enterpriseRegistionList);
        setTotal(total);
        setPageSize(pageSize);
        setLoading(false);
    })();
  }, [page]);

  return (
    <div className='query-registion-box'>
      <Table
        dataSource={enterpriseRegistionList}
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
