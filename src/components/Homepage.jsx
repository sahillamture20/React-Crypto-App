import millify from 'millify';
import { Typography, Row, Col, Statistic, Card } from 'antd';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import Cryptocurrencies from './Cryptocurrencies';
import Loader from './Loader';

const { Title, Text } = Typography;
const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const Homepage = () => {
  const { data: cryptosData, isFetching: isFetchingCryptos } = useGetCryptosQuery(10);
  const { data: cryptoNewsData, isFetching: isFetchingNews } = useGetCryptoNewsQuery();

  if (isFetchingCryptos || isFetchingNews) return <Loader />;

  const globalStats = cryptosData?.data?.stats;
  
  const CryptoNews = cryptoNewsData.CryptoNews;
  const randomIndex = Math.floor(Math.random() * CryptoNews?.length-11 );
  // Only take the first 10 news items for the homepage
  const homeNews = CryptoNews?.slice(randomIndex, randomIndex+10) || [];

  return (
    <>
      <Title level={2} className="heading">Global Crypto Stats</Title>
      <Row gutter={[32, 32]}>
        <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value={millify(globalStats.total)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Market Cap" value={`$${millify(globalStats.totalMarketCap)}`} />
        </Col>
        <Col span={12}>
          <Statistic title="Total 24h Volume" value={`$${millify(globalStats.total24hVolume)}`} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} />
        </Col>
      </Row>

      <div className="home-heading-container">
        <Title level={2} className="home-title">Top 10 Cryptos In The World</Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show more</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />

      <div className="home-heading-container">
        <Title level={2} className="home-title">Latest Crypto News</Title>
        <Title level={3}>
          <Link to="/news">Show more</Link>
        </Title>
      </div>
      <Row gutter={[24, 24]}>
      {CryptoNews && homeNews.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.link} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title level={4}>{news.title}</Title>
                <img src={news.imageURL || demoImage} />
              </div>
              <p>{news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>
              <div className="provider-container">
                <Text>{news.pubDate}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
      </Row>
    </>
  );
};

export default Homepage;
