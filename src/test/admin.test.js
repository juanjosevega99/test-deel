describe('Admin Controller', () => {
  it('Should return programmer as a profession', async () => {
    await request
      .get('/admin/best-profession')
      .expect(res => {
        expect(res.body.profession).toBe('Programmer');
      })
      .expect(200);
  });

  it('Should return musician as a profession', async () => {
    await request
      .get('/admin/best-profession?start=2020-08-17T19:11:26.737Z')
      .expect(res => {
        expect(res.body.profession).toBe('Musician');
      })
      .expect(200);
  });

  it('Should return best clients', async () => {
    await request
      .get(
        '/admin/best-clients?start=2020-08-14T19:11:26.737Z&end=2020-08-15T19:11:26.737Z&limit=3'
      )
      .expect(res => {
        expect(res.body[0].id).toBe(4);
        expect(res.body.length).toBe(3);
      })
      .expect(200);
  });
});
