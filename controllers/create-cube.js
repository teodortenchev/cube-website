const Cube = require('../models/cube');
const newCube = new Cube('Cube5', 'This is the description for the default cube1', 'https://ae01.alicdn.com/kf/HTB1CSddXRxRMKJjy0Fdq6yifFXa6/Gan-356-Air-SM-3x3-Black-Magic-cube-GAN-Air-SM-Magnetic-3x3x3-Speed-cube-gans.jpg', 1);

newCube.save();