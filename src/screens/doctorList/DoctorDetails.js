import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Card, CardContent, Button, Typography} from '@mui/material';
import { fetchDoctorDetails } from '../../util/fetch';

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
                style={{ content: { margin: 'auto' } }}
                className="doctorDetailsModal" // Use classes for custom styling (optional)
            >
                <Card>
                <CardContent>
                {doctorDetails && (
                    <div className="doctorDetailsCard">
                        <Typography variant="h6">Doctor Details</Typography>
                        <ul>
                            <li>
                                <Typography variant="body2">
                                    <strong>Doctor's Name:</strong> {doctorDetails.firstName} {doctorDetails.lastName}
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body2">
                                    <strong>Total Experience:</strong> {doctorDetails.totalYearsOfExp} years
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body2">
                                    <strong>Speciality:</strong> {doctorDetails.speciality}
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body2">
                                    <strong>Date of Birth:</strong> {doctorDetails.dob}
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body2">
                                    <strong>City:</strong> {doctorDetails.address.city}
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body2">
                                    <strong>Email:</strong> {doctorDetails.emailId}
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body2">
                                    <strong>Mobile:</strong> {doctorDetails.mobile}
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body2">
                                    <strong>Rating:</strong> {doctorDetails.rating} (out of 5)
                                </Typography>
                            </li>
                        </ul>
                        <Button variant="contained" color="success" size="small" onClick={() => onRequestClose()}>Close</Button>
                    </div>
                )}
                </CardContent>
                </Card>
                
            </Modal>
        </>
    );
};

export default DoctorDetails;