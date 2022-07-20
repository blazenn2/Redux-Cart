import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/Notification/Notification';

import { getCardData } from './store/cart-slice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();

  const showCart = useSelector(state => state.ui.cartIsVisible);
  const showNotification = useSelector(state => state.ui.notification);

  useEffect(() => {
    dispatch(getCardData());
  }, [dispatch]);

  return (
    <>
      {showNotification ? <Notification status={showNotification.status} title={showNotification.title} message={showNotification.message} /> : ''}
      <Layout>
        {showCart ? <Cart /> : ''}
        <Products />
      </Layout>
    </>
  );
}

export default App;
