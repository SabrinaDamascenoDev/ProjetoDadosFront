import { NavLink } from "react-router-dom";
import { Nav } from 'react-bootstrap';
const Menu = () => {
    return(
        <div>
            <Nav className="navbar navbar-expand-sm mt-5">
                <div className="container">
                    <a href="#" class="navbar-brand d-flex align-items-center">
                       Relatórios das Vendas Lojas
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuNavBar">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="menuNavBar">
                        <div class="navbar-nav fs-5 ms-auto">
                            <a href="/" class="nav-link">Tabela</a>
                            <a href="/graficos" class="nav-link">Gráficos</a>
                        </div>
                    </div>
                 </div>       
            </Nav>
        </div>
    )
}

export default Menu;
