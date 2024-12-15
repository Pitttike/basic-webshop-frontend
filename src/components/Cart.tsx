import { useEffect, useMemo, useState } from "react";
import ProductProps from "../ProductProps";
import Product from "./Product";
import { useAuth } from "../contexts/AuthProvider";

interface CartEntry {
    product: ProductProps,
    quantity: number
}

function Cart() {
    const auth = useAuth();
    const [cartItems, setCartItems] = useState<CartEntry[]>([]);
    const totalPrice = useMemo(() => {
        if (!cartItems?.length) return 0;
        return cartItems.reduce((totalPrice, cartentry) =>
            cartentry.product.price * cartentry.quantity + totalPrice, 0);
    }, [cartItems]);
    useEffect(() => {
        async function load() {
            if (!auth?.user?.id) return;
            const result = await fetch(`http://localhost:3000/cartentry`, {
                headers: {
                    "Authorization": "Bearer " + auth.token
                }
            })
            const cartEntries: CartEntry[] = await result.json();
            setCartItems(cartEntries);
            console.log(cartItems)
        }
        load();
    }, [])

    const handleRemove = async (productId: number) => {
        await fetch(`http://localhost:3000/cartentry/${productId}`, {
            method: 'DELETE', 
            headers: {
                "Authorization": "Bearer " + auth.token
            }
        });
        setCartItems(prevItems => prevItems.filter((item) => item.product.id !== productId));
    }

    return <div>
        <h1>Kosár</h1>
        <ul>
            {cartItems.map((cartentry) => (
                <li key={cartentry.product.id}>
                    <Product
                        id={cartentry.product.id}
                        title={cartentry.product.title}
                        price={cartentry.product.price}
                        imgSrc={cartentry.product.imgSrc}
                        cartMode={true}
                        onRemove={() => handleRemove(cartentry.product.id!)}
                    />
                </li>
            ))}
        </ul>
        <h3>Végösszeg: <span>{totalPrice}</span></h3>
    </div>
}

export default Cart;