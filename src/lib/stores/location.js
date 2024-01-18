import { readable } from 'svelte/store';

const location = readable(null, (set) => {
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
    set(null);
  };
});

export default location;
