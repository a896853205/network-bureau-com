import React from 'react';
import '@/App.styl';
import { useRouteMatch } from 'react-router-dom';

// route
import * as ROUTES from '@/constants/route-constants';

// controller
import IndexController from '@/page/Index-controller.jsx';
import HomeController from '@/page/home/Home-controller.jsx';

export default props => {
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
