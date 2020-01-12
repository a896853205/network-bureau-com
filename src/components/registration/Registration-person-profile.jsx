import React from 'react';

import { Icon, Rate } from 'antd';

export default props => {
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
