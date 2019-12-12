import React from 'react';

// 样式
import '@/style/home/home-index.styl';
import { Icon } from 'antd';

export default props => {
  return (
    <div className='home-index-box'>
      <div className='context'>
        <img
          className='image-background'
          src='/image/home-index/top.gif'
          alt='Paris'
        />
        <div className='outter-box'>
          <Icon type='deployment-unit' className='icon' />
          <div className='inner-box'>
            <h2 className='caption'>软件登记测试</h2>
            <p className='sub-passage'>
              软件产品登记测试是指检测机构按照委托方提供的测试功能点，对其指定的软件产品进行功能性的检测和验证，确保这些功能都得以实现并能正常运行。
            </p>
            <p className='sub-passage'>
              同时，软件产品登记测试的报告也是申请软件产品登记所必须的条件，对于审查方来说第三方检测机构出具的测试报告是具有较高的参考价值。进行软件产品登记所需的测试报告,软件检测机构出具的检测证明材料，须由双软认定网上指定的检测中心出具，当地的软件协会也可以出具报告。
            </p>
          </div>
        </div>
      </div>
      <div className='context'>
        <img
          className='image-background'
          src='/image/home-index/middle.jpg'
          alt='Paris'
        />
        <div className='outter-box'>
          <Icon type='gateway' className='icon' />
          <div className='inner-box'>
            <h2 className='caption'>软件委托测试</h2>
            <p className='sub-passage'>
              委托测试过程中,由甲方提供符合交付要求的受测软件产品及相关文档，包括产品功能列表，需求分析，设计文档，用户文档至乙方,并指派专人配合乙方测试工作，
              并提供必要的技术培训和技术协助,并按照合同约定支付所有费用。
            </p>
            <p className='sub-passage'>
              乙方按照国家软件质量测试标准和测试规范，完成甲方委托的软件产品的产品登记测试，在测试过程中，定期知会甲方受测软件在测试过程中出现的问题,最后出具相应的评测报告。
            </p>
          </div>
        </div>
      </div>
      <div className='context'>
        <img
          className='image-background'
          src='/image/home-index/bottom.jpg'
          alt='Paris'
        />
        <div className='outter-box'>
          <Icon type='radar-chart' className='icon' />
          <div className='inner-box'>
            <h2 className='caption'>软件测试委托合同</h2>
            <p className='sub-passage'>
              软件测试委托合同的内容应包括甲乙双方、联系人、联系方式、地址等基本信息，详细描述双方的主要任务，确定履约地点和合同价款、测试费用支付方式、履约的期限、资料的保密性、风险责任承担、争议解决等，最终由两方签章方可生效，一式两份，甲乙双方应协商达成保密协议，未经对方书面允许，任何一方不得向第三方透露对方的任何商业机密。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
