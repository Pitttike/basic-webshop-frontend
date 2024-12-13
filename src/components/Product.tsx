import { useAuth } from "../contexts/AuthProvider";
import ProductProps from "../ProductProps";

function Product(props: ProductProps) {
    const auth = useAuth();
    const addProductToCart = (productId: number) => {
        fetch(`http://localhost:3000/users/${auth.user!.id}/cartItems/${productId}`, { method: "PUT" });
    }
    return <div className="card">
        <h2>{props.title}</h2>
        <img className="card-img" src={props.imgSrc} alt="termék kép" />
        <div className="card-bottom">
            <p>{props.price}</p>
            {
                /*Show button if user is logged in*/
                !auth.user ? (null) :
                    /*If Product is called in the cart then remove button else add to cart button */
                    (props.cartMode ?
                        (<button className="delete-button" onClick={props.onRemove} />) :
                        (<button  className="cart-button" onClick={() => { addProductToCart(props.id!) }} /> ))


            }
        </div>
    </div>
}

export default Product;
