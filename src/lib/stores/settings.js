import { writable } from 'svelte/store';

const settings = writable(
  {
    colorScheme: 'dark',
    language: 'english',
    fontSize: 12,
  },
  (set) => {
    // This function gets executed on the first subscription to the store: when
    // it goes from 0 to 1 subscribers (similarly to a onMount callback).
    const timer = setTimeout(() => {
      set({
        colorScheme: 'light',
        language: 'english',
        fontSize: 12,
      });
    }, 2000);

    return () => {
      // This function gets executed on the last subscription to the store: when
      // it goes from 1 to 0 subscribers (similarly to a onDestroy callback).
      clearTimeout(timer);
    };
  },
);

export default settings;
