const path = require('path');

module.exports = {
	testEnvironment: 'jsdom',

	transform: {
		'^.+\\.tsx?$': 'ts-jest',
		'^.+\\.jsx?$': path.join(__dirname, './preprocess.js')
	},

	testMatch: ['**/?(*.)+(spec|test).(ts|tsx)'],

	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

	moduleNameMapper: {
		'.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
		'.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			path.join(__dirname, '../__mocks__/assets.js'),
		// handle aliased imports e.g. '@/components'
		'^@/(.*)$': '<rootDir>/src/$1'
	},

	testPathIgnorePatterns: [
		'node_modules',
		'\\.cache',
		'<rootDir>/public',
		'<rootDir>/cypress'
	],

	transformIgnorePatterns: ['node_modules/(?!(gatsby|gatsby-plugin-mdx)/)'],

	testURL: 'http://localhost',

	setupFiles: [path.join(__dirname, './loader.shim.js')],

	setupFilesAfterEnv: [path.join(__dirname, './setupTests.js')]

	// collectCoverage: true,
	// collectCoverageFrom: [
	// 	'src/**/*.{js,jsx,ts,tsx}',
	// ],
	// coveragePathIgnorePatterns: []
};
