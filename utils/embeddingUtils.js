// utils/embeddingUtils.js
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Function to chunk the document
function chunkDocument(document, chunkSize = 2000) {
  const chunks = [];
  for (let i = 0; i < document.length; i += chunkSize) {
    chunks.push(document.slice(i, i + chunkSize));
  }
  return chunks;
}

// Function to create embeddings for each chunk
async function createEmbeddings(chunks) {
  const embeddings = [];
  for (const chunk of chunks) {
    const response = await openai.createEmbedding({
      model: 'text-embedding-ada-002',
      input: chunk,
    });
    embeddings.push(response.data.data[0].embedding);
  }
  return embeddings;
}

module.exports = {
  chunkDocument,
  createEmbeddings,
};
