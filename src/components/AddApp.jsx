import React, { useState } from 'react'
import '../styles/Add.css'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CONFIG } from '../config';
import moment from 'moment';

export const AddApp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = (data) => {
        if (!isLoading) {
            setIsLoading(true);
            const formattedDate = moment(data.expirationDate).toISOString(); // Formatear la fecha
            axios.post(`${CONFIG.uri}/letter`, {
                ...data,
                rateCap: 30,
                expirationDate: formattedDate
            })
                .then(res => {
                    navigate('/admin/list');
                })
                .catch(error => {
                    setIsLoading(false);
                    console.log(error);
                });
        }
    }

    return (
        <form onSubmit={handleSubmit(handleRegister)} className='px-20'>
            <br />
            <h5 style={{ fontSize: '1.1rem', fontWeight: 'bold', textAlign: 'start' }}>Formulario de registro</h5>
            <div className='content-form mt-3'>
                <div className='px-3'>

                    <div>
                        <label htmlFor="number" className="block text-sm font-medium leading-6 text-gray-900">Número de documento</label>
                        <div className="mt-1">
                            <input
                                id="number"
                                {...register('number', { required: true })}
                                type="text"
                                autoComplete="off"
                                required
                                className='input-main'
                            />
                            {errors.number && <span className="text-red-500 text-sm">Este campo es requerido</span>}
                        </div>
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">Importe</label>
                        <div className="mt-1">
                            <input
                                id="amount"
                                {...register('amount', { required: true, valueAsNumber: true })}
                                type="number"
                                step="0.01"
                                autoComplete="off"
                                required
                                className='input-main'
                            />
                            {errors.amount && <span className="text-red-500 text-sm">Este campo es requerido y debe ser un número</span>}
                        </div>
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="issueDate" className="block text-sm font-medium leading-6 text-gray-900">Fecha de emisión</label>
                        <div className="mt-1">
                            <input
                                id="issueDate"
                                {...register('issueDate', { required: true })}
                                type="date"
                                autoComplete="off"
                                required
                                className='input-main'
                            />
                            {errors.issueDate && <span className="text-red-500 text-sm">Este campo es requerido</span>}
                        </div>
                    </div>

                </div>
                <div className='px-3'>
                    <div>
                        <label htmlFor="expirationDate" className="block text-sm font-medium leading-6 text-gray-900">Fecha de vencimiento</label>
                        <div className="mt-1">
                            <input
                                id="expirationDate"
                                {...register('expirationDate', { required: true })}
                                type="date"
                                autoComplete="off"
                                required
                                className='input-main'
                            />
                            {errors.expirationDate && <span className="text-red-500 text-sm">Este campo es requerido</span>}
                        </div>
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="rateType" className="block text-sm font-medium leading-6 text-gray-900">Tipo de tasa</label>
                        <div className="mt-1" style={{ display: 'flex' }}>
                            <select
                                id="rateType"
                                {...register('rateType', { required: true })}
                                required
                                className='input-main'
                            >
                                <option value="Efectiva">Efectiva</option>
                                <option value="Nominal">Nominal</option> {/* Agregué una opción adicional */}
                            </select>
                            <select
                                id="rate"
                                {...register('rate', { required: true })}
                                required
                                className='ms-1 input-main'
                            >
                                <option value="10">10%</option>
                                <option value="20">20%</option>
                                <option value="30">30%</option>
                                <option value="40">40%</option>
                                <option value="50">50%</option>
                                <option value="60">60%</option>
                                <option value="70">70%</option>
                                <option value="80">80%</option>
                                <option value="90">90%</option>
                            </select>
                            {errors.rateType && <span className="text-red-500 text-sm">Este campo es requerido</span>}
                            {errors.rate && <span className="text-red-500 text-sm">Este campo es requerido</span>}
                        </div>
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="currency" className="block text-sm font-medium leading-6 text-gray-900">Moneda</label>
                        <div className="mt-1">
                            <select
                                id="currency"
                                {...register('currency', { required: true })}
                                required
                                className='input-main'
                            >
                                <option value="Soles">Soles</option>
                                <option value="Dolares">Dólares</option>
                            </select>
                            {errors.currency && <span className="text-red-500 text-sm">Este campo es requerido</span>}
                        </div>
                    </div>
                </div>
                <div className='px-3'>
                    <div>
                        <label htmlFor="admin" className="block text-sm font-medium leading-6 text-gray-900">Administración de cartera (%)</label>
                        <div className="mt-1">
                            <input
                                id="admin"
                                defaultValue={0.55}
                                {...register('admin', { required: true, valueAsNumber: true })}
                                type="number"
                                step="0.01"
                                autoComplete="off"
                                required
                                className='input-main'
                            />
                            {errors.admin && <span className="text-red-500 text-sm">Este campo es requerido y debe ser un número</span>}
                        </div>
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="transfer" className="block text-sm font-medium leading-6 text-gray-900">Transferencia de fondos (%)</label>
                        <div className="mt-1">
                            <input
                                id="transfer"
                                defaultValue={0.45}
                                {...register('transfer', { required: true, valueAsNumber: true })}
                                type="number"
                                step="0.01"
                                autoComplete="off"
                                required
                                className='input-main'
                            />
                            {errors.transfer && <span className="text-red-500 text-sm">Este campo es requerido y debe ser un número</span>}
                        </div>
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="portes" className="block text-sm font-medium leading-6 text-gray-900">Portes</label>
                        <div className="mt-1">
                            <input
                                id="portes"
                                defaultValue={8.50}
                                {...register('portes', { required: true, valueAsNumber: true })}
                                type="number"
                                step="0.01"
                                required
                                className='input-main'
                            />
                            {errors.portes && <span className="text-red-500 text-sm">Este campo es requerido y debe ser un número</span>}
                        </div>
                    </div>
                </div>
            </div>
            <div className='text-end'>
                <button type="submit" className='btn-main mt-2' disabled={isLoading}>
                    <span>
                        {isLoading && (<i className="spinner fa-solid fa-spinner me-2"></i>)} Registrar
                    </span>
                </button>
            </div>
        </form>
    )
}
