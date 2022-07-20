import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { cartAction } from '../../store/cart-slice';
import { useDispatch } from 'react-redux';
import { sendCartData } from '../../store/cart-slice';


const ProductItem = (props) => {
  const { title, price, description } = props;

  const dispatch = useDispatch();


  const AddCartHandler = () => {
    const cartToSent = {
      id: props.uniqueKey,
      price: price,
      name: title
    };
    dispatch(cartAction.addItemToCart(cartToSent));
    dispatch(sendCartData(cartToSent, "application/json-add-item"));
  }

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={AddCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
