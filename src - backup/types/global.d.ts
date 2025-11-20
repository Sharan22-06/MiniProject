/* Global module declarations to allow side-effect imports and silence
   missing type errors for small/optional packages used in the UI.

   Placing this in `src/types/global.d.ts` ensures TypeScript picks it up
   (src is already in the project). If your tsconfig.json excludes src,
   move this to a path included by the compiler or add it to the
   `typeRoots`/`include` settings.
*/

// Allow imports like `import './globals.css'` or `import styles from './x.module.css'`
declare module '*.css';
declare module '*.scss';
declare module '*.sass';

// Radix packages used by the UI that may not have local type declarations
// (add more declarations here if TypeScript complains about other @radix-ui modules)
declare module '@radix-ui/react-accordion';
declare module '@radix-ui/react-alert-dialog';
// Minimal declaration for the `vaul` package used for Drawer primitives.
// If you install `vaul` or add proper types later, remove or replace this.
// If you later install `vaul` and prefer real types, add a dedicated
// declaration file or remove this comment and install the package.

// If you prefer stronger typing, install the specific packages or create
// more precise .d.ts definitions for each Radix package you use.
