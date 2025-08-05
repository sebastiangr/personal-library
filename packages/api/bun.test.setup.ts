import { config } from 'dotenv';
import { resolve } from 'path';

console.log(" BUN TEST SETUP: Loading .env.test...");

// process.cwd() es la raíz del monorepo: /.../personal-library
// Le añadimos explícitamente la ruta hasta el archivo .env.test
const projectRoot = process.cwd();
const envPath = resolve(projectRoot, 'packages', 'api', '.env.test');

console.log(` BUN TEST SETUP: CWD es: ${projectRoot}`);
console.log(` BUN TEST SETUP: Intentando cargar .env desde: ${envPath}`);

const result = config({ path: envPath });

if (result.error) {
  console.error(" BUN TEST SETUP: Error al cargar .env.test", result.error);
  throw result.error;
}

console.log(" BUN TEST SETUP: .env.test cargado exitosamente.");