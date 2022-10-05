const getUnpaidJobs = async (req, res, next) => {
  try {
    const { Job } = req.app.get('services');
    const profileId = req.profile.id;

    const jobs = await Job.getUnpaidJobs({ profileId });
    res.status(200).json(jobs);
  } catch (error) {
    return next(error);
  }
};

const payJob = async (req, res, next) => {
  try {
    const { Job } = req.app.get('services');
    const { job_id: jobId } = req.params;
    const profileId = req.profile.id;

    await Job.payJob({ profileId, jobId });
    res.sendStatus(200);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getUnpaidJobs,
  payJob
};
