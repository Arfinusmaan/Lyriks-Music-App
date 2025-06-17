import React from "react";
import SongBar from "./SongBar";
import { useGetArtistTopTracksQuery } from "../redux/services/deezerApi";

const RelatedSongs = ({
  data,
  artistId,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => {
  const { data: artistTopSongs } = useGetArtistTopTracksQuery(artistId);

  const songsToDisplay =
    data?.tracks?.data?.length ? data.tracks.data : artistTopSongs?.data ?? [];

  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-3xl text-white">Related Songs:</h1>

      <div className="mt-6 w-full flex flex-col">
        {!songsToDisplay.length ? (
          <p className="text-white">
            No related songs found. Showing top tracks from this artist instead.
          </p>
        ) : (
          songsToDisplay.map((song, i) => (
            <SongBar
              key={`${song.id}-${i}`}
              song={song}
              i={i}
              playlist={songsToDisplay} // ✅ renamed for clarity
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={handlePlayClick}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RelatedSongs;