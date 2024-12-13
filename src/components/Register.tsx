import { useState } from "react";

interface FormInput {
    username: string;
    password: string;
}

function Register() {
    const [input, setInput] = useState<FormInput>({
        username: "",
        password: ""
    })

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.username || !input.password) {
            alert("Felhasználónevet és jelszót kötelező megadni!")
            return;
        }
        try {
            console.log(input)
            await fetch("http://localhost:3000/users/register", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(input)
            })
        } catch {
            throw new Error()
        }

    }
    return <form method="POST" onSubmit={handleSubmit}>
        <h1>Regisztráció</h1>
        <div className="username">

        <label htmlFor="username">Felhasználónév</label>
        <input type="text" name="username" onChange={handleInput} value={input.username} />
        </div>

        <div className="password">

            <label htmlFor="password">Jelszó:</label>
            <input type="password" name="password" onChange={handleInput} value={input.password} />
        </div>
        <input type="submit" />

    </form>
}

export default Register;