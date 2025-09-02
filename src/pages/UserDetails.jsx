import { useEffect, useState } from "react"
import { userService } from "../services/user.service.js"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useTranslation } from 'react-i18next'

// const { useEffect, useState } = React
// const { Link, useParams, useNavigate } = ReactRouterDOM


export function UserDetails() {
    const [user, setUser] = useState(null)
    const { userId } = useParams()
    const navigate = useNavigate()
    const { t } = useTranslation()

    useEffect(() => {
        if (userId) loadUser()
    }, [userId])

    function loadUser() {
        userService.getById(userId)
            .then(user => {
                console.log('user:', user)
                setUser(user)
            })
            .catch(err => {
                console.log('Had issues in user details', err)
                navigate('/')
            })
    }


    if (!user) return <div>Loading...</div>

    const loggedInUser = userService.getLoggedinUser()
    const isMyProfile = loggedInUser._id === userId
    return (
        <section className="user-details">
            <h1>{t('user.fullname')}: {user.fullname}</h1>
            <h5>{t('user.score')}: {user.score}</h5>

            {isMyProfile && (
                <section>
                    <h2>{t('user.myStuff')}</h2>
                </section>
            )}

            <p>@</p>
            <p>{t('user.description')}</p>

            <Link to="/">{t('home')}</Link>
        </section>
    )
}