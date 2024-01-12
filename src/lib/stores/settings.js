import { writable } from 'svelte/store';

const settings = writable({
  colorScheme: 'dark',
  language: 'english',
  fontSize: 12,
});

export default settings;
