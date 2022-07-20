import CartButton from '../Cart/CartButton';
import classes from './MainHeader.module.css';

import { useSelector } from 'react-redux';

const MainHeader = (props) => {
  let cart = 0;
  useSelector(state => state.cart.items).forEach(val => {
    cart += val.quantity;
  })

  // const cartItemsLength = (useSelector(state => state.cart.items)).length;

  return (
    <header className={classes.header}>
      <h1>ReduxCart</h1>
      <nav>
        <ul>
          <li>
            <CartButton count={cart} />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
