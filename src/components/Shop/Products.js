import ProductItem from './ProductItem';
import classes from './Products.module.css';
// import { useSelector } from 'react-redux';

const Products = (props) => {
  const DUMMY_PRODUCTS = [
    {
      id: 'p1',
      price: 6,
      title: "My First Book",
      description: "The first book I ever wrote"
    },
    {
      id: 'p2',
      price: 5,
      title: "My Second Book",
      description: "The second book I ever wrote"
    }
  ]

  // const products = useSelector((state)=>state.cart.items);
  // console.log(products);

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map(val => <ProductItem key={val.id} uniqueKey={val.id} title={val.title} price={val.price} description={val.description} />)}
      </ul>
    </section>
  );
};

export default Products;
