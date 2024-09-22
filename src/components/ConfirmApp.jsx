import React from 'react'

export const ConfirmApp = ({ close, fnConfirm }) => {
    return (
        <div className='tab-confirm'>
            <div>
                <div className='text-center' style={{ fontSize: '3rem' }}>
                    😟
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>¿Estas seguro de eliminar</h3>
                <div className='mt-3' style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button onClick={() => close()}>Cancelar</button>
                    <button onClick={() => fnConfirm()}>Aceptar</button>
                </div>
            </div>
        </div>
    )
}
