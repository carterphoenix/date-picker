'use strict';

class DatePicker {
    constructor(id, onDateChanged) {
        this.id = id;
        this.onDateChanged = onDateChanged;

    }
    getTableCaption()
    {
        const month = this.renderDate.toLocaleString('default', {month: 'long'});
        const calendarTableCaption = document.createElement("caption");
        const cellText = document.createTextNode(month + " " + this.renderDate.getFullYear());
        calendarTableCaption.appendChild(cellText);
        return calendarTableCaption;
    }
    getRow(values, rowType)
    {
        const row = document.createElement("tr");
        for (let index = 0; index <  values.length; index++) {
            const cell = document.createElement(rowType);
            const cellText = document.createTextNode(values[index].value);
            cell.appendChild(cellText);
            if (values[index].active) {
                const fixedDate = {
                    month: this.renderDate.getMonth() + 1,
                    day: values[index].value,
                    year: this.renderDate.getFullYear()
                };
                cell.onclick = () => {this.onDateChanged(this.id, fixedDate);};
            } else {
                cell.setAttribute("class", "not-in-month");
            }
            row.appendChild(cell);
        }
        return row;
    }
    static getHeaderRow1Data()
    {
        return [{value: "\u2190", active: true},
            {value: "\u00A0", active: false},
            {value: "\u00A0", active: false},
            {value: "\u00A0", active: false},
            {value: "\u00A0", active: false},
            {value: "\u00A0", active: false},
            {value: "\u2192", active: true}];
    }
    static getHeaderRow2Data()
    {
        return [{value: "Su", active: false},
            {value: "Mo", active: false},
            {value: "Tu", active: false},
            {value: "We", active: false},
            {value: "Th", active: false},
            {value: "Fr", active: false},
            {value: "Sa", active: false}];
    }
    getTableHeader()
    {
        const date = this.renderDate;
        const calendarTableHeader = document.createElement("thead");
        const headerRow = this.getRow(DatePicker.getHeaderRow1Data(), "th");
        headerRow.children[0].setAttribute("class", "month-selector");
        headerRow.children[0].onclick = () => {
            date.setMonth(date.getMonth() - 1);
            this.render(date);
        };
        headerRow.children[6].setAttribute("class", "month-selector");
        headerRow.children[6].onclick = () => {
            date.setMonth(date.getMonth() + 1);
            this.render(date);
        };
        calendarTableHeader.appendChild(headerRow);
        calendarTableHeader.appendChild(this.getRow(DatePicker.getHeaderRow2Data(), "th"));
        return calendarTableHeader;
    }
    getTableBody()
    {
        const month = this.renderDate.getMonth();
        const gridDays = new Date(this.renderDate.getFullYear(), this.renderDate.getMonth(), 1);
        gridDays.setDate(gridDays.getDate() - gridDays.getDay());
        const calendarTableBody = document.createElement("tbody");
        for (let i = 0; i < 7; i++) {
            if (i > 4 && gridDays.getMonth() !== month) {
                break;
            }
            const rowData = [];
            for (let j = 0; j < 7; j++) {
                rowData.push({
                    value: gridDays.getDate(),
                    active: gridDays.getMonth() === month
                });
                gridDays.setDate(gridDays.getDate() + 1);
            }
            const row = this.getRow(rowData, "td");
            calendarTableBody.appendChild(row);
        }
        return calendarTableBody;
    }
    getTable()
    {
        const calendarTable = document.createElement("table");
        calendarTable.appendChild(this.getTableCaption());
        calendarTable.appendChild(this.getTableHeader());
        calendarTable.appendChild(this.getTableBody());
        return calendarTable;
    }
    render(date) {
        this.renderDate = date;
        if (typeof date === "object") {
            const calendarContainer = document.getElementById(this.id);
            if (calendarContainer.firstChild !== null) {
                calendarContainer.removeChild(calendarContainer.firstChild);
            }
            calendarContainer.appendChild(this.getTable());
        }
    }
}
