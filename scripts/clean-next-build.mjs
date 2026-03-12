import { rm } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import process from 'node:process';

const runWindowsFallback = () =>
  new Promise((resolve, reject) => {
    const child = spawn('cmd', ['/c', 'rd', '/s', '/q', '.next'], {
      stdio: 'ignore',
      shell: false,
    });

    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0 || code === 2) {
        resolve();
        return;
      }
      reject(new Error(`rd exited with code ${code}`));
    });
  });

const clean = async () => {
  try {
    await rm('.next', { recursive: true, force: true });
  } catch (error) {
    if (process.platform === 'win32') {
      await runWindowsFallback();
      return;
    }
    throw error;
  }
};

await clean();
