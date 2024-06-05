import { useState } from 'react';
import Box from '@mui/material/Box';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import Tab from '@mui/material/Tab';
import React from 'react';
import DoctorList from '../doctorList/DoctorList';
import UserAppointments from '../appointment/Appointment';

export default function Home() {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            <Tab label="DOCTORS" value="1" />
            <Tab label="APPOINTMENT" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1"><DoctorList/></TabPanel>
        <TabPanel value="2">{ localStorage.getItem('isLoggedIn')? <UserAppointments/>:'Log In to See Appointments'
}</TabPanel>
      </TabContext>
    </Box>
  );
}