import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CustomerLayout from './layouts/CustomerLayout';
import LandingPage from './pages/customer/LandingPage';
import MenuCategories from './pages/customer/MenuCategories';
import MenuItems from './pages/customer/MenuItems';
import ItemDetail from './pages/customer/ItemDetail';
import Cart from './pages/customer/Cart';
import OrderTracking from './pages/customer/OrderTracking';
import GameZone from './pages/customer/GameZone';
import Feedback from './pages/customer/Feedback';
import ManagerDashboard from './pages/manager/Dashboard';
import KitchenDisplay from './pages/manager/Kitchen';
import Settings from './pages/manager/Settings';
import ManagerLayout from './layouts/ManagerLayout';
import OwnerDashboard from './pages/owner/Dashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer Routes */}
        <Route path="/table/:tableId" element={<CustomerLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="menu" element={<MenuCategories />} />
          <Route path="category/:categoryId" element={<MenuItems />} />
          <Route path="item/:itemId" element={<ItemDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="track/:orderId" element={<OrderTracking />} />
          <Route path="games" element={<GameZone />} />
          <Route path="feedback" element={<Feedback />} />
        </Route>

        {/* Manager Routes */}
        <Route path="/manager" element={<ManagerLayout />}>
          <Route index element={<Navigate to="/manager/dashboard" />} />
          <Route path="dashboard" element={<ManagerDashboard />} />
          <Route path="orders" element={<ManagerDashboard />} /> {/* Reusing dashboard for now */}
          <Route path="kitchen" element={<KitchenDisplay />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Owner Routes */}
        <Route path="/owner" element={<OwnerDashboard />} />

        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/table/1" />} />
      </Routes>
    </BrowserRouter>
  );
}
