import { writable } from 'svelte/store';

function createSettingsStore() {
  const defaultSettings = {
    colorScheme: 'dark',
    language: 'english',
    fontSize: 12,
  };

  const { subscribe, set, update } = writable(defaultSettings);

  return {
    subscribe,
    set,
    update,
    updateSetting: (setting, value) => {
      update((settings) => ({
        ...settings,
        [setting]: value,
      }));
    },
    toggleColorScheme: () => {
      update((settings) => ({
        ...settings,
        colorScheme: settings.colorScheme === 'dark' ? 'light' : 'dark',
      }));
    },
    reset: () => {
      set(defaultSettings);
    },
  };
}

export default createSettingsStore();
