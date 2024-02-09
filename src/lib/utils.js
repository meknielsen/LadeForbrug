// @ts-nocheck
const MONTHS_EN = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const MONTHS_DK = [
    'Januar',
    'Februar',
    'Marts',
    'April',
    'Maj',
    'Juni',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  
  export function months(config) {
    var cfg = config || {};
    var count = cfg.count || 12;
    var section = cfg.section;
    var locale = cfg.locale || 'EN';
    var values = [];
    var i, value;

    var MONTHS = (locale == 'DK') ?  MONTHS_DK : MONTHS_EN;
  
    for (i = 0; i < count; ++i) {
      value = MONTHS[Math.ceil(i) % 12];
      values.push(value.substring(0, section));
    }
  
    return values;
  }

  export function numberString(number) {
    return (number<10) ? '0' + number : '' + number;
  }

  export function convertMonthDate(data) {
    let r = [];
    for (var i = 0; i < 12; i++) {
      r[i] = parseFloat(data[i].replace(/,/g, '.')).toFixed(2);
    }
    return r;
  }

  export function subtractRefusion(c, r) {
    let n = [];
    for (var i = 0; i < 12; i++) {
      n[i] = c[i]-r[i]
    }

    console.log(c.map(function(v, i) {return v - r[i]}))

    return  c.map(function(v, i) {return v - r[i]});
  }