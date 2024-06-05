import React, { useState } from 'react';
import { Modal, Button, FormControl, TextField, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { postRating } from '../../util/fetch';

function RateAppointment({ isOpen, onRequestClose, appointment }) {
    const [rating, setRating] = useState(0);
    const [comments, setComments] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const submitRating = async () => {
        if (rating === 0) {
            setErrorMessage('Submit a rating');
            return;
        }

        await postRating(appointment, rating, comments);
        setRating(0);
        setComments('');
        onRequestClose();
    };

    return (
        <Modal open={isOpen} onClose={onRequestClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ padding: 20, backgroundColor: 'white', borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.1)', width: '400px' }}>
                <Typography variant="h5" component="h2" gutterBottom>
                    Rate an Appointment
                </Typography>
                <FormControl fullWidth margin="normal">
                    <Typography variant="body1" component="p">
                        Doctor's Name: {appointment.doctorName}
                    </Typography>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <Rating
                        name="appointment-rating"
                        value={rating}
                        onChange={(event, newValue) => setRating(newValue)}
                        size="large"
                    />
                </FormControl>
                {errorMessage && <Typography variant="body2" style={{ color: 'red' }}>{errorMessage}</Typography>}
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Comments (Optional)"
                        multiline
                        variant="outlined"
                        value={comments}
                        onChange={(event) => setComments(event.target.value)}
                    />
                </FormControl>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
                    <Button variant="contained" color="secondary" onClick={onRequestClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={submitRating}>
                        Rate Appointment
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

export default RateAppointment;