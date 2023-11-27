import React from 'react'
import Canvas_contant from '../Canvas_contant/Canvas_contant'

function Canvas({handleClosee,handleShoww,setShoww,showw}) {
  return (
    <div>
            {[ 'end'].map((placement, idx) => (
        <Canvas_contant key={idx} placement={placement} name={placement}  handleClosee={handleClosee} handleShoww={handleShoww} setShoww={setShoww} showw={showw} />
      ))}
    
    </div>
  )
}

export default Canvas
