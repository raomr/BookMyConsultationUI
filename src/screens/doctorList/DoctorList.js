import React, { useState, useEffect } from 'react';
import "../../common/common.css"
import { Card, CardContent, CardActions, Button, Typography, MenuItem, FormControl, InputLabel } from '@mui/material';
import { fetchDoctors, fetchSpecialities } from '../../util/fetch';
import BookAppointment from './BookAppointment';
import DoctorDetails from './DoctorDetails';
import Rating from '@mui/material/Rating';
import Select from '@mui/material/Select';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [speciality, setSpeciality] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewDoctorModalOpen, setIsViewDoctorModalOpen] = useState(false);

  useEffect(() => {
    async function fetchAllDoctors() {
      try {
        const response = await fetchDoctors();
        setDoctors(response.data);
        setFilteredDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    }

    async function fetchAllSpecialities() {
      try {
        const specialities = await fetchSpecialities();
        setSpecialities(specialities);
      } catch (error) {
        console.error('Error fetching specialities:', error);
      }
    }

    fetchAllDoctors();
    fetchAllSpecialities();
  }, []);



  const handleSpecialityChange = (event) => {
    const selectedSpeciality = event.target.value;
    setSpeciality(selectedSpeciality);
    if (selectedSpeciality) {
      setFilteredDoctors(doctors.filter(doctor => doctor.speciality === selectedSpeciality));
    } else {
      setFilteredDoctors(doctors);
    }
  };

  const handleBookAppointment = (doctor) => {
    if (!(localStorage.getItem('isLoggedIn'))) { window.alert("Please Login to book an appointment!"); }
    else {
      setSelectedDoctor(doctor);
      setIsModalOpen(true);
    }
  };

  const handleViewDoctorDetails = (doctor) => {
    setSelectedDoctor(doctor);
    setIsViewDoctorModalOpen(true);



  }

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null);
  };
  const closeViewDoctorModal = () => {
    setIsViewDoctorModalOpen(false);
    setSelectedDoctor(null);
  };

  return (
    <div className='doctorlist-main-container' >
      <FormControl style={{ minWidth: 200, marginBottom: 20, marginLeft: 650, backgroundColor: "ButtonShadow" }} variant="outlined" >
        <InputLabel id="select">Select Speciality</InputLabel>
        <Select
          labelId="speciality-label"
          id="speciality-select"
          value={speciality}
          onChange={handleSpecialityChange}
          label="Speciality"
        >
          <MenuItem value="">
            <em>All Specialities</em>
          </MenuItem>
          {specialities.map(speciality => (
            <MenuItem key={speciality} value={speciality}>{speciality}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {filteredDoctors.map((doctor) => (
        <Card key={doctor.id} style={{ width: "40%", marginBottom: 20, marginLeft: 500 }}>
          <CardContent>
            <Typography variant="h5" component="div" marginBottom="20px">
              Doctor Name: {doctor.firstName} {doctor.lastName}
            </Typography>
            <Typography variant="body1" >
              Speciality: {doctor.speciality}
            </Typography>
            <div className="rating" style={{ marginTop: 10, justifyContent: "center", alignItems: "center" }}>
              Rating:<Rating name="read-only" precision={0.5} value={doctor.rating} readOnly />
            </div>
          </CardContent>
          <CardActions>
            <Button variant="contained" color="primary" size="small" style={{ width: "40%", margin: "10px" }} onClick={() => handleViewDoctorDetails(doctor)}>View Details</Button>
            <Button variant="contained" color="success" size="small" style={{ width: "40%", margin: "10px" }} onClick={() => handleBookAppointment(doctor)}>Book Appointment</Button>
          </CardActions>
        </Card>
      ))}
      {selectedDoctor && (
        <BookAppointment
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          doctor={selectedDoctor}
        />
      )}
      {selectedDoctor && (
        <DoctorDetails
          isDoctorModalOpen={isViewDoctorModalOpen}
          onRequestClose={closeViewDoctorModal}
          doctor={selectedDoctor}
        />
      )}
    </div>
  );
};

export default DoctorList;