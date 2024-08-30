import React from 'react'
import '../styles/Dashboard.css'
export const DashboardApp = () => {
    return (
        <div className='px-20'>
            <div className='resume'>
                <span>Ultimos 30 días</span>
                <div className='flex mt-4'>
                    <div className='item'>
                        <span className='label'>Número total</span>
                        <span className='value'>71,897</span>
                    </div>
                    <div className='item'>
                        <span className='label'>cantidad descontada</span>
                        <span className='value'>71,897</span>
                    </div>
                    <div className='item'>
                        <span className='label'>Evolución de la TCEA</span>
                        <span className='value'>71,897</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
