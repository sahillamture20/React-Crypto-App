/* eslint-disable no-unused-vars */
import { Select, Typography, Row, Col, Card } from 'antd';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import Loader from './Loader';

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';
const { Text, Title } = Typography;
const { Option } = Select;

const News = () => {

  const { data } = useGetCryptoNewsQuery();
  const CryptoNews = data.CryptoNews;
  // console.log(CryptoNews)
  if (!data) return <Loader />;

  return (
    <Row gutter={[24, 24]}>
      {CryptoNews && CryptoNews.map((news, i) => (
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
    );
};

export default News;