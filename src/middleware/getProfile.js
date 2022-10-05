const getProfile = async (req, res, next) => {
  const { Profile } = req.app.get('models');
  const profileId = req.get('profile_id');

  if (!profileId) {
    return res.status(401).send({ error: 'Missing profile_id header' });
  }

  const profile = await Profile.findOne({ where: { id: profileId } });

  if (!profile) return res.status(401).send({ error: 'Invalid profile_id' });

  req.profile = profile;
  next();
};

module.exports = { getProfile };
