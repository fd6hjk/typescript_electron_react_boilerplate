import typescript from "@rollup/plugin-typescript";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";
import replace from "@rollup/plugin-replace";
import babel from "@rollup/plugin-babel";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

export default [
  {
    input: "./src/main/main.ts",
    output: {
      dir: "./dist/main",
      format: "cjs",
      sourcemap: true
    },
    plugins: [
      commonjs({
        include: "./node_modules/**"
      }),
      nodeResolve(),
      typescript({
        module: "commonjs"
      })
    ]
  },
  {
    input: "./src/renderer/index.tsx",
    output: {
      dir: "./dist/renderer",
      format: "iife",
      sourcemap: true
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
        'process.env.NODE_ENV': JSON.stringify( 'development' ),
        preventAssignment: true
      }),
      typescript({
        moduleResolution: "classic"
      }),
      copy({
        targets: [
          { src: "./src/renderer/public/**/*", dest: "./dist/renderer/public"}
        ]
      }),
      serve({
        verbose: true,
        contentBase: ["./dist/renderer", "./dist/renderer/public"],
        host: "localhost",
        port: 3000,
      }),
      livereload({ watch: "dist/renderer" }),
    ]
  }
]
