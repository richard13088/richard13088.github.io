import React, { useState, startTransition } from 'react'
import { HomeOutlined, FundOutlined, BulbOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom'
import './index.scss'

const items = [
  {
    label: 'Pernsonal Profile',
    key: 'personalProfile',
    icon: <HomeOutlined />,
  },
  {
    label: 'NFT Market',
    key: 'nftMarket',
    icon: <FundOutlined />,
  },
  {
    label: 'Good Will',
    key: 'goodwill',
    icon: <BulbOutlined />,
    disabled: true,
  },
]

const TopBar = () => {
  const navigate = useNavigate()
  const [current, setCurrent] = useState('personalProfile')
  const onClick = (e) => {
    startTransition(() => {
      setCurrent(e.key)
      navigate(e.key)
    })

  }
  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
}
export default TopBar