class DatePicker {
    constructor(id, dateSelectionCallback) {
        this.id = id;
        this.dateSelectionCallback = dateSelectionCallback;
        this.currentDate = new Date();
        this.selectedDate = this.currentDate;
    }

    render(selectedMonth) {
        const calendarDiv = document.getElementById(this.id);
        if (!calendarDiv) {
            console.error(`Element with id '${this.id}' not found.`);
            return;
        }

        // Calculate the start date of the month
        const firstDayOfMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1);
        const daysInMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0).getDate();
        const startDayOfWeek = firstDayOfMonth.getDay();

        // Create the calendar HTML
        let calendarHTML = `
      <div class="datepicker-header">
        <button class="prev-month" onclick="prevMonth('${this.id}')">&lt;</button>
        <span>${selectedMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
        <button class="next-month" onclick="nextMonth('${this.id}')">&gt;</button>
      </div>
      <table class="datepicker-table">
        <thead>
          <tr>
            <th>Su</th>
            <th>Mo</th>
            <th>Tu</th>
            <th>We</th>
            <th>Th</th>
            <th>Fr</th>
            <th>Sa</th>
          </tr>
        </thead>
        <tbody>
    `;

        let dayCounter = 1;
        for (let i = 0; i < 6; i++) {
            calendarHTML += "<tr>";
            for (let j = 0; j < 7; j++) {
                if ((i === 0 && j < startDayOfWeek) || dayCounter > daysInMonth) {
                    calendarHTML += "<td class='other-month'></td>";
                } else {
                    const date = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), dayCounter);
                    const isActiveMonth = date.getMonth() === selectedMonth.getMonth();
                    const isActiveDay = date.toDateString() === this.selectedDate.toDateString();
                    const cellClass = isActiveMonth ? (isActiveDay ? "active" : "") : "other-month";
                    calendarHTML += `<td class="${cellClass}" onclick="selectDate('${this.id}', ${date.getFullYear()}, ${date.getMonth()}, ${date.getDate()})">${dayCounter}</td>`;
                    dayCounter++;
                }
            }
            calendarHTML += "</tr>";
        }

        calendarHTML += `
        </tbody>
      </table>
    `;

        calendarDiv.innerHTML = calendarHTML;
    }
}

// Function to select a date and invoke the callback
function selectDate(id, year, month, day) {
    const datePicker = document.getElementById(id);
    const selectedDate = { year, month: month + 1, day };
    datePicker.dateSelectionCallback(id, selectedDate);
}

// Function to navigate to the previous month
function prevMonth(id) {
    const datePicker = document.getElementById(id);
    datePicker.selectedDate.setMonth(datePicker.selectedDate.getMonth() - 1);
    datePicker.render(datePicker.selectedDate);
}

// Function to navigate to the next month
function nextMonth(id) {
    const datePicker = document.getElementById(id);
    datePicker.selectedDate.setMonth(datePicker.selectedDate.getMonth() + 1);
    datePicker.render(datePicker.selectedDate);
}

// Self-executing function to create and render the date pickers
(function () {
    var datePicker1 = new DatePicker("datepicker1", function (id, fixedDate) {
        console.log("DatePicker with id", id,
            "selected date:", fixedDate.month + "/" + fixedDate.day + "/" + fixedDate.year);
    });
    datePicker1.render(new Date());

    var datePicker2 = new DatePicker("datepicker2", function (id, fixedDate) {
        console.log("DatePicker with id", id,
            "selected date:", fixedDate.month + "/" + fixedDate.day + "/" + fixedDate.year);
    });
    datePicker2.render(new Date("1/1/2009"));
})();
