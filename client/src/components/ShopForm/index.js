import React from 'react'
import styles from './ShopForm.module.css'

export default function ShopForm(props) {

    return (
        <>
            <div className={styles.main}>
                <div className={styles.container}>
                    <h1>My Laptop Shop</h1>
                    <div className={styles.linear} />
                    {props.children}
                    <div className={styles.linear} />
                    <p className={styles.footer}>(c) 2022 My Laptop Shop</p>
                </div>
            </div>
        </>
    )

}