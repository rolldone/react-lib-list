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
      commonjs({
        // non-CommonJS modules will be ignored, but you can also
        // specifically include/exclude files
        include: [],  // Default: undefined
        exclude: [],  // Default: undefined
        // these values can also be regular expressions
        // include: /node_modules/

        // search for files other than .js files (must already
        // be transpiled by a previous plugin!)
        extensions: ['.js', '.html'],  // Default: [ '.js' ]

        // if true then uses of `global` won't be dealt with by this plugin
        ignoreGlobal: false,  // Default: false

        // if false then skip sourceMap generation for CommonJS modules
        sourceMap: true,  // Default: true

        // explicitly specify unresolvable named exports
        // (see below for more details)

        // sometimes you have to leave require statements
        // unconverted. Pass an array containing the IDs
        // or a `id => boolean` function. Only use this
        // option if you know what you're doing!
        ignore: ['conditional-runtime-dependency']
      })
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
