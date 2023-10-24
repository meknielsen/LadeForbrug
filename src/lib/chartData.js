// @ts-nocheck
import { months, numberString } from '$lib/utils.js';

export function getChartDayData(day_obj, treshold) {

    let labels = [];
    let data = [];
    
    for ( let i = 0; day_obj !== undefined && i < day_obj.length; i++ ) {
      if ( day_obj[i] !== undefined ) {
        data[i] = day_obj[i].price.replace(/,/g, '.');
        if ( Number(data[i]) - treshold > 0 ) console.log('Charging')
      } else {
        data[i] = '0:00';
      }
    }

    for ( let i = 0; i < 24; i++) { 
      labels[i] = (i<10) ? '0' + i + ':00' : i + ':00';
    }
    
    return [data, labels];
  }

  /**
   * Return the sum of all hours on all days in a given month
   * 
   * @param {*} month_obj The /year/month object to show day data from, e.g. '/2023/06'
   * @returns 
   */
  export function getChartMonthData(months_obj) {

    let labels = [];
    let data = [];

    for ( let i = 0; months_obj !== undefined && i < Object.keys(months_obj).length; i++ ) {
      labels[Number(Object.keys(months_obj)[i])-1] = Object.keys(months_obj)[i];
      if ( months_obj !== null ) {
        data[Number(Object.keys(months_obj)[i])-1] = totalDay(months_obj[Object.keys(months_obj)[i]], 2);
      } else {
        data[Number(Object.keys(months_obj)[i])-1] = '0.00';
      }
    }
    
    return [data, labels];
  }

  /**
   * Return the sum of all days on all months for a given year
   * 
   * @param {*} years_obj 
   * @returns 
   */
  export function getChartYearData(years_obj) {

    let labels = months({locale: 'DK'});
    let data = [];
    
    for ( let i = 0; i < 12; i++ ) {
      data[i] = (  Object.keys(years_obj).includes(numberString(i+1))) ? (totalMonth(years_obj[numberString(i+1)])): '';
    }

    return [data, labels];
  }

  /**
   * 
   * @param {*} day_obj 
   * @returns 
   */
  export function totalDay(day_obj, treshold) {

    let total, avg, sum_avg, days_avg, basis = 0;
    total = avg = sum_avg = days_avg = basis = 0;

    for (let i = 0; i < day_obj.length; i++) {
      if ( parseFloat(day_obj[i].price.replace(/,/g, '.')) < treshold ) {
        sum_avg = sum_avg + parseFloat(day_obj[i].price.replace(/,/g, '.'));
        days_avg++;
      }
      basis = parseFloat(day_obj[i].price.replace(/,/g, '.'));
    }

    avg = (sum_avg / days_avg);
    // console.log(avg); // TODO: fix the treshold for charging price
    
    for (let i = 0; i < day_obj.length; i++) {
      total = total + parseFloat(day_obj[i].price.replace(/,/g, '.'));
    }
    
    return total.toFixed(2);
  }
  
  export function totalMonth(month_obj) {

    let total_obj = Object.values(month_obj);
    let total = 0;

    for ( let j = 0; j < total_obj.length; j++) {
      for (let i = 0; i < total_obj[j].length; i++) {
        total += parseFloat(total_obj[j][i].price.replace(/,/g, '.'));
      }
    }

    return total.toFixed(2);
  }