const ContractFactory = require('./contract');
const JobFactory = require('./job');
const UserFactory = require('./user');
const AdminFactory = require('./admin');

const GetServices = ({ Models, Configs }) => {
  const ContractService = ContractFactory({ Models, Configs });
  const JobService = JobFactory({ Models, Configs });
  const UserService = UserFactory({ Models, Configs });
  const AdminService = AdminFactory({ Models, Configs });

  return {
    Contract: ContractService,
    Job: JobService,
    User: UserService,
    Admin: AdminService
  };
};

exports.GetServices = GetServices;
