import { copyFile, lstat } from 'node:fs/promises';

const names = ['styles.css', 'lab.css'];

/** Keep legacy URLs available without maintaining a second editable CSS source. */
export default function compatibilityStyles() {
  let root;
  return {
    name: 'fidret-compatibility-styles',
    hooks: {
      'astro:config:done': async ({ config }) => {
        root = config.root;
        const directory = new URL('src/styles/', root);
        for (const path of ['src', 'src/styles']) {
          const sourceDirectory = await lstat(new URL(path, root));
          if (!sourceDirectory.isDirectory() || sourceDirectory.isSymbolicLink()) {
            throw new Error('Canonical styles directory and its source parent must be regular source directories');
          }
        }
        for (const name of names) {
          const source = await lstat(new URL(name, directory));
          if (!source.isFile() || source.isSymbolicLink()) {
            throw new Error(`Canonical stylesheet must be a regular source file: ${name}`);
          }
          try {
            await lstat(new URL(name, config.publicDir));
            throw new Error(`Legacy /${name} is generated; edit src/styles/${name} instead`);
          } catch (error) {
            if (error.code !== 'ENOENT') throw error;
          }
        }
      },
      'astro:build:done': async ({ dir }) => {
        for (const name of names) {
          await copyFile(new URL(`src/styles/${name}`, root), new URL(name, dir));
        }
      },
    },
  };
}
