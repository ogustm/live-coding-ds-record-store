const { env } = process;

const config = {
  env: env.NODE_ENV || 'development'
};

const devConfig = {
  db: 'mongodb://localhost:27017/botanica',
  jwt_key: 'babylon'
};

const prodConfig = {
  db: 'mongodb://localhost:27017/botanica',
  jwt_key: 'babylon'
};

const currentConfig = config.env === 'production' ? prodConfig : devConfig;
module.exports = Object.assign({}, config, currentConfig);
