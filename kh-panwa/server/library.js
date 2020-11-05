const Client = require("../src/client.js")

var servicePortDB = undefined

exports.getServiceDB = function (port) {
    if (servicePortDB == undefined) {
        let i = 0
        while (i < this.ports.length && this.ports[i].port != port) {
            i++
        }
        
        if (i < this.ports.length)
            servicePortDB = this.ports[i]
        else
            servicePortDB = this.ports[this.ports.length-1]
    }
    return servicePortDB
}

exports.ports = [
    { port: 8001, db: 'DB1', name: 'DB1 - บริษัท SPA2020 จำกัด', color: 'blue' },
    { port: 8002, db: 'DB2', name: 'DB2 - บริษัท SPA2020 จำกัด', color: 'green' },
    { port: 8003, db: 'DB3', name: 'DB3 - บริษัท SPA2020 จำกัด', color: 'red' },
    { port: 8004, db: 'DB4', name: 'DB4 - บริษัท SPA2020 จำกัด', color: 'orange' },
    { port: 8005, db: 'DB5', name: 'DB5 - บริษัท SPA2020 จำกัด', color: 'yellow' }
]

exports.menuGroup = [
    { name: "Group 1", icon: "view-dashboard" },
    { name: "Group 2", icon: "view-dashboard" },
    { name: "#Setup#", icon: "view-dashboard" }
]

exports.menuProgram = [
    { groupName: "#Setup#",     name: "UserPwd",    title: "User/Password",     icon: "account",        active: true },
    { groupName: "#Setup#",     name: "Chat",       title: "Chat",              icon: "message-text",   active: true },
    { groupName: "#Setup#",     name: "Job",        title: "Job",               icon: "note-multiple",  active: true },
    { groupName: "Group 1",     name: "Form01",     title: "โปรแกรม 1",         icon: "home",           active: true },
    { groupName: "Group 1",     name: "Form02",     title: "โปรแกรม 2",         icon: "home",           active: true },
    { groupName: "Group 1",     name: "Form03",     title: "โปรแกรม 3",         icon: "home",           active: true },
    { groupName: "Group 2",     name: "Form04",     title: "โปรแกรม 4",         icon: "chart-bar",      active: false },
    { groupName: "Group 2",     name: "Form05",     title: "โปรแกรม 5",         icon: "clipboard",      active: true },
    { groupName: "Group 2",     name: "Form07",     title: "โปรแกรม 7",         icon: "printer",        active: false },
    { groupName: "Group 2",     name: "Form08",     title: "โปรแกรม 8",         icon: "account",        active: true },
    { groupName: "Group 2",     name: "Form09",     title: "โปรแกรม 9",         icon: "monitor",        active: false },
    { groupName: "Group 2",     name: "Form10",     title: "โปรแกรม 10",        icon: "file-chart",     active: true }
]