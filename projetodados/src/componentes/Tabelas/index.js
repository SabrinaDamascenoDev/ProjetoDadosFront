import Menu from "../Menu"
import React, { useState, useEffect, useRef } from 'react';

const Tabelas = () => {
    const [Loja, setLoja] = useState([]);
    const [faturamento, setFaturamento] = useState([]);
    const [quantidade, setQuantidade] = useState([]);
    const [ticket, setTicket] = useState([]);
    const [error, setError] = useState(null);

    const fetchData = async (endpoint, setData) => {
        try {
          const response = await fetch(`http://127.0.0.1:5000/${endpoint}`);
          if (response.ok) {
            const data = await response.json();
            setData(data);
          } else {
            const errorMessage = await response.json();
            setError(errorMessage.message);
          }
        } catch (err) {
          setError("Erro ao conectar com a API");
        }
      };
    
      useEffect(() => {
        fetchData('faturamento', setFaturamento);
        fetchData('lojas', setLoja);
        fetchData('quantidade', setQuantidade);
        fetchData('ticket', setTicket);
      }, []);

    return(
        <div className="container">
        <Menu />
  
        {error && <p style={{ color: "red" }}>{error}</p>}
  
        <table className="table table-hover ms-2 me-2 mt-5">
          <thead>
            <tr>
              <th scope="col">Lojas</th>
              <th scope="col">Faturamento</th>
              <th scope="col">Quantidade Vendida</th>
              <th scope="col">Ticket Mensal</th>
            </tr>
          </thead>
          <tbody>
            {Loja.length > 0 &&
              Loja.map((loja, index) => (
                <tr key={index}>
                  <th scope="row">{loja["ID Loja"]}</th>
                  <td>{faturamento[index]?.["Valor Final"] || "N/A"}</td>
                  <td>{quantidade[index]?.["Quantidade"] || "N/A"}</td>
                  <td>{ticket[index]?.["Ticket Médio"] || "N/A"}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    )
}

export default Tabelas