import logo from "./logo.svg";
import "./App.less";
import { BrowserRouter, HashRouter, useRoutes, useLocation } from "react-router-dom";
import Router from "./router/index";
import { useTransition, animated } from 'react-spring';

function App() {
  const AnimatedRoutes = () => {
    const location = useLocation();

    // 使用 useTransition 创建转场动画
    const transitions = useTransition(location, {
      from: { opacity: 1, transform: 'translate3d(100%, 0, 0)' },
      enter: { opacity: 1, transform: 'translate3d(0%, 0, 0)' },
      leave: { opacity: 1, transform: 'translate3d(-50%, 0, 0)' },
    });

    return transitions((style, location) => (
      // <animated.div style={style} className="animated-page">
      <Router location={location} />
      // </animated.div>
    ));
  };


  return (
    <div className="App">
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
