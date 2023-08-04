#!/usr/bin/node
import fs from "node:fs/promises";
import path from "node:path";
import rl from "node:readline";

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

packagefile.name = projectName;
packagefile.description = projectDescription;
packagefile.author = projectAuthor;
packagefile.repository.url = projectRepo;
packagefile.bugs.url = projectRepo + "/issues";
packagefile.homepage = projectRepo + "#readme";

await fs.writeFile(path.resolve(".", "package.json"), JSON.stringify(packagefile, null, 2));

// --- pm2.ecosystem.json ---

const ecosystemfile = JSON.parse(await fs.readFile(path.resolve(".", "pm2.ecosystem.json"), "utf-8"));

ecosystemfile.apps[0].name = projectName;
ecosystemfile.apps[0].repo = projectRepo;

await fs.writeFile(path.resolve(".", "pm2.ecosystem.json"), JSON.stringify(ecosystemfile, null, 4));

// --- bot info tagline ---

const botInfoEn = JSON.parse(await fs.readFile(path.resolve(".", "locales", "English_en.json"), "utf-8"));
const botInfoDe = JSON.parse(await fs.readFile(path.resolve(".", "locales", "German_de.json"), "utf-8"));

botInfoEn.replies.bot_info_tagline = projectDescription;
botInfoDe.replies.bot_info_tagline = projectDescription;

await fs.writeFile(path.resolve(".", "locales", "English_en.json"), JSON.stringify(botInfoEn, null, 4));
await fs.writeFile(path.resolve(".", "locales", "German_de.json"), JSON.stringify(botInfoDe, null, 4));

// --- bot info command ---

const botInfoCommand = await fs.readFile(path.resolve(".", "src", "commands", "user", "info.js"), "utf-8");

// change line: value: "YOUR_NAME",

const botInfoCommandNew = botInfoCommand
    .replace(/value\: "YOUR_NAME",/g, `value: "${projectAuthor}",`)
    .replace(/value\: "[YOUR_NAME\/YOUR_REPO](https\:\/\/github.com\/YOUR_NAME\/YOUR_REPO)"/g, `value: "[${projectAuthor}/${projectName}](${projectRepo})"`);

await fs.writeFile(path.resolve(".", "src", "commands", "user", "info.js"), botInfoCommandNew);

process.exit(0);
