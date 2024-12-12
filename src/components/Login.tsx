import { FormEvent, useState } from "react"
import { useAuth } from "../contexts/AuthProvider";

function Login() {
    const [input, setInput] = useState({
        username: "",
        password: ""
    });
    const auth = useAuth();
    if (auth.user) {return;}
    const handleInput = (e: any) => {
        const {name, value} = e.target;
        setInput((prev)=>({
            ...prev,
            [name]: value,
        })
        )
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (input.username !== "" && input.password !== "") {
            auth.loginAction(input);
            return;
        }
        alert("A bemeneti adatok érvénytelenek!")
    }
    return <form method="POST" onSubmit={handleSubmit}>
        <h1>Bejelentkezés</h1><br />
        <label htmlFor="username">Felhasználónév</label> <br />
        <input type="text" name="username" onChange={handleInput} /> <br />
        <label htmlFor="password">Jelszó:</label> <br />
        <input type="password" name="password" onChange={handleInput}/>
        <input type="submit"/>

    </form>
}

export default Login;