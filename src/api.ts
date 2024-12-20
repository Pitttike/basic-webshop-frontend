import { ChangeQuantityProps, FormInput } from './types';

export async function registerUser(input: FormInput) {
    const response = await fetch("http://localhost:3000/users/register", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(input)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    return response;
}

export async function changeQuantityApi(props: ChangeQuantityProps) {
    await fetch(`http://localhost:3000/cartentry/${props.productId}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            'Authorization': "Bearer " + props.token
        },
        body: JSON.stringify({ quantityChange: props.changeDirection! })
    });
}
