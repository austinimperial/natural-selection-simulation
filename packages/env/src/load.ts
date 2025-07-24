import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import consola from "consola";
import prompts from "prompts";

function crossRuntimeSpawnSync(args: string[]) {
  return typeof Bun !== "undefined"
    ? Bun.spawnSync(args)
    : spawnSync(args[0], args.slice(1));
}

async function crossRuntimeReadFileText(path: string) {
  return typeof Bun !== "undefined"
    ? await Bun.file(path).text()
    : await readFile(path, "utf8");
}

/**
 * Load an environment, or prompt the user to select an environment.
 */
export default async function envLoad(
  environment?: "development" | "test" | "preview" | "staging" | "production",
  pathToEnvFile?: string
) {
  const gitBranch = crossRuntimeSpawnSync(["git", "branch", "--show-current"])
    .stdout.toString()
    .trim();

  if (!environment) {
    const userHasProductionAccess =
      crossRuntimeSpawnSync(["git", "config", "user.email"])
        .stdout.toString()
        .trim() === "austin.imperial1@gmail.com";

    environment = (
      await prompts({
        type: "select",
        name: "value",
        message: "Select environment",
        choices: [
          { title: "development", value: "development" },
          { title: "test", value: "test" },
          ...(!["staging", "production"].includes(gitBranch)
            ? [
                {
                  title: `preview (${gitBranch})`,
                  value: "preview",
                },
              ]
            : []),
          ...(userHasProductionAccess
            ? [
                {
                  title: "staging",
                  value: "staging",
                },
              ]
            : []),
          ...(userHasProductionAccess
            ? [
                {
                  title: "production",
                  value: "production",
                },
              ]
            : []),
        ].filter(Boolean),
        onState: (state: { aborted: boolean }) =>
          state.aborted && process.nextTick(() => process.exit(0)),
      })
    ).value;
  }

  consola.info(`Loading ${environment} environment variables...`);

  const envInfisicalString = crossRuntimeSpawnSync([
    "infisical",
    "export",
    `--env=${environment}`,
  ]).stdout.toString();

  if (
    !envInfisicalString ||
    envInfisicalString.includes("Select your hosting option:")
  ) {
    throw new Error(
      `No environment variables found for ${environment} environment. ` +
        "You may need to run `infisical login`."
    );
  }

  process.env = {
    ...process.env,
    ...(Object.fromEntries(
      new Map(
        envInfisicalString.split("\n").map((line) =>
          line
            .split("=")
            // Remove quotes from start and end of value
            .map((val) => val.replace(/^['"]+|['"]+$/g, ""))
        ) as [string, string][]
      )
    ) as Record<string, string>),
  };

  if (environment === "development") {
    const envFileString = await crossRuntimeReadFileText(
      pathToEnvFile ?? ".env"
    );

    process.env = {
      ...process.env,
      ...(Object.fromEntries(
        new Map(
          envFileString.split("\n").map((line) =>
            line
              .split("=")
              // Remove quotes from start and end of value
              .map((val) => val.replace(/^['"]+|['"]+$/g, ""))
          ) as [string, string][]
        )
      ) as Record<string, string>),
    };
  }

  if (environment === "preview") {
    const response = crossRuntimeSpawnSync([
      "bun",
      "vercel",
      "pull",
      "--yes",
      "--environment=preview",
      `--git-branch=${gitBranch}`,
    ]);

    if (
      response.stderr &&
      !response.stderr.toString().includes(".vercel/.env.preview.local file")
    ) {
      throw new Error(
        "Failed to pull Vercel environment. Try `bun vercel login` > Continue with SAML Single Sign-On"
      );
    }

    const vercelEnvText = await crossRuntimeReadFileText(
      ".vercel/.env.preview.local"
    );

    process.env.DATABASE_URL = vercelEnvText.match(/DATABASE_URL="(.*)"/)![1];
  }

  consola.info(`Loaded ${environment} environment variables`);

  return environment!;
}
