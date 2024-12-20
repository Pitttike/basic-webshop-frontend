import { changeQuantityApi } from "../api";
import { useAuth } from "../contexts/AuthProvider";
import { ChangeQuantityProps } from "../types";

function ChangeQuantity(props: ChangeQuantityProps) {
    const auth = useAuth()
    
  

    return <div className="change-quantity">
        <button onClick={() => {
            if (props.quantity!=1) {
                changeQuantityApi({
                    productId: props.productId,
                    token: auth.token,
                    changeDirection: -1
                })
                props.setQuantity!(props.quantity! - 1);
                props.onQuantityChange!(props.productId, props.quantity! - 1)
            }
        }}>-</button>
        <span>{props.quantity}</span>
        <button onClick={() => {
            changeQuantityApi({
                productId: props.productId,
                token: auth.token,
                changeDirection: 1
            })
            props.setQuantity!(props.quantity! + 1);
            props.onQuantityChange!(props.productId, props.quantity! +1)
            
        }}>+</button>
    </div >
}

export default ChangeQuantity;