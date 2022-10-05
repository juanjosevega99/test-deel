describe('Contract Controller', () => {
  it('Should fail to get contact by id', async () => {
    await request.get('/contracts/1').set('profile_id', 6).expect(404);
  });

  it('Should fails to get contact by id', async () => {
    await request.get('/contracts/1').set('profile_id', 1).expect(200);
  });

  it('Should return user contacts', async () => {
    await request
      .get('/contracts')
      .set('profile_id', 1)
      .expect(res => {
        expect(res.body.length).toBe(1);
      })
      .expect(200);

    await request
      .get('/contracts')
      .set('profile_id', 6)
      .expect(res => {
        expect(res.body.length).toBe(3);
      })
      .expect(200);
  });
});
