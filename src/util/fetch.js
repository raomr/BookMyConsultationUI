import axios from "axios";

export const loginApiCall = async (email, password) => {
    const encoded = Buffer.from(email + ':' + password).toString('base64');
    try {
        const response = await axios.post("http://localhost:8080/auth/login", {}, {
            headers: {
                'Authorization': 'Basic ' + encoded
            }
        });
        localStorage.setItem('token', response.data.accessToken);
        console.log('Login successful:', localStorage.getItem('token'));
        localStorage.setItem('isLoggedIn', true);
    } catch (error) {
        throw new Error('Login failed');
    }
}

export const registerApiCall = async (email, password, firstName, lastName, mobile) => {
    try {
        const registerResponse = await axios.post("http://localhost:8080/users/register", {
            "firstName": firstName,
            "lastName": lastName,
            "mobile": mobile,
            "password": password,
            "emailId": email
        }, {});
        console.log("Register salt " + registerResponse.data.salt);
    } catch (error) {
        throw new Error('Registration failed');
    }
}