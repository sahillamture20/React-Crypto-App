/* eslint-disable react/prop-types */
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, LinearScale, CategoryScale, PointElement, Tooltip, Legend } from 'chart.js';
import { Col, Row, Typography } from 'antd';

const { Title } = Typography;

// Register the required components
ChartJS.register(LineElement, LinearScale, CategoryScale, PointElement, Tooltip, Legend);

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  coinHistory?.data?.history?.forEach(item => {
    coinPrice.push(item.price);
    coinTimestamp.push(new Date(item.timestamp).toLocaleDateString());
  });

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top', // 'top' or 'bottom'
      },
      title: {
        display: true,
        text: `${coinName} Price Chart`,
      },
    },
    scales: {
      y: {
        type: 'linear', // Specify the type of scale
        beginAtZero: true,
      },
      x: {
        type: 'category', // Specify the type of scale
      },
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">{coinName} Price Chart</Title>
        <Col className="price-container">
          <Title level={5} className="price-change">Change: {coinHistory?.data?.change}%</Title>
          <Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
