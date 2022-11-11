const fs = require('node:fs');
const path = require('node:path');

function getDirectories(dir) {
	return fs.readdirSync(dir).filter(function (file) {
	  return fs.statSync(dir+'/'+file).isDirectory();
	});
}

function getCommandFilesIndex(){
    const commandsPath = path.join(__dirname, '/../commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    const subDirectories = getDirectories(commandsPath);
    const subFiles = [];
    subDirectories.forEach( x => {
        fs.readdirSync(`${commandsPath}/${x}`).filter(file => file.endsWith('.js'))
        .forEach(f => subFiles.push(`/${x}/${f}`)); 
    });
    subFiles.forEach(x => commandFiles.push(x));
    return commandFiles;
}
function getCommandFiles(){
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    const subDirectories = getDirectories('./commands');
    const subFiles = [];
    subDirectories.forEach( x => {
        fs.readdirSync(`./commands/${x}`).filter(file => file.endsWith('.js'))
        .forEach(f => subFiles.push(`/${x}/${f}`)); 
    });
    subFiles.forEach(x => commandFiles.push(x));
    return commandFiles;
}

module.exports = { getDirectories, getCommandFiles, getCommandFilesIndex };