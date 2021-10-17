// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    migrations: {
      directory: './migrations'
    }
  },

  production: {
    client: 'sqlite3',
    connection: {
      filename: './main.sqlite3'
    },
    migrations: {
      directory: './migrations'
    }
  }

};
