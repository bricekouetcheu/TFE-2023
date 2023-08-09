

const request = require('supertest');

const app = require('../app.js');
const { isType } = require('pdf-lib');

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

describe('test casting routes' ,()=>{
    it('should create new casting', async()=>{
        const mockDbResult = {'rows': [{
            casting_id: 1,
            casting_description:'test',
            casting_volume : 20
        }]};

        const { query } = require('../db.js');
        query.mockResolvedValue(mockDbResult);

        
    const response = await request(app)
    .post('/api/projects/1/casting')
    .send({
        casting_description: 'Description du casting',
        casting_volume: 100,
        template_id: 1,
      });

  expect(response.status).toBe(201);
    })


    it('should get all castings' , async()=>{

        const mockDbResult = {'rows': [{
            casting_id: 1,
            casting_description:'test',
            casting_volume : 20
        }]};

        const { query } = require('../db.js');
        query.mockResolvedValue(mockDbResult);

        const response = await request(app).get('/api/projects/1/castings');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockDbResult.rows);
    })


    it('should update a casting status', async()=>{
         // Mock DB response for checkAuthorization middleware
    const mockDbResult = {'rows': []};
    // ... Mock the response with the casting_id and user_id values

    const { query } = require('../db.js');
    query.mockResolvedValue(mockDbResult);

    const casting_id = 1; // Changer pour le casting_id que vous voulez tester

    // Mock DB response for UpdateStatus controller
    const pool = require('../db.js');
    const mockUpdateResult = {
      rows: [],
      rowCount: 1,
    };
    pool.query.mockResolvedValue(mockUpdateResult);

    const response = await request(app).put(`/api/castings/${casting_id}`);

    expect(response.status).toBe(200);
    expect(response.text).toBe('Status updated successfully');
    })

    it('should render 404 error  ', async()=>{
        // Mock DB response for checkAuthorization middleware
   const mockDbResult = {'rows': []};
   // ... Mock the response with the casting_id and user_id values

   const { query } = require('../db.js');
   query.mockResolvedValue(mockDbResult);

   const casting_id = 1; // Changer pour le casting_id que vous voulez tester

   // Mock DB response for UpdateStatus controller
   const pool = require('../db.js');
   const mockUpdateResult = {
     rows: [],
     rowCount: 1,
   };
   pool.query.mockResolvedValue(mockUpdateResult);

   const response = await request(app).put(`/api/casting/${casting_id}`);

   expect(response.status).toBe(404);
  
   })
})