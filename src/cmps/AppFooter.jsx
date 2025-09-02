
import { UserMsg } from './UserMsg.jsx'
import { ShoppingCart } from './ShoppingCart.jsx'
import { TOGGLE_CART_IS_SHOWN } from '../store/reducers/toy.reducer.js'
import { useDispatch, useSelector } from 'react-redux'
import { AccordionGroup } from './AccordionGroup.jsx'
import { AccordionItem } from './AccordionItem.jsx'
import { userService } from '../services/user.service.js'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export function AppFooter() {
    const dispatch = useDispatch()
    const isCartShown = useSelector(storeState => storeState.toyModule.isCartShown)
    // const count = useSelector(storeState => storeState.userModule.count)
    const toysLength = useSelector(storeState => storeState.toyModule.toys.length)
    const shoppingCartLength = useSelector(storeState => storeState.toyModule.shoppingCart.length)
    const { t } = useTranslation()

    const [users, setUsers] = useState([])

    useEffect(() => {
        userService.query()
            .then(fetchedUsers => setUsers(fetchedUsers))
            .catch(err => console.log('Failed to load users', err))
    }, [])

    return (
        <footer className='app-footer'>
            <h5>
                {t('Currently')} {toysLength} {t('toys in the shop')}
            </h5>
            <p>
                {t('Coffeerights to all - 2025')}
            </p>
            <h5
                style={{ cursor: 'pointer' }}
                onClick={() => dispatch({ type: TOGGLE_CART_IS_SHOWN })}
            >
                <span>{shoppingCartLength}</span> {t('Products in your Cart')}
            </h5>
            <ShoppingCart isCartShown={isCartShown} />
            <UserMsg />

            <AccordionGroup>
                <AccordionItem title="The Team" >
                    <h2>{t('Our team is here')}</h2>
                    <p>Lorem ipsum</p>
                </AccordionItem>
                <AccordionItem title="About us" >
                    <h2>{t('We are great')}</h2>
                    <p>Lorem ipsum</p>
                </AccordionItem>
                <AccordionItem title="About you" >
                    <h2>{t('You are great')}</h2>
                    <p>Lorem ipsum</p>
                </AccordionItem>
                {users && users.length > 0 ? (
                    <AccordionItem title="All Users">
                        <ul>
                            {users.map(user => (
                                <li key={user._id}>{user.fullname}</li>
                            ))}
                        </ul>
                    </AccordionItem>
                ) : (
                    <AccordionItem title="All Users">
                        <p>{t('No users found')}</p>
                    </AccordionItem>
                )}

            </AccordionGroup>
        </footer>
    )
}
