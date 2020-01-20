import React from 'react';
// 路由
import { Link } from 'react-router-dom';
import { REGISTRATION_PROFILE } from '@/constants/route-constants';

// 样式
import '@/style/home/registration/specimen.styl';
import { Input, Form, Button, Icon, Alert, Select } from 'antd';
const { Option } = Select;

export default Form.create({ name: 'specimen' })(props => {
  const { getFieldDecorator } = props.form;

  return (
    <>
      <div className='subtitle-box'>
        <Link to={`${REGISTRATION_PROFILE.path}`}>
          <Icon type='left' className='exit-icon' />
        </Link>
        <p className='subtitle-title'>样品登记表</p>
      </div>
      <div className='detail-specimen-box'>
        <div className='specimen-left-box'>
          <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
            {/* 注册商标 */}
            <Form.Item label='注册商标'>
              {getFieldDecorator('trademark', {
                rules: [{ required: true, message: '请输入注册商标！' }]
              })(<Input placeholder='请输入注册商标' />)}
            </Form.Item>

            {/* 开发工具 */}
            <Form.Item label='开发工具'>
              {getFieldDecorator('developmentTool', {
                rules: [{ required: true, message: '请输入开发工具！' }]
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
                rules: [{ required: true, message: '请输入邮箱！' }]
              })(<Input placeholder='请输入邮箱' />)}
              <Button type='primary' htmlType='submit'>
                提交
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className='specimen-right-box'>
          <Alert
            message='填写样品登记表注意事项'
            description='此块内容是登记样品的基本信息,均为必填项,请企业提供的信息真实完整和准确。'
            type='info'
            showIcon
          />
        </div>
      </div>
    </>
  );
});
