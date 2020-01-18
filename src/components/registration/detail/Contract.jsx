import React from 'react';

// redux
import { useSelector } from 'react-redux';

// 路由
import { Link } from 'react-router-dom';
import { REGISTRATION_PROFILE } from '@/constants/route-constants';

// 样式
import '@/style/home/registration/contract.styl';
import { Input, Form, Button, Icon,InputNumber } from 'antd';
const { TextArea } = Input;

export default Form.create({ name: 'login' })(props => {
  const { getFieldDecorator } = props.form,
    { contractLoading } = useSelector(state => state.enterpriseStore);

  return (
    <Form className='detail-contract-box'>
      <div className='contract-left-box'>
        <div className='left-top-box'>
          <Link to={`${REGISTRATION_PROFILE.path}`}>
            <Icon type='left' className='left-top-icon' />
          </Link>
          <p className='left-top-title'>评测合同</p>
        </div>
        
        {/*数量*/}
        <Form.Item label='数量' className='left-form-box'>
          {getFieldDecorator('amount', {
            rules: [
              { required: true, message: '请输入数量！' }
            ]
          })(<InputNumber min={1} max={999} />)}
        </Form.Item>

        {/*传真*/}
        <Form.Item label='传真' className='left-form-box'>
          {getFieldDecorator('fax', {
            rules: [{ message: '请输入传真！' }]
          })(<Input placeholder='请输入传真' />)}
        </Form.Item>

        {/*邮政编码*/}
        <Form.Item label='邮政编码' className='left-form-box'>
          {getFieldDecorator('postalCode', {
            rules: [
              { required: true, message: '请输入邮政编码！' },
              { pattern: /^[1-9]\\d{5}$/, message: '请输入正确的邮政编码' }
            ]
          })(<Input placeholder='请输入邮政编码' />)}
        </Form.Item>

        {/*主要功能*/}
        <Form.Item label='主要功能' className='left-form-box'>
          {getFieldDecorator('mainFunction', {
            rules: [{ required: true, message: '请输入主要功能！' }]
          })(
            <TextArea
              autosize={{ minRows: 2, maxRows: 6 }}
              placeholder='请输入主要功能!'
            />
          )}
        </Form.Item>

        {/*技术指标*/}
        <Form.Item label='技术指标' className='left-form-box'>
          {getFieldDecorator('techIndex', {
            rules: [
              {
                required: true,
                message: '请输入技术指标！'
              }
            ]
          })(
            <TextArea
              autosize={{ minRows: 2, maxRows: 6 }}
              placeholder='请输入技术指标!'
            />
          )}
          <Button type='primary' loading={contractLoading} htmlType='submit'>
            提交
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
});
