import React from 'react'
import Cards from './ui/Cards'
import trends from '@/utils/MockTrending'

const TrendingSection = () => {
  return (
    <div className='trending-section'>

      {trends.map((data,key)=>{
        return(
          <Cards key={key} authorName={data.author} description={data.description} />
        )
      })}
    </div>
  )
}

export default TrendingSection
