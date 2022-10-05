describe('User Controller', () => {
  it('Should fail to deposit', async () => {
    await request
      .post('/balances/deposit/2')
      .send({ amount: 3000 })
      .expect(403);
  });

  it('Should success to deposit', async () => {
    await request.post('/balances/deposit/2').send({ amount: 20 }).expect(200);
  });
});
