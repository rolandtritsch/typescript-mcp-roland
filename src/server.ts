import express from 'express';
import { readFile } from 'fs/promises';
import path from 'path';

const app = express();
const port = 3000;

app.get('/file/:filename', async (req, res) => {
  try {
    const filename = req.params.filename;
    // Ensure the file path is within our project directory
    const filePath = path.join(__dirname, '..', 'files', filename);

    const content = await readFile(filePath, 'utf-8');
    res.send(content);
  } catch (error) {
    res.status(404).send({
      error: 'File not found or could not be read',
    });
  }
});

app.listen(port, () => {
  console.log(`MCP server is running at http://localhost:${port}`);
});
