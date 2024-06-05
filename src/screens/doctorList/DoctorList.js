import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardActions, Button, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { fetchDoctors, fetchSpecialities } from '../../util/fetch';
import BookAppointment from './BookAppointment';
import DoctorDetails from './DoctorDetails';

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
    <div>
      <FormControl variant="outlined" style={{ minWidth: 200, marginBottom: 20 }}>
        <InputLabel id="speciality-label">Speciality</InputLabel>
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
        <Card key={doctor.id} style={{ marginBottom: 20 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {doctor.firstName} {doctor.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {doctor.speciality}
            </Typography>
            <div className="rating">
              <span>&#9733;</span>
              {doctor.rating}
            </div>
          </CardContent>
          <CardActions>
            <Button variant="contained" color="primary" size="small" onClick={() => handleViewDoctorDetails(doctor)}>View Details</Button>
            <Button variant="contained" color="success" size="small" onClick={() => handleBookAppointment(doctor)}>Book Appointment</Button>

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