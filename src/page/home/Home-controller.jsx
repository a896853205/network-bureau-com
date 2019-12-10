import React from 'react';

// 路由
import { useRouteMatch } from 'react-router-dom';
import * as ROUTES from '@/constants/route-constants';

// controller
import HomeIndexController from '@/page/home/Home-index-controller.jsx';

// 样式
import '@/style/home/home.styl';
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout,
  { SubMenu } = Menu;

export default props => {
  const homeIndex = useRouteMatch({
    path: ROUTES.HOME_INDEX.path,
    exact: true
  });

  let content = null;

  if (homeIndex) {
    // 主首页
    content = <HomeIndexController />;
  }

  return (
    <Layout>
      <Sider className='home-sider'>
        <div className='logo'>
          <Icon type='reconciliation' />
          <span>业务管理系统</span>
        </div>
        <Menu theme='dark' mode='inline'>
          <SubMenu
            key='register'
            title={
              <span>
                <Icon type='audit' />
                <span>登记测试</span>
              </span>
            }
          >
            <Menu.Item key='registerDeal'>办理测试</Menu.Item>
            <Menu.Item key='registerList'>查看测试</Menu.Item>
          </SubMenu>
          <SubMenu
            key='entrust'
            title={
              <span>
                <Icon type='file-search' />
                <span>委托测试</span>
              </span>
            }
          >
            <Menu.Item key='entrustDeal'>办理测试</Menu.Item>
            <Menu.Item key='entrustList'>查看测试</Menu.Item>
          </SubMenu>
          <SubMenu
            key='entrustContract'
            title={
              <span>
                <Icon type='profile' />
                <span>委托合同</span>
              </span>
            }
          >
            <Menu.Item key='entrustContractDeal'>办理委托合同</Menu.Item>
            <Menu.Item key='entrustContractList'>查看委托合同</Menu.Item>
          </SubMenu>
          <Menu.Item key='4'>
            <Icon type='setting' />
            <span className='nav-text'>企业情况设置</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className='home-content'>
        <Header className='home-header' />
        <Content className='content-box'>
          <div className='content-inner-box'>{content}</div>
        </Content>
        <Footer className='home-footer'>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
