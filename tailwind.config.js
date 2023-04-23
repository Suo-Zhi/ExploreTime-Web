/** @type {import('tailwindcss').Config} */
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
            },
        },
    },
    plugins: [],
}