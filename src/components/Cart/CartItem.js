import classes from './CartItem.module.css';
import { cartAction } from '../../store/cart-slice';
import { sendCartData } from '../../store/cart-slice';
import { useDispatch } from 'react-redux';


const CartItem = (props) => {
  const dispatch = useDispatch();
  const { title, quantity, total, price } = props.item;

  const incrementHandler = () => {
    dispatch(cartAction.addItemToCart(props.cartValue));
    dispatch(sendCartData(props.cartValue, "application/json-add-item"));
  }

  const decrementHandler = () => {
    dispatch(cartAction.removeItemFromCart(props.cartValue));
    // dispatch(sendCartData(props.cartValue, "application/json-delete"));
  }

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={decrementHandler}>-</button>
          <button onClick={incrementHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
