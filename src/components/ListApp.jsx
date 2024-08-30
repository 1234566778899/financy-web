import React, { useEffect, useState } from 'react'
import '../styles/List.css'
import axios from 'axios'
import { CONFIG } from '../config'
import moment from 'moment'
export const ListApp = () => {
    const [letters, setLetters] = useState([])
    const getLetters = () => {
        axios.get(`${CONFIG.uri}/letter`)
            .then(res => {
                setLetters(res.data)
            })
            .catch(error => {
                console.log(error);
            })
    }
    useEffect(() => {
        getLetters();
    }, [])
    return (
        <div className='px-20'>
            <div className='cont-table'>
                <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Letras y facturas</span>
                <p className='mt-2' style={{ color: '#3D4151' }}>Total de letras y facturas registradas</p>
                <table className='mt-10'>
                    <thead>
                        <tr>
                            <td>Número de Letra</td>
                            <td>Fecha de emisión</td>
                            <td>Fecha de descuento</td>
                            <td>Monto</td>
                            <td>Moneda</td>
                            <td>Tasa</td>
                            <td>TCEA</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            letters && letters.map(x => (
                                <tr key={x._id}>
                                    <td>{x.number}</td>
                                    <td>{moment(x.issueDate).format('DD-MM-YYYY')}</td>
                                    <td>{moment(x.discountDate).format('DD-MM-YYYY')}</td>
                                    <td>{x.amount}</td>
                                    <td>{x.currency}</td>
                                    <td>{x.rate}</td>
                                    <td>{x.tcea}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
