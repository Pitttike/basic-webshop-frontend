import { useEffect, useState } from "react";
import ProductProps from "../ProductProps";
import { User } from "../User";
import Product from "./Product";
interface CartProps {
    userId: string;
}

function Cart(props: CartProps) {
    const [cartItems, setCartItems] = useState<ProductProps[]>([]);

    useEffect(() => {
        async function load() {
            const result = await fetch(`http://localhost:3000/users/${props.userId}`)
            const user: User = await result.json();
            setCartItems(user.cartItems);
        }
        load();
    }, [])
    const handleRemove = async (productId: number, cartIndex: number) => {
        await fetch(`http://localhost:3000/users/${props.userId}/cartItems/${productId}`, { method: 'DELETE' });
        setCartItems(prevItems => prevItems.filter((_, index) => index!==cartIndex));
    }
    return <div>
        <h1>Kosár</h1>
        {
            cartItems.map(
                product => <Product key={product.id} id={product.id} title={product.title} price={product.price} imgSrc={product.imgSrc} cartMode={true} onRemove={() => handleRemove(product.id!, cartItems.indexOf(product))} />
            )

        }
    </div>
}

export default Cart;