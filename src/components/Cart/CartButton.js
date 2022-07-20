import classes from './CartButton.module.css';
import { useDispatch } from 'react-redux';
import { uiActions } from './../../store/ui-slice';


const CartButton = (props) => {
  const dispatch = useDispatch();

  const cardHandler = () => {
    dispatch(uiActions.showCart());
  };


  return (
    <button className={classes.button} onClick={cardHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{props.count}</span>
    </button>
  );
};

export default CartButton;
