// ==== Actividad 3: pruebas de integración sobre pantalla nueva ====
// A diferencia de CreateTaskScreen (ya cubierta como ejemplo en el
// proyecto base), esta pantalla y su endpoint (GET /tasks/search) son
// completamente nuevos, agregados para esta actividad.
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { http, HttpResponse } from 'msw';
import { server } from '../../src/mocks/server';
import { SearchTaskScreen } from '../../src/screens/SearchTaskScreen';

const API_URL = 'https://api.taskmanager.com';

const metrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 47, left: 0, right: 0, bottom: 34 },
};

const renderScreen = () =>
  render(
    <SafeAreaProvider initialMetrics={metrics}>
      <SearchTaskScreen />
    </SafeAreaProvider>
  );

describe('SearchTaskScreen - Integración', () => {
  it('éxito: muestra los resultados devueltos por la API', async () => {
    server.use(
      http.get(`${API_URL}/tasks/search`, () => {
        return HttpResponse.json([
          { id: '1', title: 'Comprar leche', status: 'pending' },
          { id: '2', title: 'Comprar pan', status: 'pending' },
        ]);
      })
    );

    await renderScreen();
    await fireEvent.changeText(screen.getByTestId('input-busqueda'), 'Comprar');
    await fireEvent.press(screen.getByTestId('btn-buscar'));

    await waitFor(() => {
      expect(screen.getByText('Comprar leche')).toBeTruthy();
      expect(screen.getByText('Comprar pan')).toBeTruthy();
    });
  });

  it('error de la API: muestra un mensaje de error cuando el servidor falla', async () => {
    server.use(
      http.get(`${API_URL}/tasks/search`, () => {
        return HttpResponse.json({ message: 'Error interno' }, { status: 500 });
      })
    );

    await renderScreen();
    await fireEvent.changeText(screen.getByTestId('input-busqueda'), 'Comprar');
    await fireEvent.press(screen.getByTestId('btn-buscar'));

    await waitFor(() => {
      expect(screen.getByText('Error al buscar tareas')).toBeTruthy();
    });
  });

  it('datos vacíos: muestra un mensaje cuando la búsqueda no tiene resultados', async () => {
    server.use(
      http.get(`${API_URL}/tasks/search`, () => {
        return HttpResponse.json([]);
      })
    );

    await renderScreen();
    await fireEvent.changeText(screen.getByTestId('input-busqueda'), 'algo que no existe');
    await fireEvent.press(screen.getByTestId('btn-buscar'));

    await waitFor(() => {
      expect(screen.getByText('No se encontraron tareas')).toBeTruthy();
    });
  });
});
