import { useRef, useState } from "react";
import StatusMessage from "./StatusMessage";
import ProductProps from "../ProductProps";
import { useAuth } from "../contexts/AuthProvider";
import { ApiStatus } from "../types";

function Product(props: ProductProps) {
    const auth = useAuth();
    const [error, setError] = useState<ApiStatus | null>(null);
    const [success, setSuccess] = useState<ApiStatus | null>(null)
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
                const responseData = await response.json();
                throw new Error(responseData.message)
            }

            setSuccess({ message: "Sikeresen a kosárba helyezve" })
            timerRef.current = setTimeout(() => {
                setError(null);
                timerRef.current = null;
            }, 4900);
        } catch (err: any) {
            setError({ message: err.message });
            timerRef.current = setTimeout(() => {
                setError(null);
                timerRef.current = null;
            }, 4900);
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
                <StatusMessage success={false} message={error.message} />
            )}
            {success && (
                <StatusMessage success={true} message={success.message} />
            )}
        </div>
    );
}

export default Product;
