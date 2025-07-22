import fs from 'node:fs/promises';
import path from 'node:path';
import { glob } from 'glob';

/**
 * Configuration constants for coverage collection
 */
const CONFIG = {
  SEARCH_PATTERNS: [
    '../../apps/*',
    '../../packages/*',
    '../../src/*',
  ] as string[],
  COVERAGE_DIR_NAME: '.coverage',
  DESTINATION_DIR: '.coverage/raw',
  SUPPORTED_EXTENSIONS: {
    JSON: '.json',
    LCOV: '.lcov',
    INFO: '.info',
  },
} as const;

/**
 * Determines the appropriate destination filename based on file extension
 */
function getDestinationFilename(
  directoryName: string,
  filename: string
): string {
  const ext = path.extname(filename);

  if (ext === CONFIG.SUPPORTED_EXTENSIONS.JSON) {
    return `${directoryName}.json`;
  }

  if (ext === CONFIG.SUPPORTED_EXTENSIONS.INFO || filename.includes('lcov')) {
    return `${directoryName}.lcov`;
  }

  // Preserve original extension for other file types
  return `${directoryName}${ext}`;
}

/**
 * Processes coverage files from a single directory
 */
async function processCoverageDirectory(
  directoryPath: string,
  destinationDir: string
): Promise<boolean> {
  const coverageDir = path.join(directoryPath, CONFIG.COVERAGE_DIR_NAME);

  try {
    const coverageStats = await fs.stat(coverageDir);

    if (!coverageStats.isDirectory()) {
      return false;
    }

    const directoryName = path.basename(directoryPath);
    const coverageFiles = await fs.readdir(coverageDir);

    for (const file of coverageFiles) {
      const filePath = path.join(coverageDir, file);
      const fileStats = await fs.stat(filePath);

      if (fileStats.isFile()) {
        const destinationFilename = getDestinationFilename(directoryName, file);
        const destinationPath = path.join(destinationDir, destinationFilename);

        await fs.copyFile(filePath, destinationPath);
      }
    }

    return true;
  } catch {
    // Coverage directory doesn't exist, skip silently
    return false;
  }
}

/**
 * Filters and processes directories that contain coverage data
 */
async function processDirectories(
  directories: string[],
  destinationDir: string
): Promise<string[]> {
  const directoriesWithCoverage: string[] = [];

  for (const directory of directories) {
    const hasCoverage = await processCoverageDirectory(
      directory,
      destinationDir
    );
    if (hasCoverage) {
      directoriesWithCoverage.push(directory);
    }
  }

  return directoriesWithCoverage;
}

/**
 * Finds all directories matching the specified patterns
 */
async function findDirectories(patterns: string[]): Promise<string[]> {
  const allDirectories: string[] = [];

  for (const pattern of patterns) {
    const matches = await glob(pattern);

    for (const match of matches) {
      const stats = await fs.stat(match);
      if (stats.isDirectory()) {
        allDirectories.push(match);
      }
    }
  }

  return allDirectories;
}

/**
 * Formats directory paths for display by removing relative path prefixes
 */
function formatDirectoryPaths(paths: string[]): string[] {
  return paths.map((path) => path.replace(/\.\.\//g, ''));
}

/**
 * Main function that orchestrates the coverage collection process
 */
async function collectCoverageFiles(): Promise<void> {
  try {
    const destinationDir = path.join(process.cwd(), CONFIG.DESTINATION_DIR);

    // Ensure destination directory exists
    await fs.mkdir(destinationDir, { recursive: true });

    // Find all directories matching our patterns
    const allDirectories = await findDirectories(CONFIG.SEARCH_PATTERNS);

    // Process directories and collect coverage data
    const directoriesWithCoverage = await processDirectories(
      allDirectories,
      destinationDir
    );

    // Display results
    if (directoriesWithCoverage.length > 0) {
      const formattedPaths = formatDirectoryPaths(directoriesWithCoverage);
      console.log(
        `Found .coverage directories in: ${formattedPaths.join(', ')}`
      );
    }

    console.log(`Coverage collected into: ${destinationDir}`);
  } catch (error) {
    console.error('Error collecting coverage files:', error);
  }
}

collectCoverageFiles();
