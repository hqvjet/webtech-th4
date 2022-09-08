import React from "react"
import styles from './Shop.module.css'
import ShopForm from "../../components/ShopForm";

export default function Shop() {

    function doSubmit() {

    }

    return (
        <>
            <ShopForm>
                <h1 style={{color: "orange"}}>Add Item</h1>
                <form onSubmit={doSubmit}>
                    <div className={styles.labelContainer}>
                        <label htmlFor={styles['name']} className={styles.label}>Name</label>
                        <select id={styles['name']}>
                            <option value='Hp Victus 16'>Hp Victus 16</option>
                            <option value='Lenovo Legion 5'>Lenovo Legion 5</option>
                            <option value='Macbook Pro'>Macbook Pro</option>
                            <option value='Asus Rog 15'>Asus Rog 15</option>
                            <option value='Alient ware'>Alient ware</option>
                        </select>
                    </div>
                    <div className={styles.labelContainer}>
                        <label htmlFor={styles['quantity']} className={styles.label}>Quantity</label>
                        <input type='text' id={styles['quantity']} value='0'/>
                        <button type='submit' id={styles['submit']}>Add Item</button>
                    </div>
                </form>
                <a href='/view-cart' ><b>View Cart</b></a>
            </ShopForm>
        </>
    )

}