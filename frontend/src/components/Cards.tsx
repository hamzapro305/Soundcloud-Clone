import Image from 'next/image'
import React from 'react'

const Cards = () => {
  return (
    <div className='song-card'>
      <Image src="/card img 1.jpg" width={200} height={200} alt='Song Thumbnail'/>
      <div className='title'>bbdkashbdbksajdbk</div>
      <div className='author'>hbas</div>
    </div>
  )
}

export default Cards
