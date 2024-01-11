// @ts-nocheck
import { months, numberString } from '$lib/utils.js';
import {_active} from '$lib/stores.js';

export function getChartDayData(day_obj, treshold) {

  let labels = [];
  let cData = [];
  let hData = [];
  let total_data = [[]];

  treshold = 0.50;
  
  for ( let i = 0; day_obj !== undefined && i < day_obj.length; i++ ) {
    if ( day_obj[i] !== undefined && day_obj[i].price.replace(/,/g, '.') < treshold) {
      hData[i] = day_obj[i].price.replace(/,/g, '.');
      cData[i] = '0,00';
    } else {
      // total_data[0][i] = '0:00';
      hData[i] = numberString(treshold);
      cData[i] = numberString(parseFloat(day_obj[i].price.replace(/,/g, '.')) - treshold);
    }
  }

  total_data = [hData, cData];

  for ( let i = 0; i < 24; i++) { 
    labels[i] = (i<10) ? '0' + i + ':00' : i + ':00';
  }
  
  return [total_data, labels];
}

/**
 * Return the sum of all hours on all days in a given month
 * 
 * @param {*} data_obj The full data object from database
 * @param {*}
 * @returns 
 */
export function getChartMonthData(data_obj, year, month, treshold) {

  let labels = [];
  let cData = [];
  let hData = [];
  let total_data = [[]]; 
  let months_obj = ( data_obj[year][month] !== undefined) ? data_obj[year][month] : undefined;
  let daysInMonth = new Date(year, month, 0).getDate();

  // console.log(months_obj)

  for ( let i = 0; i < daysInMonth; i++ ) {
    if ( months_obj !== undefined && Object.keys(months_obj)[i] !== undefined ) {
      hData[Number(Object.keys(months_obj)[i])-1] = totalDay(months_obj[Object.keys(months_obj)[i]], 2)[0];
      cData[Number(Object.keys(months_obj)[i])-1] = totalDay(months_obj[Object.keys(months_obj)[i]], 2)[1];
      labels[Number(Object.keys(months_obj)[i])-1] = Object.keys(months_obj)[i];
    } else {
      hData[i] = '0.00';
      cData[i] = '0.00';
      labels[i] = numberString(i+1)
    }
  }

  // total_data[1] = total_data[0];
  total_data = [hData, cData];
  
  return [total_data, labels];
}

/**
 * Return the sum of all days on all months for a given year
 * 
 * @param {*} years_obj 
 * @returns 
 */
export function getChartYearData(data_obj, year, treshold) {

  let labels = months({locale: 'DK'});
  let years_obj = data_obj[year];
  let cData = [];
  let hData = [];
  let total_data = [[]];
  
  for ( let i = 0; i < 12; i++ ) {
    cData[i] = (  Object.keys(years_obj).includes(numberString(i+1))) ? (totalMonth(data_obj, year, [numberString(i+1)])): '';
    hData[i] = cData[i]/2;
    total_data[0] = (Object.keys(years_obj).includes(numberString(i+1))) ? (totalMonth(data_obj, year, [numberString(i+1)])): '';
  }

  total_data = [hData, cData];

  return [total_data, labels];
}

/**
 * 
 * @param {*} day_obj 
 * @returns 
 */
export function totalDay(day_obj, treshold) {

  let charging_total = 0;
  let total, avg, sum_avg, days_avg, basis = 0;
  total = avg = sum_avg = days_avg = basis = 0;

  treshold = 8;

  for (let i = 0; i < day_obj.length; i++) {
    if ( parseFloat(day_obj[i].price.replace(/,/g, '.')) < treshold ) {
      sum_avg = sum_avg + parseFloat(day_obj[i].price.replace(/,/g, '.'));
      days_avg++;
    }
    basis = parseFloat(day_obj[i].price.replace(/,/g, '.'));
  }
  avg = (sum_avg / days_avg);
  
  for (let i = 0; day_obj !== undefined && i < day_obj.length; i++) {
    
    if ( parseFloat(day_obj[i].price.replace(/,/g, '.')) < treshold ) {
      total = total + parseFloat(day_obj[i].price.replace(/,/g, '.'));
    } else {
      charging_total += parseFloat(day_obj[i].price.replace(/,/g, '.'));
      total += treshold;
    }
    
}

/**
 * 
 * @param {*} month_obj 
 * @returns Total sum of days price in a given month
 */
export function totalMonth(data_obj, year, month, treshold) {

  let total_obj = ( data_obj[year][month] !== undefined ) ? Object.values(data_obj[year][month]) : undefined;
  let total = 0;
 
  for ( let j = 0; total_obj !== undefined && j < total_obj.length; j++) {
    // total += (Number(totalDay(total_obj[j])[0]) > 10) ? Number(totalDay(total_obj[j])[0]) : 10;
    total += Number(totalDay(total_obj[j], treshold)[0]);
  }

  return total.toFixed(2);
}

/**
 * 
 * @param {*} data_obj 
 * @param {*} year 
 * @returns 
 */
export function totalYear(data_obj, year, treshold) {
  let total = 0;
  for ( let i = 0; i < 12; i++) {
    total += parseFloat(totalMonth(data_obj, year, [numberString(i+1)], treshold));
  }

  console.log(_active);

  return total.toFixed(2);

}

/**
 * 
 * @param {*} data_obj de
 * @returns 
 */
export function getLatestDataDate(data_obj) {

  let latestYear=0;
  let latestMonth=0;
  let latestDay=0;

  for ( let i = 0; i < Object.keys(data_obj).length; i++) {
    latestYear = Object.keys(data_obj)[i];
  }

  for ( let i = 0; i < Object.keys(data_obj[`${latestYear}`]).length; i++) {
    if ( Number(Object.keys(data_obj[`${latestYear}`])[i]) > latestMonth ) {
      latestMonth = Number(Object.keys(data_obj[`${latestYear}`])[i]);
    } 
  }

  for ( var i = 0; i < Object.keys(data_obj[`${latestYear}`][`${numberString(latestMonth)}`]).length; i++ ) {
    if ( Number(Object.keys(data_obj[`${latestYear}`][`${numberString(latestMonth)}`])[i]) > latestDay ) {
      latestDay = Number(Object.keys(data_obj[`${latestYear}`][`${numberString(latestMonth)}`])[i])
    }
  }

  latestMonth = numberString(latestMonth);
  latestDay = numberString(latestDay);

  return {latestYear: latestYear, latestMonth: latestMonth, latestDay: latestDay}
}