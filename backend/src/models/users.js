import { promises as fs } from 'fs';

const DATA_FILE = 'pokemonUsers.json';

const Users = {
  async readData() {
    try {
      const data = await fs.readFile(DATA_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  },

  async writeData(data) {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
  }
}

export default Users;