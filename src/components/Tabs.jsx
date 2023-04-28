import React, { useState, useEffect } from 'react';
import { useTabContext } from '../context/tabContext';
import { useQuery } from '@apollo/client';
import { LOAD_PLAYLISTS } from '../graphql/Queries';

const Tab = ({ label, active, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer ${active}`}
    >
      {label}
    </div>
  );
};

const Tabs = () => {
  const { tabIndex, setTabIndex } = useTabContext()
  const { data } = useQuery(LOAD_PLAYLISTS)
  
  useEffect(() => {
    // Perform any side effect when the active tab changes
  }, [tabIndex]);

  const handleTabClick = (index) => {
    setTabIndex(index);
  };
  
  if(!data) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {data.getPlaylists.map(val => (
              <Tab
              key={val.id}
              label={val.title}
              active={tabIndex === val.id}
              onClick={() => handleTabClick(val.id)}
            />
      ))}
    </div>
  );
};

export default Tabs;