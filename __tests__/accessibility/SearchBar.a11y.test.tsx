// ==== Actividad 3: pruebas de accesibilidad sobre componente nuevo ====
import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { SearchBar } from '../../src/components/SearchBar';

describe('SearchBar - Accesibilidad', () => {
  it('el campo de búsqueda tiene un accessibilityLabel descriptivo', async () => {
    await render(<SearchBar onSearch={jest.fn()} />);
    const input = screen.getByLabelText('Buscar tareas por título');
    expect(input).toBeTruthy();
  });

  it('el botón "Buscar" tiene el rol de botón y un accessibilityLabel', async () => {
    await render(<SearchBar onSearch={jest.fn()} />);
    const boton = screen.getByRole('button', { name: 'Buscar' });
    expect(boton).toBeTruthy();
  });
});
