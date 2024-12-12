import { useEffect, useMemo, useState } from "react";
import ProductProps from "../ProductProps";
import User from "../User";
import Product from "./Product";
import { useAuth } from "../contexts/AuthProvider";
function Cart() {
    const auth = useAuth();

    const [cartItems, setCartItems] = useState<ProductProps[]>([]);
    const totalPrice = useMemo(() => {
        return cartItems.reduce((totalPrice, cartitem) => cartitem.price + totalPrice, 0);
    }, [cartItems]);

    useEffect(() => {
        async function load() {
            if (!auth?.user?.id) return;
            const result = await fetch(`http://localhost:3000/users/${auth?.user?.id}`)
            const user: User = await result.json();
            setCartItems(user.cartItems!);

        }
        load();
    }, [])

    const handleRemove = async (productId: number, cartIndex: number) => {
        await fetch(`http://localhost:3000/users/${auth?.user?.id}/cartItems/${productId}`, { method: 'DELETE' });
        setCartItems(prevItems => prevItems.filter((_, index) => index !== cartIndex));
    }
    
    return <div>
        <h1>Kosár</h1>
        <ul>
            {cartItems.map((product) => (
                <li key={product.id}>
                    <Product
                        id={product.id}
                        title={product.title}
                        price={product.price}
                        imgSrc={product.imgSrc}
                        cartMode={true}
                        onRemove={() => handleRemove(product.id!, cartItems.indexOf(product))}
                    />
                </li>
            ))}
        </ul>
        <h3>Végösszeg: <span>{totalPrice}</span></h3>
    </div>
}

export default Cart;