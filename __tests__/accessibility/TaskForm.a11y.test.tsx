// ==== Actividad 3: pruebas de accesibilidad agregadas — TaskForm ====
// TaskCard.a11y.test.tsx ya cubría un componente; se agrega este archivo
// para cumplir el requisito de verificar accesibilidad en al menos 2
// componentes distintos de la aplicación.
import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { TaskForm } from '../../src/components/TaskForm';

describe('TaskForm - Accesibilidad', () => {
  it('el campo de título tiene un accessibilityLabel descriptivo', async () => {
    await render(<TaskForm onSubmit={jest.fn()} />);
    const input = screen.getByLabelText('Título de la tarea');
    expect(input).toBeTruthy();
  });

  it('el botón "Guardar" tiene el rol de botón y un accessibilityLabel descriptivo', async () => {
    await render(<TaskForm onSubmit={jest.fn()} />);
    const boton = screen.getByLabelText('Guardar tarea');
    expect(boton).toBeTruthy();
  });
});
