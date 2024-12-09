import ProductProps from "../ProductProps";

function Product(props: ProductProps) {
    const addProductToCart = (userId: number, productId: number) => {
        fetch(`http://localhost:3000/users/${userId}/cartItems/${productId}`, { method: "PUT" });
    }
    return <div className="card">
        <h2>{props.title}</h2>
        <img src={props.imgSrc} alt="termék kép" />
        <div className="card-container">
            <p>{props.price}</p>
            {/*If Product is called in the cart then remove button else add to cart button */}
            {
                props.cartMode ?
                    <button onClick={props.onRemove}><img src="remove_sign.png" alt="törlés gomb" /></button> :
                    <button className="cart-button" onClick={() => { addProductToCart(1, props.id!) }}>  <img className="cart-icon" src="cart_icon.svg" alt="kosár gomb" /> </button>

            }
        </div>
    </div>
}

export default Product;
