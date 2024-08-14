/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import {Link} from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, MenuOutlined, FundOutlined } from '@ant-design/icons';
import icon from '../assets/cryptocurrency.png';

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);
  
  useEffect(() => {
    const handleScreenSizeChange = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleScreenSizeChange);

    handleScreenSizeChange();

    return () => window.removeEventListener('resize', handleScreenSizeChange);
  }, [])

  useEffect( () => {
    if(screenSize < 768){
      setActiveMenu(false);
    }else {
      setActiveMenu(true);
    }
  }, [screenSize])

  const items = [
        {
          key: 'home',
          icon: <HomeOutlined />,
          label: <Link to="/">Home</Link>,
        },
        {
          key: 'cryptocurrencies',
          icon: <FundOutlined />,
          label: <Link to="/cryptocurrencies">Cryptocurrencies</Link>,
        },
        {
          key: 'exchanges',
          icon: <MoneyCollectOutlined />,
          label: <Link to="/exchanges">Exchanges</Link>,
        },
        {
          key: 'news',
          icon: <BulbOutlined />,
          label: <Link to="/news">News</Link>,
        },
      ];
  return (
    <div className="nav-container">
        <div className="logo-container">
            <Avatar src={icon} size='large' />
            <Typography.Title level={2} className='logo'>
                <Link to='/'>Cryptoverse</Link>
            </Typography.Title>
            <Button className='menu-control-container' onClick={() => setActiveMenu(!activeMenu)}>
              <MenuOutlined />  
            </Button>   
        </div>
        {activeMenu && <Menu theme='dark' items={items} />}
    </div>
  )
}

export default Navbar