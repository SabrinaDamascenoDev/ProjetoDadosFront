import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';

// Componentes 
import GraficoFaturamento from './componentes/GraficoFaturamento';
import GraficoQuantidade from './componentes/GraficoQuantidade';
import GraficoTicket from './componentes/GraficoTicket';
import Tabelas from './componentes/Tabelas';
import Graficos from './componentes/Graficos';

function App() {
  return (
    <Router>
      <div className="App">
          <Routes>
            <Route path='/' element={<Tabelas />} />
            <Route path='/graficos' element={<Graficos />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
