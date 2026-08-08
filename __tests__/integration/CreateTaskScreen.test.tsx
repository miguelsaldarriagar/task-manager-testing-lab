import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { http, HttpResponse } from 'msw';
import { server } from '../../src/mocks/server';
import { CreateTaskScreen } from '../../src/screens/CreateTaskScreen';

const API_URL = 'https://api.taskmanager.com';

const metrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 47, left: 0, right: 0, bottom: 34 },
};

const renderScreen = () =>
  render(
    <SafeAreaProvider initialMetrics={metrics}>
      <CreateTaskScreen />
    </SafeAreaProvider>
  );

describe('CreateTaskScreen - Integración', () => {
  it('crea una tarea exitosamente y muestra confirmación', async () => {
    await renderScreen();

    await fireEvent.changeText(
      screen.getByPlaceholderText('Escribe el título de la tarea'),
      'Estudiar pruebas de integración'
    );
    await fireEvent.press(screen.getByText('Guardar'));

    await waitFor(() => {
      expect(screen.getByText('Tarea creada exitosamente')).toBeTruthy();
    });
  });

  // ==== Actividad 3: pruebas de integración agregadas ====
  it('muestra un mensaje de error cuando la API responde con un fallo', async () => {
    // Se sobreescribe el handler de MSW solo para esta prueba, simulando
    // que el servidor responde con un error 500 al crear la tarea.
    server.use(
      http.post(`${API_URL}/tasks`, () => {
        return HttpResponse.json({ message: 'Error interno' }, { status: 500 });
      })
    );

    await renderScreen();

    await fireEvent.changeText(
      screen.getByPlaceholderText('Escribe el título de la tarea'),
      'Tarea que fallará'
    );
    await fireEvent.press(screen.getByText('Guardar'));

    await waitFor(() => {
      expect(screen.getByText('Error al crear la tarea')).toBeTruthy();
    });
  });

  it('actualiza la interfaz correctamente cuando la API responde con datos vacíos', async () => {
    // Se simula una respuesta 201 (éxito) pero con un cuerpo vacío, para
    // verificar que la pantalla no se rompe si la API responde con datos
    // incompletos o vacíos, y que igualmente refleja el estado de éxito.
    server.use(
      http.post(`${API_URL}/tasks`, () => {
        return HttpResponse.json({}, { status: 201 });
      })
    );

    await renderScreen();

    await fireEvent.changeText(
      screen.getByPlaceholderText('Escribe el título de la tarea'),
      'Tarea con respuesta vacía'
    );
    await fireEvent.press(screen.getByText('Guardar'));

    await waitFor(() => {
      expect(screen.getByText('Tarea creada exitosamente')).toBeTruthy();
    });
    // La app no debe mostrar el mensaje de error ante datos vacíos válidos
    expect(screen.queryByText('Error al crear la tarea')).toBeNull();
  });
});
