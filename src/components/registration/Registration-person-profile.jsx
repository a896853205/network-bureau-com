import React, { useEffect } from 'react';

import { Icon, Rate } from 'antd';

// redux
import { useSelector } from 'react-redux';

export default props => {
  const { steps, registration } = useSelector(state => state.enterpriseStore);

  useEffect(() => {
    console.log('steps', steps, 'registration', registration);
    // 根据registration中的currentStep属性
    // 找steps数组中的step属性对应,然后其对应的对象的managerUuid属性查找管理员信息
    // 写对应的后台路由并调用和显示
  }, [steps, registration]);

  return (
    <div className='process-item-box'>
      <p className='title-box'>咨询者信息</p>
      <ul className='manager-info-bottom-box'>
        <li className='manager-info-head-box'></li>
        <li className='manager-into-item-box'>
          <p>
            <Icon type='user' className='manager-info-icon' />
            用户名
          </p>
          <p>张博荣</p>
        </li>
        <li className='manager-into-item-box'>
          <p>
            <Icon type='phone' className='manager-info-icon' />
            电话
          </p>
          <p>18351923820</p>
        </li>
        <li className='manager-into-item-box'>
          <p>
            <Icon type='tag' className='manager-info-icon' />
            办理业务次数
          </p>
          <p>111</p>
        </li>
        <li className='manager-into-item-box'>
          <p>
            <Icon type='star' className='manager-info-icon' />
            星级
          </p>
          <Rate disabled defaultValue={4} />
        </li>
      </ul>
    </div>
  );
};
