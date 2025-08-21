
import { UserMsg } from './UserMsg.jsx'
import { ShoppingCart } from './ShoppingCart.jsx'
import { TOGGLE_CART_IS_SHOWN } from '../store/reducers/toy.reducer.js'
import { useDispatch, useSelector } from 'react-redux'
import { AccordionGroup } from './AccordionGroup.jsx'
import { AccordionItem } from './AccordionItem.jsx'
import { userService } from '../services/user.service.js'
import { useEffect, useState } from 'react'

export function AppFooter() {
    const dispatch = useDispatch()
    const isCartShown = useSelector(storeState => storeState.toyModule.isCartShown)
    // const count = useSelector(storeState => storeState.userModule.count)
    const toysLength = useSelector(storeState => storeState.toyModule.toys.length)
    const shoppingCartLength = useSelector(storeState => storeState.toyModule.shoppingCart.length)

    const [users, setUsers] = useState([])

    useEffect(() => {
        userService.query()
            .then(fetchedUsers => setUsers(fetchedUsers))
            .catch(err => console.log('Failed to load users', err))
    }, [])

    return (
        <footer className='app-footer'>
            <h5>
                Currently {toysLength} toys in the shop
            </h5>
            <p>
                Coffeerights to all - 2025
            </p>
            <h5>
                <span>{shoppingCartLength}</span> Products in your Cart
                <a href="#" onClick={(ev) => {
                    ev.preventDefault()
                    dispatch({ type: TOGGLE_CART_IS_SHOWN })
                }}>
                    ({(isCartShown) ? 'hide' : 'show'})
                </a>
            </h5>
            <ShoppingCart isCartShown={isCartShown} />
            <UserMsg />

            <AccordionGroup>
                <AccordionItem title="The Team" >
                    <h2>Our team is here</h2>
                    <p>Lorem ipsum</p>
                </AccordionItem>
                <AccordionItem title="About us" >
                    <h2>We are great</h2>
                    <p>Lorem ipsum</p>
                </AccordionItem>
                <AccordionItem title="About you" >
                    <h2>You are great</h2>
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
                        <p>No users found</p>
                    </AccordionItem>
                )}

            </AccordionGroup>
        </footer>
    )
}
