import React from 'react'
import loading from './loading.gif'

const spinner=()=>{
    return (
      <div className='d-flex justify-content-center'>
        <img src={loading} alt="" width={80} height={80} />
      </div>
    )
}

export default spinner