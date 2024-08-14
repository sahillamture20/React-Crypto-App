/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi'
import { useEffect, useState } from 'react';
import Loader from './Loader';

const Cryptocurrencies = ({simplified}) => {
  
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching} = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTearm, setSearchTearm] = useState('');
  
  useEffect(() => {
    const filterCoin = cryptosList?.data?.coins.filter(
      (coins) => coins.name.toLowerCase().includes(searchTearm.toLowerCase()));
      setCryptos(filterCoin);
  }, [cryptosList, searchTearm])
  // console.log(cryptos);

  if(isFetching) return <Loader />;

  return (
    <>
      {!simplified && 
        <div className='search-crypto'>
        <Input 
          placeholder='Search crypto currency'
          onChange={(e) => setSearchTearm(e.target.value)}
          />
      </div>
      }
      <Row gutter={[32, 32]} className='crypto-card-container' key={cryptos}>
        {
          cryptos?.map((currency) => (
            <Col className='crypto-card' xs={24} sm={12} lg={6} key={currency.uuid}>
              <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
                <Card 
                  title={`${currency.rank}. ${currency.name}`}
                  extra={<img src={currency.iconUrl} className='crypto-image' />}
                  hoverable
                >
                  <p>Price: {millify(currency.price)}</p>
                  <p>Market Cap: {millify(currency.marketCap)}</p>  
                  <p>Daily Change: {millify(currency.change)}</p>
                </Card>
              </Link>
            </Col>
          ))
        }
      </Row>
    </>
  )
}

export default Cryptocurrencies