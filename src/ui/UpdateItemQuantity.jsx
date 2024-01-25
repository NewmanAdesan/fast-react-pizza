import { useDispatch } from "react-redux"
import { decreaseItemQuantity, increaseItemQuantity } from "../features/cart/cartSlice"
import Button from "./Button";

const UpdateItemQuantity = ({pizzaId, currentQuantity}) => {
  const dispatch = useDispatch();
  return (
    <div className="flex gap-1 items-center md:gap-3">
        <Button type='round' onClick={() => dispatch(decreaseItemQuantity(pizzaId))}>-</Button>
        <span className="text-sm font-medium">{currentQuantity}</span>
        <Button type='round' onClick={() => dispatch(increaseItemQuantity(pizzaId))}>+</Button>
    </div>
  )
}

export default UpdateItemQuantity