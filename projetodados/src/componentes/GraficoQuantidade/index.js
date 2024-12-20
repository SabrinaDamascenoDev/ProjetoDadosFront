import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function GraficoQuantidade() {
  const [produtosVendidos, setProdutosVendidos] = useState([]);
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

    const fetchAllData = async () => {
      await fetchData('quantidade', setProdutosVendidos); 
      await fetchData('lojas', setLojas); 
    };

    fetchAllData();
  }, []);

  useEffect(() => {
    if (produtosVendidos.length > 0 && lojas.length > 0) {
      if (produtosVendidos.length !== lojas.length) {
        setError('O número de registros de faturamento e lojas não coincide.');
        return;
      }


      const categories = produtosVendidos.map((item, index) => {
        const lojaNome = lojas[index]['ID Loja'] || 'Loja Desconhecida';
        return lojaNome;
      });

      const seriesData = produtosVendidos.map(item => parseFloat(item.Quantidade) || 0); 

      setChartData({ categories, seriesData });
    }
  }, [produtosVendidos, lojas]);

  const options = {
    chart: {
      zoomType: 'xy',
    },
    title: {
      text: 'Quantidade de Produtos Vendidos por Loja',
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
        text: 'Quantidade Vendida',
        style: {
          color: 'black',
        },
      },
      labels: {
        format: '{value}',
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
        name: 'Quantidade Vendida (Barras)',
        type: 'column',
        data: chartData.seriesData,
        tooltip: {
          valueSuffix: ' unidades',
        },
        color: 'pink',
      },
      {
        name: 'Quantidade Vendida (Linha)',
        type: 'line',
        data: chartData.seriesData,
        tooltip: {
          valueSuffix: ' unidades',
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

export default GraficoQuantidade;
