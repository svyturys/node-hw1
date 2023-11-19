const fs = require("node:fs/promises");
const path = require("node:path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
  return JSON.parse(data);
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    return contacts.find((contact) => contact.id === contactId) || null;
    // const contact = contacts.find((contact) => contact.id === contactId);
    // return contact;
}

function writeContacts(contacts) {
    return fs.writeFile(filePath, JSON.stringify(contacts, undefined, 2));
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
        return undefined;
    }
    const newContacts = [...contacts.slice(0, index), ...contacts.slice(index + 1)];
    await writeContacts(newContacts);
    return contacts[index] || null;
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
}

async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = { id: nanoid(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  // ...твій код. Повертає об'єкт доданого контакту.
}

module.exports = { listContacts, getContactById, removeContact, addContact};