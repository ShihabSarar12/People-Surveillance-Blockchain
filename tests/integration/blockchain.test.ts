import request from 'supertest';
import app from '../../src/app';

describe('Blockchain API', () => {
    it('should return user with specific id', async () => {
        const response = await request(app).get('/api/v1/blockchain/user/1');

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('email');
        expect(response.body).toHaveProperty('password');
        expect(Object.keys(response.body)).toHaveLength(4);
        console.log(response.body);
    });

    it('should return a message on GET /message', async () => {
        const response = await request(app).get('/api/v1/blockchain/message');

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('message');
        expect(Object.keys(response.body)).toHaveLength(1);
        expect(response.body).toEqual({
            message: 'Blockchain controller initialized successfully',
        });
    });

    it('should create a user with valid data', async () => {
        const newUser = {
            username: 'shihabsarar12',
            email: 'shihab@gmail.om',
            password: '@Chk232h',
            eventTime: '2022-12-31T23:00:00',
            eventDate: '2025-05-12',
        };
        const response = await request(app)
            .post('/api/v1/blockchain/test')
            .send(newUser);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('message');
        expect(Object.keys(response.body)).toHaveLength(1);
        expect(response.body).toEqual({
            message: 'Blockchain controller initialized successfully',
        });
        console.log(response.body);
    });
});
