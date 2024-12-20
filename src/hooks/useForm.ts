// hooks/useForm.ts
import { useState } from 'react';
import { FormInput, ValidationRule } from '../types';
import { validatePassword } from '../service';

export function useForm(initialState: FormInput) {
    const [input, setInput] = useState<FormInput>(initialState);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = (): ValidationRule | null => {
        const validations = [
            {
                condition: input.username.length < 6,
                message: "A felhasználónév minimum 6 betű!"
            },
            {
                condition: !validatePassword(input.password),
                message: "A jelszó nem elég erős!"
            },
            {
                condition: input.password === input.username,
                message: "A felhasználó név és a jelszó nem egyezhet meg!"
            }
        ];

        return validations.find(validation => validation.condition) || null;
    };

    return {
        input,
        handleInput,
        validateForm
    };
}