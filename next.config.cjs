/** @type {import('next').NextConfig} */
// const withJest = require('next/jest');

import { withJest } from 'next/jest';
module.exports = withJest({
	transform: {
		'^.+\\.(ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
	},
});
