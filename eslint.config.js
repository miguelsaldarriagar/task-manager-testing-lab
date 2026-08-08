// ==== Actividad 3: configuración de ESLint agregada para accesibilidad ====
// eslint-plugin-jsx-a11y está diseñado originalmente para HTML/DOM
// (<img>, <button>, <label>, etc.). Como este proyecto es React Native
// (View, Pressable, TextInput), se usa la opción "polymorphicPropName"
// del plugin para mapear los componentes nativos a sus equivalentes
// semánticos de HTML, de modo que las reglas de accesibilidad sí tengan
// algo relevante que analizar.
const jsxA11y = require('eslint-plugin-jsx-a11y');
const tsParser = require('@typescript-eslint/parser');

module.exports = [
  {
    files: ['src/**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: { 'jsx-a11y': jsxA11y },
    settings: {
      'jsx-a11y': {
        polymorphicPropName: 'accessibilityRole',
        components: {
          Pressable: 'button',
          TouchableOpacity: 'button',
          TextInput: 'input',
        },
      },
    },
    rules: {
      ...jsxA11y.flatConfigs.recommended.rules,
    },
  },
];
