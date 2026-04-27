jQuery(document).ready(function ($) {

  var courseSchedules = {
  "2688": {
    "heading": "Baby Yoga - Battersea (6 Week Course) - 65 Webbs Road, SW11 6SD",
    "dates": {
      "14/05/2026": [
        "Class 1 | Thu 14th May, 11:00am - 12:00pm",
        "Class 2 | Thu 21st May, 11:00am - 12:00pm",
        "Class 3 | Thu 28th May, 11:00am - 12:00pm",
        "Class 4 | Thu 4th Jun, 11:00am - 12:00pm",
        "Class 5 | Thu 11th Jun, 11:00am - 12:00pm",
        "Class 6 | Thu 18th Jun, 11:00am - 12:00pm"
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

  var monthIndex = new Date(Date.parse(monthText + " 1, 2000")).getMonth() + 1;

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

