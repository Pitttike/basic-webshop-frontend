import { useEffect, useMemo, useState } from "react";
import { CartEntry } from "../types";
import { useAuth } from "../contexts/AuthProvider";
import CartItem from "./CartItem";


function Cart() {
    const auth = useAuth();
    const [cartItems, setCartItems] = useState<CartEntry[]>([]);

    const totalPrice = useMemo(() => {
        if (!cartItems?.length) return 0;
        return cartItems.reduce((total, cartentry) =>
            cartentry.product.price * cartentry.quantity + total, 0
        );
    }, [cartItems]);

    const handleQuantityChange = (productId: number, newQuantity: number) => {
        setCartItems(prevItems => prevItems.map(item =>
            item.product.id === productId
                ? { ...item, quantity: newQuantity }
                : item
        ));
    }

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
        }
        load();
    }, [auth?.user?.id, auth.token])

    const handleRemove = async (productId: number) => {
        await fetch(`http://localhost:3000/cartentry/${productId}`, {
            method: 'DELETE',
            headers: {
                "Authorization": "Bearer " + auth.token
            }
        });
        setCartItems(prevItems => prevItems.filter((item) => item.product.id !== productId));
    }

    return <div className="cart-container">
        <div className="cart-without-sum">
            <h1>Kosár</h1>
            <ul className="cart-list">
                {cartItems.map((cartentry) => (
                    <li key={cartentry.product.id}>
                        <CartItem
                            id={cartentry.product.id}
                            title={cartentry.product.title}
                            price={cartentry.product.price}
                            imgSrc={cartentry.product.imgSrc}
                            quantity={cartentry.quantity}
                            onQuantityChange={handleQuantityChange}
                            onRemove={() => handleRemove(cartentry.product.id!)}
                        />
                    </li>
                ))}
            </ul>
        </div>
        <h3>Végösszeg:&nbsp;<span>{Math.round(totalPrice)}</span></h3>
    </div>
}

export default Cart;