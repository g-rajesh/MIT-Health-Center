import axios from 'axios';

const initialData = {
    username: "",
    password: ""
};

const initialAddData = {
    name: "",
    qty: "",
    price: "",
    mng: "",
    arrival: "",
    expiry: ""
};

const updateData = {
    _id: "",
    qty: 0
}

const fetchStocks = async () => {
    const URL = "http://localhost:8081/user/getStock";

    try {
        const data = await axios.get(URL);
        // console.log(data);
        return data;
    } catch(err) {
        throw err;
    }
}

const validateInput = (data) => {
    if(data.username === "") {
        return { success: false, message: "Username is required!" };
    }
    if(data.password === "") {
        return { success: false, message: "Password is required!" };
    }

    return { success: true };
}

const validateAddInput = (data) => {
    if(data.name === "") {
        return { success: false, message: "Name is required!" };
    }
    if(data.qty === "") {
        return { success: false, message: "Quantity is required!" };
    }
    if(data.price === "") {
        return { success: false, message: "Price is required!" };
    }
    if(data.mng === "") {
        return { success: false, message: "Manufactured Date is required!" };
    }
    if(data.arrival === "") {
        return { success: false, message: "Arrival Date is required!" };
    }
    if(data.expiry === "") {
        return { success: false, message: "Expiry Date is required!" };
    }

    return { success: true };
}

export { initialData, initialAddData, updateData, fetchStocks, validateInput, validateAddInput };