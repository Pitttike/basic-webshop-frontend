import { useState } from "react";
import { CartItemProps} from "../types";
import ChangeQuantity from "./ChangeQuantity";

function CartItem(props: CartItemProps) {
    const [quantity, setQuantity] = useState(props.quantity)
    return <>
        <div className="card">
            <img src={props.imgSrc} alt={props.title} />
            <h2>{props.title}</h2>
            <div className="card-right">

            <p>{Math.floor(props.price*quantity!*100)/100}</p>
            <button className="delete-button" onClick={props.onRemove} />
            </div>
        </div>
        <ChangeQuantity onQuantityChange={props.onQuantityChange} productId={props.id!} quantity={quantity} setQuantity={setQuantity}/>
    </>
}

export default CartItem;