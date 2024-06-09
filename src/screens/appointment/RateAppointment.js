import React, { useState } from 'react';
import '../../common/common.css'
import { Modal, Button, FormControl, TextField, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { postRating } from '../../util/fetch';
import Paper from '@mui/material/Paper';

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
        <Modal className='rate-appointment-modal' open={isOpen} onClose={onRequestClose}>
            <div >
                <Paper className='rate-appointment-paper' elevation={3}>
                    <Typography className='rate-appointment-purple-header' variant="h4" component="h2">
                        Rate Appointment
                    </Typography>
                    <FormControl fullWidth margin="normal">
                        <Typography variant="h7" component="p" style={{ marginLeft: 10 }}>
                            <strong>Doctor's Name:</strong>  {appointment.doctorName}
                        </Typography>
                    </FormControl>
                    <FormControl fullWidth margin="normal" style={{ marginLeft: 10 }}>
                        <Rating
                            name="appointment-rating"
                            value={rating}
                            onChange={(event, newValue) => setRating(newValue)}
                            size="large"
                            precision={0.5}
                        />
                    </FormControl>
                    {errorMessage && <Typography variant="body2" style={{ color: 'red' }}>{errorMessage}</Typography>}
                    <FormControl style={{ marginBlock: 10, marginLeft: 10 }}>
                        <TextField
                            label="Comments (Optional)"
                            value={comments}
                            onChange={(event) => setComments(event.target.value)}
                        />
                    </FormControl>
                    <div>
                        <Button variant="contained" color="primary" style={{ marginBottom: 20, marginTop: 10, marginLeft: 10 }} onClick={submitRating}>
                            Rate Appointment
                        </Button>
                    </div>
                </Paper>
            </div>
        </Modal>
    );
}

export default RateAppointment;