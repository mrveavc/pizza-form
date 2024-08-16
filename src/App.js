
import React from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { ThemeProvider } from './components/Theme';
import  AddProduct from './components/AddProduct';
import Header from './components/header';
import ProductsPage from './pages/ProductsPage';
import ProductDetail from './pages/ProductDetail';



function AppRoutes() {
  const routes = [
    { path: '/', element: <ProductsPage /> },
    { path: '/addProduct', element: <AddProduct /> },
    { path: '/productDetail/:id', element: <ProductDetail /> },
    { path: '*', element: <ProductsPage /> },

  ];

  return useRoutes(routes);
}

function App() {
  return (
      <ThemeProvider>
        <Router>
          <Header />
            <AppRoutes />
        </Router>
      </ThemeProvider>
  );
}

export default App;
