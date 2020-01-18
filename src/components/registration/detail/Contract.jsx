import React from 'react';

// 路由
import { Link } from 'react-router-dom';
import { REGISTRATION_PROFILE } from '@/constants/route-constants';

// 样式
import '@/style/home/registration/contract.styl';
import { Input, Form, Button, Icon, InputNumber, Alert } from 'antd';
const { TextArea } = Input;

export default Form.create({ name: 'contract' })(props => {
  const { getFieldDecorator } = props.form;

  return (
    <>
      <div className='subtitle-box'>
        <Link to={`${REGISTRATION_PROFILE.path}`}>
          <Icon type='left' className='exit-icon' />
        </Link>
        <p className='subtitle-title'>评测合同</p>
      </div>
      <div className='detail-contract-box'>
        <div className='contract-left-box'>
          <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
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
              })(<Input placeholder='请输入传真' />)}
            </Form.Item>

            {/* 邮政编码 */}
            <Form.Item label='邮政编码'>
              {getFieldDecorator('postalCode', {
                rules: [
                  { required: true, message: '请输入邮政编码！' },
                  { pattern: /^[1-9]\\d{5}$/, message: '请输入正确的邮政编码' }
                ]
              })(<Input placeholder='请输入邮政编码' />)}
            </Form.Item>

            {/* 主要功能 */}
            <Form.Item label='主要功能'>
              {getFieldDecorator('mainFunction', {
                rules: [{ required: true, message: '请输入主要功能！' }]
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
                  }
                ]
              })(
                <TextArea
                  autoSize={{ minRows: 2, maxRows: 6 }}
                  placeholder='请输入技术指标!'
                />
              )}
              <Button type='primary' htmlType='submit'>
                提交
              </Button>
            </Form.Item>
          </Form>
        </div>
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
