
import React from 'react'
import '../styles/Add.css'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CONFIG } from '../config';
export const AddApp = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const handleRegister = (data) => {
        axios.post(`${CONFIG.uri}/letter`, data)
            .then(res => {
                navigate('/admin/list')
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <div className='px-20'>
            <div className='content-form'>
                <p style={{ fontSize: '1.1rem', fontWeight: 'bold', textAlign: 'start' }}>Formulario de registro</p>
                <form onSubmit={handleSubmit(handleRegister)} className='mt-5'>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Número de letra</label>
                        <div className="mt-1">
                            <input
                                {...register('number', { required: true })}
                                type="text" autoComplete="email" required className="form-input focus:outline-none ps-2 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Fecha de emisión</label>
                        <div className="mt-1">
                            <input
                                {...register('issueDate', { required: true })}
                                type="date" autoComplete="email" required className="form-input focus:outline-none ps-2 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Fecha de Descuento</label>
                        <div className="mt-1">
                            <input
                                {...register('discountDate', { required: true })}
                                type="date" autoComplete="email" required className="form-input focus:outline-none ps-2 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Monto</label>
                        <div className="mt-1">
                            <input
                                {...register('amount', { required: true })}
                                type="text" autoComplete="email" required className="form-input focus:outline-none ps-2 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Moneda</label>
                        <div className="mt-1">
                            <select
                                {...register('currency')}
                                required className="form-input focus:outline-none ps-2 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" >
                                <option value="Soles">Soles</option>
                                <option value="Dolares">Dólares</option>
                            </select>
                        </div>
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Tipo de tasa</label>
                        <div className="mt-1">
                            <select
                                {...register('rateType', { required: true })}
                                required className="form-input focus:outline-none ps-2 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" >
                                <option value="Nominal">Nominal</option>
                                <option value="Efectiva">Efectiva</option>
                            </select>
                        </div>
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Porcentaje de la tasa</label>
                        <div className="mt-1">
                            <input
                                {...register('rate', { required: true })}
                                type="text" autoComplete="email" required className="form-input focus:outline-none ps-2 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <button type="submit" className="mt-3 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Agregar</button>
                </form>
            </div>
        </div>
    )
}
