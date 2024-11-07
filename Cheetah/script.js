const data = [
    { check: false, personid: 1, fname: "John", lname: "Doe", email: "john@example.com" },
    { check: false, personid: 2, fname: "Jane", lname: "Smith", email: "john@example.com jane@example.com john@example.com" },
    { check: false, personid: 3, fname: "Alice", lname: "Johnson", email: "alice@example.com" }
]
function getSelected() {
    const { select, range } = grid.selection
    if (select.row) {
        const record = grid.records[select.row - 1]
        alert(record.personid + ":" + record.email)
    }
    data.push({ check: false, personid: 4, fname: "Tom", lname: "Jerry", email: "swasin185@gmail.com" });
}

grid = new cheetahGrid.ListGrid({
    parentElement: document.querySelector(".grid-sample"),
    header: [
        { field: "check", caption: "", width: 50, columnType: "check", action: "check" },
        { field: "personid", caption: "ID", width: 100 },
        { field: "fname", caption: "First Name", width: 200 },
        { field: "lname", caption: "Last Name", width: 200 },
        { field: "email", caption: "Email", width: 250 },
    ],
    records: data,
    trimOnPaste: true,
    disableColumnResize: true
})
const CLICK = cheetahGrid.ListGrid.EVENT_TYPE.CLICK_CELL
grid.listen(CLICK, (args) => {
    console.log(args)
})

function x() {
    console.log("x")
}
