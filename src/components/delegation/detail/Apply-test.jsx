import React, { useState, useEffect } from 'react';

// 路由
import { Link, useHistory } from 'react-router-dom';
import { DELEGATION_PROFILE } from '@/constants/route-constants';

// redux
import { useSelector } from 'react-redux';

// 请求
import proxyFetch from '@/util/request';
import {
  SELECT_TEST_DELEGATION_APPLY,
  SAVE_TEST_DELEGATION_APPLY
} from '@/constants/api-constants';

// 样式
import '@/style/home/delegation/apply.styl';
import { Input, Form, Button, Icon, Alert, Skeleton } from 'antd';
const { TextArea } = Input;

export default Form.create({ name: 'apply' })(({ form }) => {
  const { getFieldDecorator, setFieldsValue } = form,
    { enterpriseDelegationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    history = useHistory(),
    [failManagerText, setFailManagerText] = useState(''),
    [getDataLoading, setGetDataLoading] = useState(true),
    [saveDataLoading, setSaveDataLoading] = useState(false);

  // 将已有的数据回显
  useEffect(() => {
    if (enterpriseDelegationUuid) {
      (async () => {
        setGetDataLoading(true);
        let delegationApply = await proxyFetch(
          SELECT_TEST_DELEGATION_APPLY,
          { delegationUuid: enterpriseDelegationUuid },
          'GET'
        );

        // 数据回显
        if (delegationApply) {
          // 数据处理

          if (delegationApply.failManagerText) {
            setFailManagerText(delegationApply.failManagerText);
          }

          delete delegationApply.managerStatus;
          delete delegationApply.failManagerText;

          setFieldsValue({
            ...delegationApply,
            content: delegationApply.content
          });
        }

        setGetDataLoading(false);
      })();
    }
  }, [enterpriseDelegationUuid, setFieldsValue]);

  /**
   * 提交事件
   */
  const handleSumbitSave = e => {
    e.preventDefault();

    // 表单判断
    form.validateFields(async (err, value) => {
      if (enterpriseDelegationUuid) {
        if (!err) {
          value.delegationUuid = enterpriseDelegationUuid;

          setSaveDataLoading(true);
          const res = await proxyFetch(SAVE_TEST_DELEGATION_APPLY, value);
          setSaveDataLoading(false);

          if (res) {
            history.push(`${DELEGATION_PROFILE.path}`);
          }
        }
      }
    });
  };

  return (
    <>
      <div className='subtitle-box'>
        <Link to={`${DELEGATION_PROFILE.path}`}>
          <Icon type='left' className='exit-icon' />
        </Link>
        <p className='subtitle-title'>现场测试申请表</p>
      </div>
      {failManagerText ? (
        <Alert
          message='填写错误,请按描述修改'
          description={failManagerText}
          type='error'        
        />
      ) : null}
      <div className='detail-apply-box'>
        <Skeleton loading={getDataLoading}>
          <div className='apply-left-box'>
            <Form
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              onSubmit={handleSumbitSave}
            >
              {/* 内容 */}
              <Form.Item label='内容'>
                {getFieldDecorator('content', {
                  rules: [
                    {
                      required: true,
                      message: '请输入内容！'
                    }
                  ]
                })(
                  <TextArea
                    autoSize={{ minRows: 6, maxRows: 50 }}
                    maxLength='800'
                  />
                )}
              </Form.Item>
              {/* 提交按钮 */}
              <Form.Item wrapperCol={{ offset: 4 }}>
                <Button
                  type='primary'
                  htmlType='submit'
                  loading={saveDataLoading}
                  className='button'
                  size='large'
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Skeleton>
        <div className='apply-right-box'>
          <Alert
            message='填写现场测试申请表注意事项'
            description='此块内容是现场测试申请表的测试环境等内容,请企业提供的信息真实完整和准确。'
            type='info'     
          />
        </div>
      </div>
    </>
  );
});
