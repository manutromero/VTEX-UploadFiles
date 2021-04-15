const opn = require("opn");
const randomstring = require("randomstring");
const EventSource = require("eventsource");
const inquirer = require("inquirer");
const conf = require("./conf");

module.exports = { promptAccount, promptToken };

async function promptAccount() {
    let storedAccount;
    await inquirer.prompt({
        message: 'Account:',
        name: 'account'
    }).then(answer => storedAccount = answer.account );

    return storedAccount;
}
async function promptToken() {
    let storedToken;
    await inquirer.prompt({
        message: 'Token or Cookie:',
        name: 'token'
    }).then(answer => storedToken = answer.token );
    return storedToken;
}

async function getCookieToken(avoidDisplayToken) {
    const account = await promptAccount();
    const token = await promptToken();

    if (!avoidDisplayToken) {
        console.log("TOKEN:", token);
    }

    return token;

}

async function login(account) {
    const state = randomstring.generate();
    const returnUrlEncoded = encodeURIComponent(`/_v/auth-server/v1/callback?state=${state}`);
    const url = `https://${conf.get("workspace")}--${account}.${conf.get("endpoint")}/_v/auth-server/v1/login/?ReturnUrl=${returnUrlEncoded}`;

    opn(url, { wait: false });
    try {
        const token = await (onAuth(account, state));
        conf.set('account', account);

        return token;
    }
    catch (err) {
        console.error(err);
    }
}

function onAuth(account, state) {
    const source = `https://${conf.get("workspace")}--${account}.${conf.get("endpoint")}/_v/auth-server/v1/sse/${state}`;
    const es = createEventSource(source);

    return new Promise(function (resolve, reject) {
        es.onmessage = function (msg) {
            const { body: token } = JSON.parse(msg.data);
            es.close();
            resolve(token);
        };
        es.onerror = function (event) {
            es.close();
            reject(`Connection to login server has failed with status ${event.status}`);
        };
    });
}

function createEventSource(source) {
    return new EventSource(source, {
        headers: {
            authorization: `bearer ${conf.get("vtex-token")}`,
            'user-agent': conf.get("vtex-user-agent")
        }
    });
}