import React, {useState} from 'react'
import {TfiMenuAlt} from 'react-icons/tfi';
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi';
import {BsSearch} from 'react-icons/bs';

import './Stocks.css';
import { data } from '../../utils/data';
import Table from './Table';


const Stocks = () => {
    const [page, setPage] = useState(1);
    const [stocks, setStocks] = useState(data);

    const maxPages = Math.ceil(stocks.length / 5);



    const changeHandler = (e) => {
        const value = e.target.value;
        if(value === "") {
            setStocks(data);
            return ;
        }

        const filteredStocks = stocks.filter(stock => stock.name.includes(value));

        setStocks(filteredStocks);

    }

    return (
        <div className="stocks-container">
            <div className="content">
                <header>
                    <h2>STOCKS</h2>

                    <div className="right">
                        <div className="filter">
                            <TfiMenuAlt className='filter-icon' />

                            <select name="filters" id="filters">
                                <option value="name">Name</option>
                                <option value="quantity">Quantity</option>
                                <option value="price">Price</option>
                                <option value="arrival">Arrival Date</option>
                                <option value="manufacture">Manufacture Date</option>
                                <option value="expiry">Expiry Date</option>
                            </select>
                        </div>

                        <div className="pagination">
                            <FiChevronLeft 
                                className={page===1 ? 'l-icon disable' : 'l-icon'} 
                                onClick={() => setPage(page-1)}
                            />
                            <span>Page {page}</span>
                            <FiChevronRight 
                                className={page===maxPages ? 'l-icon disable' : 'l-icon'} 
                                onClick={() => setPage(page+1)}
                            />
                        </div>
                    </div>
                </header>

                <div className="table">
                    <div className="search">
                        <BsSearch className='s-icon' />
                        <input 
                            type="text" 
                            name='search' 
                            id='search'
                            placeholder='Search by name...'
                            onChange={changeHandler}
                        />
                    </div>

                    <Table data={stocks} page={page} />
                </div>
            </div>
        </div>
    )
}

export default Stocks