import { UserMsg } from './UserMsg.jsx'
import { LoginSignup } from './LoginSignup.jsx'
import { userService } from '../services/user.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.actions.js'
import { TOGGLE_CART_IS_SHOWN } from '../store/reducers/toy.reducer.js'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { LanguageSwitcher } from './LanguageSwitcher.jsx'
import { useTranslation } from 'react-i18next'

// const { NavLink } = ReactRouterDOM
// const { useSelector, useDispatch } = ReactRedux

export function AppHeader() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const user = useSelector(storeState => storeState.userModule.loggedInUser)

    function onLogout() {
        logout()
            .then(() => {
                showSuccessMsg(t('logout successfully'))
            })
            .catch((err) => {
                showErrorMsg(t('OOPs try again'))
            })
    }

    function onToggleCart(ev) {
        ev.preventDefault()
        dispatch({ type: TOGGLE_CART_IS_SHOWN })
    }

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>{t('React Toy App!')}</h1>
                <nav className="app-nav">
                    <NavLink to="/">{t('Home')}</NavLink>
                    <NavLink to="/about">{t('About')}</NavLink>
                    <NavLink to="/toy">{t('Toys')}</NavLink>
                    <NavLink to="/dashboard">{t('Dashboard')}</NavLink>
                    <a onClick={onToggleCart} href="#">🛒 {t('Cart')}</a>
                </nav>
            </section>
            {user ? (
                <section>
                    <span to={`/user/${user._id}`}>{t('Hello')} {user.fullname} <span>${user.score.toLocaleString()}</span></span>
                    <button onClick={onLogout}>{t('Logout')}</button>
                </section>
            ) : (
                <section>
                    <LoginSignup />
                </section>
            )}

            <LanguageSwitcher />
            <UserMsg />
        </header>
    )
}