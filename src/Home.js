import React from 'react'
import { Outlet } from 'react-router-dom'
function Home() {
  return (
    <div>
        <h1>VNR VJIET</h1>
        <h2>Appraisal Form</h2>
        <Outlet/>
    </div>
  )
}

export default Home