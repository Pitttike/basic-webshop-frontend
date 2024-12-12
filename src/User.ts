import ProductProps from "./ProductProps";

export default interface User {
    id: number;
    username? : string;
    cartItems? : ProductProps[];
}