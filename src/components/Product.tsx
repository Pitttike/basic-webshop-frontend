import { useRef, useState } from "react"; // Import useRef
import StatusMessage, { StatusMessageProps } from "./StatusMessage";
import ProductProps from "../ProductProps";
import { useAuth } from "../contexts/AuthProvider";

function Product(props: ProductProps) {
    const auth = useAuth();
    const [error, setError] = useState<StatusMessageProps | null>(null);
    const [success, setSuccess] = useState<StatusMessageProps | null>(null)
    const timerRef = useRef<number | null>(null); 

    const addProductToCart = async (productId: number) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current); 
            timerRef.current = null;
        }
        
        setError(null); 
        setSuccess(null);
        try {
            
            const response = await fetch(`http://localhost:3000/cartentry`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + auth.token
                },
                method: "POST",
                body: JSON.stringify({ productId: productId })
                
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData);
                timerRef.current = setTimeout(() => {

                    setError(null);
                    timerRef.current = null;
                }, 4900);
            } else {

                setSuccess({message: "A termék sikeresen a kosárba helyezve"})
                timerRef.current = setTimeout(() => {
                    
                    setSuccess(null);
                    timerRef.current = null;
                }, 4900);
            }
        } catch (err: any) {
            console.error("Error adding product:", err);
        }
    };

    return (
        <div className="card">
            <h2>{props.title}</h2>
            <img className="card-img" src={props.imgSrc} alt="termék kép" />
            <div className="card-bottom">
                <p>{props.price}</p>
                {
                    !auth.user ? null :
                        (props.cartMode ?
                            (<button className="delete-button" onClick={props.onRemove} />) :
                            (<button className="cart-button" onClick={() => addProductToCart(props.id!)} />))
                }
            </div>
            {error && (
                <StatusMessage message={error.message} error={error.error} success={false} />
            )}
            {
                success && (<StatusMessage success={true} message={success.message} />)
            }
        </div>
    );
}

export default Product;
