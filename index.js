
const contacts = require("./contacts");
const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: refactorizar
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const listContact = await contacts.listContacts();
      return console.table(listContact);
      break;

    case "get":
      const idcontac =await contacts.getContactById(id);
      return console.table(idcontac);
      break;

    case "add":
      const addcontac =await contacts.addContact(name,email,phone)
      return console.table(addcontac);
      break;

    case "remove":
      const removecontac = await contacts.removeContact(id)
      return console.table(removecontac);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);