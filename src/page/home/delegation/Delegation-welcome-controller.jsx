import React, { useState } from 'react';

// 样式
import '@/style/home/delegation/welcome.styl';
import { Input, Icon, Button, message, Modal } from 'antd';

// redux
import { useSelector, useDispatch } from 'react-redux';
import enterpriseAction from '@/redux/action/enterprise';
const { confirm } = Modal;

export default props => {
  const { createEnterpriseDelegationLoading } = useSelector(
      state => state.enterpriseStore
    ),
    [delegationName, setDelegationName] = useState(''),
    dispatch = useDispatch();

  const handleSubmitCreateDelegation = () => {
    if (delegationName) {
      dispatch(
        enterpriseAction.asyncCreateEnterpriseDelegation(delegationName)
      );
    } else {
      message.error('请输入登记测试名称');
    }
  };

  return (
    <div className='welcome-box'>
      <div className='left-box'>
        <div className='top-box'>
          <h1 className='caption'>
            <Icon type='audit' />
            <span>委托办理新测试</span>
          </h1>
          <div>
            服务流程：
            <ol>
              <li>
                委托方填写产品测试登记表，准备必要资料（包括产品测试功能表和产品用户操作手册）。
              </li>
              <li>委托方准备测试环境。</li>
              <li>开展检测工作。</li>
              <li>对检测过程中发现的问题进行及时沟通。</li>
              <li>出具检测报告。</li>
              <li>后续相关事宜的咨询。</li>
            </ol>
            注意事项：
            <ol>
              <li>
                拥有软件著作权的软件，检测时运行名称须与软件著作权证书上体现的名称一致。
              </li>
              <li>
                尽量提前或预留检测时间，避免招投标或项目验收对检测报告的需求特别急迫。
              </li>
            </ol>
          </div>
        </div>
        <div className='bottom-box'>
          <Input
            size='large'
            placeholder='请输入测试产品名称'
            className='input'
            onChange={e => {
              setDelegationName(e.target.value);
            }}
          />
          <Button
            size='large'
            type='primary'
            className='button'
            onClick={e => {
              e.stopPropagation();
              
              confirm({
                title: '请核对测试产品名称',
                content: '开始办理之后此测试产品名称不可修改,请认真核对!',
                okText: '确认',
                icon: 'exclamation-circle',
                cancelText: '取消',
                onOk() {
                  handleSubmitCreateDelegation();
                },
                onCancel() {}
              });
            }}
            loading={createEnterpriseDelegationLoading}
          >
            开始办理
          </Button>
        </div>
      </div>
      <div className='right-box'>
        <img
          className='image'
          src='/image/registration/welcome/right.jpg'
          alt='Paris'
        />
      </div>
    </div>
  );
};
