import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetTopChartsQuery } from '../redux/services/deezerApi';

import 'swiper/css';
import 'swiper/css/free-mode';

const TopChartCard = ({ track, i, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => (
  <div
    className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${
      activeSong?.title === track?.title ? 'bg-[#4c426e]' : 'bg-transparent'
    } py-2 p-4 rounded-lg cursor-pointer mb-2`}
  >
    <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <img className="w-20 h-20 rounded-lg" src={track?.album?.cover_medium} alt={track?.title} />
      <div className="flex-1 flex flex-col justify-center mx-3">
        <Link to={`/songs/${track?.id}`}>
          <p className="text-xl font-bold text-white">{track?.title}</p>
        </Link>
        <Link to={`/artists/${track?.artist?.id}`}>
          <p className="text-base text-gray-300 mt-1">{track?.artist?.name}</p>
        </Link>
      </div>
    </div>
    <PlayPause
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={track}
      handlePause={handlePauseClick}
      handlePlay={handlePlayClick}
    />
  </div>
);

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopChartsQuery();

  const topTracks = data?.tracks?.data?.slice(0, 5);
  const topArtists = data?.artists?.data?.slice(0, 10);

  const handlePauseClick = () => dispatch(playPause(false));

  const handlePlayClick = (track, i) => {
    dispatch(setActiveSong({ song: track, data: topTracks, i }));
    dispatch(playPause(true));
  };

  if (isFetching) return <p className="text-white">Loading Top Charts...</p>;
  if (error) return <p className="text-red-500">Failed to load Top Charts</p>;

  return (
    <div className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] animate-slideup max-w-full flex flex-col">
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {topTracks?.map((track, i) => (
            <TopChartCard
              key={track?.id}
              track={track}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(track, i)}
            />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topArtists?.map((artist) => (
            <SwiperSlide
              key={artist?.id}
              style={{ width: '25%', height: 'auto' }}
              className="shadow-lg rounded-full animate-slideright"
            >
              <Link to={`/artists/${artist?.id}`}>
                <img
                  src={artist?.picture_medium}
                  alt={artist?.name}
                  className="rounded-full w-full object-cover"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;