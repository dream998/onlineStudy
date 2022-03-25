import React, { memo } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import {renderRoutes} from 'react-router-config'

import routes from './router'
import store from './store'
import AppHeader from './components/app-header'
import AppFooter from './components/app-footer'



const App = memo(() => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppHeader/>
        <div style={{height:'90px'}}></div>
        {renderRoutes(routes)}
        <AppFooter/>
      </BrowserRouter>
    </Provider>
  )
})

export default App