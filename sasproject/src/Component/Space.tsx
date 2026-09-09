import React from 'react'

const Space = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='container mx-auto'>{children}</div>
  )
}

export default Space