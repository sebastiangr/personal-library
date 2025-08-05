// packages/api/jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'], // Busca archivos .test.ts en cualquier carpeta __tests__
  verbose: true,
  forceExit: true, // Fuerza la salida después de los tests, útil para evitar procesos colgados
  clearMocks: true, // Limpia los mocks entre tests
  // setupFiles: ['dotenv/config'],
  setupFiles: ['./jest.setup.js'],
};