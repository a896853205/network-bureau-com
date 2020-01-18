import React from 'react';

// 组件
import Apply from '@/components/registration/detail/Apply.jsx';
import Contract from '@/components/registration/detail/Contract.jsx';
import Copyright from '@/components/registration/detail/Copyright.jsx';
import Document from '@/components/registration/detail/Document.jsx';
import ProductDescription from '@/components/registration/detail/Product-description.jsx';
import Product from '@/components/registration/detail/Product.jsx';
import Specimen from '@/components/registration/detail/Specimen.jsx';

export default ({ type }) => {
  let content = null;

  switch (type) {
    case 'apply':
      content = <Apply />;
      break;
    case 'contract':
      content = <Contract />;
      break;
    case 'copyright':
      content = <Copyright />;
      break;
    case 'specimen':
      content = <Specimen />;
      break;
    case 'productDescription':
      content = <ProductDescription />;
      break;
    case 'document':
      content = <Document />;
      break;
    case 'product':
      content = <Product />;
      break;
    default:
      content = null;
  }
  // 接收参数,显示出对应填写的板块
  // 在components需要写7个组件
  return <div className='item-box detail-item-box'>
    <p className='title-box'>详情填写</p>
    {content}
    </div>;
};
