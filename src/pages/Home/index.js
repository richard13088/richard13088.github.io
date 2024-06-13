import React from "react"
import './index.scss'
import TopBar from '@/pages/TopBar'
import { Outlet } from 'react-router-dom'

const NftMarket = () => {
  return (<div className="home-root">
    <div className="home-middle">
      <div className="home-head"><TopBar /></div>
      <div className="home-body"><Outlet /></div>
    </div>
  </div>)
}
export default NftMarket