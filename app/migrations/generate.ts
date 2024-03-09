import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

async function setup() {
  const db = await getDBConnection();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      user_id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `);

  console.log('Database and users table created');
  await db.close();
}

setup();

export async function getDBConnection() {
  return open({
    filename: './database.db',
    driver: sqlite3.Database,
  });
}
