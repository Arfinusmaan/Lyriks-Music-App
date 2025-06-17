import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { setActiveSong, playPause } from '../redux/features/playerSlice';
import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from '../redux/services/deezerApi';

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const {
    data: songData,
    isFetching: isFetchingSongDetails,
    error,
  } = useGetSongDetailsQuery(songid);

  const {
    data: relatedData,
    isFetching: isFetchingRelatedSongs,
  } = useGetSongRelatedQuery(songid);
  
  // Consistent array for both RelatedSongs and Redux
  const relatedSongs = relatedData?.tracks?.data ?? relatedData?.data ?? [];

  if (isFetchingSongDetails || isFetchingRelatedSongs)
    return <Loader title="Searching song details..." />;
  if (error) return <Error />;

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i, playlist) => {
    dispatch(setActiveSong({ song, data: playlist, i }));
    dispatch(playPause(true));
  };

  // console.log('Album image:', songData?.album?.cover_medium);


  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={songData?.artist?.id} songData={songData} />
          
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Preview:</h2>
        <div className="mt-4">
          {songData?.preview ? (
            <audio controls className="w-full mt-2">
              <source src={songData.preview} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          ) : (
            <p className="text-gray-400 text-base my-1">
              Sorry, no preview available.
            </p>
          )}
        </div>
      </div>

      <RelatedSongs
        data={relatedSongs}
        artistId={songData?.artist?.id}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default SongDetails;