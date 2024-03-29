

import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom'
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import {useDispatch, useSelector} from 'react-redux'
import { fetchAddress } from "../user/userSlice";
import { getCart, clearCart, getTotalCartPrice } from "../cart/cartSlice";
import store from '../../store'
import EmptyCart from "../cart/EmptyCart";
import { formatCurrency } from "../../utils/helpers";


// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function CreateOrder() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting"

  const formErrors = useActionData();

  const {username, status: addressStatus, address, position, error: addressError} = useSelector(state => state.user)
  const isAddressLoading = addressStatus === 'loading';
  const dispatch = useDispatch();

  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priority = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priority;

  if (!cart.length) return <EmptyCart />

  return (
    <div className="px-4 py-6"> 
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>
      <Form method='POST' action="/order/new">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input className="input grow" type="text" name="customer" defaultValue={username} required />
        </div>

        <div  className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label  className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">{formErrors.phone}</p>}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center" >
          <label className="sm:basis-40" >Address</label>
          <div className="grow relative">
            <input className="input w-full" type="text" name="address" required disabled={isAddressLoading} defaultValue={address} /> 
            {!position.longitude && !position.latitude && <span className="absolute right-[3px] top-[3px] z-50 md:right-[5px] md:top-[5px]">
                <Button 
                    type='small' 
                    disabled={isAddressLoading}
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch( fetchAddress() )
                    }}
                >
                  {isAddressLoading ? 'Loading...' : 'GET POSITION'}
                </Button>
            </span>}
            {addressStatus === 'error' && <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">{addressError}</p>}
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400  focus:outline-none focus:ring focus:ring-yellow-400 focus:offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input 
              type="hidden" 
              name="cart" 
              value={JSON.stringify(cart)} 
          />
          <input 
              type="hidden" 
              name="position" 
              value={ 
                  position.latitude && position.longitude 
                  ? `${position.latitude}, ${position.longitude}` 
                  : ''} 
          />
          <Button type="primary" disabled={isSubmitting || isAddressLoading}>
            {isSubmitting ? 'Placing order...' : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({request}){

  // get the form data from the request 
  let formData = await request.formData();

  // transform the form data into an object
  formData = Object.fromEntries(formData);

  // process values of the form data into a required structure
  let order = {
    ...formData,
    priority: formData.priority === 'true',
    cart: JSON.parse(formData.cart)
  }

  // validate the values in the form data
  const errors = {}
  if (!isValidPhone(order.phone)) errors.phone = "Please give us your correct phone number. We might need it to contact you."
  
  if (Object.keys(errors).length > 0) return errors;

  // submit form data
  const newOrder = await createOrder(order);

  // clearing user cart
  store.dispatch(clearCart())

  // redirect to the route '/order/:orderId' using a function by react router called 'redirect'
  return redirect( `/order/${newOrder.id}`)
}

export default CreateOrder;
