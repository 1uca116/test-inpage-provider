import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Profile from '../../modules/profile';

const ProfilePage = () => {
  return (
    <Routes>
      <Route path=':address/*' element={<Profile />} />
    </Routes>
  );
};

export default ProfilePage;
