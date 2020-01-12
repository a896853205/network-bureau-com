export const BCG_ROOT_NAME = 'background';

// 一级路由
export const INDEX = { path: '', name: '首页' };
// export const LOGIN = { path: '/login', name: '登录页' };
// export const REGISTER = { path: '/register', name: '注册页' };
export const HOME = { path: '/home', name: '主页' };

// 二级路由
export const HOME_INDEX = { path: '/home/index', name: '主首页' };

// 登记测试
export const HOME_REGISTRATION_WELCOME = {
  path: '/home/registration/welcome',
  name: '登记测试欢迎页'
};
export const HOME_REGISTRATION_PROCESS = {
  path: '/home/registration/process',
  name: '登记测试流程页'
};
export const HOME_REGISTRATION_LIST = {
  path: '/home/registration/list',
  name: '登记测试列表页'
};
// 三级路由
export const REGISTRATION_PROFILE = {
  path: '/home/registration/process/profile',
  name: '登记测试概况页'
};
export const REGISTRATION_DETAIL = {
  path: '/home/registration/process/detail',
  name: '详细内容页'
};
