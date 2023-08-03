

const request = require('supertest');

const app = require('../app.js');

        // mocking auth middlewares
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




// Mocking DB
jest.mock('../db.js', () => ({
  query: jest.fn(),
}));

// first test
test("It adds two numbers", () => {
  expect(1 + 1).toBe(2);
});

// Tests pour la route /projects
describe('Test de la route /projects', () => {

  it ('should returns list of project belongs to the authenticated user', async () => {

    // mocking db response
    
    const mockDbResult = [
      { id: 1, name: 'Projet 1', user_id: 1 },
      { id: 2, name: 'Projet 2', user_id: 1 },
    ];
    const { query } = require('../db.js');
    query.mockResolvedValue(mockDbResult);

  
    const response = await request(app).get('/api/projects');
    expect(response.status).toBe(200);
  });

  it('should returns a specific project belongs to an authenticated user', async()=>{

    const project_id = 1;

    const mockDbResult = {'rows':[]}
     mockDbResult.rows = [{
      project_id: project_id , project_name: 'Projet 1', user_id: 1
    }]

    const { query } = require('../db.js');
    query.mockResolvedValue(mockDbResult);

    const response = await request(app).get(`/api/project/${project_id}`)
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockDbResult.rows[0]);
  })

  it('should returns a 401 ', async()=>{

    const project_id = 3;

    const mockDbResult = {'rows':[]}
     mockDbResult.rows = [{
      project_id: project_id , project_name: 'Projet 1', user_id: 2
    }]

    const { query } = require('../db.js');
    query.mockResolvedValue(mockDbResult);

    const response = await request(app).get(`/api/project/${project_id}`)
    expect(response.status).toBe(401);
   
  })



});






