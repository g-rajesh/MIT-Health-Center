import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { initialAddData, validateAddInput } from '../../utils/fetch';
import './Add.css';

const Add = () => {
    const [formData, setFormData] = useState(initialAddData);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const changeHandler = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        const result = validateAddInput(formData);

        if(result.success === false) {
            enqueueSnackbar(result.message, {variant: "warning"});
        } else {
            const token = localStorage.getItem("token");
            const URL = "http://localhost:8081/user/addStock";
            try {
                const response = await axios.post(URL, formData , {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                enqueueSnackbar("Added successfully!", {variant: "success"});
                setFormData(initialAddData);
            } catch(err) {
                console.log(err)
                if(err?.response?.status >= 400 && err?.response?.status < 500) {
                    enqueueSnackbar(err.response.data.message, {variant: "warning"})
                } else {
                    enqueueSnackbar(err.message, {variant: "error"});
                }
            }
        }

        setLoading(false);
    }
    
    useEffect(() => {
        const username = localStorage.getItem("username");
        if(!username) {
            navigate("/login");
        }
        if(username !== "admin") {
            navigate("/stocks");
        }
    }, []);

    return (
        <div className="add-container">
            <div className="content">
                <h2>Add Stocks</h2>
                <form>
                    <div className="input-group">
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            name='name' 
                            value={formData.name}
                            onChange={changeHandler}
                        />
                    </div>

                    <div className="grid-2">
                        <div className="input-group">
                            <label htmlFor="qty">Quantity</label>
                            <input 
                                type="number" 
                                name='qty' 
                                value={formData.qty}
                                onChange={changeHandler}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="price">Price</label>
                            <input 
                                type="number" 
                                name='price' 
                                value={formData.price}
                                onChange={changeHandler}
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
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="arrival">Arrival Date</label>
                            <input 
                                type="date" 
                                name='arrival' 
                                value={formData.arrival}
                                onChange={changeHandler}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="expiry">Expiry Date</label>
                            <input 
                                type="date" 
                                name='expiry' 
                                value={formData.expiry}
                                onChange={changeHandler}
                            />
                        </div>
                    </div>

                    <button className={loading ? 'disable' : ''} onClick={submitHandler}>
                        { loading ? 'Adding...' : 'Add' }
                    </button>

                </form>
            </div>
        </div>
    )
}

export default Add