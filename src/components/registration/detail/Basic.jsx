import React, { useState, useEffect } from 'react';

// 路由
import { Link, useHistory } from 'react-router-dom';
import { REGISTRATION_PROFILE } from '@/constants/route-constants';

// redux
import { useSelector } from 'react-redux';

// 请求
import proxyFetch from '@/util/request';
import {
  SELECT_REGISTRATION_BASIC,
  SAVE_REGISTRATION_BASIC
} from '@/constants/api-constants';

// 样式
import '@/style/home/registration/basic.styl';
import { Input, Form, Button, Icon, Alert, DatePicker, Skeleton } from 'antd';

// 组件
import moment from 'moment';

export default Form.create({ name: 'basic' })(({ form }) => {
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
        let registrationBasic = await proxyFetch(
          SELECT_REGISTRATION_BASIC,
          { registrationUuid: enterpriseRegistrationUuid },
          'GET'
        );

        // 数据回显
        if (registrationBasic) {
          // 数据处理
          // 时间处理
          if (registrationBasic.devStartTime) {
            registrationBasic.devStartTime = moment(
              registrationBasic.devStartTime
            );
          }

          if (registrationBasic.failText) {
            setFailText(registrationBasic.failText);
          }

          delete registrationBasic.status;
          delete registrationBasic.statusText;
          delete registrationBasic.failText;

          setFieldsValue(registrationBasic);
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
          const res = await proxyFetch(SAVE_REGISTRATION_BASIC, value);
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
        <p className='subtitle-title'>登记测试基本信息</p>
      </div>
      {failText ? (
        <Alert
          message='填写错误,请按描述修改'
          description={failText}
          type='error'
        />
      ) : null}
      <div className='detail-basic-box'>
        <Skeleton loading={getDataLoading}>
          <div className='basic-left-box'>
            <Form
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 17 }}
              onSubmit={handleSumbitSave}
            >
              {/* 版本 */}
              <Form.Item label='版本'>
                {getFieldDecorator('version', {
                  rules: [
                    { required: true, message: '请输入版本！' },
                    {
                      pattern: /^(\d{1,2})(.([1-9]\d|\d)){2}$/,
                      message:
                        '请输入正确的版本号,格式为X.Y.Z,X,Y,Z均在0-99之间'
                    }
                  ]
                })(<Input addonBefore={<span>V</span>} placeholder='1.0.0' maxLength={32} />)}
              </Form.Item>

              {/* 传真 */}
              <Form.Item label='联系人'>
                {getFieldDecorator('linkman', {
                  rules: [{ required: true, message: '请输入联系人！' }]
                })(<Input placeholder='请输入联系人' maxLength={32} />)}
              </Form.Item>

              {/* 委托单位(人) */}
              <Form.Item label='委托单位(人)'>
                {getFieldDecorator('client', {
                  rules: [{ required: true, message: '请输入委托单位(人)！' }]
                })(<Input placeholder='请输入委托单位(人)' maxLength={32} />)}
              </Form.Item>

              {/* 电话(手机) */}
              <Form.Item label='电话(手机)'>
                {getFieldDecorator('phone', {
                  rules: [
                    { required: true, message: '请输入电话(手机)！' },
                    {
                      pattern: /^(\d)(\d|-){4,20}$/,
                      message: '请输入正确的电话(手机号)'
                    }
                  ]
                })(<Input placeholder='13912345678' maxLength={32} />)}
              </Form.Item>

              {/* 注册地址 */}
              <Form.Item label='注册地址'>
                {getFieldDecorator('address', {
                  rules: [{ required: true, message: '请输入注册地址！' }]
                })(
                  <Input
                    placeholder='注册地址(应与营业执照上地址完全一致)'
                    maxLength={32}
                  />
                )}
              </Form.Item>

              {/* 开发研发日期 */}
              <Form.Item label='开发研发日期'>
                {getFieldDecorator('devStartTime', {
                  rules: [{ required: true, message: '请选择开发研发日期！' }]
                })(<DatePicker placeholder='20XX-XX-XX' />)}
              </Form.Item>

              {/* 开发单位全称 */}
              <Form.Item label='开发单位全称'>
                {getFieldDecorator('enterpriseName', {
                  rules: [{ required: true, message: '请输入开发单位全称！' }]
                })(<Input placeholder='请输入开发单位全称' maxLength={32} />)}
              </Form.Item>

              {/* 提交按钮 */}
              <Form.Item wrapperCol={{ offset: 7 }}>
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
        <div className='basic-right-box'>
          <Alert
            message='填写登记测试基本信息内容注意事项'
            description='此块内容是登记测试的基本信息,均为必填项,其中注册地址应与营业执照上的地址完全一致,请企业提供的信息真实完整和准确。'
            type='info'
          />
        </div>
      </div>
    </>
  );
});
