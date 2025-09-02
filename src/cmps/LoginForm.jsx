import { useState } from "react"
import { userService } from "../services/user.service.js"
import { useTranslation } from "react-i18next"

export function LoginForm({ onLogin, isSignup }) {
    const { t } = useTranslation()
    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())

    function handleChange({ target }) {
        const { name: field, value } = target
        setCredentials(prevCreds => ({ ...prevCreds, [field]: value }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        onLogin(credentials)
    }

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <input
                type="text"
                name="username"
                value={credentials.username}
                placeholder={t("Username")}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="password"
                value={credentials.password}
                placeholder={t("Password")}
                onChange={handleChange}
                required
                autoComplete="off"
            />
            {isSignup && <input
                type="text"
                name="fullname"
                value={credentials.fullname}
                placeholder={t("Full name")}
                onChange={handleChange}
                required
            />}
            <button>{isSignup ? t("Signup") : t("Login")}</button>
        </form>
    )
}