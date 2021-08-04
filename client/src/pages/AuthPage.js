import React, {useContext, useEffect, useState} from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const { loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form })
            message(data.message)
        } catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form })
            auth.login(data.token, data.userId)
        } catch (e) {}
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Make your link short</h1>
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        <div>
                            <div className="input-field">
                                <input placeholder="Please enter your email"
                                       id="emailId"
                                       name="email"
                                       type="email"
                                       className="validate"
                                       value={form.email}
                                       onChange={changeHandler} />
                                <label htmlFor="emailId">Email</label>
                            </div>
                            
                            <div className="input-field">
                                <input placeholder="Please enter your password"
                                       id="passwordId"
                                       name="password"
                                       type="password"
                                       className="validate"
                                       value={form.password}
                                       onChange={changeHandler} />
                                <label htmlFor="passwordId">Password</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn yellow darken-4 mr-1"
                                disabled={loading}
                                onClick={loginHandler}>
                                LogIn
                        </button>
                        <button className="btn gray darken-4"
                                disabled={loading}
                                onClick={registerHandler}>
                                SignIn
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
