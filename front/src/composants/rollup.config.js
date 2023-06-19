// eslint-disable-next-line import/no-anonymous-default-export
export default {
    input: '../App.js', // Chemin vers votre fichier app.js
    output: [
      {
        format: 'esm',
        file: 'bundle.js' // Chemin vers le fichier de sortie
      },
    ],
    plugins: [
      // eslint-disable-next-line no-undef
      resolve(),
    ]
  };