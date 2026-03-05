import { promises as fs } from 'fs';
import { glob } from 'glob';

const files = await glob('build/**/*.{js,mjs,cjs}');

for (const file of files) {
  const content = await fs.readFile(file, 'utf8');
  const updated = content.replace(/\.\/src\//g, './');
  await fs.writeFile(file, updated, 'utf8');
}
