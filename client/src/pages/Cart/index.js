import React from 'react'
import styles from './Cart.module.css'
import ShopForm from "../../components/ShopForm";

export default function Cart() {

    return (
        <>
            <ShopForm>
                <h1 style={{color: "orange"}}>Your Cart</h1>
                <table>
                    <tr>
                        <th>Item</th>
                        <th>Item Cost</th>
                        <th>Quantity</th>
                        <th>Item total</th>
                    </tr>
                </table>
            </ShopForm>
        </>
    )

}