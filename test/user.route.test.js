
describe('TDD for user creation', () => {
    beforeAll(async () => {
        console.log('Before All...');
    });

    it('Create User', async () => {
        const username = 't@g.com';
        expect(username).toEqual('t@g.com');
    });

    afterAll(async () => {
        console.log('After all');
    });
}
);
