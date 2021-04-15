const auth = require("./auth");
const fs = require("fs-extra");
const conf = require("./conf");
const _ = require("lodash");
let request = require("request-promise");

let token;

function deploy() {
    return (async function () {
        token = await auth.promptToken(true);

        if (!fs.pathExistsSync("./dist")) {
            console.log("You must build the app before upload");
            return;
        }

        await uploadFiles();
        //uploadLayouts();

        console.log("Backup completed");
    })();
}

async function uploadFiles() {
    console.log("Initializing files upload");

    try {
        const account = await auth.promptAccount(true);
        const uploadTime = new Date().toLocaleDateString("es-co", { hour: "numeric", minute: "numeric", second: "numeric" });
        const uploadMessage = `/* BlackSip Uploader -  ${uploadTime}*/\n`;

        const filesToUpload = fs.readdirSync("./dist");

        let filesUploaded = await(request({
            method: "get",
            url: `https://${account}.myvtex.com/api/portal/pvt/sites/default/files`,
            headers: {
                Cookie: `VtexIdclientAutCookie=${token}`
            },
            json: true
        }));

        filesUploaded = _.without(filesUploaded, ".oldVersions");

        let uploadFilesPromise = _.map(filesToUpload, function (file) {
            //let fileContent = `${uploadMessage}${}`;

            if (!_.includes(filesUploaded, file)) {
                console.log(`Uploading new file ${file}`);
            }
            else {
                console.log(`Updating file ${file}`);
            }

            return request({
                method: "put",
                url: `https://${account}.myvtex.com/api/portal/pvt/sites/default/files/${file}`,
                headers: {
                    Cookie: `VtexIdclientAutCookie=${token}`
                },
                json: true,
                body: {
                    path: file,
                    text: fs.readFileSync(`./dist/${file}`, { encoding: "utf-8" })
                }
            })
        });

        return await(Promise.all(uploadFilesPromise));
    }
    catch (err) {
        console.error(`Error on load files list: ${err}`);
    }
}

deploy();