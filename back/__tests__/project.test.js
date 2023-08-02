

const request = require('supertest');

const app = require('../app.js');
var agent = request.agent(app)


// Mock du middleware d'authentification
jest.mock('../middleweares/auth', () => ({
  authMiddleware: (req, res, next) => {
    req.user = { user_id: 1 };
    next();
  },
  checkAuthorization: (req, res, next) => {
    req.user = { user_id: 1 };
    next();
  },
}))

// Mock de la base de données
jest.mock('../db.js', () => ({
  query: jest.fn(),
}));


test("It adds two numbers", () => {
  expect(1 + 1).toBe(2);
});

// Tests pour la route /projects
describe('Test de la route /projects', () => {
  test('Devrait renvoyer une liste de projets', async () => {
    // Mock de la réponse de la base de données
    const mockDbResult = [
      { id: 1, name: 'Projet 1', user_id: 1 },
      { id: 2, name: 'Projet 2', user_id: 1 },
    ];
    const { query } = require('../db.js');
    query.mockResolvedValue(mockDbResult);

    // Appel de la route avec Supertest
    const response = await request(app).get('/api/projects');

    // Vérifier le code de statut 200
    expect(response.status).toBe(200);
  });
});
//faire egalement pour les autres routes





