import { useState, useContext } from 'react';
import styles from './Product.module.css'
import Card from './Card';
import ViewList from './ViewList';

import ProductContext from '../context/ProductContext';
import ModeContext from '../context/ModeContext';
import Toggle from './Toggle';
import Button from './Button';
import { v4 as uuid } from 'uuid';

function Product() {
  const ctx = useContext(ProductContext);
  const modeCtx = useContext(ModeContext);
  const [list, setList] = useState([]);
  const [sumTotal, setSumTotal] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState({});

  
  const handlerAddProduct = () => {
   // Create new list item
    const newItem = {
      id: uuid(),
      name: ctx.name,
      quantity: ctx.count,
      price: ctx.price,
      discount: ctx.discount,
      total: ctx.count * ctx.price * (100-ctx.discount)/100,
   } 
   
   // Copy previous list and append new item to its end
   const newList = [...list, newItem];
  //  console.log('  newList:', newList);
   setList(newList);

   // Add the item total to the running listTotal
   const sum = sumTotal + newItem.total;
  //  console.log('  sumTotal:', sumTotal);
   setSumTotal(sum);
  }

  const handlerDeleteProduct = (id) => {
    const filteredList = list.filter((product) => product.id !== id);
    setList(filteredList);
  }

  const handlerSelectProduct = (id) => {
    const foundProduct = list.find(product => product.id === id);
    setSelectedProduct(foundProduct);
  }

  const handlerUpdateProductForm = (updatedProduct) => {
    const {id} = updatedProduct;

    const foundProductIndex = list.findIndex(product => product.id === id);
    const copyList = [...list];

    copyList[foundProductIndex] = updatedProduct;
    setList(copyList);

    setSumTotal(sumTotal + updatedProduct.total);
  }

  return (
    <div className={`${styles.container} ${!modeCtx.isLight && styles.dark}`}>
      <Toggle />
      <Card
        handlerAddProduct={handlerAddProduct}
      />
      <ViewList
      list={list}
      sum={sumTotal}
      handlerSelectProduct={handlerSelectProduct}
      handlerDeleteProduct={handlerDeleteProduct}
      handlerUpdateProductForm={handlerUpdateProductForm}
      selectedProduct={selectedProduct}
      />
    </div>
  );
}
export default Product;
