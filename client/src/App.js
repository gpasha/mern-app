import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { UseRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import 'materialize-css'

function App() {
  const { login, logout, token, userId } = useAuth()
  const isAuthenticated = !!token
  const routes = UseRoutes(isAuthenticated)
  return (
    <AuthContext.Provider value={{
      login, logout, token, userId, isAuthenticated
    }}>
      <Router>
        <div className="container">
          { routes }
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App