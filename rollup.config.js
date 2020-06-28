import path from 'path'
import babel from 'rollup-plugin-babel'
import cleanup from 'rollup-plugin-cleanup'
import { uglify } from 'rollup-plugin-uglify'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import pkg from './package.json'

const { version, name, author } = pkg

const resolve = p => {
    return path.resolve(__dirname, p);
}

const pluginsCommon = [
    commonjs({
        // polyfill async/await
        'node_modules/@babel/runtime/helpers/asyncToGenerator.js': ['default']
    }),
    nodeResolve({
        module: false,
    }),
    babel({
        runtimeHelpers: true,
    }),
]
export default [
    {
        input: resolve('src/index.js'),
        plugins: pluginsCommon.concat([
            uglify(),
        ]),
        output: {
            file: resolve(`dist/eelly_countdown-${version}.min.js`),
            format: 'umd',
            name: 'eelly_countdown'
        }
    },
    {
        input: resolve('src/index.js'),
        output: [
            {
                file: resolve('dist/eelly_countdown.es.js'),
                format: 'es',
                name: 'eelly_countdown'
            }, 
            {
                file: resolve('dist/eelly_countdown.js'),
                format: 'cjs',
                name: 'eelly_countdown'
            },
        ],
        plugins: pluginsCommon.concat([
            cleanup(),
            commonjs(),
            nodeResolve({
                // 将自定义选项传递给解析插件
                customResolveOptions: {
                    moduleDirectory: 'node_modules'
                }
            }),
            babel({
                runtimeHelpers: true,
            })
        ])   
    }
]
