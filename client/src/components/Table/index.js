import React, {useEffect, useState} from "react"
import styles from "./Table.module.css";
import {priceForEachItem} from "../../helper";
import axios from "axios";
import {useParams} from "react-router-dom";

export default function Table(props) {

    const noItem = (
        <>
            <p>There are no items in your cart</p>
        </>
    )
    const [table, setTable] = useState(noItem)
    console.log(props.data)
    const {id} = useParams()

    const createTable = (i, parent) => {
        const tr = document.createElement('tr')
        tr.classList.add(styles.tr)
        const td1 = document.createElement('td')
        td1.classList.add(styles.row1)
        td1.setAttribute('id', (i * 4 + 1).toString())
        const td2 = document.createElement('td')
        td2.classList.add(styles.row2)
        td2.setAttribute('id', (i * 4 + 2).toString())
        const td3 = document.createElement('td')
        td3.classList.add(styles.row3)
        const td4 = document.createElement('td')
        td4.classList.add(styles.row4)
        td4.setAttribute('id', (i * 4 + 4).toString())
        td1.appendChild(document.createTextNode(props.data[i].lapName))
        td2.appendChild(document.createTextNode(`$${props.data[i].lapCost}`))
        const input = document.createElement('input')
        input.setAttribute('type', 'number')
        input.setAttribute('value', props.data[i].quantity)
        input.classList.add(styles.input)
        input.setAttribute('id', (i * 4 + 3).toString())
        td3.appendChild(input)
        const price = priceForEachItem(props.data[i].lapCost, props.data[i].quantity)
        td4.appendChild(document.createTextNode(`$${price}`))
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)
        parent.insertBefore(tr, document.getElementById('ending'))
        return priceForEachItem(Number(props.data[i].lapCost), Number(props.data[i].quantity))
    }

    useEffect(() => {
        if (props.data[0].lapName !== '') {
            setTable((<>
                <table className={styles.table}>
                    <tbody id='tbody'>
                    <tr className={styles.tr}>
                        <th className={`${styles.th} ${styles.row1}`}>Item</th>
                        <th className={`${styles.th} ${styles.row2}`}>Item Cost</th>
                        <th className={`${styles.th} ${styles.row3}`}>Quantity</th>
                        <th className={`${styles.th} ${styles.row4}`}>Item total</th>
                    </tr>
                    <tr id='ending'>
                        <td className={`${styles.subtotal} ${styles.row1}`}></td>
                        <td className={`${styles.subtotal} ${styles.row2}`}></td>
                        <td className={`${styles.subtotal} ${styles.row3}`}>Subtotal</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <button type='submit' onClick={doClick}>Update Cart</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </>))

        } else {

        }
    }, [props.data])

    useEffect(() => {
        if(table !== noItem){
            console.log(props.data)
            const parent = document.getElementById('tbody')
            let sum = 0
            for (let i = 0; i < props.data.length; ++i) {
                sum += createTable(i, parent)
            }
            const total = document.createElement('td')
            total.classList.add(styles.row4)
            total.classList.add(styles.subtotal)
            total.appendChild(document.createTextNode(`$${sum.toString()}`))
            const tr = document.getElementById('ending')
            tr.appendChild(total)
        }
    }, [table])

    const valuesAreChanged = () => {
        for (let i = 0; i < props.data.length; ++i) {
            if (document.getElementById((i * 4 + 3).toString()).value !== props.data[i].quantity.toString()) {
                return {
                    at: i * 4 + 3,
                    changed: true
                }
            }
        }
        return {
            at: 0,
            changed: false
        }
    }

    const getChanged = at => {
        return {
            uid: id,
            lapName: document.getElementById((at - 2).toString()).innerHTML,
            quantity: document.getElementById(at.toString()).value
        }
    }

    const doClick = () => {
        const check = valuesAreChanged()
        console.log(check.at)
        if (check.changed) {
            const change = getChanged(check.at)
            console.log(change)
            axios
                .post(`/view-cart/update/${id}`, change)
                .then(res => {
                    console.log(res.data)
                    window.location.reload();
                })
        } else
            console.log('nothing changed')

    }


    return (
        <>
            {table}
        </>
    )
    //}
}