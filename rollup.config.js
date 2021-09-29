import typescript from "@rollup/plugin-typescript";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";
import replace from "@rollup/plugin-replace";
import babel from "@rollup/plugin-babel";

export default [
  {
    input: "./src/main/main.ts",
    output: {
      dir: "./dist/main",
      format: "cjs",
    },
    plugins: [
      commonjs({
        include: "./node_modules/**"
      }),
      nodeResolve(),
      typescript()
    ]
  },
  {
    input: "./src/renderer/index.tsx",
    output: {
      dir: "./dist/renderer",
      format: "iife"
    },
    plugins: [
      commonjs({
        include: "./node_modules/**"
      }),
      babel({
        babelHelpers: "bundled",
        presets: ["@babel/preset-react"],
        extensions: [".js"],
        exclude: ["node_modules/**"],
      }),
      nodeResolve(),
      replace({
        'process.env.NODE_ENV': JSON.stringify( 'development' )
      }),
      typescript({
        module: "es2015"
      }),
      copy({
        targets: [
          { src: "./src/renderer/public/**/*", dest: "./dist/renderer/public"}
        ]
      })
    ]
  }
]
