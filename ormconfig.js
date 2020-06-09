
let rootDir

if ((process.env.NODE_ENV === 'dev-TypeScript') || (process.env.NODE_ENV === 'test')) {
  rootDir = 'src'
} else if ((process.env.NODE_ENV === 'dev-JavaScript') || (process.env.NODE_ENV === 'production')) {
  rootDir = 'output'
} else {
  rootDir = 'src'
}

module.exports = {

  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: '',
  password: '',
  database: 'thaer',
  synchronize: true,
  logging: false,
  entities: [rootDir + '/entity/**/*.{js,ts}'],
  migrations: [rootDir + '/migration/*.{js,ts}'],
  subscribers: [rootDir + '/subscriber/**/*.{js,ts}'],
  cli: {
    entitiesDir: rootDir + '/entity',
    migrationsDir: rootDir + '/migration',
    subscribersDir: rootDir + '/subscriber'
  }

}
