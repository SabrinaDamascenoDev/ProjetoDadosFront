import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function GraficoFaturamento() {
  const [faturamento, setFaturamento] = useState([]);
  const [lojas, setLojas] = useState([]);
  const [chartData, setChartData] = useState({ categories: [], seriesData: [] });
  const [error, setError] = useState('');

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
      setError('Erro ao conectar com a API');
    }
  };

  useEffect(() => {
    // Busca os dados de faturamento e lojas
    const fetchAllData = async () => {
      await fetchData('faturamento', setFaturamento);
      await fetchData('lojas', setLojas);
    };

    fetchAllData();
  }, []);

  useEffect(() => {
    if (faturamento.length > 0 && lojas.length > 0) {

      if (faturamento.length !== lojas.length) {
        setError('O número de registros de faturamento e lojas não coincide.');
        return;
      }
  
      const categories = faturamento.map((item, index) => {
        const lojaNome = lojas[index]['ID Loja'] || 'Loja Desconhecida';
        return lojaNome;
      });
  
      const seriesData = faturamento.map(item => parseFloat(item['Valor Final']) || 0);

  
      setChartData({ categories, seriesData });
    }
  }, [faturamento, lojas]);
  
  
  const options = {
    chart: {
      zoomType: 'xy',
    },
    title: {
      text: 'Faturamento por Loja',
      style: {
        fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
      },
    },
    xAxis: {
      categories: chartData.categories,
      crosshair: true,
      labels: {
        rotation: -45,
        style: {
          fontSize: '10px',
          whiteSpace: 'nowrap',
        },
      },
      title: {
        text: 'Lojas',
      },
    },
    yAxis: {
      title: {
        text: 'Faturamento (R$)',
        style: {
          color: 'black',
        },
      },
      labels: {
        format: 'R$ {value}',
        style: {
          color: 'black',
        },
      },
    },
    tooltip: {
      shared: true,
    },
    series: [
      {
        name: 'Faturamento (Barras)',
        type: 'column',
        data: chartData.seriesData,
        tooltip: {
          valuePrefix: 'R$ ',
        },
        color: 'pink',
      },
      {
        name: 'Faturamento (Linha)',
        type: 'line',
        data: chartData.seriesData,
        tooltip: {
          valuePrefix: 'R$ ',
        },
        color: 'gray',
      },
    ],
  };

  return (
    <div className='mt-5'>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default GraficoFaturamento;
