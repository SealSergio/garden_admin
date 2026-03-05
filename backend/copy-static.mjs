import { promises as fs } from 'fs';
import path from 'path';

async function copyStaticFiles(srcDir, destDir) {
  const items = await fs.readdir(srcDir, { withFileTypes: true });

  for (const item of items) {
    const srcPath = path.join(srcDir, item.name);
    const destPath = path.join(destDir, item.name);

    if (item.isDirectory()) {
      await fs.mkdir(destPath, { recursive: true });
      await copyStaticFiles(srcPath, destPath);
    } else if (!/\.(ts|tsx)$/.test(item.name)) {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

copyStaticFiles('src', 'build').catch(console.error);
