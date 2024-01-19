
import CartOverview from '../features/cart/CartOverview'
import Outlet from 'react-router-dom'
import Header from './Header'

import {useNavigation} from 'react-router-doom'
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