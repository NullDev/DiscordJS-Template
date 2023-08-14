#!/usr/bin/node
import fs from "node:fs/promises";
import path from "node:path";
import rl from "node:readline";
import { EOL } from "node:os";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

/**
 * Read input from console
 *
 * @param {string} prompt
 * @return {Promise<string>}
 */
const readInput = async(prompt) => {
    const readline = rl.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        readline.question(prompt, (name) => {
            readline.close();
            resolve(name);
        });
    });
};

console.log("### Template Setup ###");

const projectName = await readInput("Project name: ");
const projectDescription = await readInput("Project description: ");
const projectAuthor = await readInput("Project author: ");
const projectRepo = await readInput("Repository link: ");

// --- package.json ---

const packagefile = JSON.parse(await fs.readFile(path.resolve(".", "package.json"), "utf-8"));

packagefile.name = projectName.toLowerCase();
packagefile.description = projectDescription;
packagefile.author = projectAuthor;
packagefile.repository.url = projectRepo;
packagefile.bugs.url = projectRepo + "/issues";
packagefile.homepage = projectRepo + "#readme";

await fs.writeFile(path.resolve(".", "package.json"), JSON.stringify(packagefile, null, 2) + EOL);

// --- pm2.ecosystem.json ---

const ecosystemfile = JSON.parse(await fs.readFile(path.resolve(".", "pm2.ecosystem.json"), "utf-8"));

ecosystemfile.apps[0].name = projectName;
ecosystemfile.apps[0].repo = projectRepo;

await fs.writeFile(path.resolve(".", "pm2.ecosystem.json"), JSON.stringify(ecosystemfile, null, 4) + EOL);
// --- bot info command ---

const botInfoCommand = await fs.readFile(path.resolve(".", "src", "commands", "user", "info.js"), "utf-8");

const botInfoCommandNew = botInfoCommand
    .replace(/description\: "Discord Bot template by NullDev\.",/g, `description: "${projectDescription}",`)
    .replace(/value\: "YOUR_NAME",/g, `value: "${projectAuthor}",`)
    .replace(/value\: "[YOUR_NAME\/YOUR_REPO](https\:\/\/github.com\/YOUR_NAME\/YOUR_REPO)"/g, `value: "[${projectAuthor}/${projectName}](${projectRepo})"`);

await fs.writeFile(path.resolve(".", "src", "commands", "user", "info.js"), botInfoCommandNew);

console.log("All done :)");

process.exit(0);
