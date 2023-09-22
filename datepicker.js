class DatePicker {
  constructor(id, callback) {
    this.id = id;
    this.callback = callback;
    this.currentDate = new Date();
    this.selectedDate = null;
  }

  render(date) {
    // Get the month and year of the provided date
    const month = date.getMonth();
    const year = date.getFullYear();

    // Get the first day of the month and the last day of the month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Create an array of abbreviations for days of the week
    const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    // Create the HTML structure for the DatePicker
    let datePickerHTML = `
      <div class="datepicker">
        <div class="header">
          <span class="prev-month">&lt;</span>
          <span class="month-year">${this.getMonthName(month)} ${year}</span>
          <span class="next-month">&gt;</span>
        </div>
        <div class="days-of-week">
          ${daysOfWeek.map(day => `<span>${day}</span>`).join('')}
        </div>
        <div class="dates">
    `;

    // Calculate the number of days to display in the calendar
    const numDays = lastDay.getDate();
    const firstDayOfWeek = firstDay.getDay();
    const numRows = Math.ceil((numDays + firstDayOfWeek) / 7);

    // Fill in the days of the previous month if necessary
    for (let i = 0; i < firstDayOfWeek; i++) {
      datePickerHTML += `<span class="other-month">${lastDay.getDate() - firstDayOfWeek + i + 1}</span>`;
    }

    // Fill in the days of the current month
    for (let day = 1; day <= numDays; day++) {
      const currentDate = new Date(year, month, day);
      const isCurrentMonth = currentDate.getMonth() === month;
      const isSelected = this.selectedDate && this.selectedDate.getTime() === currentDate.getTime();
      const className = isCurrentMonth ? (isSelected ? 'selected' : '') : 'other-month';
      datePickerHTML += `<span class="${className}">${day}</span>`;
    }

    datePickerHTML += `</div></div>`;

    // Set the HTML content of the specified div
    const datePickerDiv = document.getElementById(this.id);
    datePickerDiv.innerHTML = datePickerHTML;

    // Add event listeners for previous and next month buttons
    const prevMonthBtn = datePickerDiv.querySelector('.prev-month');
    const nextMonthBtn = datePickerDiv.querySelector('.next-month');
    prevMonthBtn.addEventListener('click', () => this.showPreviousMonth());
    nextMonthBtn.addEventListener('click', () => this.showNextMonth());

    // Add event listener for date selection
    const dateElements = datePickerDiv.querySelectorAll('.dates span:not(.other-month)');
    dateElements.forEach(element => {
      element.addEventListener('click', () => this.handleDateClick(element));
    });
  }

  getMonthName(month) {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month];
  }

  showPreviousMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.render(this.currentDate);
  }

  showNextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.render(this.currentDate);
  }

  handleDateClick(element) {
    const day = parseInt(element.textContent);
    const month = this.currentDate.getMonth() + 1; // Month is 0-based
    const year = this.currentDate.getFullYear();
    this.selectedDate = { day, month, year };
    this.callback(this.id, this.selectedDate);
    this.render(this.currentDate);
  }
}
