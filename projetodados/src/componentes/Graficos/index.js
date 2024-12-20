import GraficoFaturamento from "../GraficoFaturamento"
import GraficoQuantidade from "../GraficoQuantidade"
import Menu from "../Menu"

const Graficos = () => {
    return(
        <div className="container">
            <Menu />

            <GraficoFaturamento />

            <GraficoQuantidade />
        </div>
    )
}

export default Graficos