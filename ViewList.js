import styles from "./ViewList.module.css";

import { useContext, useState } from 'react';
import ModeContext from '../context/ModeContext';
import EditForm from "./EditForm";

function ViewList({ 
  list, 
  sum, 
  handlerDeleteProduct, 
  handlerSelectProduct,
  selectedProduct,
  handlerUpdateProductForm,
  handlerEditItem }) {
  const modeCtx = useContext(ModeContext);
  const [showForm, setShowForm] = useState(false);

  const showFormEvent = (id) => {
    setShowForm(!showForm);
    handlerSelectProduct(id);
  }

  const cancelForm = () => {
    setShowForm(false);
  }

  return (
    <div>
      <table className={`${styles.table} ${!modeCtx.isLight && styles.dark}`}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Disc %</th>
            <th>Total $</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.discount}</td>
              <td>{item.total.toFixed(2)}</td>
              
              <td><button onClick={() => showFormEvent(item.id)}>Edit</button></td>
              <td><button onClick={() => handlerDeleteProduct(item.id)}>❌</button></td> 
           
            </tr>
              
          ))}
        </tbody>
      </table>

  \
      <div className={styles.containerSum}>
        Total sum: <span className={styles.sum}>{sum.toFixed(2)}</span>
      </div>
            {
              showForm && 
              <EditForm 
              selectedProduct={selectedProduct} 
              handlerUpdateProductForm={handlerUpdateProductForm}
              cancelForm={cancelForm}/>
            }
            
    </div>
  );
}
export default ViewList;
