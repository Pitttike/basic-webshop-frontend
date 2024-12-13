import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";




function Menu() {
    const { token, logout } = useAuth();
    return <nav>
        <h2>PCX Webshop</h2>
        <input type="" name="search" placeholder="Keresés..."/>
        {token ? (<button className="logout" onClick={logout}>Kijelentkezés</button>) :
            (<>
                <a className="register-ref" href="/register">Regisztráció</a>
                <a className="login-ref" href="/login">Bejelentkezés</a>
                
            </>)}

        <a href="/cart"> <img className="cart-img" src="trolley.png" alt="kosár" /></a>
    </nav>
}

export default Menu;