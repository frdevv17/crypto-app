import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import Coin from '../../components/coin/Coin';

import axios from 'axios';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './Home.css';

// import required modules
import { Autoplay, Mousewheel, Keyboard } from 'swiper/modules';

const Home = () => {
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('');
    const [cards, setCards] = useState([])
    

    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/coins/')
            .then(data => setCards(data.data))
            .catch(err => console.log(err))
    }, [])
    useEffect(() => {
        axios.get(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
            )
            .then(res => {
                setCoins(res.data);
            })
            .catch(error => console.log(error));
    }, []);
    const handleChange = e => {
        setSearch(e.target.value);
    };

    const filteredCoins = coins.filter(coin =>
        coin.name.toLowerCase().includes(search.toLowerCase())
    );
    return (
        <div className='home-wrapper'>
            <div className='home'>
                <div className="container">
                    <h1>CRYPTOFOLIO WATCH LIST</h1>
                    <span>Get all the Info regarding your favorite Crypto Currency</span>
                    <Swiper
                        spaceBetween={100}
                        cssMode={true}
                        mousewheel={true}
                        keyboard={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        modules={[Autoplay, Mousewheel, Keyboard]}
                        className="mySwiper"
                    >
                        {
                            cards.map((card) =>
                                <SwiperSlide className='card-swiper' key={card.id}>
                                    <img src={card.image.large} alt="" />
                                    <p style={{ color: card.market_data.price_change_percentage_24h < 0 ? 'red' : 'green' }}>{card.symbol.toUpperCase()} {card.market_data.price_change_percentage_24h.toFixed(2)}%</p>
                                    <h3>$ {card.market_data.current_price.usd.toFixed(2)}</h3>
                                </SwiperSlide>
                            )
                        }
                    </Swiper>
                </div>
            </div>
            <div className="home-table">
                <div className='coin-app'>
                    <div className='coin-search'>
                        <h1 className='coin-text'>Cryptocurrency Prices by Market Cap</h1>
                        <form>
                            <input
                                className='coin-input'
                                type='text'
                                onChange={handleChange}
                                placeholder='Search'
                            />
                        </form>
                    </div>
                    <table className="table-coins">
                        <thead>
                            <tr className='table-header'>
                                <th>Coin</th>
                                <th style={{ textAlign: 'right', display: 'flex', "gap": "130px" }}>
                                    <span>Price</span>
                                    <span>24h Change</span>
                                    <span>Market Cap</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCoins.map(coin => {
                                return (
                                    <tr key={coin.id}>
                                        <Coin
                                            key={coin.id}
                                            id={coin.id}
                                            name={coin.name}
                                            price={coin.current_price}
                                            symbol={coin.symbol}
                                            marketcap={coin.total_volume}
                                            volume={coin.market_cap}
                                            image={coin.image}
                                            priceChange={coin.price_change_percentage_24h}
                                        />
                                    </tr>
                                );
                            })}
                        </tbody>
                        
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Home