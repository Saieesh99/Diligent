// Logging can be done to winston/kibana or cloudwatch via this file.
// Currently using the common console.log statements.
const LoggerService = {
  Log: async (msg) => {
    console.log(msg);
  },
  LogError: async (msg) => {
    console.log(msg);
  },
};

export default LoggerService;
