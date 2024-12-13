import { useEffect, useState } from 'react'
import ProductProps from '../ProductProps'
import Product from './Product'

function Products() {
    const [products, setProducts] = useState<ProductProps[]>([])

    useEffect(() => {
        const fillProducts = async () => {
            try {
                const results = await fetch('http://localhost:3000/products')
                setProducts(await results.json())
            } catch (error: any) {
                console.log(error.message)
            }
        }
        fillProducts();
    }, [])

    return <div className='products-container'>
        <h1>Termékek</h1>
        <ul className='product-list'>
            {products.map(product =>
                <li key={product.id}>
                    <Product
                        id={product.id}
                        title={product.title}
                        price={product.price}
                        imgSrc={product.imgSrc}
                        cartMode={false}
                    />
                </li>
            )}

        </ul>
    </div>
}

export default Products;