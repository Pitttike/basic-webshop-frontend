

export default interface ProductProps {
    id? : number;
    title : string;
    price : number;
    imgSrc : string;
    cartMode : boolean;
    onRemove? : () => void
}