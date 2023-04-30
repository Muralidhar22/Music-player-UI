import React, { useState, useEffect } from 'react';
import { useTabContext } from '../context/tabContext';
import { useQuery } from '@apollo/client';
import { LOAD_PLAYLISTS } from '../graphql/Queries';

const Tab = ({ label, active, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer ${active ? "opacity-100" : "opacity-60"}`}
    >
      {label}
    </div>
  );
};

const Tabs = () => {
  const { tabIndex, setTabIndex } = useTabContext()
  const { data } = useQuery(LOAD_PLAYLISTS)
  
  useEffect(() => {
    if(data) {
      setTabIndex({ value: data.getPlaylists[0].id, title: data.getPlaylists[0].title })
    }
  }, [data]);

  const handleTabClick = (data) => {
    setTabIndex({ value: data.id, title: data.title });
  };
  
  if(!data) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="overflow-x-auto whitespace-nowrap p-3 lg:p-0 flex lg:flex-col gap-5">
        {data.getPlaylists.map(val => (
                <Tab
                key={val.id}
                label={val.title}
                active={tabIndex?.value === val.id}
                onClick={() => handleTabClick(val)}
              />
        ))}
      </div>
    </>
  );
};

export default Tabs;