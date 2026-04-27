jQuery(document).ready(function ($) {

  var courseSchedules = {
  ""2595"": {
    ""heading"": ""Baby Massage - Battersea (6 Week Course) - 65 Webbs Road, SW11 6SD"",
    ""dates"": {
      ""15/05/2026"": [
        ""Class 1 | Fri 15th May, 11:00am - 12:00pm"",
        ""Class 2 | Fri 22nd May, 11:00am - 12:00pm"",
        ""Class 3 | Fri 29th May, 11:00am - 12:00pm"",
        ""Class 4 | Fri 5th Jun, 11:00am - 12:00pm"",
        ""Class 5 | Fri 12th Jun, 11:00am - 12:00pm"",
        ""Class 6 | Fri 19th Jun, 11:00am - 12:00pm""
      ]
    }
  },
  ""2732"": {
    ""heading"": ""Baby Massage - Dulwich (6 Week Course) - The Plough Bar, Lordship Lane, SE22 8JJ"",
    ""dates"": {
      ""29/04/2026"": [
        ""Class 1 | Wed 29th Apr, 10:45am - 11:45am"",
        ""Class 2 | Wed 6th May, 10:45am - 11:45am"",
        ""Class 3 | Wed 13th May, 10:45am - 11:45am"",
        ""Class 4 | Wed 20th May, 10:45am - 11:45am"",
        ""Class 5 | Wed 27th May, 10:45am - 11:45am"",
        ""Class 6 | Wed 3rd Jun, 10:45am - 11:45am""
      ]
    }
  }
};

 $('#wc_bookings_field_resource').on('change', function () {
  $('#class-dates-output').html('<p><em>Your personalised schedule will appear here as soon as you select a date.</em></p>');
 });

 $(document).on('wc_booking_form_changed', function () {

  var venueId = $('#wc_bookings_field_resource').val();
  if (!venueId) return;

  var day = $('.ui-datepicker-calendar .ui-state-active').text();
  var monthText = $('.ui-datepicker-month').first().text();
  var year = $('.ui-datepicker-year').first().text();

  if (!day) return;

  var monthIndex = new Date(Date.parse(monthText + "" 1, 2000"")).getMonth() + 1;

  if (monthIndex < 10) monthIndex = '0' + monthIndex;
  if (day < 10) day = '0' + day;

  var selectedDateStr = day + '/' + monthIndex + '/' + year;

  var venueData = courseSchedules[venueId];
  if (!venueData) return;

  var schedule = venueData.dates[selectedDateStr];

  if (!schedule) {
   $('#class-dates-output').html('<p>No schedule available for this venue and start date.</p>');
   return;
  }

  var html = '<p><strong>' + venueData.heading + ':</strong></p><ul>';

  schedule.forEach(function (cls) {
   html += '<li>' + cls + '</li>';
  });

  html += '</ul>';

  $('#class-dates-output').html(html);

 });

 function showCustomFields() {
  $('.form-row.ppom-rendering-fields.align-items-center.ppom-section-collapse').slideDown();
 }

 function isDateSelected() {
  var dateVal = $('#wc_bookings_field_start_date').val();
  return dateVal && dateVal.trim() !== '';
 }

 $(document).on('wc_booking_form_changed', function () {
  if (isDateSelected()) {
   showCustomFields();
  }
 });

 $(document).on('change', '#wc_bookings_field_start_date', function () {
  if (isDateSelected()) {
   showCustomFields();
  }
 });

});
