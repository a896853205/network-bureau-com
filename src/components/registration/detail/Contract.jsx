import React, { useState, useEffect } from 'react';

// 路由
import { Link, useHistory } from 'react-router-dom';
import { REGISTRATION_PROFILE } from '@/constants/route-constants';

// redux
import { useSelector } from 'react-redux';

// 请求
import proxyFetch from '@/util/request';
import {
  GET_REGISTRATION_CONTRACT,
  SAVE_REGISTRATION_CONTRACT
} from '@/constants/api-constants';

// 组件
import moment from 'moment';

// 样式
import '@/style/home/registration/contract.styl';
import { Input, Form, Button, Icon, InputNumber, Alert, Skeleton } from 'antd';
const { TextArea } = Input;

export default Form.create({ name: 'contract' })(({ form }) => {
  const { getFieldDecorator, setFieldsValue } = form,
    { enterpriseRegistrationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    history = useHistory(),
    [failText, setFailText] = useState(''),
    [getDataLoading, setGetDataLoading] = useState(true),
    [saveDataLoading, setSaveDataLoading] = useState(false);

  // 将已有的数据回显
  useEffect(() => {
    if (enterpriseRegistrationUuid) {
      (async () => {
        setGetDataLoading(true);
        let registrationContract = await proxyFetch(
          GET_REGISTRATION_CONTRACT,
          { registrationUuid: enterpriseRegistrationUuid },
          'GET'
        );

        // 数据回显
        if (registrationContract) {
          // 数据处理
          // 时间处理
          if (registrationContract.devStartTime) {
            registrationContract.devStartTime = moment(
              registrationContract.devStartTime
            );
          }

          if (registrationContract.failText) {
            setFailText(registrationContract.failText);
            delete registrationContract.failText;
          }
          setFieldsValue(registrationContract);
        }

        setGetDataLoading(false);
      })();
    }
  }, [enterpriseRegistrationUuid, setFieldsValue]);

  /**
   * 提交事件
   */
  const handleSumbitSave = e => {
    e.preventDefault();

    // 表单判断
    form.validateFields(async (err, value) => {
      if (enterpriseRegistrationUuid) {
        if (!err) {
          value.registrationUuid = enterpriseRegistrationUuid;

          setSaveDataLoading(true);
          const res = await proxyFetch(SAVE_REGISTRATION_CONTRACT, value);
          setSaveDataLoading(false);

          if (res) {
            history.push(`${REGISTRATION_PROFILE.path}`);
          }
        }
      }
    });
  };

  return (
    <>
      <div className='subtitle-box'>
        <Link to={`${REGISTRATION_PROFILE.path}`}>
          <Icon type='left' className='exit-icon' />
        </Link>
        <p className='subtitle-title'>评测合同</p>
      </div>
      {failText ? (
        <Alert message='填写错误,请按描述修改' description={failText} type='error' showIcon />
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
                  rules: [{ required: true, message: '请输入数量！' }]
                })(<InputNumber min={1} max={999} />)}
              </Form.Item>

              {/* 传真 */}
              <Form.Item label='传真'>
                {getFieldDecorator('fax', {
                  rules: [{ message: '请输入传真！' }]
                })(<Input placeholder='请输入传真' maxLength={32} />)}
              </Form.Item>

              {/* 邮政编码 */}
              <Form.Item label='邮政编码'>
                {getFieldDecorator('postalCode', {
                  rules: [
                    { required: true, message: '请输入邮政编码！' },
                    { pattern: /\d{6}$/, message: '请输入正确的邮政编码' }
                  ]
                })(<Input placeholder='请输入邮政编码' maxLength={32} />)}
              </Form.Item>

              {/* 主要功能 */}
              <Form.Item label='主要功能'>
                {getFieldDecorator('mainFunction', {
                  rules: [{ required: true, message: '请输入主要功能！' }]
                })(
                  <TextArea
                    autoSize={{ minRows: 2, maxRows: 6 }}
                    placeholder='请输入主要功能!'
                    maxLength='32'
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
                    }
                  ]
                })(
                  <TextArea
                    autoSize={{ minRows: 2, maxRows: 6 }}
                    placeholder='请输入技术指标!'
                    maxLength='32'
                  />
                )}
              </Form.Item>

              {/* 提交按钮 */}
              <Form.Item wrapperCol={{ offset: 6 }}>
                <Button
                  type='primary'
                  htmlType='submit'
                  loading={saveDataLoading}
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Skeleton>
        <div className='contract-right-box'>
          <Alert
            message='填写评测合同内容注意事项'
            description='此块内容是生成评测合同的必要信息,请提供的信息真实完整和准确。其中传真不是必填项'
            type='info'
            showIcon
          />
        </div>
      </div>
    </>
  );
});
