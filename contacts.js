const { v4: uuidv4 } = require('uuid');
const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.resolve('db/contacts.json');
/* D:\DESAROLLO_NUEVO_\Node\Node_modulo_1\db\contacts.json */

// TODO: documenta cada función
async function listContacts() {
    try{
    const list = await fs.readFile(contactsPath);
    return JSON.parse(list);
    }catch(error){
        console.log(error);
    }
}
  
async  function getContactById(contactId) {
    try{
        let allContacts = await listContacts();
        let allContac = allContacts.find((x)=> x.id === contactId)
       
        return allContac
    }catch(error){
        console.log(error);
    }
}
  

async  function removeContact(contactId) {
    try{
        let contactsList = await listContacts();
        let removelist = contactsList.findIndex((x)=> x.id === contactId);
        if(removelist != -1){
          const [result] = contactsList.splice(removelist,1);
          await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2))
          return result
        }
        return false
    }catch(error){
        console.log(error);
    }
  }
  
  async  function addContact(name, email, phone) {
    try{
      let allContacts = await listContacts()
      let newcontac ={
        id:uuidv4(),
        name:name,
        email:email,
        phone:phone
      }
      allContacts.push(newcontac)
      await fs.writeFile(contactsPath,JSON.stringify(allContacts,null,2));
      return newcontac;
    }catch(error){
        console.log(error);
    }
}

module.exports= {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};
