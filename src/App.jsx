import { useState } from 'react';

import AdminLoginScreen from './pages/AdminLoginScreen';
import AdminPanelScreen from './pages/AdminPanelScreen';
import ProductsPage from './pages/ProductsPage';
import CategoriesPage from './pages/CategoriesPage';
import OrdersPage from './pages/OrdersPage';
import SalesPage from './pages/SalesPage';

import AddProductModal from './components/AddProductModal';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [currentPage, setCurrentPage] =
    useState('dashboard');

  // MODAL STATES

  const [showModal, setShowModal] =
    useState(false);

  const [editProduct, setEditProduct] =
    useState(null);

  // NOT LOGGED IN

  if (!isLoggedIn) {

    return (

      <AdminLoginScreen
        setIsLoggedIn={setIsLoggedIn}
      />

    );
  }

  // PRODUCTS PAGE

  if (currentPage === 'products') {

    return (

      <>

        <ProductsPage
          setCurrentPage={setCurrentPage}
          setShowModal={setShowModal}
          setEditProduct={setEditProduct}
        />

        <AddProductModal
          showModal={showModal}
          setShowModal={setShowModal}
          editProduct={editProduct}
          setEditProduct={setEditProduct}
        />

      </>

    );
  }

  // CATEGORIES PAGE

  if (currentPage === 'categories') {

    return (

      <>

        <CategoriesPage
          setCurrentPage={setCurrentPage}
          setEditProduct={setEditProduct}
          setShowModal={setShowModal}
          showModal={showModal}
        />

        <AddProductModal
          showModal={showModal}
          setShowModal={setShowModal}
          editProduct={editProduct}
          setEditProduct={setEditProduct}
        />

      </>

    );
  }

  // ORDERS PAGE

  if (currentPage === 'orders') {

    return (

      <OrdersPage
        setCurrentPage={setCurrentPage}
      />

    );
  }
if (currentPage === 'sales') {

  return (

    <SalesPage
      setCurrentPage={setCurrentPage}
    />

  );
}
  // DASHBOARD

  return (

    <AdminPanelScreen
      setIsLoggedIn={setIsLoggedIn}
      setCurrentPage={setCurrentPage}
    />

  );
}

export default App;