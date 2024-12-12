import { useAuth } from "../contexts/AuthProvider";


function Menu() {
    const { token, logout } = useAuth();
    return <nav>
        <h2>PCX Webshop</h2>
        <input type="" name="search" placeholder="Keresés..."/>
        {token ? ( <button onClick={logout}>Kijelentkezés</button> ) :
            (<>
                <a href="/register">Regisztráció</a>
                <a href="/login">Bejelentkezés</a>
            </>)}

        <a href="/cart" className="refer-to-cart"/>
    </nav>
}

export default Menu;