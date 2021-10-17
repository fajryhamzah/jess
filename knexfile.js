module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/dev.sqlite3'
    },
    migrations: {
      directory: './migrations'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'sqlite3',
    connection: {
      filename: './database/main.sqlite3'
    },
    migrations: {
      directory: './migrations'
    },
    useNullAsDefault: true
  }

};
