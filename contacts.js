const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, "./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    }
    console.table(JSON.parse(data));
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    for (let item of JSON.parse(data)) {
      if (item.id === contactId.toString()) {
        console.log(item);
      }
    }
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    }
    
    const removeContact = JSON.parse(data).filter(
      (contact) => contact.id !== contactId.toString()
    );

    fs.writeFile(contactsPath, JSON.stringify(removeContact), (err) => {
      if (err) {
        console.log(err);
      }
    });

  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    }

    const newContactList = [...JSON.parse(data), {
      id: uuidv4(),
      name: name,
      email: email,
      phone: phone
    }]

    fs.writeFile(contactsPath, JSON.stringify(newContactList), (err) => {
      if (err) {
        console.log(err);
      }
    });

  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};