import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Card, CardContent, Button, Typography, FormControl, TextField, Select, MenuItem, InputLabel, Box } from '@mui/material';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { bookAppointment, fetchDoctorTimeslots, fetchUserAppointments, formatDate } from '../../util/fetch';
const BookAppointment = ({ isOpen, onRequestClose, doctor }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [timeSlot, setTimeSlot] = useState('');
    const [medicalHistory, setMedicalHistory] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [timeslots, setTimeslots] = useState([]);
    const [timeSlotError, setTimeSlotError] = useState(false);

    useEffect(() => {
        async function getTimeslots() {
            try {
                const availableTimeslots = await fetchDoctorTimeslots(doctor.id, selectedDate);
                setTimeslots(availableTimeslots);
            } catch (error) {
                console.error('Error fetching timeslots:', error);
            }
        }

        getTimeslots();
    }, [doctor.id, selectedDate]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleTimeSlotChange = (event) => {
        setTimeSlot(event.target.value);
        setTimeSlotError(false);
    };

    const handleSubmit = async () => {
        if (!timeSlot) {
            setTimeSlotError(true);
            return;
        }
        //check if appointment already exists

        const existingAppointments = await fetchUserAppointments(localStorage.getItem('userEmail'));

        const formattedSelectedDate = formatDate(selectedDate);

        const matchingAppointments = existingAppointments.filter(
          (appointment) => {
            const formattedAppointmentDate = formatDate(new Date(appointment.appointmentDate));
            console.log("Formatted Selected Date:", formattedSelectedDate);
            console.log("Formatted Appointment Date:", formattedAppointmentDate);
            return (
              formattedSelectedDate === formattedAppointmentDate &&
              appointment.timeSlot === timeSlot
            );
          }
        );

        if (matchingAppointments.length > 0) {
            window.alert("For the chosen date+timeslot, you alrady have an appointment. Please use another timeslot/date");
        }

        else {
            // Handle form submission logic here
            const appointmentBookedId = await bookAppointment(doctor, timeSlot, selectedDate, symptoms, medicalHistory);
            window.alert("Appointment is successfully booked!! Appointment Id: " + appointmentBookedId);
            onRequestClose(); // Close the modal after submission
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
            <div style={{  display: 'flex',  alignItems: 'center', justifyContent: 'center', padding:20, backgroundColor: 'white', borderRadius: 8, width: 700, marginLeft:300 }}>
            <Card>
                <CardContent>
                <Typography variant="h4" component="h2" color="white" alignContent="center" justifyItems="center" style={{background: "purple", height: 70,padding: 11}} >
                        Book Appointment
                    </Typography>
                    
                        <FormControl fullWidth margin="normal">
                            <TextField
                                label="Doctor's Name"
                                value={`${doctor.firstName} ${doctor.lastName}`}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="outlined"
                            />
                        </FormControl>
                        <FormControl fullWidth margin="normal" >
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Appointment Date"
                                    format="MM/dd/yyyy"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </FormControl>
                        <FormControl fullWidth margin="normal" error={timeSlotError}>
                            <InputLabel id="time-slot-label">Time Slot</InputLabel>
                            <Select
                                labelId="time-slot-label"
                                id="time-slot"
                                value={timeSlot}
                                onChange={handleTimeSlotChange}
                                variant="outlined"
                            >
                                <MenuItem value="">
                                    <em>Select a time slot</em>
                                </MenuItem>
                                {timeslots.map((slot) => (
                                    <MenuItem key={slot} value={slot}>{slot}</MenuItem>
                                ))}
                            </Select>
                            {timeSlotError && <Typography color="error">Select a time slot</Typography>}
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <TextField
                                label="Medical History"
                                value={medicalHistory}
                                onChange={(e) => setMedicalHistory(e.target.value)}
                            />
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <TextField
                                label="Symptoms"
                                value={symptoms}
                                onChange={(e) => setSymptoms(e.target.value)}
                            />
                        </FormControl>
                         <Button  style={{ display: 'flex', justifyContent: 'flex', mt: 2 }} variant="contained" color="primary" onClick={handleSubmit}>
                                Book Appointment
                            </Button>
                </CardContent>
            </Card>
            </div>
        </Modal>
    );
};

export default BookAppointment;