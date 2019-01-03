module.exports = {
  sass: Boolean((require.resolve.paths('node-sass') || []).length),
  typescript: Boolean(
    (require.resolve.paths('@vue/cli-plugin-typescript') || []).length
  ),
  tailwindcss: Boolean((require.resolve.paths('tailwindcss') || []).length),
};
