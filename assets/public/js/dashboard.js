$(function() {

  const schedules = {
    called_in: []
  };

  let lastSelectedDayElement = null;

  function displayScheduleCardData(date = new Date(), selectedCalledIn = []) {
    const $schedCard = $('table#schedule-card');
    $schedCard.find('#schedule-card-date').text(date.toLocaleDateString('en-PH', { month: 'long', day: 'numeric', year: 'numeric' }));
    const $body = $schedCard.find('tbody');
    $body.empty();
    if (selectedCalledIn.length === 0) {
      const $nrow = $('<tr>');
      $nrow.append($('<td>').attr("colspan", 2).addClass("tw-text-center tw-italic tw-text-gray-400").text('No Appointments'));
      $body.append($nrow);
    }
    selectedCalledIn.forEach((selected) => {
      const $row = $("<tr>").addClass('tw-cursor-pointer tw-group').on("click", () => window.open((new URL(pathname(selected.url), window.location.origin)), '_blank', 'toolbar=0,menubar=0,scrollbars=1,status=0,resizable=1,width=800,height=600'));
      $row
        .append($("<td>").addClass('tw-p-2 group-hover:tw-bg-blue-100').text(selected.name))
        .append($("<td>").addClass('tw-text-end tw-p-2 group-hover:tw-bg-blue-100').text((new Date(selected.schedule)).toLocaleTimeString('en-PH', { hour: 'numeric', minute: 'numeric', hour12: true })));
      $body.append($row);
    })
  }

  function generateCalendar(year, month) {
    const calendarElement = $('#calendar');
    const currentMonthElement = $('#currentMonth');

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    calendarElement.html('');

    // Set the current month text
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    currentMonthElement.text(`${monthNames[month]} ${year}`);

    // Calculate the day of the week for the first day of the month (0 - Sunday, 1 - Monday, ..., 6 - Saturday)
    const firstDayOfWeek = firstDayOfMonth.getDay();

    // Create headers for the days of the week
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    daysOfWeek.forEach(day => {
      const dayElement = $('<div>').addClass('tw-text-center tw-font-semibold').text(day);
      calendarElement.append(dayElement);
    });

    // Create empty boxes for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      const emptyDayElement = $('<div>');
      calendarElement.append(emptyDayElement);
    }

    // Create boxes for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayElement = $('<div>').addClass('tw-text-center tw-py-2 tw-border tw-cursor-pointer').text(day);

      // Check if this date is the current date
      const currentDate = new Date();
      if (year === currentDate.getFullYear() && month === currentDate.getMonth() && day === currentDate.getDate()) {
        dayElement.addClass('tw-bg-blue-400');
        if (lastSelectedDayElement) {
          lastSelectedDayElement.removeClass('tw-border-4 tw-border-blue-500').addClass('tw-border');
        }
        dayElement.removeClass('tw-border').addClass('tw-border-4 tw-border-blue-500');
        lastSelectedDayElement = dayElement;
      }
      calendarElement.append(dayElement);
    }
  }

  // Initialize the calendar with the current month and year
  const currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth();
  generateCalendar(currentYear, currentMonth);

  // Event listeners for previous and next month buttons
  $('#prevMonth').on('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    generateCalendar(currentYear, currentMonth);
  });

  $('#nextMonth').on('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    generateCalendar(currentYear, currentMonth);
  });

  // Event listener for date click events
  const dayElements = $('.tw-cursor-pointer');
  dayElements.each(function() {
    const dayElement = $(this);
    dayElement.on('click', () => {
      if (lastSelectedDayElement) {
        lastSelectedDayElement.removeClass('tw-border-4 tw-border-blue-500').addClass('tw-border');
      }
      dayElement.removeClass('tw-border').addClass('tw-border-4 tw-border-blue-500');
      lastSelectedDayElement = dayElement;
      const day = parseInt(dayElement.text());
      const selectedDate = new Date(currentYear, currentMonth, day);
      displayScheduleCardData(
        selectedDate,
        schedules.called_in.filter((v) => {
          const date = new Date(v.schedule);
          return date.getDate() === day && date.getMonth() === currentMonth && date.getFullYear() === currentYear;
        })
      );
    });
  });

  const $schoolYearDiv = $('.dashboard-school-year');
  const $jrBarChart = $('#junior-bar-chart');
  const $jrLegends = $('#junior-legends');
  const $srBarChart = $('#senior-bar-chart');
  const $srLegends = $('#senior-legends');
  const $collegeBarChart = $('#college-bar-chart');
  const $collegeLegends = $('#college-legends');
  const generatedLegendColors = {};

  function generateRandomTWColors() {
    const colors = [
      'aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure', 'beige', 'bisque', 'black', 'blanchedalmond',
      'blue', 'blueviolet', 'brown', 'burlywood', 'cadetblue', 'chartreuse', 'chocolate', 'coral', 'cornflowerblue',
      'cornsilk', 'crimson', 'cyan', 'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgreen', 'darkkhaki',
      'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen', 'darkslateblue',
      'darkslategray', 'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue', 'dimgray', 'dodgerblue', 'firebrick',
      'floralwhite', 'forestgreen', 'fuchsia', 'gainsboro', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green',
      'greenyellow', 'honeydew', 'hotpink', 'indianred', 'indigo', 'ivory', 'khaki', 'lavender', 'lavenderblush',
      'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan', 'lightgoldenrodyellow', 'lightgray',
      'lightgreen', 'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray', 'lightsteelblue',
      'lightyellow', 'lime', 'limegreen', 'linen', 'magenta', 'maroon', 'mediumaquamarine', 'mediumblue',
      'mediumorchid', 'mediumpurple', 'mediumseagreen', 'mediumslateblue', 'mediumspringgreen', 'mediumturquoise',
      'mediumvioletred', 'midnightblue', 'mintcream', 'mistyrose', 'moccasin', 'navajowhite', 'navy', 'oldlace',
      'olive', 'olivedrab', 'orange', 'orangered', 'orchid', 'palegoldenrod', 'palegreen', 'paleturquoise',
      'palevioletred', 'papayawhip', 'peachpuff', 'peru', 'pink', 'plum', 'powderblue', 'purple', 'rebeccapurple',
      'red', 'rosybrown', 'royalblue', 'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'seashell', 'sienna',
      'silver', 'skyblue', 'slateblue', 'slategray', 'snow', 'springgreen', 'steelblue', 'tan', 'teal', 'thistle',
      'tomato', 'turquoise', 'violet', 'wheat', 'white', 'whitesmoke', 'yellow', 'yellowgreen'
    ];
    // Select a random color from the list
    let randomColor;
    do {
      randomColor = colors[Math.floor(Math.random() * colors.length)];
    } while(Object.values(generatedLegendColors).includes(randomColor));
    // Return the random Tailwind color class with the 400 shade
    return randomColor;
  }

  function getNominal(n = 0) {
    return n.toString().endsWith('1')
    ? n.toString() + "st"
    : n.toString().endsWith('2')
    ? n.toString() + "nd"
    : n.toString().endsWith('3')
    ? n.toString() + "rd"
    : n.toString() + "th";
  }

  function generateLegend(items = {}) {
    $collegeLegends.empty();
    $jrLegends.empty();
    $srLegends.empty();
    Object.keys(items).forEach((item) => {
      const gradeyear = Number.parseInt(item);
      const level = gradeyear > 0 && gradeyear < 5 ? "college" : (gradeyear > 6 && gradeyear < 11 ? "junior" : (gradeyear > 10 && gradeyear < 13 ? "senior" : ""));
      if (items[item].length > 0) {
        const $container = $("<div>").addClass("tw-flex tw-items-center tw-ml");
        const $legendColor = $("<span>").addClass("tw-block tw-w-4 tw-h-4");
        const $legendName = $("<span>").addClass("tw-ml-1 tw-text-xs tw-font-medium").text(items[item]?.[0]);
        if (!generatedLegendColors[items[item][0]]) {
          let twcolor = generatedLegendColors[items[item][0]] = generateRandomTWColors();
          $legendColor.css('background-color', twcolor);
        } else {
          let twcolor = generatedLegendColors[items[item][0]];
          $legendColor.css('background-color', twcolor);
        }
        $container.append($legendColor).append($legendName);
        if (level === "college") {
          // college
          $collegeLegends.append($container);
        } else if (level === "junior") {
          // jr
          $jrLegends.append($container);
        } else if (level === "senior") {
          // sr
          $srLegends.append($container);
        }
      }
    });
  }

  function generateBarChart(items = {}) {
    $collegeBarChart.empty();
    $jrBarChart.empty();
    $srBarChart.empty();
    const maxFrequency = Math.max(...Object.values(items).map((item) => item.length > 0 ? Number.parseInt(item[1]) : 0));
    const maxLength = maxFrequency <= 10 ? 10 : maxFrequency <= 20 ? 20 : maxFrequency <= 50 ? 50 : maxFrequency <= 70 ? 70 : maxFrequency <= 100 ? 100 : maxFrequency <= 200 ? 200 : maxFrequency <= 300 ? 300 : maxFrequency <= 400 ? 400 : maxFrequency <= 500 ? 500 : 1000;
    Object.keys(items).forEach((item) => {
      const gradeyear = Number.parseInt(item);
      const level = gradeyear > 0 && gradeyear < 5 ? "college" : (gradeyear > 6 && gradeyear < 11 ? "junior" : (gradeyear > 10 && gradeyear < 13 ? "senior" : ""));
      const $container = $("<div>").addClass("tw-relative tw-flex tw-flex-col tw-items-center tw-flex-grow tw-pb-5");
      const $bar = $("<div>").addClass("tw-relative tw-flex tw-justify-center tw-w-[50%] tw-cursor-pointer tw-group");
      const $frequency = $("<span>").addClass("tw-absolute tw-bottom-full tw-hidden tw-mb-full tw-font-bold tw-text-black group-hover:tw-block");
      if (items[item].length > 0) {
        let twcolor = generatedLegendColors[items[item][0]];
        let hPercent = Math.floor(Number.parseInt(items[item][1]) / maxLength * 250);
        $frequency.text(items[item][1]);
        $bar.css('height', `${hPercent}px`).css('background-color', twcolor).append($frequency);
        $container.append($bar);
      } else {
        $frequency.text("0");
        $bar.addClass("tw-border-b tw-border-black tw-h-1").append($frequency);
        $container.append($bar);
      }
      const $level = $("<div>").addClass("tw-bottom-0 tw-text-xs tw-font-bold").text(level === "college" ? getNominal(gradeyear) + " Yr" : "Grade " + gradeyear);
      $container.append($level);
      if (level === "college") {
        // college
        $collegeBarChart.append($container);
      } else if (level === "junior") {
        // jr
        $jrBarChart.append($container);
      } else if (level === "senior") {
        // sr
        $srBarChart.append($container);
      }
    });
  }

  // Fetch data from API
  async function fetchDashboardData() {
    const dashboardURL = new URL(pathname('/api/get/dashboard'), window.location.origin);
    return new Promise((resolve, reject) => {
      $.get(dashboardURL.toString())
        .done(function({ data, error }) {
          if (error || data.error) {
            throw new Error(error || data.error);
          }
          resolve(data);
        })
        .fail((_,__,error) => { console.log(error); reject(error) });
    })
  }
  fetchDashboardData()
    .then((dashboardData) => {
      /*
        {
          sy: object
          total_students: number
          total_admin: number
          assessment_open: boolean
          assessment_form_items: number
          assessment_form_alarming: number
          submitted_assessment_forms: number;
          assessment_frequencies: object
          called_in: array of object
        }
      */
      schedules.called_in = dashboardData.called_in;
      // Generate school year div
      $schoolYearDiv.text(`S.Y. ${dashboardData.sy?.year}-${Number.parseInt(dashboardData.sy?.year) + 1}`);
      // Generate legend
      generateLegend(dashboardData.assessment_frequencies);
      // Generate bar chart
      generateBarChart(dashboardData.assessment_frequencies);
      // Display current date and schedule card data
      displayScheduleCardData(currentDate, schedules.called_in);
    })
    .catch((error) => console.log(error));
})