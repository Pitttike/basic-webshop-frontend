import {useEffect, useState} from 'react'
import ProductProps from '../ProductProps'
import Product from './Product'

function Products() {
    const [products, setProducts] = useState<ProductProps[]>([])
    
    useEffect(() => {
        const fillProducts = async () => {
            try {
                const results = await fetch('http://localhost:3000/products')
                setProducts(await results.json())
            } catch (error : any) {
                console.log(error.message)
            }
        }
        fillProducts();
    },[])

    return <div className='product-list'>
        <h1>Termékek</h1>
        {products.map(product => 
            <Product key={product.id} id={product.id} title={product.title} price={product.price} imgSrc={product.imgSrc} cartMode={false}/>
        )}
    </div>
}

export default Products;