import React from 'react';
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import Login from "./pages/admin/Login";
import Category from "./pages/admin/category/Category";
import Dashboard from "./pages/admin/Dashboard";
import { SideBar } from "./components/SideBar";
import { Header } from "./components/Header";
import { Layout } from "antd";
import User from "./pages/admin/user/User";
import Brand from "./pages/admin/brand/Brand";
import Role from "./pages/admin/role/Role";
import RoleForm from "./pages/admin/role/RoleForm";
import NewProductForm from "./pages/admin/product/NewProductForm";
import Product from "./pages/admin/product/Product";
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import BrandForm from "./pages/admin/brand/BrandForm";
import CategoryForm from "./pages/admin/category/CategoryForm";
import AdminForm from "./pages/admin/user/AdminForm";
import UserForm from "./pages/admin/user/UserForm";
import Admin from "./pages/admin/user/Admin";
import EditProductForm from "./pages/admin/product/EditProductForm";

// Client pages
import HomePage from "./pages/client/HomePage";
import ProductPage from "./pages/client/ProductPage";
import ProductDetails from "./pages/client/ProductDetails";
import NotFoundPage from "./pages/client/NotFoundPage";
import CartPage from "./pages/client/CartPage";
import CheckOutPage from "./pages/client/CheckOutPage";
import { CartProvider } from "./context/CartContext";

const { Content } = Layout;

const MainLayout = () => (
  <Layout style={{ minHeight: "100vh" }}>
    <SideBar />
    <Layout className="overflow-auto h-screen">
      <Header />
      <Content className="p-8 relative top-20">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<ProtectedRoute roles={['ADMIN', 'MANAGER']}><Product /></ProtectedRoute>} />
          <Route path="brands" element={<ProtectedRoute roles={['ADMIN', 'MANAGER']}><Brand /></ProtectedRoute>} />
          <Route path="categories" element={<ProtectedRoute roles={['ADMIN', 'MANAGER']}><Category /></ProtectedRoute>} />
          <Route path="users" element={<ProtectedRoute roles={['ADMIN']}><User /></ProtectedRoute>} />
          <Route path="users/admins" element={<ProtectedRoute roles={['ADMIN']}><Admin /></ProtectedRoute>} />
          <Route path="roles" element={<ProtectedRoute roles={['ADMIN']}><Role /></ProtectedRoute>} />
          <Route path="products/new" element={<ProtectedRoute roles={['ADMIN']}><NewProductForm /></ProtectedRoute>} />
          <Route path="products/edit/:code" element={<ProtectedRoute roles={['ADMIN']}><EditProductForm /></ProtectedRoute>} />
          <Route path="users/admins/new" element={<ProtectedRoute roles={['ADMIN']}><AdminForm /></ProtectedRoute>} />
          <Route path="users/new" element={<ProtectedRoute roles={['ADMIN']}><UserForm /></ProtectedRoute>} />
          <Route path="categories/new" element={<ProtectedRoute roles={['ADMIN']}><CategoryForm mode="create" /></ProtectedRoute>} />
          <Route path="categories/update/:id" element={<ProtectedRoute roles={['ADMIN']}><CategoryForm mode="update" /></ProtectedRoute>} />
          <Route path="roles/new" element={<ProtectedRoute roles={['ADMIN']}><RoleForm mode="create" /></ProtectedRoute>} />
          <Route path="roles/update/:id" element={<ProtectedRoute roles={['ADMIN']}><RoleForm mode="update" /></ProtectedRoute>} />
          <Route path="brands/new" element={<ProtectedRoute roles={['ADMIN']}><BrandForm mode="create" /></ProtectedRoute>} />
          <Route path="brands/update/:id" element={<ProtectedRoute roles={['ADMIN']}><BrandForm mode="update" /></ProtectedRoute>} />
        </Routes>
      </Content>
    </Layout>
  </Layout>
);

const ClientLayout = () => (
  <Layout style={{ minHeight: "100vh" }}>
    <Content className="bg-white">
      <Routes>
        <Route path="home" element={<HomePage />} />
        <Route path="products" element={<ProductPage />} />
        <Route path="products/:code" element={<ProductDetails />} />
        <Route path="details" element={<ProductDetails />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="check-out" element={<CheckOutPage />} />
        <Route path="not-found" element={<NotFoundPage />} />
        {/* 
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} /> */}
      </Routes>
    </Content>
  </Layout>
);

const AppRoutes = () => {
  const { user } = useAuth();
  console.log("AppRoutes user:", user);
  return (
    <Routes>
      <Route path="/admin/login" element={<Login />} />
      {user ? (
        <Route path="/admin/*" element={<MainLayout />} />
      ) : (
        <Route path="/admin/*" element={<Navigate to="/admin/login" replace />} />
      )}
      
      <Route path="/*" element={
        <CartProvider> {/* Wrap CartProvider into ClientLayout */}
          <ClientLayout />
        </CartProvider>
      } />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
