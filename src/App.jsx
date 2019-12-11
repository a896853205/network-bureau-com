import React, { useEffect } from 'react';
import '@/App.styl';
import { useRouteMatch, useHistory } from 'react-router-dom';

// route
import * as ROUTES from '@/constants/route-constants';

// controller
import IndexController from '@/page/Index-controller.jsx';
import HomeController from '@/page/home/Home-controller.jsx';

// redux
import { useSelector, useDispatch } from 'react-redux';
import navToAction from '@/redux/action/nav-to';

export default props => {
  const history = useHistory(),
    dispatch = useDispatch(),
    { navTo } = useSelector(state => state.NavToStore);

  useEffect(() => {
    if (navTo) {
      history.push(navTo);
      // 跳转页面后清除
      dispatch(navToAction.setNavTo(undefined));
    }
  }, [navTo, history, dispatch]);

  const index = useRouteMatch({
      path: [ROUTES.INDEX.path, `${ROUTES.INDEX.path}/index/:type`],
      exact: true
    }),
    home = useRouteMatch(ROUTES.HOME.path);

  if (index) {
    // 首页
    return <IndexController params={index.params} />;
  } else if (home) {
    // 主页
    return <HomeController />;
  }

  return <div>404</div>;
};
