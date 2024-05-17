// inspired by https://github.com/vacuumlabs/adalite-backend/blob/b504db717f9fdfe59acfc56391dfde964b1c8dc6/src/tokenRegistry.js
const extractZip = require('extract-zip');
const fs = require('fs');
const { readFile, mkdir, rm, readdir } = require('fs/promises');
const path = require('path');
const { Readable } = require('stream');
const { finished } = require('stream/promises');

const GITHUB_TOKEN_REGISTRY_URL =
  'https://codeload.github.com/cardano-foundation/cardano-token-registry/zip/master';
const REGISTRY_EXTRACTED_FOLDER_NAME = 'cardano-token-registry-master';
const SUBJECTS_PATH = 'mappings';

const TMP_FOLDER_PATH = path.join(__dirname, 'tmp');
const DOWNLOADED_ZIP_PATH = path.join(
  TMP_FOLDER_PATH,
  'cardanoTokenRegistry.zip',
);
const UNZIPPED_PATH = path.resolve(TMP_FOLDER_PATH, 'unpacked');
const METADATA_PATH = path.resolve(
  UNZIPPED_PATH,
  REGISTRY_EXTRACTED_FOLDER_NAME,
  SUBJECTS_PATH,
);

const downloadFile = async (url, destination) => {
  const { body } = await fetch(url);
  if (!body) {
    throw new Error('Token Registry Error: No response body');
  }
  const fileStream = fs.createWriteStream(destination);
  await finished(Readable.fromWeb(body).pipe(fileStream));
};

const getJsonFile = async (filePath) => JSON.parse(await readFile(filePath));

const getNewTokenMetadata = async () => {
  // setup tmp folder
  await rm(path.resolve(TMP_FOLDER_PATH), { recursive: true, force: true });
  await mkdir(TMP_FOLDER_PATH);

  await downloadFile(GITHUB_TOKEN_REGISTRY_URL, DOWNLOADED_ZIP_PATH);
  await extractZip(DOWNLOADED_ZIP_PATH, {
    dir: UNZIPPED_PATH,
  });

  // load metadata json file paths
  const jsonFiles = await readdir(METADATA_PATH, {
    withFileTypes: true,
  });
  const metadata = new Map();

  // eslint-disable-next-line no-unused-vars
  for (const file of jsonFiles) {
    // load actual JSON file
    const filePath = path.resolve(METADATA_PATH, file.name);
    // eslint-disable-next-line no-await-in-loop
    const fileContent = await getJsonFile(filePath);
    const { name, ticker, decimals } = fileContent;

    metadata.set(fileContent.subject, {
      name: name.value,
      ticker: ticker ? ticker.value : undefined,
      decimals: decimals ? decimals.value : undefined,
    });
  }

  await rm(path.resolve(TMP_FOLDER_PATH), { recursive: true, force: true });
  const json = JSON.stringify(Object.fromEntries(metadata), null, 2);

  fs.promises.writeFile(path.join('src/tokenRegistry.json'), json, 'utf8');
  return metadata;
};

getNewTokenMetadata().catch((error) => {
  console.error(error);
});
