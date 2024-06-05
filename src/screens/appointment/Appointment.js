import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button } from '@material-ui/core'; 
import { fetchUserAppointments } from '../../util/fetch';
import RateAppointment from './RateAppointment';

function UserAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
        const fetchedAppointments = await fetchUserAppointments(localStorage.getItem('userEmail'));
        setAppointments(fetchedAppointments);
    };

    fetchData();
  }, []);

  const handleRateAppointment = (appointment) => {   
    setIsRateModalOpen(true);
    setSelectedAppointment(appointment);
  };

  const closeRateModal = () => {
    setIsRateModalOpen(false);
    setSelectedAppointment(null);
  };

  return (
    <div>
      {appointments.length > 0 && (
        <ul>
          {appointments.map((appointment) => (
            <Paper key={appointment.appointmentId} elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
              <ul>
                <li>
                  <Typography variant="body2">
                    <b>Doctor's Name:</b> {appointment.doctorName}
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    <b>Date:</b> {appointment.appointmentDate}
                  </Typography>
                </li>
                {appointment.symptoms && (
                  <li>
                    <Typography variant="body2">
                      <b>Symptoms:</b> {appointment.symptoms}
                    </Typography>
                  </li>
                )}
                {appointment.priorMedicalHistory && (
                  <li>
                    <Typography variant="body2">
                      <b>Prior Medical History:</b> {appointment.priorMedicalHistory}
                    </Typography>
                  </li>
                )}
              </ul>
              <Button variant="contained" color="primary" onClick={() => handleRateAppointment(appointment)}>
                Rate Appointment
              </Button>
            </Paper>
          ))}
        </ul>
      )}
      {selectedAppointment && (
        <RateAppointment 
          isOpen={isRateModalOpen}
          onRequestClose={closeRateModal}
          appointment={selectedAppointment}
        />
      )}
      {appointments.length === 0 && <p>No appointments found.</p>}
    </div>
  );
}

export default UserAppointments;