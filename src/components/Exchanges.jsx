import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';
import { useGetExchangesQuery } from '../services/cryptoExchangeApi';
import Loader from './Loader';

const { Text } = Typography;

const Exchanges = () => {
  const { data: exchanges, isFetching } = useGetExchangesQuery();
  // console.log("data:", exchanges);
  
  if (isFetching) return <Loader />;

  // Prepare items for the Collapse component
  const collapseItems = exchanges.map((exchange) => ({
    key: exchange.id, // Unique key for each item
    label: (
      <Row key={exchange.uuid}>
        <Col span={6}>
          <Text><strong>{exchange.trust_score_rank}.</strong></Text>
          <Avatar className="exchange-image" src={exchange.image} />
          <Text><strong>{exchange.name}</strong></Text>
        </Col>
        <Col span={6}>${millify(exchange.trade_volume_24h_btc)}</Col>
        <Col span={6}>{millify(exchange.trust_score)}</Col>
        <Col span={6}>{exchange.year_established || "_"}</Col>
      </Row>
    ),
    children: HTMLReactParser(exchange.description || "No description available"),
  }));

  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Trust Score</Col>
        <Col span={6}>Year established</Col>
      </Row>
      <Row>
        <Col span={24}>
          <Collapse items={collapseItems} />
        </Col>
      </Row>
    </>
  );
};

export default Exchanges;
