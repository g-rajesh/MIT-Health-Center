import React, {useState} from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import { initialData, validateInput } from '../../utils/fetch';
import './Login.css';

const Login = () => {
    const [formData, setFormData] = useState(initialData);
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const navigate = useNavigate();

    const changeHandler = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        const result = validateInput(formData);
        if(result.success === false) {
            enqueueSnackbar(result.message, {variant: "warning"});
        } else {
            const URL = "http://localhost:8081/user/login";
            try {
                const response = await axios.post(URL, formData);
                
                // console.log(response);

                localStorage.setItem("username", response.data.data.username);
                localStorage.setItem("token", response.data.data.token);
                setLoading(false);

                navigate("/stocks");

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

    return (
        <div className="login-container">
            <div className="content">
                <h2>Login</h2>
                <form>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            id='username' 
                            name='username' 
                            value={formData.username} 
                            onChange={changeHandler} 
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id='password' 
                            name='password' 
                            value={formData.password} 
                            onChange={changeHandler} 
                        />
                    </div>

                    <button className={loading ? 'disable' : ''} onClick={submitHandler}>
                        { loading ? 'Logging in...' : 'Login' }
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login;