import replace    from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import dotenv     from 'dotenv';
import copy       from 'rollup-plugin-copy';


dotenv.config();


export default {
	input: 'src/index.ts',
	output: {
		dir: 'dist',
		format: 'esm',
	},
	context: 'this',
	plugins: [
		replace({
			'process.env.ADMITAD_CLIENT_ID': JSON.stringify(process.env.ADMITAD_CLIENT_ID),
			'process.env.ADMITAD_CLIENT_SECRET': JSON.stringify(process.env.ADMITAD_CLIENT_SECRET),
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			'process.env.MOCK_ADMITAD_REQUESTS': process.env.MOCK_ADMITAD_REQUESTS === 'true',
		}),
		typescript({
			noEmitOnError: process.env.NODE_ENV === 'production'
		}),
		copy({targets: [{src: 'src/**/*.json', dest: 'dist'}]}),
	],
};

