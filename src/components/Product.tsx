
import StatusMessage from "./StatusMessage";
import { ProductProps } from "../types";
import { useAuth } from "../contexts/AuthProvider";
import { useStatusMessage } from "../hooks/useStatusMessage";

function Product(props: ProductProps) {
    const auth = useAuth();
    const {
        error,
        success,
        setError,
        setSuccess,
        clearStatus
    } = useStatusMessage();


    const addProductToCart = async (productId: number) => {

        clearStatus();
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
        } catch (err: any) {
            setError({ message: err.message });
        }
    };

    return (
        <div className="card">
            <h2>{props.title}</h2>
            <img className="card-img" src={props.imgSrc} alt="termék kép" />
            <div className="card-bottom">
                <p>{props.price}</p>
                {auth.user && <button className="cart-button" onClick={() => addProductToCart(props.id!)} />}
            </div>
            {error && (<StatusMessage success={false} message={error.message} />)}
            {success && (<StatusMessage success={true} message={success.message} />)}
        </div>
    );
}

export default Product;
