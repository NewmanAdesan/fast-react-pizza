
import CartOverview from '../features/cart/CartOverview'
import Outlet from 'react-router-dom'
import Header from './Header'

const AppLayout = () => {
  return (
    <div>
        <Header />

        <main>
            <Outlet />
        </main>

        <CartOverview />

    </div>
  )
}

export default AppLayout