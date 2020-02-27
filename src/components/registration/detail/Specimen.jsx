import React, { useState, useEffect } from 'react';

// 路由
import { Link, useHistory } from 'react-router-dom';
import { REGISTRATION_PROFILE } from '@/constants/route-constants';

// redux
import { useSelector } from 'react-redux';

// 请求
import proxyFetch from '@/util/request';
import {
  SELECT_REGISTRATION_SPECIMEN,
  SAVE_REGISTRATION_SPECIMEN
} from '@/constants/api-constants';

// 组件
import moment from 'moment';

// 样式
import '@/style/home/registration/specimen.styl';
import { Input, Form, Button, Icon, Alert, Select, Skeleton } from 'antd';
const { Option } = Select;

export default Form.create({ name: 'specimen' })(({ form }) => {
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
        let registrationSpecimen = await proxyFetch(
          SELECT_REGISTRATION_SPECIMEN,
          { registrationUuid: enterpriseRegistrationUuid },
          'GET'
        );

        // 数据回显
        if (registrationSpecimen) {
          // 数据处理
          // 时间处理
          if (registrationSpecimen.devStartTime) {
            registrationSpecimen.devStartTime = moment(
              registrationSpecimen.devStartTime
            );
          }

          if (registrationSpecimen.failText) {
            setFailText(registrationSpecimen.failText);
          }

          delete registrationSpecimen.status;
          delete registrationSpecimen.statusText;
          delete registrationSpecimen.failText;

          setFieldsValue(registrationSpecimen);
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
          const res = await proxyFetch(SAVE_REGISTRATION_SPECIMEN, value);
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
        <p className='subtitle-title'>样品登记表</p>
      </div>
      {failText ? (
        <Alert
          message='填写错误,请按描述修改'
          description={failText}
          type='error'
        />
      ) : null}
      <div className='detail-specimen-box'>
        <Skeleton loading={getDataLoading}>
          <div className='specimen-left-box'>
            <Form
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              onSubmit={handleSumbitSave}
            >
              {/* 注册商标 */}
              <Form.Item label='注册商标'>
                {getFieldDecorator('trademark', {
                  rules: [
                    {
                      required: true,
                      message: '请输入注册商标！'
                    },
                    {
                      message: '注册商标过长！',
                      max: 32
                    }
                  ]
                })(<Input placeholder='请输入注册商标' />)}
              </Form.Item>

              {/* 开发工具 */}
              <Form.Item label='开发工具'>
                {getFieldDecorator('developmentTool', {
                  rules: [
                    {
                      required: true,
                      message: '请输入开发工具！'
                    },
                    {
                      message: '开发工具过长！',
                      max: 32
                    }
                  ]
                })(<Input placeholder='请输入开发工具' />)}
              </Form.Item>

              {/* 产品密级 */}
              <Form.Item label='产品密级'>
                {getFieldDecorator('securityClassification', {
                  rules: [{ required: true, message: '请选择产品密级！' }]
                })(
                  <Select placeholder='请选择产品密级' style={{ width: 160 }}>
                    <Option value={0}>无</Option>
                    <Option value={1}>涉密</Option>
                  </Select>
                )}
              </Form.Item>

              {/* 单位属性 */}
              <Form.Item label='单位属性'>
                {getFieldDecorator('unit', {
                  rules: [{ required: true, message: '请选择单位属性！' }]
                })(
                  <Select placeholder='请选择单位属性' style={{ width: 160 }}>
                    <Option value='独立科研单位'>独立科研单位</Option>
                    <Option value='大专院校'>大专院校</Option>
                    <Option value='国有企业'>国有企业</Option>
                    <Option value='责任公司'>责任公司</Option>
                    <Option value='集体个体'>集体个体</Option>
                    <Option value='其他性质'>其他性质</Option>
                  </Select>
                )}
              </Form.Item>

              {/* 邮箱 */}
              <Form.Item label='邮箱'>
                {getFieldDecorator('email', {
                  rules: [
                    {
                      required: true,
                      message: '请输入邮箱！'
                    },
                    {
                      message: '邮箱过长！',
                      max: 32
                    }
                  ]
                })(<Input placeholder='请输入邮箱' />)}
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
                  提交
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Skeleton>
        <div className='specimen-right-box'>
          <Alert
            message='填写样品登记表注意事项'
            description='此块内容是登记样品的基本信息,均为必填项,请企业提供的信息真实完整和准确。'
            type='info'
          />
        </div>
      </div>
    </>
  );
});
