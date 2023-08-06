

const request = require('supertest');

const app = require('../app.js');

        // mocking auth middlewares
        jest.mock('../middleweares/auth', () => ({
          authMiddleware: (req, res, next) => {
            req.user = { user_id: 1 };
            next();
          },
          checkAuthorization: (req, res, next) => {
            if (req.params.project_id === '1') {
              // Simulate user_id 1 as the owner of the project
              req.user = { user_id: 1 };
              next();
            } else {
              // Simulate another user who is not the owner of the project
              req.user = { user_id: 2 };
              return res.status(401).send("vous n'avez pas acces a ce projet");
            }
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

  it('should return a 401 when the user is not the owner of the project', async () => {
    const project_id = 2;


    // Mocking the database response for the project that the user does not own
    const mockDbResult = {'rows':[]}
    mockDbResult.rows = [{
      project_id: project_id , project_name: 'Projet 1', user_id: 1
    }]

    const { query } = require('../db.js');
    query.mockResolvedValue(mockDbResult);

    const response = await request(app).get(`/api/project/${project_id}`);
    expect(response.status).toBe(401);
  });


  it('should delete a project' , async()=>{
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



});






