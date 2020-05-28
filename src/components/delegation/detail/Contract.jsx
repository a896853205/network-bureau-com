import React, { useState, useEffect } from 'react';

// 路由
import { Link, useHistory } from 'react-router-dom';
import { DELEGATION_PROFILE } from '@/constants/route-constants';

// redux
import { useSelector } from 'react-redux';

// 请求
import proxyFetch from '@/util/request';
import {
  SELECT_DELEGATION_CONTRACT,
  SAVE_DELEGATION_CONTRACT
} from '@/constants/api-constants';

// 组件
import moment from 'moment';

// 样式
import '@/style/home/delegation/contract.styl';
import { Input, Form, Button, Icon, InputNumber, Alert, Skeleton } from 'antd';
const { TextArea } = Input;

export default Form.create({ name: 'contract' })(({ form }) => {
  const { getFieldDecorator, setFieldsValue } = form,
    { enterpriseDelegationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    history = useHistory(),
    [failText, setFailText] = useState(''),
    [getDataLoading, setGetDataLoading] = useState(true),
    [saveDataLoading, setSaveDataLoading] = useState(false);

  // 将已有的数据回显
  useEffect(() => {
    if (enterpriseDelegationUuid) {
      (async () => {
        setGetDataLoading(true);
        let delegationContract = await proxyFetch(
          SELECT_DELEGATION_CONTRACT,
          { delegationUuid: enterpriseDelegationUuid },
          'GET'
        );

        // 数据回显
        if (delegationContract) {
          // 数据处理
          // 时间处理
          if (delegationContract.devStartTime) {
            delegationContract.devStartTime = moment(
              delegationContract.devStartTime
            );
          }

          if (delegationContract.failText) {
            setFailText(delegationContract.failText);
          }

          delete delegationContract.status;
          delete delegationContract.statusText;
          delete delegationContract.failText;

          setFieldsValue(delegationContract);
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
          const res = await proxyFetch(SAVE_DELEGATION_CONTRACT, value);
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
        <p className='subtitle-title'>评测合同</p>
      </div>
      {failText ? (
        <Alert
          message='填写错误,请按描述修改'
          description={failText}
          type='error'
        />
      ) : null}
      <div className='detail-contract-box'>
        <Skeleton loading={getDataLoading}>
          <div className='contract-left-box'>
            <Form
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              onSubmit={handleSumbitSave}
            >
              {/* 数量 */}
              <Form.Item label='数量'>
                {getFieldDecorator('amount', {
                  rules: [
                    {
                      required: true,
                      message: '请输入数量！'
                    },
                    {
                      pattern: /^[1-9]\d{0,2}$/,
                      message: '请输入正确的数量,须在1-999之间'
                    }
                  ]
                })(<InputNumber min={1} max={999} placeholder={1} />)}
              </Form.Item>

              {/* 邮政编码 */}
              <Form.Item label='邮政编码'>
                {getFieldDecorator('postalCode', {
                  rules: [
                    { required: true, message: '请输入邮政编码！' },
                    { pattern: /^\d{6}$/, message: '请输入正确的邮政编码' }
                  ]
                })(<Input placeholder='请输入邮政编码' maxLength={32} />)}
              </Form.Item>

              {/* 主要功能 */}
              <Form.Item label='主要功能'>
                {getFieldDecorator('mainFunction', {
                  rules: [
                    {
                      required: true,
                      message: '请输入主要功能！'
                    },
                    {
                      message: '主要功能过长！',
                      max: 200
                    }
                  ]
                })(
                  <TextArea
                    autoSize={{ minRows: 2, maxRows: 6 }}
                    placeholder='请输入主要功能!'
                  />
                )}
              </Form.Item>

              {/* 技术指标 */}
              <Form.Item label='技术指标'>
                {getFieldDecorator('techIndex', {
                  rules: [
                    {
                      required: true,
                      message: '请输入技术指标！'
                    },
                    {
                      message: '技术指标过长！',
                      max: 200
                    }
                  ]
                })(
                  <TextArea
                    autoSize={{ minRows: 2, maxRows: 6 }}
                    placeholder='请输入技术指标!'
                  />
                )}
              </Form.Item>

              {/* 提交按钮 */}
              <Form.Item wrapperCol={{ offset: 6 }}>
                <Button
                  type='primary'
                  htmlType='submit'
                  loading={saveDataLoading}
                  className='button'
                  size='large'
                >
                  保存
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Skeleton>
        <div className='contract-right-box'>
          <Alert
            message='填写评测合同内容注意事项'
            description='此块内容是生成评测合同的必要信息,请提供的信息真实完整和准确。'
            type='info'
          />
        </div>
      </div>
    </>
  );
});
