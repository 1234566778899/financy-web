
import React from 'react'
import '../styles/Add.css'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CONFIG } from '../config';
import moment from 'moment';
export const AddApp = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const handleRegister = (data) => {
        const date = moment(data.expirationDate);
        axios.post(`${CONFIG.uri}/letter`, { ...data, expirationDate: date })
            .then(res => {
                navigate('/admin/list')
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <form onSubmit={handleSubmit(handleRegister)} className='px-20'>
            <br />
            <h5 style={{ fontSize: '1.1rem', fontWeight: 'bold', textAlign: 'start' }}>Formulario de registro</h5>
            <div className='content-form mt-3'>
                <div className='px-3'>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Número de documento</label>
                        <div className="mt-1">
                            <input
                                {...register('number', { required: true })}
                                type="text" autoComplete="email" required className='input-main' />
                        </div>
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Importe</label>
                        <div className="mt-1">
                            <input
                                {...register('amount', { required: true })}
                                type="text" autoComplete="email" required className='input-main' />
                        </div>
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Fecha de emisión</label>
                        <div className="mt-1">
                            <input
                                {...register('issueDate', { required: true })}
                                type="date" autoComplete="email" required className='input-main' />
                        </div>
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Fecha de vencimiento</label>
                        <div className="mt-1">
                            <input
                                {...register('expirationDate', { required: true })}
                                type="date" autoComplete="email" required className='input-main' />
                        </div>
                    </div>
                </div>
                <div className='px-3'>
                    <div >
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Tipo de tasa</label>
                        <div className="mt-1" style={{ display: 'flex' }}>
                            <select
                                {...register('rateType', { required: true })}
                                required className='input-main'>
                                <option value="Nominal">Nominal</option>
                                <option value="Efectiva">Efectiva</option>
                            </select>
                            <select
                                {...register('rateCap', { required: true })}
                                required className='ms-1 input-main'>
                                <option value="1">Diaria</option>
                                <option value="7">Semanal</option>
                                <option value="15">Quincenal</option>
                                <option value="30">Mensual</option>
                                <option value="60">Bimestral</option>
                                <option value="90">Trimestral</option>
                                <option value="120">Cuatrimestral</option>
                                <option value="180">Semestral</option>
                                <option value="360">Anual</option>
                            </select>
                        </div>
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Tipo de capitalización</label>
                        <div className="mt-1">
                            <select
                                {...register('capitalization', { required: true })}
                                required className='input-main'>
                                <option value="1"></option>
                                <option value="1">Diaria</option>
                                <option value="7">Semanal</option>
                                <option value="15">Quincenal</option>
                                <option value="30">Mensual</option>
                                <option value="60">Bimestral</option>
                                <option value="90">Trimestral</option>
                                <option value="120">Cuatrimestral</option>
                                <option value="180">Semestral</option>
                                <option value="360">Anual</option>
                            </select>
                        </div>
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Tasa de descuento</label>
                        <div className="mt-1">
                            <input
                                {...register('rate', { required: true })}
                                type="text" autoComplete="email" required className='input-main' />
                        </div>
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Moneda</label>
                        <div className="mt-1">
                            <select
                                {...register('currency')}
                                required className='input-main'>
                                <option value="Soles">Soles</option>
                                <option value="Dolares">Dólares</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Administración de cartera (%)</label>
                        <div className="mt-1">
                            <input
                                defaultValue={'0.55'}
                                {...register('admin', { required: true })}
                                type="text" autoComplete="email" required className='input-main' />
                        </div>
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Transferencia de fondos(%)</label>
                        <div className="mt-1">
                            <input
                                defaultValue={'0.45'}
                                {...register('transfer', { required: true })}
                                type="text" autoComplete="email" required className='input-main' />
                        </div>
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Portes</label>
                        <div className="mt-1">
                            <input
                                defaultValue={'8.50'}
                                {...register('portes', { required: true })}
                                type="text" required className='input-main' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='text-end'>
                <button type="submit" className='btn-main mt-2'>Registrar</button>
            </div>
        </form>
    )
}
