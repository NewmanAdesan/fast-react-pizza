
import CartOverview from '../features/cart/CartOverview'
import Header from './Header'

import {useNavigation, Outlet} from 'react-router-dom'
import Loader from './Loader'

const AppLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state == 'loading';
  return (
    <div className='layout'>
        {isLoading && <Loader/>}

        <Header />

        <main>
            <Outlet />
        </main>

        <CartOverview />

    </div>
  )
}

export default AppLayout