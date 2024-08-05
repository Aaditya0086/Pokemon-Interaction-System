import { promises as fs } from 'fs';

const DATA_FILE = 'pokemonUsers.json';

function Users() {
  async function readData() {
    try {
      const data = await fs.readFile(DATA_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async function writeData(data) {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
  }
  return {
    readData,
    writeData,
  };
}

export default Users;