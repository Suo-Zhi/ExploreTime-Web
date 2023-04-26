/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#058CF4',
                secondary: '#9fd4fd',
                warning: '#FDE047',
                'icon-gray': colors.gray['700']
            },
        },
    },
    plugins: [],
}