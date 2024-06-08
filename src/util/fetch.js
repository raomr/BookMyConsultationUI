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
        localStorage.setItem('userEmail',email);
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

export const fetchDoctors = async (speciality) => {
    try {
        const params = {};
        if (speciality) {
            params.speciality = speciality;
        }
        const response = await axios.get('http://localhost:8080/doctors', { params });
        console.log("Doctor list call done");
        return response;
    } catch (error) {
        console.error('Error fetching doctors:', error);
        throw new Error('Error fetching doctors');
    }
};

export const fetchSpecialities = async () => {
    try {
        const response = await axios.get('http://localhost:8080/doctors/speciality');
        return response.data;
    } catch (error) {
        console.error('Error fetching specialities:', error);
        throw new Error('Error fetching specialities');
    }
};


export const formatDate = (date) => {
    return (date.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }))
}


export const fetchDoctorTimeslots = async (doctorId, date) => {
    try {
        // Format the date to YYYY-MM-DD before sending it in the request
        const formattedDate = formatDate(date);

        console.log("formatted date inside fetchtimeslot " + formattedDate);
        const response = await axios.get(`http://localhost:8080/doctors/${doctorId}/timeSlots`, {
            params: {
                'date': formattedDate
            },
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        console.log('fetchTimeslot success');
        return response.data.timeSlot;
    } catch (error) {
        console.error('Error fetching timeslot:', error);
        throw new Error('Error fetching timeslot for the given doctor');
    }
}

export const fetchUserAppointments = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/users/${localStorage.getItem('userEmail')}/appointments`,{
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        console.log('fetch User appointment success');
        return response.data;
    } catch (error) {
        console.error('Error fetching user appointment:', error);
        throw new Error('Error fetching user appointment');
    }
}

export const bookAppointment = async (doctor,timeSlot,appointmentDate,symptoms,priorMedicalHistory) => {
    try {
        const formattedDate = formatDate(appointmentDate);
        const response = await axios.post("http://localhost:8080/appointments", {
            "doctorId": doctor.id,
            "doctorName":  `${doctor.firstName} ${doctor.lastName}`,
            "userId": localStorage.getItem('userEmail'),
            "userEmailId": localStorage.getItem('userEmail'),
            "timeSlot": timeSlot,
            "appointmentDate": formattedDate,
            "symptoms": symptoms,
            "priorMedicalHistory": priorMedicalHistory
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        console.log("Appointment booked response " + response.data.appointmentId);
        return response.data.appointmentId;
    } catch (error) {
        throw new Error('Appointment booking failed');
    }
}


export const fetchDoctorDetails = async (doctorId) => {
    try {
        const response = await axios.get(`http://localhost:8080/doctors/${doctorId}`);
        console.log('doctor details: ' + response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching doctor details:', error);
        throw new Error('Error fetching doctor details');
    }
}

export const postRating = async(appointment,rating,comments) => {
    try {
        await axios.post("http://localhost:8080/ratings", {
            "appointmentId":appointment.appointmentId,
            "doctorId":appointment.doctorId,
            "rating":rating,
            "comments":comments
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        console.log("Rating saved");
    } catch (error) {
        throw new Error('Error while submitting ratings');
    }

}

export const logoutApiCall = async () => {
    try {
        await axios.post("http://localhost:8080/auth/logout", {}, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        console.log('Logout success:', localStorage.getItem('token'));
    } catch (error) {
        throw new Error('Error while logging out');
    }
}