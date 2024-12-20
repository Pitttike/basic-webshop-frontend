import { useEffect, useState } from 'react'
import { ProductProps } from '../types'
import Product from './Product'
import OrderButton from './OrderButton'

function Products() {
    const [products, setProducts] = useState<ProductProps[]>([])
    const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [orderStrategy, setOrderStrategy] = useState<string>("");
    useEffect(() => {

        const fillProducts = async () => {
            try {
                const results = await fetch('http://localhost:3000/products')
                const data = await results.json()
                setProducts(data)
                setFilteredProducts(data)
                setIsLoading(false)
            } catch (error: any) {
                throw new Error(error.message ||"Valami hiba történt...")
            }
        }
        fillProducts();
    }, [])

    useEffect(() => {
        if (orderStrategy!=="") {
            orderProducts();
        }
    }, [orderStrategy]);

    if (isLoading) {
        return <div>Loading...</div>
    }

    const orderProducts = () => {
        switch(orderStrategy) {
            case "desc_ttl": {
                setFilteredProducts([...filteredProducts].sort((a, b) => b.title.localeCompare(a.title)))
                break;
            }
            case "asc_ttl": {
                setFilteredProducts([...filteredProducts].sort((a, b) => a.title.localeCompare(b.title)))
                break;
            }
            case "desc_prc": {
                setFilteredProducts([...filteredProducts].sort((a, b)=> b.price-a.price))
                break;
            }
            case "asc_prc": {
                setFilteredProducts([...filteredProducts].sort((a, b)=> a.price-b.price))
                break;
            }
        }
    }
    
    const searchByName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilteredProducts(products.filter((product) => product.title.toLowerCase().includes(e.target.value.toLowerCase())))
    }

    return <div className='products-container'>
        <h1>Termékek</h1>
        <div className='filter-fields'>
        <input type="text" className="search" placeholder="Keresés..." onChange={e => searchByName(e)}  />
        <OrderButton orderStrategy={orderStrategy} onSetOrder={(newStrategy) => setOrderStrategy(newStrategy)}  />
        </div>
        <ul className='product-list'>
            {filteredProducts.map(product =>
                <li key={product.id}>
                    <Product
                        id={product.id}
                        title={product.title}
                        price={product.price}
                        imgSrc={product.imgSrc}
                    />
                </li>
            )}
        </ul>
    </div>
}

export default Products;