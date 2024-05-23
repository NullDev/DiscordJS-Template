# DiscordJS-Template
[![NullDev/DiscordJS-Template](https://img.shields.io/badge/Template%3A-NullDev%2FDiscordJS--Template-green?style=flat-square&logo=github)](https://github.com/NullDev/DiscordJS-Template) [![GitHub closed issues](https://img.shields.io/github/issues-closed-raw/NullDev/DiscordJS-Template?logo=Cachet)](https://github.com/NullDev/DiscordJS-Template/issues?q=is%3Aissue+is%3Aclosed)

<p align="center"><img height="250" width="auto" src="https://github.com/NullDev/DiscordJS-Template/assets/22935000/6cb7ed23-865b-4917-92b8-c0a2a2b61935" /></p>
<p align="center"><b>Template repository for DiscordJS Projects</b></p>
<hr>


## :question: What is this?

This is a template repository for DiscordJS projects. It includes a basic setup for a Discord bot with:
- [x] A command handler
- [x] An event handler
- [x] A typed (autocomplete) config system that supports nesting and functions
- [x] A logger (both console and file)
- [x] Slash command support
- [x] Multi language support (i18n) in both messages and commands
- [x] QuickDB for persistent storage
- [x] Deployment via GitHub Actions and [PM2](https://pm2.keymetrics.io/)
- [x] ESLint
- [x] Cron jobs for scheduled tasks such as cleanups (logs / database)
- [x] Sharding support
- [x] Admin / User only commands
- [x] Easy to set up
- [x] Minimalistic REST-API base for potential dashboard or OAuth 

<hr>

## :diamond_shape_with_a_dot_inside: Feature requests & Issues

Feature request or discovered a bug? Please [open an Issue](https://github.com/NullDev/DiscordJS-Template/issues/new/choose) here on GitHub.

<hr>

## :white_flower: Other branches

There are other branches with different feature sets:
- [master](https://github.com/NullDev/DiscordJS-Template/tree/master) - The default branch with all features (if you can read this, you are already here)
- [no-i18n](https://github.com/NullDev/DiscordJS-Template/tree/no-i18n) - No i18n / multi language support, command localization, etc
- [webserver](https://github.com/NullDev/DiscordJS-Template/tree/webserver) - A basic webserver with a REST-API base e.g. for OAuth or a dashboard [CURRENTLY OUTDATED!!!]

<hr>

## :wrench: Dev Setup

0. Open up your favourite terminal (and navigate somewhere you want to download the repository to). <br><br>
1. Make sure you have NodeJS installed (>= v20.0.0). Test by entering <br>
$ `node -v` <br>
If this returns a version number, NodeJS is installed. **If not**, get NodeJS <a href="https://nodejs.org/en/download/package-manager/">here</a>. <br><br>
2. Clone the repository and navigate to it. If you have Git installed, type <br>
$ `git clone https://github.com/NullDev/DiscordJS-Template.git && cd DiscordJS-Template` <br>
If not, download it <a href="https://github.com/NullDev/DiscordJS-Template/archive/master.zip">here</a> and extract the ZIP file.<br>
Then navigate to the folder.<br><br>
3. Install all dependencies by typing <br>
$ `npm install`<br><br>
4. Copy [config/config.template.js](https://github.com/NullDev/DiscordJS-Template/blob/master/config/config.template.js) and paste it as `config/config.custom.js` OR use `npm run generate-config`. <br><br>
5. Configure it in your favourite editor by editing `config/config.custom.js`. <br><br>
6. Change some strings by running <br>
$ `npm run setup-template` <br><br>
7. Start it in development mode by running <br>
$ `npm start` <br>
or start in production mode <br>
$ `npm run start:prod` <br><br>

<hr>

## :satellite: Things to change in the template

> NOTE: You don't have to do that manually. Just run `npm run setup-template` !

- package.json
    - [name](https://github.com/NullDev/DiscordJS-Template/blob/master/package.json#L2)
    - [description](https://github.com/NullDev/DiscordJS-Template/blob/master/package.json#L6)
    - [repository links](https://github.com/NullDev/DiscordJS-Template/blob/master/package.json#L20-L27)
    - [author](https://github.com/NullDev/DiscordJS-Template/blob/master/package.json#L28)
- pm2.ecosystem.json
    - [name](https://github.com/NullDev/DiscordJS-Template/blob/master/pm2.ecosystem.json#L4)
    - [repo](https://github.com/NullDev/DiscordJS-Template/blob/master/pm2.ecosystem.json#L10)
- Bot Info Tagline
    - [English](https://github.com/NullDev/DiscordJS-Template/blob/master/locales/English_en.json#L8)
    - [German (example)](https://github.com/NullDev/DiscordJS-Template/blob/master/locales/German_de.json#L8)
- Bot Info Author / Link
    - [author name](https://github.com/NullDev/DiscordJS-Template/blob/master/src/commands/user/info.js#L59)
    - [repo link or website](https://github.com/NullDev/DiscordJS-Template/blob/master/src/commands/user/info.js#L64)
- Bot invite link in issues
    - [config.yml](https://github.com/NullDev/DiscordJS-Template/blob/master/.github/ISSUE_TEMPLATE/config.yml#L4)
- And you probably want to change this README here :P

<hr>

## :rocket: Deployment

- Clone the repo to your server
- Add the correct [secrets](https://github.com/NullDev/DiscordJS-Template/blob/master/.github/workflows/cd.yml#L27-L34) to your repository settings 
    - SSH_HOST: The host (domain / IP) of the server you want to deploy to
    - SSH_PORT: The SSH port of the server you want to deploy to (usually 22)
    - SSH_USER: The SSH user of the server you want to deploy to
    - SSH_KEY: The private SSH key of the server you want to deploy to
    - REPO_PATH: The path to the repository on the server (where you cloned to, e.g.: `/home/bots/MyCoolBot`)
    - PM2_HOME: [OPTIONAL] The path to the PM2 home directory, if it's custom (e.g.: `/home/bots/.pm2`)
- Install PM2 on the server by running `npm install pm2 -g`
- Start the bot initially by running `pm2 start pm2.ecosystem.json`
- Save the current PM2 configuration by running `pm2 save`
- Enable PM2 to start on boot by running `pm2 startup` and following the instructions
- Done! :tada:

<hr>

## :nut_and_bolt: Configuration

Once the config has been copied like described in [Step 4](#wrench-dev-setup) of the setup, it can be changed to your needs:

| Config Key | Description | Data Type | Default value |
| ---------- | --------- | ------------------ | ------------ |
| discord: <br> `bot_token` | Auth Token of the Discord bot. Can be created [here](https://discordapp.com/developers/). | String | N/A |

<hr>

## :star: Bots using this Template

- [NullDev/Arithmetica-Bot](https://github.com/NullDev/Arithmetica-Bot) - A counting bot that supports arithmetic expressions
- [NullDev/Discord-RoleShop](https://github.com/NullDev/Discord-RoleShop) - A Bot for a Roleshop with currency that can be earned by writing messages
- [arellak/gpt_image_discord_bot](https://github.com/arellak/gpt_image_discord_bot) - A Discord bot that generates images using DALL-E
- ... you? Create an [issue](https://github.com/NullDev/DiscordJS-Template/issues/new/choose) or a [PR](https://github.com/NullDev/DiscordJS-Template/pulls) to get featured here!
 
<hr>

## :scroll: License

This Template is Licensed under [MIT](https://github.com/NullDev/DiscordJS-Template/blob/master/LICENSE). <br>
**You are free to change the license in your Project to whatever you want!** <br>
But _please_ credit this Repository here in some way, shape or form :) <br>

Here's a bade you can use: 

[![NullDev/DiscordJS-Template](https://img.shields.io/badge/Template%3A-NullDev%2FDiscordJS--Template-green?style=flat-square&logo=github)](https://github.com/NullDev/DiscordJS-Template)

```markdown
[![NullDev/DiscordJS-Template](https://img.shields.io/badge/Template%3A-NullDev%2FDiscordJS--Template-green?style=flat-square&logo=github)](https://github.com/NullDev/DiscordJS-Template)
```

<hr>

## :octocat: Contributors

<a href="https://github.com/NullDev/DiscordJS-Template/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=NullDev/DiscordJS-Template" />
</a>

<sub>Made with [contrib.rocks](https://contrib.rocks).</sub>

<hr>

![banner](https://repository-images.githubusercontent.com/648324548/b314e053-9230-460f-922c-f03c8527c9c5)
