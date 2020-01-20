import React from 'react';
// 路由
import { Link } from 'react-router-dom';
import { REGISTRATION_PROFILE } from '@/constants/route-constants';

// 样式
import '@/style/home/registration/apply.styl';
import { Input, Form, Button, Icon, Alert } from 'antd';
const { TextArea } = Input;

export default Form.create({ name: 'apply' })(props => {
  const { getFieldDecorator } = props.form,
    contentInitValue = `服务器硬件环境（CPU、硬盘、内存）
服务器软件环境（运行系统、数据库及通讯协议等
客户端硬件环境（CPU、硬盘、内存）
客户端软件环境（运行系统、数据库及通讯协议等）
上位机硬件环境（CPU、硬盘、内存）
下位机核心电路（核心芯片）、外围电路（相应的支持电路）
备注（连接的设备机械和电气及其他设备）
具体原因`;

  return (
    <>
      <div className='subtitle-box'>
        <Link to={`${REGISTRATION_PROFILE.path}`}>
          <Icon type='left' className='exit-icon' />
        </Link>
        <p className='subtitle-title'>现场测试申请表</p>
      </div>
      <div className='detail-apply-box'>
        <div className='apply-left-box'>
          <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            {/* 内容 */}
            <Form.Item label='内容'>
              {getFieldDecorator('content', {
                initialValue: contentInitValue,
                rules: [
                  {
                    required: true,
                    message: '请输入内容！'
                  }
                ]
              })(<TextArea autoSize={{ minRows: 6, maxRows: 50 }} />)}
              <Button type='primary' htmlType='submit'>
                提交
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className='apply-right-box'>
          <Alert
            message='填写现场测试申请表注意事项'
            description='此块内容是现场测试申请表的测试环境等内容,请企业提供的信息真实完整和准确。'
            type='info'
            showIcon
          />
        </div>
      </div>
    </>
  );
});
