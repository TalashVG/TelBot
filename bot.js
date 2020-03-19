const botgram = require("botgram");
const bot = botgram("1130621243:AAFFKw98vTibmvnbnXhdb-Zsg7PKGN-YCa8");
const fs = require('fs');

bot.command("start", (msg, reply, next) => {
  reply.text("dir <path> - directory list\nmd <path + dirname> - make directory\n" +
  "rd <path + dirname> - remove directory\nren <path> <file 1> <file 2> - rename file or directory");
});

bot.command("dir", (msg, reply, next) => {
  let [path] = msg.args(1);

  try{
    fs.readdir(path, (err, files) => {
      files.forEach(file => {reply.text(file);});
    });
  }catch (e){
    reply.text("Invalid command.");
  }
});

bot.command("md", (msg, reply, next) => {
  let [path] = msg.args(1); 
  try {
    fs.mkdirSync(path);
    reply.text("Dir created in: " + path);
  } catch (err) {
    reply.text("Incorrect path or directory already exist.");
  }
});

bot.command("rd", (msg, reply, next) => {
  let [path] = msg.args(1);
  try{ 
    reply.text("Folder deleted.")
    fs.rmdirSync(path);
  }catch (e){
    reply.text("Folder is not empty.")
  }
});

bot.command("ren", (msg, reply, next) => {
  let [path, file1, file2] = msg.args(3);
  fs.rename(path + "\\" + file1, path + "\\" + file2, (error) => { 
    if (error) { 
      reply.text("No such file or directory"); 
    } 
    else { 
      reply.text("\nFile Renamed\n"); 
    } 
  }); 
});

bot.command((msg, reply) =>
  reply.text("Invalid command."));
