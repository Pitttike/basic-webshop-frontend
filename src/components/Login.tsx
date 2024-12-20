// components/Register.tsx
import { FormEvent } from "react";
import StatusMessage from "./StatusMessage";
import { useForm } from "../hooks/useForm";
import { useStatusMessage } from "../hooks/useStatusMessage";
import { useAuth } from "../contexts/AuthProvider";

function Login() {

    const auth = useAuth();
    if (auth.user) { return; }

    const { input, handleInput, validateForm } = useForm({
        username: "",
        password: ""
    });


       const {error,
        setError,
        clearStatus
    } = useStatusMessage();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        const validationError = validateForm();
        if (validationError) {
            setError({ message: validationError.message });
            return;
        }

        clearStatus();
        
        try {
            await auth.loginAction(input)
        } catch (err) {
            setError({ 
                message: err instanceof Error ? err.message : "Valami hiba történt..." 
            });
        }
    };

    return <form method="POST" onSubmit={handleSubmit}>
        <h1>Bejelentkezés</h1>
        <div className="form-group">

            <label htmlFor="username">Felhasználónév</label>
            <input type="text" name="username" onChange={handleInput} />
        </div>
        <div className="form-group">


            <label htmlFor="password">Jelszó:</label>
            <input type="password" name="password" onChange={handleInput} />
        </div>

        <input type="submit" disabled={!!error} />
        {error && <StatusMessage message={error.message} success={false} />}

    </form>
}

export default Login;