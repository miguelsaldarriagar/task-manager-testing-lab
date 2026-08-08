// ==== Actividad 3: pantalla nueva para pruebas de integración ====
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SearchBar } from '../components/SearchBar';
import { SearchResultCard } from '../components/SearchResultCard';
import { useSearchTasks } from '../hooks/useSearchTasks';

export function SearchTaskScreen() {
  const insets = useSafeAreaInsets();
  const { status, results, search } = useSearchTasks();

  return (
    <View
      className="flex-1 gap-4 bg-gray-50 p-4"
      style={{ paddingTop: insets.top + 16, paddingBottom: insets.bottom + 16 }}
    >
      <Text className="text-2xl font-bold text-gray-900">Buscar tareas</Text>
      <SearchBar onSearch={search} />

      {status === 'error' && (
        <Text className="rounded-lg bg-red-100 px-4 py-3 text-sm font-medium text-red-800">
          Error al buscar tareas
        </Text>
      )}

      {status === 'success' && results.length === 0 && (
        <Text className="rounded-lg bg-gray-100 px-4 py-3 text-sm font-medium text-gray-600">
          No se encontraron tareas
        </Text>
      )}

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SearchResultCard task={item} />}
      />
    </View>
  );
}
