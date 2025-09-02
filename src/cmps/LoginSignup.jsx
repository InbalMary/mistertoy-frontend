import { useState } from 'react'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { login, signup } from '../store/actions/user.actions.js'
import { LoginForm } from './LoginForm.jsx'
import { useTranslation } from 'react-i18next'

export function LoginSignup() {
    const { t } = useTranslation()
    const [isSignup, setIsSignUp] = useState(false)

    function onLogin(credentials) {
        isSignup ? _signup(credentials) : _login(credentials)
    }

    function _login(credentials) {
        login(credentials)
            .then(() => { showSuccessMsg(t("Logged in successfully")) })
            .catch((err) => { showErrorMsg(t("Oops try again")) })
    }

    function _signup(credentials) {
        signup(credentials)
            .then(() => { showSuccessMsg(t("Signed in successfully")) })
            .catch((err) => { showErrorMsg(t("Oops try again")) })
    }

    return (
        <div className="login-page">
            <LoginForm
                onLogin={onLogin}
                isSignup={isSignup}
            />
            <div className="btns">
                <a href="#" onClick={() => setIsSignUp(!isSignup)}>
                    {isSignup ?
                        t("Already a member? Login") :
                        t("New user? Signup here")
                    }
                </a >
            </div>
        </div >
    )
}
