describe('Job Controller', () => {
  it('Should return the jobs, should be 1', async () => {
    await request
      .get('/jobs/unpaid')
      .set('profile_id', 1)
      .expect(res => {
        expect(res.body.length).toBe(1);
      })
      .expect(200);
  });

  it('Should fails to pay the job', async () => {
    await request.post('/jobs/1/pay').set('profile_id', 6).expect(404);
  });

  it('Should pay the job', async () => {
    await request.post('/jobs/2/pay').set('profile_id', 1).expect(200);
  });

  it('Should return the jobs and should be 0', async () => {
    await request
      .get('/jobs/unpaid')
      .set('profile_id', 1)
      .expect(res => {
        expect(res.body.length).toBe(0);
      })
      .expect(200);
  });
});
