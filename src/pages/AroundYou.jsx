import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { useGetSongsByCountryQuery } from '../redux/services/deezerApi';

const countryMap = {
  IN: 75,
  US: 16,
  FR: 0,
  // Add more as needed
};

const CountryTracks = () => {
  const [countryId, setCountryId] = useState(75); // Default to India
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data, isFetching, error } = useGetSongsByCountryQuery(countryId);

  useEffect(() => {
    axios
      .get(`https://geo.ipify.org/api/v2/country?apiKey=${import.meta.env.VITE_GEO_API_KEY}`)
      .then((res) => {
        const countryCode = res?.data?.location?.country;
        setCountryId(countryMap[countryCode] || 75);
      })
      .catch((err) => console.error('Geo lookup failed', err))
      .finally(() => setLoading(false));
  }, []);

  if (isFetching || loading) return <Loader title="Loading songs around you..." />;
  if (error && countryId) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Around you <span className="font-black">{Object.keys(countryMap).find((key) => countryMap[key] === countryId)}</span>
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.tracks?.data?.map((song, i) => (
          <SongCard
            key={song.id}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data.tracks.data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default CountryTracks;