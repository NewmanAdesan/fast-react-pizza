
import CartOverview from '../features/cart/CartOverview'
import Header from './Header'

import {useNavigation, Outlet} from 'react-router-dom'
import Loader from './Loader'

const AppLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state == 'loading';
  return (
    <div className='grid h-screen grid-rows-[auto_1fr_auto]'>
        {isLoading && <Loader/>}

        <Header />

        <main className='overflow-scroll max-w-3xl mx-auto w-full'>
            <Outlet />
        </main>

        <CartOverview />

    </div>
  )
}

export default AppLayout