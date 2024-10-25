import React, { useEffect, useState } from 'react'
import '../styles/List.css'
import axios from 'axios'
import { CONFIG } from '../config'
import moment from 'moment'
import { ConfirmApp } from './ConfirmApp'
import { showInfoToast } from '../utils/showInfoToast'
export const ListApp = () => {
    const [letters, setLetters] = useState([])
    const [desembolso, setDesembolso] = useState(moment('2024-05-25').toDate())
    const [tabConfirm, setTabConfirm] = useState({ active: false, id: '' });
    const [isDeleting, setIsDeleting] = useState(false);
    const closeTabConfirm = () => setTabConfirm({ active: false, id: '' });
    const deleteLetter = () => {
        if (!isDeleting) {
            setIsDeleting(true);
            axios.delete(`${CONFIG.uri}/letter/${tabConfirm.id}`)
                .then(res => {
                    getLetters();
                    closeTabConfirm();
                    showInfoToast('Letra eliminada correctamente');
                    setIsDeleting(false);
                })
                .catch(error => {
                    setIsDeleting(false);
                    console.log(error);
                })
        }
    }
    const getLetters = () => {
        axios.get(`${CONFIG.uri}/letter`)
            .then(res => {
                updateList(res.data);
            })
            .catch(error => {
                console.log(error);
            })
    }
    useEffect(() => {
        updateList([...letters])
    }, [desembolso]);
    const updateList = (data) => {
        setLetters(data.map(x => ({ ...x, dias: getDays(x.expirationDate), tasa: getTEA(x.rateType, x.rate, x.rateCap, x.capitalization), interes: getInteres(x.amount, getTEA(x.rateType, x.rate, x.rateCap, x.capitalization), getDays(x.expirationDate)), issueAdmin: x.admin * x.amount / 100, issueTransfer: x.amount * x.transfer / 100 })))
    }
    const getDays = (expiration) => {
        const a = moment(expiration);
        const b = moment(desembolso);
        return a.diff(b, 'days');
    }
    const getTEA = (rateType, rate, rateCap, cap) => {
        const tee = rateType == 'Efectiva' ? rate : rate / rateCap * cap;
        return rateType == 'Efectiva' ? (Math.pow(1 + tee / 100, 360 / rateCap) - 1) : (Math.pow(1 + tee / 100, 360 / cap) - 1);
    }
    const getInteres = (amount, tasa, dias) => {
        return amount * (1 - (1 / Math.pow(1 + tasa, dias / 360)));
    }
    useEffect(() => {
        getLetters();
    }, [])
    return (
        <>
            <div className='px-20'>
                <div className='cont-table'>
                    <p className='mb-2' style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Letras y facturas</p>
                    <hr />
                    <div className='mt-3'>
                        <div>
                            <span style={{ fontWeight: 'bold' }}>Monto de planilla:</span>
                            <span className='ms-2'>S/. 67049.00</span>
                        </div>
                        <div className='mt-2'>
                            <span style={{ fontWeight: 'bold' }}>Fecha de reembolzo:</span>
                            <input onChange={(e) => setDesembolso(e.target.value)} value={moment(desembolso).format('YYYY-MM-DD')} className='ms-2' type="date" style={{ padding: '3px 5px', border: '1px solid gray', borderRadius: '2px' }} />
                        </div>
                        <div className='mt-2'>
                            <span style={{ fontWeight: 'bold' }}>Número de documentos:</span>
                            <span className='ms-2'>{letters && letters.length}</span>
                        </div>
                    </div>
                    <table className='mt-10 table table-rounded'>
                        <thead>
                            <tr>
                                <th>Detalles del documento</th>
                                <th>Capital</th>
                                <th>Fecha de emisión</th>
                                <th>Fecha de vencimiento</th>
                                <th>Dias de adelanto</th>
                                <th>Tasa</th>
                                <th>Interés</th>
                                <th>Comision por Trans. de Fondos</th>
                                <th>Portes</th>
                                <th>Cargo total</th>
                                <th>Neto a abonar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                letters && letters.map((x, idx) => (
                                    <tr key={idx}>
                                        <td>{x.number}</td>
                                        <td>S/. {x.amount}</td>
                                        <td>{moment(x.issueDate).format('DD/MM/YYYY')}</td>
                                        <td>{moment(x.expirationDate).format('DD/MM/YYYY')}</td>
                                        <td>{x.dias}</td>
                                        <td>{(x.tasa * 100).toFixed(2)}%</td>
                                        <td>{(x.interes).toFixed(2)}</td>
                                        <td>{x.issueTransfer.toFixed(2)}</td>
                                        <td>{x.portes}</td>
                                        <td>{(x.interes + x.issueAdmin + x.issueTransfer + x.portes).toFixed(2)}</td>
                                        <td>{(x.amount - (x.interes + x.issueAdmin + x.issueTransfer + x.portes)).toFixed(2)}</td>
                                        <td>
                                            <button
                                                onClick={() => setTabConfirm({ active: true, id: x._id })}
                                                className='btn-delete' style={{ background: 'none', border: 'none', color: '#BA0000' }}><i className="fa-solid fa-trash"></i></button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {
                tabConfirm.active && (<ConfirmApp close={closeTabConfirm} fnConfirm={deleteLetter} isLoading={isDeleting} />)
            }
        </>
    )
}
