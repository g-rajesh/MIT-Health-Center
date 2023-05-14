import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import './Update.css';
import { fetchStocks, initialAddData } from '../../utils/fetch';
import { updateData } from '../../utils/fetch';

const Update = ({ data, setData }) => {
    const [formData, setFormData] = useState(initialAddData);
    const [ uData, setUData ] = useState(updateData);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const changeHandler = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }


    const focusOutHandler = (e) => {
        if(formData.name === "") return ;

        let filterStock = data.filter(stock => stock.name.toLowerCase().startsWith(formData.name.toLowerCase()));

        if(filterStock.length === 0) {
            enqueueSnackbar("No stock found. Enter a valid name!", {variant: "warning"});

            return ;
        } else if(filterStock.length === 1) {
            setFormData({
                name: filterStock[0].name,
                qty: filterStock[0].qty,
                price: filterStock[0].price.$numberDecimal,
                mng: new Date(filterStock[0].mng).toISOString().split('T')[0],
                arrival: new Date(filterStock[0].arrival).toISOString().split('T')[0],
                expiry: new Date(filterStock[0].expiry).toISOString().split('T')[0],
            })
        } else {
            if(formData.mng === "") {
                enqueueSnackbar("More than 1 match found. Enter Manufacted date also!", { variant: "warning" });

                return ;
            }

            filterStock = filterStock.filter(stock => new Date(stock.mng).toISOString().split('T')[0] === formData.mng);

            setFormData({
                name: filterStock[0].name,
                qty: filterStock[0].qty,
                price: filterStock[0].price.$numberDecimal,
                mng: new Date(filterStock[0].mng).toISOString().split('T')[0],
                arrival: new Date(filterStock[0].arrival).toISOString().split('T')[0],
                expiry: new Date(filterStock[0].expiry).toISOString().split('T')[0],
            })
        }

        setUData({...uData, _id: filterStock[0]._id});
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        if(uData._id === "") {
            enqueueSnackbar("No stock selected! Please add one", {variant: "warning"});
            return ;
        }
        if(uData.qty === 0) {
            enqueueSnackbar("Please increase the quantity!", {variant: "warning"});
            return ;
        }

        if(uData.qty > formData.qty) {
            enqueueSnackbar("Insufficient stock", {variant: "warning"});
            return ;
        }

        setIsLoading(true);

        const token = localStorage.getItem("token");
        const URL = "http://localhost:8081/user/updateStock";
        try {
            const response = await axios.post(URL, {
                _id: uData._id,
                qty: formData.qty - uData.qty
            } , {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            enqueueSnackbar("Updated successfully!", {variant: "success"});
            setFormData(initialAddData);
            setUData(updateData);
            setData(response.data.data);
        } catch(err) {
            if(err?.response?.status >= 400 && err?.response?.status < 500) {
                enqueueSnackbar(err.response.data.message, {variant: "warning"})
            } else {
                enqueueSnackbar(err.message, {variant: "error"});
            }
        }

        setIsLoading(false);
    }

    useEffect(() => {
        const username = localStorage.getItem("username");
        if(!username) {
            navigate("/login");
        }
        if(username !== "pharmacist") {
            navigate("/stocks");
        }
    }, []);

    useEffect(() => {

        async function fetchData() {
            try {
                const data = await fetchStocks();

                setData(data.data.data);

            } catch (err) {
                if(err?.response?.status >= 400 && err?.response?.status < 500) {
                    enqueueSnackbar(err.response.data.message, {variant: "warning"})
                } else {
                    enqueueSnackbar(err.message, {variant: "error"});
                }
            }
        }

        fetchData();
    }, []);

    return (
        <div className="update-container">
            <div className="content">
                <h2>Update Stocks</h2>

                <form>
                    <div className="input-group">
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            name='name' 
                            value={formData.name}
                            onChange={changeHandler}
                            onBlur={focusOutHandler}
                        />
                    </div>

                    <div className="grid-2">
                        <div className="input-group">
                            <label htmlFor="qty">Quantity</label>
                            <input 
                                type="number" 
                                name='qty' 
                                value={formData.qty}
                                readOnly
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="price">Price</label>
                            <input 
                                type="number" 
                                name='price' 
                                value={formData.price}
                                readOnly
                            />
                        </div>
                    </div>
                    

                    <div className="grid-3">
                        <div className="input-group">
                            <label htmlFor="mng">Manufactured Date</label>
                            <input 
                                type="date" 
                                name='mng' 
                                value={formData.mng}
                                onChange={changeHandler}
                                onBlur={focusOutHandler}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="arrival">Arrival Date</label>
                            <input 
                                type="date" 
                                name='arrival' 
                                value={formData.arrival}
                                readOnly
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="expiry">Expiry Date</label>
                            <input 
                                type="date" 
                                name='expiry' 
                                value={formData.expiry}
                                readOnly
                            />
                        </div>
                    </div>

                    {
                        uData._id && (
                            <div className="input-group">
                                <label htmlFor="req">Quantity required</label>
                                <input 
                                    type="number" 
                                    name='req' 
                                    value={uData.qty} 
                                    onChange={(e) => setUData({...uData, qty: parseInt(e.target.value)})} 
                                />
                            </div>
                        )
                    }


                    <button className={isLoading ? 'disable' : ''} onClick={submitHandler}>
                        { isLoading ? 'Updating...' : 'Update' }
                    </button>

                </form>
            </div>
        </div>
    )
}

export default Update