// ==== Actividad 3: componente nuevo ====
import React, { useState } from 'react';
import { View, TextInput, Pressable, Text } from 'react-native';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  return (
    <View className="flex-row gap-2">
      <TextInput
        testID="input-busqueda"
        value={query}
        onChangeText={setQuery}
        placeholder="Buscar por título..."
        accessibilityLabel="Buscar tareas por título"
        className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-base"
      />
      <Pressable
        onPress={() => onSearch(query)}
        accessibilityRole="button"
        accessibilityLabel="Buscar"
        testID="btn-buscar"
        className="justify-center rounded-lg bg-blue-600 px-4 active:bg-blue-700"
      >
        <Text className="text-base font-semibold text-white">Buscar</Text>
      </Pressable>
    </View>
  );
}
