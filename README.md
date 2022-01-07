# Karta Dharta

Karta Dharta is music bot with custom guild config with online database means you can config your bot in every guild with different and unique settings. it used with mongo db server to save your guild config and run on express web app with socket server. That means work lock is minimum and can take many commands with out overload.

## Installation

Use the package manager [node](https://nodejs.org/en/download/) to install diapedesis in project.

```bash
node install
```

## Config

make .env file

```bash
touch .env
```

.env file

```env
CALLBACK_URL=
Discord_ClientID=
Discord_ClientSecret=
MONGOOSE_URL=
Prefix=
Spotify_ClientID=
Spotify_ClientSecret=
Token=
Website=localhost
```

## Run
```bash
node .
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
