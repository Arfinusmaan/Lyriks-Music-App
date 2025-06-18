import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useDispatch } from "react-redux";

import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { useGetArtistDetailsQuery } from '../redux/services/deezerApi';

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery(artistId);

  // console.log("Artist Top Tracks:", artistData?.top_tracks?.data);



  const dispatch = useDispatch();

  const handlePlayClick = (song, i, playlist) => {
    dispatch(setActiveSong({ song, i, data: playlist }));
    dispatch(playPause(true));
    console.log("Playing song:", song, "at index:", i, "from playlist:", playlist);
  };

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  if (isFetchingArtistDetails) return <Loader title="Loading artist details..." />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artistData} />

      {/* Optional: Deezer doesn't return top songs from /artist/id */}
      <RelatedSongs
        data={artistData?.top_tracks?.data || []}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePlayClick={handlePlayClick} // ✅ Fixing missing props
        handlePauseClick={handlePauseClick}

      />
    </div>
  );
};

export default ArtistDetails;