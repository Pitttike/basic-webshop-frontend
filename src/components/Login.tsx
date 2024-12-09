import { FormEvent, useState } from "react"

function Login() {
    const [input, setInput] = useState({
        username: "",
        password: ""
    });
    const handleInput = (e: any) => {
        const {name, value} = e.target;
        setInput((prev)=>({
            ...prev,
            [name]: value,
        })
        )
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault;
        if (input.username !== "" && input.password !== "") {
            
        }
        alert("A bemeneti adatok érvénytelenek!")
    }
    return <form onSubmit={handleSubmit}>
        <h1>Bejelentkezés</h1><br />
        <label htmlFor="username">Felhasználónév</label> <br />
        <input type="text" name="username" onChange={handleInput} /> <br />
        <label htmlFor="password">Jelszó:</label> <br />
        <input type="password" name="password" onChange={handleInput}/>

    </form>
}

export default Login;