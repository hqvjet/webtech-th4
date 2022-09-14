import React, {useEffect, useState} from "react"
import styles from './Shop.module.css'
import ShopForm from "../../components/ShopForm";
import axios from "axios";

export default function Shop() {

    //data from user
    const [data, setData] = useState(
        {
            id: '',
            name: '',
            quantity: ''
        })

    //get UID created by serverside
    useEffect(() => {

            if (localStorage.getItem('id') !== null) {
                setData(prevData => {
                    return {
                        ...prevData,
                        id: localStorage.getItem('id')
                    }
                })
            } else {
                axios
                    .get('/shop')
                    .then(res => {
                            localStorage.setItem('id', res.data)
                            setData(prevData => {
                                return {
                                    ...prevData,
                                    id: res.data
                                }
                            })
                        }
                    )
            }
        }

        ,
        []
    )

    useEffect(() => {
        if (data.name !== '') {
            axios
                .post('/shop', data)
                .then()
        }

    }, [data])

    function getUserInput() {
        let product = document.getElementById(styles['name'])
        let quantity = document.getElementById(styles['quantity'])

        if (Number(quantity.value) > 0)
            setData(prevData => (
                {
                    ...prevData,
                    name: product.value,
                    quantity: quantity.value
                }
            ))
    }

    const doSubmit = e => {
        e.preventDefault()
        getUserInput()
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
                        <input type='text' id={styles['quantity']} defaultValue='0'/>
                        <button type='submit' id={styles['submit']}>Add Item</button>
                    </div>
                </form>
                <a href={`/view-cart/${data.id}`}><b>View Cart</b></a>
                <br/>
                <p>{`ID: ${data.id}`}</p>
            </ShopForm>
        </>
    )

}