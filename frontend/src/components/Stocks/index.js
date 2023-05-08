import React, {useState} from 'react'
import {TfiMenuAlt} from 'react-icons/tfi';
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi';
import {BsSearch} from 'react-icons/bs';
import {HiOutlineEmojiSad} from "react-icons/hi";

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

        const filteredStocks = stocks.filter(stock => {

            let stockName = stock.name.toLowerCase();
            let val = value.toLowerCase();

            return stockName.includes(val);
        });

        setStocks(filteredStocks);

    }

    const sortHandler = (e) => {
        const column = e.target.value;

        let sortedArr = [...stocks];
        if(column === "name") {
            sortedArr.sort((a,b) => {
                if(a.name < b.name) return -1;
                if(a.name > b.name) return 1;
                return 0;
            });
            // setStocks(sortedArr);
        } else if(["qty", "price", "id"].includes(column)) {
            sortedArr.sort((a,b) => a[column] - b[column]);
        } else {
            sortedArr.sort((a,b) => new Date(a[column]) - new Date(b[column]));
        }
        setStocks(sortedArr);
        setPage(1);
    }


    return (
        <div className="stocks-container">
            <div className="content">
                <header>
                    <h2>STOCKS</h2>

                    <div className="right">
                        <div className="filter">
                            <TfiMenuAlt className='filter-icon' />

                            <select name="filters" id="filters" defaultValue="default" onChange={sortHandler}>
                                <option value="id">Default</option>
                                <option value="name">Name</option>
                                <option value="qty">Quantity</option>
                                <option value="price">Price</option>
                                <option value="arrival">Arrival Date</option>
                                <option value="mng">Manufacture Date</option>
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
                    {
                        stocks.length === 0 && (
                            <div className='not-found'>
                                <p><HiOutlineEmojiSad className='sad-icon' /> No stocks found</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Stocks