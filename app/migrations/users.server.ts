import { getDBConnection } from './generate';

export async function createUser(username: string, password: string) {
  const db = await getDBConnection();
  const result = await db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, password]);
  await db.close();
  return result.lastID;
}

export async function findUserByUsername(username: string) {
  const db = await getDBConnection();
  const result = await db.get(`SELECT * FROM users WHERE username = ?`, [username]);
  await db.close();
  return result;
}

export async function findUserById(id: string): Promise<any> {
  const db = await getDBConnection();
  const result = await db.get(`SELECT * FROM users WHERE user_id = ?`, [id]);
  await db.close();
  return result;
}
