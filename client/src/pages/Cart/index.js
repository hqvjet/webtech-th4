import React, {useEffect, useState} from 'react'
import styles from './Cart.module.css'
import ShopForm from "../../components/ShopForm";
import axios from "axios";
import {useParams} from "react-router-dom";
import Table from "../../components/Table";

export default function Cart() {
    const [data, setData] = useState([{
        lapCost: '',
        lapName: '',
        quantity: ''
    }])
    const {id} = useParams()

    useEffect(() => {
        axios
            .get(`/view-cart/${id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.length !== 0)
                    setData(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if (data[0].lapCost !== '')
            console.log()
    }, [data])

    const deleteAll = () => {
        axios
            .post(`/view-cart/delete/${id}`)
            .then(() => window.location.reload())
    }


    return (
        <>
            <ShopForm>
                <h1 style={{color: "orange"}}>Your Cart</h1>
                <Table data={data}/>
                <a href='/' className={styles.button}>Add Item</a>
                <button type='button' className={styles.button} onClick={deleteAll}>Empty Cart</button>
                <button type='button' className={styles.button} onClick={() => {
                    localStorage.clear()
                    window.location.href = '/'
                }}>Clear LocalStorage</button>
            </ShopForm>
        </>
    )

}