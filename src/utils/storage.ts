const STORAGE_KEY = 'tamacode_state';

export function saveState(state: SavedState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      ...state,
      lastSaved: Date.now()
    }));
  } catch (error) {
    console.error('Failed to save state:', error);
  }
}

export function loadState(): SavedState | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Failed to load state:', error);
    return null;
  }
}