import { deleteItem } from "../features/cart/cartSlice"
import {useDispatch} from "react-redux"
import Button from "./Button"


const DeleteItem = ({pizzaId}) => {

  const dispatch = useDispatch();
 
  return (
    <Button type='small' onClick={(e) => dispatch(deleteItem(pizzaId))}>
        Delete
    </Button>
  )
}

export default DeleteItem;