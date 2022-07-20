import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

import { useSelector } from 'react-redux';

const Cart = (props) => {
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemLength = cartItems.length;
  // console.log(cartItems);

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItemLength > 0 ? cartItems.map(val=> {
          return (<CartItem key={val.id} cartValue={val} item={{ title: val.name, quantity: val.quantity, total: val.totalPrice, price: val.price}} />);
        } ) : <h4>Empty Cart</h4>}
      </ul>
    </Card>
  );
};

export default Cart;
