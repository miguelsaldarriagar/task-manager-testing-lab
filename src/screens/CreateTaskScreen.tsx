import React, { useState, useEffect } from 'react';
import { View, Text, AccessibilityInfo, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';
import { ConfirmDeleteDialog } from '../components/ConfirmDeleteDialog';
import { useCreateTask } from '../hooks/useCreateTask';

export function CreateTaskScreen() {
  const { status, tasks, submit, removeTask } = useCreateTask();
  const insets = useSafeAreaInsets();
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  const pendingTask = tasks.find((t) => t.id === pendingDelete);

  // ==== Actividad 3: mejora de accesibilidad agregada ====
  // Antes, el mensaje de éxito/error solo era visual: un usuario de
  // lector de pantalla (VoiceOver/TalkBack) no se enteraba a menos que
  // navegara manualmente hasta ese texto. Se anuncia el cambio de estado
  // de forma proactiva apenas ocurre.
  useEffect(() => {
    if (status === 'success') {
      AccessibilityInfo.announceForAccessibility('Tarea creada exitosamente');
    } else if (status === 'error') {
      AccessibilityInfo.announceForAccessibility('Error al crear la tarea');
    }
  }, [status]);

  return (
    <View
      className="flex-1 gap-4 bg-gray-50 p-4"
      style={{ paddingTop: insets.top + 16, paddingBottom: insets.bottom + 16 }}
    >
      <Text className="text-2xl font-bold text-gray-900">Nueva tarea</Text>
      {/* ==== Actividad 3: navegación a la pantalla nueva de búsqueda ==== */}
      <Link href="/buscar" asChild>
        <Pressable accessibilityRole="button" accessibilityLabel="Ir a buscar tareas">
          <Text className="text-base font-semibold text-blue-600">Buscar tareas</Text>
        </Pressable>
      </Link>
      <TaskForm onSubmit={submit} />
      {status === 'success' && (
        <Text className="rounded-lg bg-green-100 px-4 py-3 text-sm font-medium text-green-800">
          Tarea creada exitosamente
        </Text>
      )}
      {status === 'error' && (
        <Text className="rounded-lg bg-red-100 px-4 py-3 text-sm font-medium text-red-800">
          Error al crear la tarea
        </Text>
      )}
      <TaskList tasks={tasks} onDelete={setPendingDelete} />
      <ConfirmDeleteDialog
        visible={pendingDelete !== null}
        taskTitle={pendingTask?.title}
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => {
          if (pendingDelete) removeTask(pendingDelete);
          setPendingDelete(null);
        }}
      />
    </View>
  );
}
