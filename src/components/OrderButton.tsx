import { OrderButtonProps } from "../types";

function OrderButton(props: OrderButtonProps) {


    return  <div className='dropdown'>
    <button className='filter-button'>Rendezés</button>
    <div className='dropdown-content'>
        <button onClick={()=>props.onSetOrder("desc_ttl")}>Csökkenő &#40;név&#41;</button>
        <button onClick={()=>props.onSetOrder("asc_ttl")}>Növekvő &#40;név&#41;</button>
        <button onClick={()=>props.onSetOrder("desc_prc")}>Csökkenő &#40;ár&#41;</button>
        <button onClick={()=>props.onSetOrder("asc_prc")}>Növekvő &#40;ár&#41;</button>
    </div>
</div>
}

export default OrderButton;