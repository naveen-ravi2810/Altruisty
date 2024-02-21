import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between px-20'>
        <div className='uppercase'>altruisty</div>
        <div>
          <Link href='/profile'>Profile</Link>
        </div>
    </div>
  )
}

export default Navbar