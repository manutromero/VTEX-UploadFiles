const auth = require("./auth");
const fs = require("fs-extra");
const conf = require("./conf");
const _ = require("lodash");
const cheerio = require("cheerio");
let request = require("request-promise");

let token;

function backup() {
    return (async function () {
        token = await auth.promptToken(true);

        fs.emptyDirSync("./backup");

        await backupFiles();
        await backupLayouts();

        console.log("Backup completed");
    })();
}

async function backupFiles() {
    console.log("Initializing files backup");
    try{
        const account = await auth.promptAccount(true);


        let files = await(request({
            method: "get",
            url: `https://${account}.myvtex.com/api/portal/pvt/sites/default/files`,
            headers: {
                Cookie: `VtexIdclientAutCookie=${token}`
            },
            json: true
        }));

        files = _.without(files, ".oldVersions");

        let filesPromises = _.map(files, function (file) {
            return request({
                method: "get",
                url: `https://${account}.myvtex.com/api/portal/pvt/sites/default/files/${file}`,
                headers: {
                    Cookie: `VtexIdclientAutCookie=${token}`
                },
                json: true
            });
        });

        let filesData = await(Promise.all(filesPromises));

        _.each(filesData, function (fileData) {
            console.log(`Backup file: ${fileData.path}`);
            fs.outputFileSync(`./backup/files/${fileData.path}`, fileData.text);
        });
    }
    catch(err){
       
        console.error(`Error on load files list: ${err.error.error.message}`);
    }
}

async function backupLayouts() {
    console.log("Initializing templates backup");

    backupCMSTemplates();
    await backupPortalTemplates();
}

function backupCMSTemplates() {
    try{
        let layoutsStructure = getTemplatesList();

        _.each(layoutsStructure, backupTemplateFolder);
    }
    catch(err){
        console.error(`Error on load CMS templates list: ${err}`);
    }
}

async function backupPortalTemplates() {
    try{
        const account = conf.get("account");
        let templates = await(request({
            method: "get",
            url: `https://${account}.myvtex.com/api/portal/pvt/sites/default/templates`,
            headers: {
                Cookie: `VtexIdclientAutCookie=${token}`
            },
            json: true
        }));

        templates = _.reject(templates, _.partial(_.isEqual, ".oldVersions"));

        let templatePromises = _.map(templates, function (template) {
            return request({
                method: "get",
                url: `https://${account}.myvtex.com/api/portal/pvt/sites/default/templates/${template}`,
                headers: {
                    Cookie: `VtexIdclientAutCookie=${token}`
                },
                json: true
            });
        });

        let templatesData = await(Promise.all(templatePromises));

        _.each(templatesData, function (templateData) {
            let templateName = templateData.name + ".html";
            console.log(`Backup file: ${templateName}`);
            fs.outputFileSync(`./backup/templates/portal/${templateName}`, templateData.body);
        });
    }
    catch(err){
        console.error(`Error on load Portal templates list: ${err.statusCode}`);
    }
}

async function getTemplatesList() {
    let directories = ["templates", "sub-templates", "shelf-templates"];
    let listPromises = Promise.all(_.map(directories, getTemplatesListByDirectory));
    let rawList = await(listPromises);

    let parsedList = {};

    _.map(rawList, function (list, directoryIndex) {
        let $ = cheerio.load(list);

        $(".file.template a").each(function(){
            let template = $(this);
            let templateName = template.text();
            let directory = directories[directoryIndex];
            let id = template.attr("rel").split(":")[1];

            parsedList[directory] = parsedList[directory] ? parsedList[directory] : [];

            parsedList[directory].push({id, templateName});
        });
    });

    return parsedList;
}

function getTemplatesListByDirectory(directory) {
    const account = conf.get("account");

    return request({
        method: "POST",
        url: `https://${account}.vtexcommercestable.com.br/admin/a/PortalManagement/FolderContent`,
        headers: {
            Cookie: `VtexIdclientAutCookie=${token}`
        },
        formData: {
            dir: directory+":/"
        }
    });
}

function backupTemplateFolder(files, folder) {
    let templatePromises = _.map(files, function (file) {
        return getTemplateByID(file.id);
    });

    let templateRaw = await(Promise.all(templatePromises));

    _.each(templateRaw, function (templateRawTemplate, templateIndex) {
        let templateName = files[templateIndex].templateName + ".html";
        console.log(`Backup template: ${templateName}`);

        let $ = cheerio.load(templateRawTemplate);

        let template = _.unescape($("#template").html());

        fs.outputFileSync(`./backup/templates/${folder}/${templateName}`, template);
    });
}

function getTemplateByID(templateID) {
    const account = conf.get("account");

    return request({
        method: "GET",
        url: `https://${account}.vtexcommercestable.com.br/admin/a/PortalManagement/TemplateContent?templateId=${templateID}`,
        headers: {
            Cookie: `VtexIdclientAutCookie=${token}`
        }
    });
}

backup();