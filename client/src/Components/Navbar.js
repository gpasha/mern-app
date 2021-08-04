import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const Navbar = () => {
    const auth = useContext(AuthContext)
    const history = useHistory()

    const logoutHandler = e => {
        e.preventDefault()
        auth.logout()
        history.push('/')
    }

    return (
        <nav>
            <div class="nav-wrapper blue-grey darken-1">
            <span class="brand-logo">Shorting Links</span>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
                <li><NavLink to="/create">Create</NavLink></li>
                <li><NavLink to="/links">Links</NavLink></li>
                <li><a href="/" onClick={logoutHandler}>Logout</a></li>
            </ul>
            </div>
        </nav>
    )
}
