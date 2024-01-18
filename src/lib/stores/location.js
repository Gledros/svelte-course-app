import { readable } from 'svelte/store';

const location = readable(null, (set) => {
  let watchId;

  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        set([latitude, longitude]);
      },
      (error) => {
        set('Error: ' + error.message);
      },
    );
  }

  return () => {
    navigator.geolocation.clearWatch(watchId);
    set(null);
  };
});

export default location;
