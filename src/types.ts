

export interface FormInput {
    username: string;
    password: string;
}

export interface ApiStatus {
    message: string;
    success?: boolean
}
export interface ValidationRule {
    condition: boolean;
    message: string;
}

export interface User {
    id: number;
    username? : string;
}

export interface ChangeQuantityProps {
    productId: number;
    token?: string;
    quantity?: number;
    setQuantity?: (quantity: number) => void;
    onQuantityChange?: (productId: number, newQuantity: number) => void
    changeDirection?: number;
}

export interface ProductProps {
    id : number;
    title : string;
    price : number;
    imgSrc : string;
    onRemove? : () => void
    
}

export interface CartItemProps {
    id : number;
    title : string;
    price : number;
    imgSrc : string;
    quantity : number;
    onQuantityChange?: (productId: number, newQuantity: number) => void
    onRemove? : () => void
    
}

export interface CartEntry {
    product: CartItemProps,
    quantity: number
}

export interface OrderButtonProps {
    orderStrategy: string;
    onSetOrder: (strategy: string) => void;
}
