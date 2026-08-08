// ==== Actividad 3: componente nuevo ====
import React from 'react';
import { View, Text } from 'react-native';
import { Task } from '../types';

interface SearchResultCardProps {
  task: Task;
}

export function SearchResultCard({ task }: SearchResultCardProps) {
  const done = task.status === 'completed';
  return (
    <View
      accessible
      accessibilityLabel={`Resultado: ${task.title}, ${done ? 'completada' : 'pendiente'}`}
      className="mb-2 rounded-lg border border-gray-200 bg-white p-4"
    >
      <Text className="text-base font-semibold text-gray-900">{task.title}</Text>
      <Text className={`mt-1 text-sm ${done ? 'text-green-600' : 'text-gray-500'}`}>
        {done ? '✓ Completada' : '○ Pendiente'}
      </Text>
    </View>
  );
}
