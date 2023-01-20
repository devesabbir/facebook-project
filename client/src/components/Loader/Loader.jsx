import React from 'react'

const Loader = () => {
  
  const style = {
      width: '100%',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
  }

  return (
    <div style={{...style}} >
        <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
    </div>
    </div>
    
  )
}

export default Loader