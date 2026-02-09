export type HistoryItem = {
  id: string;
  createdAt: number;
  baseImageUrl?: string;
  styleImageUrl?: string;
  resultUrl: string;
  prompt?: string;
};

const KEY = 'vlugs_history_v1';

export function loadHistory(): HistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as HistoryItem[];
  } catch {
    return [];
  }
}

export function saveHistory(items: HistoryItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(items.slice(0, 50)));
}

export function addToHistory(item: HistoryItem) {
  const prev = loadHistory();
  saveHistory([item, ...prev.filter((x) => x.id !== item.id)]);
}
