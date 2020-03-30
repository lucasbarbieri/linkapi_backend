const env = require("dotenv").config();
const apiInterceptor = new (require("../services/apiInterceptor"))(
  process.env.PIPEDRIVE_URL_BASE,
  {}
);

const userId = 1;
const filterId = 2;

const run = async () => {
  const pipeDriveResponse = await apiInterceptor.get(
    `activities?user_id=${userId}&filter_id=${filterId}&start=0&api_token=${process.env.PIPEDRIVE_TOKEN}`
  );
  console.log(pipeDriveResponse);
};

run();
