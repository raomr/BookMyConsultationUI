import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Typography } from '@mui/material';
import { fetchDoctorDetails } from '../../util/fetch';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';

const DoctorDetails = ({ isDoctorModalOpen, onRequestClose, doctor }) => {
    const [doctorDetails, setDoctorDetails] = useState(null);


    useEffect(() => {
        async function fetchDetails() {
            try {
                const doctorDetails = await fetchDoctorDetails(doctor.id);
                setDoctorDetails(doctorDetails);
            } catch (error) {
                console.error('Error fetching doctor details:', error);
            }
        }

        fetchDetails();
    }, [doctor.id, isDoctorModalOpen]);

    return (
        <>
            <Modal
                isOpen={isDoctorModalOpen} onRequestClose={onRequestClose}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                className="doctorDetailsModal" // Use classes for custom styling (optional)
            >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, borderRadius: 10, backgroundColor: 'white', width: 700, marginLeft: 400, marginTop: 100 }}>
                    <Paper style={{ margin: 15, padding: 20, elevation: 3, marginTop: 20, marginBotton: 20, cursor: "pointer" }}>

                        {doctorDetails && (
                            <div className="doctorDetailsCard">
                                <Typography variant="h5" component="h2" style={{ background: "purple", height: 70, padding: 11, color: "white", alignContent: "center" }} >
                                    Doctor Details
                                </Typography>
                                <Typography variant="h6" padding="3px">
                                    <strong>Doctor's Name:</strong> {doctorDetails.firstName} {doctorDetails.lastName}
                                </Typography>

                                <Typography variant="body2" padding="3px">
                                    <strong>Total Experience:</strong> {doctorDetails.totalYearsOfExp} years
                                </Typography>

                                <Typography variant="body2" padding="3px">
                                    <strong>Speciality:</strong> {doctorDetails.speciality}
                                </Typography>

                                <Typography variant="body2" padding="3px">
                                    <strong>Date of Birth:</strong> {doctorDetails.dob}
                                </Typography>

                                <Typography variant="body2" padding="3px">
                                    <strong>City:</strong> {doctorDetails.address.city}
                                </Typography>

                                <Typography variant="body2" padding="3px">
                                    <strong>Email:</strong> {doctorDetails.emailId}
                                </Typography>

                                <Typography variant="body2" padding="3px">
                                    <strong>Mobile:</strong> {doctorDetails.mobile}
                                </Typography>
                                <Typography variant="body2" padding="3px">
                                    <strong>Rating:</strong> <Rating padding="3px" name="Rating" precision={0.5} value={doctorDetails.rating} readOnly />
                                </Typography>

                            </div>
                        )}
                    </Paper>

                </div>
            </Modal>
        </>
    );
};

export default DoctorDetails;