import { Routes, Route, Navigate } from 'react-router-dom'
import { HistoryRouter, history } from './utils/history'
import { lazy } from 'react'


const NftMarket = lazy(() => import('./pages/NftMarket'))
const PersonalProfile = lazy(() => import('./pages/PersonalProfile'))
const Home = lazy(() => import('./pages/Home'))

function App () {
  return (
    <div className="App">
      <HistoryRouter history={history}>
        <Routes>
          <Route path='/' element={<Home />} >
            <Route index element={<Navigate to="personalProfile" replace />} />
            <Route path='personalProfile' element={<PersonalProfile />} />
            <Route path='nftMarket' element={<NftMarket />} />
          </Route>
        </Routes>
      </HistoryRouter>
    </div>
  )
}

export default App
