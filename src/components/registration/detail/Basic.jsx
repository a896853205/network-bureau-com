import React from 'react';

// 路由
import { Link } from 'react-router-dom';
import { REGISTRATION_PROFILE } from '@/constants/route-constants';

// 样式
import '@/style/home/registration/basic.styl';
import { Input, Form, Button, Icon, Alert, DatePicker } from 'antd';

export default Form.create({ name: 'contract' })(props => {
  const { getFieldDecorator } = props.form;

  return (
    <>
      <div className='subtitle-box'>
        <Link to={`${REGISTRATION_PROFILE.path}`}>
          <Icon type='left' className='exit-icon' />
        </Link>
        <p className='subtitle-title'>登记测试基本信息</p>
      </div>
      <div className='detail-basic-box'>
        <div className='basic-left-box'>
          <Form labelCol={{ span: 7 }} wrapperCol={{ span: 17 }}>
            {/* 版本 */}
            <Form.Item label='版本'>
              {getFieldDecorator('version', {
                rules: [
                  { required: true, message: '请输入版本！' },
                  {
                    pattern: /^(\d{1,2})(.([1-9]\d|\d)){2}$/,
                    message: '请输入正确的版本号,格式为X.Y.Z,X,Y,Z均在0-99之间'
                  }
                ]
              })(<Input placeholder='请输入版本' />)}
            </Form.Item>

            {/* 传真 */}
            <Form.Item label='联系人'>
              {getFieldDecorator('linkman', {
                rules: [{ required: true, message: '请输入联系人！' }]
              })(<Input placeholder='请输入联系人' />)}
            </Form.Item>

            {/* 委托单位(人) */}
            <Form.Item label='委托单位(人)'>
              {getFieldDecorator('client', {
                rules: [{ required: true, message: '请输入委托单位(人)！' }]
              })(<Input placeholder='请输入委托单位(人)' />)}
            </Form.Item>

            {/* 电话(手机) */}
            <Form.Item label='电话(手机)'>
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: '请输入电话(手机)！' },
                {
                  pattern: /^(\d)(\d|-){4,20}$/,
                  message: '请输入正确的电话(手机号)'
                }]
              })(<Input placeholder='请输入电话(手机)' />)}
            </Form.Item>

            {/* 注册地址 */}
            <Form.Item label='注册地址'>
              {getFieldDecorator('techIndex', {
                rules: [{ required: true, message: '请输入注册地址！' }]
              })(<Input placeholder='注册地址(应与营业执照上地址完全一致)' />)}
            </Form.Item>

            {/* 开发研发日期 */}
            <Form.Item label='开发研发日期'>
              {getFieldDecorator('devStartTime', {
                rules: [{ required: true, message: '请选择开发研发日期！' }]
              })(<DatePicker placeholder='请选择开发研发日期' />)}
            </Form.Item>

            {/* 开发单位全称 */}
            <Form.Item label='开发单位全称'>
              {getFieldDecorator('enterpriseName', {
                rules: [{ required: true, message: '请输入开发单位全称！' }]
              })(<Input placeholder='请输入开发单位全称' />)}
              <Button type='primary' htmlType='submit'>
                提交
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className='basic-right-box'>
          <Alert
            message='填写登记测试基本信息内容注意事项'
            description='此块内容是登记测试的基本信息,均为必填项,其中注册地址应与营业执照上的地址完全一致,请企业提供的信息真实完整和准确。'
            type='info'
            showIcon
          />
        </div>
      </div>
    </>
  );
});
