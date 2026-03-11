import { Route, Routes } from 'react-router-dom';

import HomePage from '../pages/index';
import Login from '../pages/login/index';
import ProductDetail from '../pages/product/[id]';

function MainRoute() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  );
}
export default MainRoute;
