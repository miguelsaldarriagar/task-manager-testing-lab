// ==== Actividad 3: hook nuevo para la funcionalidad de búsqueda ====
import { useState } from 'react';
import { Task } from '../types';
import { searchTasks } from '../services/taskService';

type SearchStatus = 'idle' | 'loading' | 'success' | 'error';

export function useSearchTasks() {
  const [status, setStatus] = useState<SearchStatus>('idle');
  const [results, setResults] = useState<Task[]>([]);

  const search = async (query: string) => {
    setStatus('loading');
    try {
      const found = await searchTasks(query);
      setResults(found);
      setStatus('success');
    } catch {
      setResults([]);
      setStatus('error');
    }
  };

  return { status, results, search };
}
