import { renderHook, act } from '@testing-library/react-native';
import { useCreateTask } from '../../src/hooks/useCreateTask';
import * as taskService from '../../src/services/taskService';

// ==== Actividad 2: pruebas agregadas — hook useCreateTask ====
// Se aísla taskService con jest.mock() porque createTask() representa la
// comunicación con una API externa; mockearlo evita depender de una red real,
// vuelve las pruebas deterministas y permite forzar escenarios de éxito y error.
jest.mock('../../src/services/taskService');

const mockedCreateTask = taskService.createTask as jest.Mock;

describe('useCreateTask', () => {
  beforeEach(() => {
    mockedCreateTask.mockReset();
  });

  it('inicia con estado "idle" y sin tareas', async () => {
    const { result } = await renderHook(() => useCreateTask());
    expect(result.current.status).toBe('idle');
    expect(result.current.tasks).toEqual([]);
  });

  it('cambia el estado a "success" y agrega la tarea creada', async () => {
    const nuevaTarea = { id: '1', title: 'Comprar pan', status: 'pending' as const };
    mockedCreateTask.mockResolvedValueOnce(nuevaTarea);

    const { result } = await renderHook(() => useCreateTask());
    await act(async () => {
      await result.current.submit('Comprar pan');
    });

    expect(result.current.status).toBe('success');
    expect(result.current.tasks).toEqual([nuevaTarea]);
  });

  it('cambia el estado a "error" cuando el servicio falla', async () => {
    mockedCreateTask.mockRejectedValueOnce(new Error('Fallo de red'));

    const { result } = await renderHook(() => useCreateTask());
    await act(async () => {
      await result.current.submit('Tarea que falla');
    });

    expect(result.current.status).toBe('error');
    expect(result.current.tasks).toEqual([]);
  });

  it('agrega las tareas nuevas al inicio de la lista (orden correcto)', async () => {
    const tareaUno = { id: '1', title: 'Primera', status: 'pending' as const };
    const tareaDos = { id: '2', title: 'Segunda', status: 'pending' as const };
    mockedCreateTask.mockResolvedValueOnce(tareaUno).mockResolvedValueOnce(tareaDos);

    const { result } = await renderHook(() => useCreateTask());
    await act(async () => {
      await result.current.submit('Primera');
    });
    await act(async () => {
      await result.current.submit('Segunda');
    });

    expect(result.current.tasks[0]).toEqual(tareaDos);
    expect(result.current.tasks).toHaveLength(2);
  });

  it('elimina una tarea creada por su id', async () => {
    const tarea = { id: '1', title: 'Tarea eliminable', status: 'pending' as const };
    mockedCreateTask.mockResolvedValueOnce(tarea);

    const { result } = await renderHook(() => useCreateTask());
    await act(async () => {
      await result.current.submit('Tarea eliminable');
    });
    expect(result.current.tasks).toHaveLength(1);

    await act(() => {
      result.current.removeTask('1');
    });
    expect(result.current.tasks).toEqual([]);
  });
});
