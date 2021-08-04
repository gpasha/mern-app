import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { UseRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { Navbar } from './Components/Navbar'
import { Loader } from './Components/Loader'
import 'materialize-css'

function App() {
  const { login, logout, token, userId, ready } = useAuth()
  const isAuthenticated = !!token
  const routes = UseRoutes(isAuthenticated)

  if (!ready) {
    return <Loader />
  }

  return (
    <AuthContext.Provider value={{
      login, logout, token, userId, isAuthenticated
    }}>
      <Router>
        { isAuthenticated && <Navbar />}
        <div className="container">
          { routes }
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App