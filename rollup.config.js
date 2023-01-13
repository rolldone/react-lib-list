import commonjs from 'rollup-plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import inject from '@rollup/plugin-inject';
import replace from '@rollup/plugin-replace';
import typescriptPlugin from '@rollup/plugin-typescript';
import typescript from 'typescript';
import dts from 'rollup-plugin-dts';

const packageJson = require("./package.json");

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      inject({
        // '$': 'jQuery',
        exclude: ['**/*.html', "**/*.ts", "**/*.scss", "**/*.css", "**/*.json", "**/*.tsx"],
      }),
      typescriptPlugin({
        tsconfig: 'tsconfig.json',
        // clean: false,
        typescript
      }),
      nodeResolve({
        browser: true,
      }),
      commonjs()
    ],
    external: [],
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [
      {
        file: 'dist/index.d.ts',
        format: 'esm'
      }
    ],
    plugins: [dts()]
  }
];
