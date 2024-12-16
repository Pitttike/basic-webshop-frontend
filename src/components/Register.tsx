// components/Register.tsx
import { FormEvent } from "react";
import StatusMessage from "./StatusMessage";
import { useForm } from "../hooks/useForm";
import { useStatusMessage } from "../hooks/useStatusMessage";
import { registerUser } from "../api";

function Register() {
    const { input, handleInput, validateForm } = useForm({
        username: "",
        password: ""
    });

    const {
        error,
        success,
        setError,
        setSuccess,
        clearStatus
    } = useStatusMessage();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        // Form validation
        const validationError = validateForm();
        if (validationError) {
            setError({ message: validationError.message });
            return;
        }

        clearStatus();
        
        try {
            await registerUser(input);
            setSuccess({ message: "Sikeres regisztráció" });
        } catch (err) {
            setError({ 
                message: err instanceof Error ? err.message : "Valami hiba történt..." 
            });
        }
    };

    return (
        <form method="POST" onSubmit={handleSubmit} className="register-form">
            <h1>Regisztráció</h1>
            
            <div className="form-group">
                <label htmlFor="username">Felhasználónév</label>
                <input
                    type="text"
                    className="username"
                    name="username"
                    onChange={handleInput}
                    value={input.username}
                />
            </div>

            <div className="form-group">
                <label htmlFor="password">Jelszó</label>
                <input
                    type="password"
                    className="password"
                    name="password"
                    onChange={handleInput}
                    value={input.password}
                />
            </div>

            <input 
                type="submit"
                disabled={!!error}
                value="Regisztráció"
            />

            {error && <StatusMessage message={error.message} success={false} />}
            {success && <StatusMessage message={success.message} success={true} />}
        </form>
    );
}

export default Register;