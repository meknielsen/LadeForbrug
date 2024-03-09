import { c as create_ssr_component, a as subscribe, v as validate_component, f as each, b as set_store_value, e as escape, d as add_attribute } from "../../chunks/ssr.js";
import { a as _view, _ as _active, I as Icon, b as _data } from "../../chunks/Icon.js";
import "chart.js/auto";
const MONTHS_EN = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const MONTHS_DK = [
  "Januar",
  "Februar",
  "Marts",
  "April",
  "Maj",
  "Juni",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
function months(config) {
  var cfg = config || {};
  var count = cfg.count || 12;
  var section = cfg.section;
  var locale2 = cfg.locale || "EN";
  var values = [];
  var i, value;
  var MONTHS = locale2 == "DK" ? MONTHS_DK : MONTHS_EN;
  for (i = 0; i < count; ++i) {
    value = MONTHS[Math.ceil(i) % 12];
    values.push(value.substring(0, section));
  }
  return values;
}
let numberString = (number) => number < 10 ? "0" + number : "" + number;
let convertMonthDate = (data) => data.map((value) => parseFloat(value.replace(/,/g, ".")).toFixed(2));
const YearChart_svelte_svelte_type_style_lang = "";
const css$4 = {
  code: ".chart.svelte-17qeif4{padding-left:0px;padding-right:0px}",
  map: null
};
const YearChart = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { chartdata, labels, label, title: title2, detail_link } = $$props;
  if ($$props.chartdata === void 0 && $$bindings.chartdata && chartdata !== void 0)
    $$bindings.chartdata(chartdata);
  if ($$props.labels === void 0 && $$bindings.labels && labels !== void 0)
    $$bindings.labels(labels);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.title === void 0 && $$bindings.title && title2 !== void 0)
    $$bindings.title(title2);
  if ($$props.detail_link === void 0 && $$bindings.detail_link && detail_link !== void 0)
    $$bindings.detail_link(detail_link);
  $$result.css.add(css$4);
  return `<div class="chart svelte-17qeif4"><canvas width="3" height="1"></canvas></div>`;
});
function getChartDayData(day_obj, treshold) {
  let labels = [];
  let cData = [];
  let hData = [];
  let total_data = [[]];
  treshold = 10;
  for (let i = 0; day_obj !== void 0 && i < day_obj.length; i++) {
    if (day_obj[i].price.replace(/,/g, ".") < treshold) {
      hData[i] = numberString(parseFloat(day_obj[i].price.replace(/,/g, ".")));
      cData[i] = "0,00";
    } else {
      hData[i] = "0,00";
      cData[i] = numberString(parseFloat(day_obj[i].price.replace(/,/g, ".")));
    }
  }
  total_data = [hData, cData];
  for (let i = 0; i < 24; i++) {
    labels[i] = i < 10 ? "0" + i + ":00" : i + ":00";
  }
  return [total_data, labels];
}
function getChartMonthData(data_obj, year, month, treshold) {
  let labels = [];
  let cData = [];
  let hData = [];
  let total_data = [[]];
  let months_obj = data_obj[year][month] !== void 0 ? data_obj[year][month] : void 0;
  let daysInMonth = new Date(year, month, 0).getDate();
  for (let i = 0; i < daysInMonth; i++) {
    if (months_obj !== void 0 && Object.keys(months_obj)[i] !== void 0) {
      hData[Number(Object.keys(months_obj)[i]) - 1] = totalDay(months_obj[Object.keys(months_obj)[i]], 2)[0];
      cData[Number(Object.keys(months_obj)[i]) - 1] = totalDay(months_obj[Object.keys(months_obj)[i]], 2)[1];
      labels[Number(Object.keys(months_obj)[i]) - 1] = Object.keys(months_obj)[i];
    } else {
      hData[i] = "0.00";
      cData[i] = "0.00";
      labels[i] = numberString(i + 1);
    }
  }
  total_data = [hData, cData];
  return [total_data, labels];
}
function getChartYearData(data_obj, year, treshold) {
  let labels = months({ locale: "DK" });
  let years_obj = data_obj[year];
  let cData = [];
  let hData = [];
  let total_data = [[]];
  for (let i = 0; i < 12; i++) {
    hData[i] = years_obj !== void 0 && Object.keys(years_obj).includes(numberString(i + 1)) ? totalMonth(data_obj, year, [numberString(i + 1)], treshold)[0] : "";
    cData[i] = years_obj !== void 0 && Object.keys(years_obj).includes(numberString(i + 1)) ? totalMonth(data_obj, year, [numberString(i + 1)], treshold)[1] : "";
  }
  total_data = [hData, cData];
  return [total_data, labels];
}
function totalDay(day_obj, treshold) {
  let charging_total = 0;
  let total;
  total = 0;
  treshold = 10;
  for (let i = 0; day_obj !== void 0 && i < day_obj.length; i++) {
    if (day_obj[i] !== null && day_obj[i] !== void 0) {
      if (parseFloat(day_obj[i].price.replace(/,/g, ".")) < treshold) {
        total = total + parseFloat(day_obj[i].price.replace(/,/g, "."));
      } else {
        charging_total += parseFloat(day_obj[i].price.replace(/,/g, "."));
      }
    }
  }
  return [total.toFixed(2), charging_total.toFixed(2)];
}
function totalMonth(data_obj, year, month, treshold) {
  let charging_total = 0;
  let total_obj = data_obj[year][month] !== void 0 ? Object.values(data_obj[year][month]) : void 0;
  let total = 0;
  for (let j = 0; total_obj !== void 0 && j < total_obj.length; j++) {
    total += Number(totalDay(total_obj[j], treshold)[0]);
    charging_total += Number(totalDay(total_obj[j], treshold)[1]);
  }
  return [total.toFixed(2), charging_total.toFixed(2)];
}
function totalYear(data_obj, year, treshold) {
  let charging_total = 0;
  let total = 0;
  for (let i = 0; i < 12; i++) {
    total += parseFloat(totalMonth(data_obj, year, [numberString(i + 1)], treshold)[0]);
    charging_total += parseFloat(totalMonth(data_obj, year, [numberString(i + 1)], treshold)[1]);
  }
  return [total, charging_total];
}
function getLatestDataDate(data_obj) {
  let latestYear = 0;
  let latestMonth = 0;
  let latestDay = 0;
  for (let i2 = 0; i2 < Object.keys(data_obj).length; i2++) {
    latestYear = Object.keys(data_obj)[i2];
  }
  for (let i2 = 0; i2 < Object.keys(data_obj[`${latestYear}`]).length; i2++) {
    if (Number(Object.keys(data_obj[`${latestYear}`])[i2]) > latestMonth) {
      latestMonth = Number(Object.keys(data_obj[`${latestYear}`])[i2]);
    }
  }
  for (var i = 0; i < Object.keys(data_obj[`${latestYear}`][`${numberString(latestMonth)}`]).length; i++) {
    if (Number(Object.keys(data_obj[`${latestYear}`][`${numberString(latestMonth)}`])[i]) > latestDay) {
      latestDay = Number(Object.keys(data_obj[`${latestYear}`][`${numberString(latestMonth)}`])[i]);
    }
  }
  latestMonth = numberString(latestMonth);
  latestDay = numberString(latestDay);
  return { latestYear, latestMonth, latestDay };
}
const Year_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: ".graph.svelte-1wz5no4{width:80%;margin:0 auto;padding-top:5%;padding-bottom:2%}.center.svelte-1wz5no4{margin:auto;width:100%;padding:1px;text-align:center}",
  map: null
};
let title$2 = "Strømforbrug månedligt";
const Year = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $_view, $$unsubscribe__view;
  let $$unsubscribe__active;
  $$unsubscribe__view = subscribe(_view, (value) => $_view = value);
  $$unsubscribe__active = subscribe(_active, (value) => value);
  let { data, detail_link } = $$props;
  let labels, chartdata;
  let title_date = $_view.year;
  detail_link = void 0;
  let yearChart = (y) => {
    let d = getChartYearData(data.years, `${y}`);
    let r = convertMonthDate(data.refusion_data[`${y}`]);
    chartdata = [d[0][0], d[0][1].map((v, i) => v - r[i]), r];
    labels = d[1];
    title_date = y;
  };
  let setMonth = (m) => {
    set_store_value(_view, $_view.month = m, $_view);
  };
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.detail_link === void 0 && $$bindings.detail_link && detail_link !== void 0)
    $$bindings.detail_link(detail_link);
  $$result.css.add(css$3);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      yearChart($_view.year);
    }
    {
      setMonth(detail_link);
    }
    $$rendered = `<div class="graph svelte-1wz5no4" role="link" tabindex="0">${validate_component(YearChart, "YearChart").$$render(
      $$result,
      {
        chartdata,
        labels,
        label: title_date,
        title: title$2,
        detail_link
      },
      {
        detail_link: ($$value) => {
          detail_link = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="center svelte-1wz5no4"><div class="join">${each(Object.keys(data.years), (y) => {
      return `<button class="${"join-item btn btn-md " + escape($_view.year === y ? "btn-active" : "", true)}"${add_attribute("href", null, 0)}>${escape(y)}</button>`;
    })}</div></div>`;
  } while (!$$settled);
  $$unsubscribe__view();
  $$unsubscribe__active();
  return $$rendered;
});
const Chart_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".chart.svelte-1aldry8{padding-left:0px;padding-right:0px}",
  map: null
};
const Chart_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { chartdata, labels, label, title: title2, detail_link } = $$props;
  if ($$props.chartdata === void 0 && $$bindings.chartdata && chartdata !== void 0)
    $$bindings.chartdata(chartdata);
  if ($$props.labels === void 0 && $$bindings.labels && labels !== void 0)
    $$bindings.labels(labels);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.title === void 0 && $$bindings.title && title2 !== void 0)
    $$bindings.title(title2);
  if ($$props.detail_link === void 0 && $$bindings.detail_link && detail_link !== void 0)
    $$bindings.detail_link(detail_link);
  $$result.css.add(css$2);
  return `<div class="chart svelte-1aldry8"><canvas width="3" height="1"></canvas></div>`;
});
const Month_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".graph.svelte-1pm9pce{width:80%;margin:0 auto;padding-top:5%;padding-bottom:2%}",
  map: null
};
let title$1 = "Strømforbrug dagligt";
const Month = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $_view, $$unsubscribe__view;
  let $$unsubscribe__active;
  $$unsubscribe__view = subscribe(_view, (value) => $_view = value);
  $$unsubscribe__active = subscribe(_active, (value) => value);
  let { data, detail_link } = $$props;
  let view = $_view;
  let year = view.year;
  let month = view.month;
  view.day;
  let labels, chartdata;
  let date = new Date(year, month, 0);
  let current, title_date;
  let toLabel = (d) => {
    if (d < 10)
      return "0" + d;
    if (d >= 10)
      return "" + d;
  };
  current = month;
  let getTitleDate = (m) => {
    date.setMonth(Number(m) - 1);
    return date.toLocaleDateString("da-DK", { year: "numeric", month: "long" });
  };
  let monthChart = (m) => {
    let d = getChartMonthData(data.years, `${year}`, `${m}`);
    chartdata = d[0];
    labels = d[1];
    title_date = getTitleDate(`${m}`);
  };
  let setDay = (d) => {
    if (d === void 0) {
      d = getLatestDataDate(data.years).latestDay;
    }
    view.day = d;
    view.month = current;
  };
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.detail_link === void 0 && $$bindings.detail_link && detail_link !== void 0)
    $$bindings.detail_link(detail_link);
  $$result.css.add(css$1);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      monthChart(current);
    }
    {
      setDay(detail_link);
    }
    $$rendered = `<div class="graph svelte-1pm9pce" role="link" tabindex="0">${validate_component(Chart_1, "Chart").$$render(
      $$result,
      {
        chartdata,
        labels,
        label: title_date,
        title: title$1,
        detail_link
      },
      {
        detail_link: ($$value) => {
          detail_link = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex justify-center"> <div class="min-w-10 flex"></div> <div class="join">${each(Array(12), (_, index) => {
      return `${index < 12 ? `<button class="${"join-item btn btn-md " + escape(current === toLabel(index + 1) ? "btn-active" : "", true)}">${escape(toLabel(index + 1))}</button>` : ``}`;
    })}</div> <div class="min-w-10 flex"></div> </div>`;
  } while (!$$settled);
  $$unsubscribe__view();
  $$unsubscribe__active();
  return $$rendered;
});
const Day_svelte_svelte_type_style_lang = "";
const css = {
  code: ".center.svelte-1r2r5o5{margin:auto;width:80%;padding:1px;text-align:center;display:flex;justify-content:center}.graph.svelte-1r2r5o5{width:80%;margin:0 auto;padding-top:5%;padding-bottom:2%}",
  map: null
};
let title = "Strømforbrug hver time";
const Day = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $_view, $$unsubscribe__view;
  let $$unsubscribe__active;
  $$unsubscribe__view = subscribe(_view, (value) => $_view = value);
  $$unsubscribe__active = subscribe(_active, (value) => value);
  let { data, detail_link } = $$props;
  let view = $_view;
  let year = view.year;
  let month = view.month;
  let day = view.day;
  let labels, chartdata, first, title_date;
  let current = day;
  let date = new Date(year, month, 0);
  let last = date.getDate();
  let toLabel = (d) => {
    if (d < 10)
      return "0" + d;
    if (d >= 10)
      return "" + d;
  };
  first = 1;
  if (Number(current) > 9)
    first = 6;
  if (Number(current) > 14)
    first = 11;
  if (Number(current) > 19)
    first = 16;
  if (Number(current) > 24)
    first = 21;
  if (Number(current) > 29)
    first = 26;
  let getTitleDate = (day2) => {
    date.setDate(day2);
    return date.toLocaleDateString("da-DK", {
      year: "numeric",
      month: "short",
      weekday: "short",
      day: "2-digit"
    });
  };
  let dayChart = (c) => {
    if (c.length === 0) {
      c = "01";
    }
    let d = getChartDayData(data.years[`${year}`][`${month}`][`${c}`], 0);
    chartdata = d[0];
    labels = d[1];
    title_date = getTitleDate(`${c}`);
    current = c;
  };
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.detail_link === void 0 && $$bindings.detail_link && detail_link !== void 0)
    $$bindings.detail_link(detail_link);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      dayChart(current);
    }
    $$rendered = `<div class="graph svelte-1r2r5o5" role="link" tabindex="0">${validate_component(Chart_1, "Chart").$$render(
      $$result,
      {
        chartdata,
        labels,
        label: title_date,
        title,
        detail_link
      },
      {
        detail_link: ($$value) => {
          detail_link = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="center svelte-1r2r5o5"><div class="arrows" data-svelte-h="svelte-169pccy"></div> <div><div class="join"><button class="join-item btn btn-md">${validate_component(Icon, "Icon").$$render(
      $$result,
      {
        icon: "ic:outline-keyboard-double-arrow-left",
        class: "size-5"
      },
      {},
      {}
    )}</button> <button class="join-item btn btn-md">${validate_component(Icon, "Icon").$$render(
      $$result,
      {
        icon: "ic:outline-keyboard-arrow-left",
        class: "size-5"
      },
      {},
      {}
    )}</button> ${each(Array(9), (_, index) => {
      return `${index + first <= last ? `<button class="${"join-item btn btn-md " + escape(current === toLabel(index + first) ? "btn-active" : "", true)}"${add_attribute("href", null, 0)}>${escape(toLabel(index + first))}</button>` : ``}`;
    })} <button class="join-item btn btn-md">${validate_component(Icon, "Icon").$$render(
      $$result,
      {
        icon: "ic:outline-keyboard-arrow-right",
        class: "size-5"
      },
      {},
      {}
    )}</button> <button class="join-item btn btn-md">${validate_component(Icon, "Icon").$$render(
      $$result,
      {
        icon: "ic:outline-keyboard-double-arrow-right",
        class: "size-5"
      },
      {},
      {}
    )}</button></div></div> <div class="arrows" data-svelte-h="svelte-169pccy"></div></div>`;
  } while (!$$settled);
  $$unsubscribe__view();
  $$unsubscribe__active();
  return $$rendered;
});
let locale$1 = "DK";
const Settings = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe__active;
  $$unsubscribe__active = subscribe(_active, (value2) => value2);
  let refusion_data = [];
  let today = /* @__PURE__ */ new Date();
  let year = today.getFullYear().toString();
  let new_year = "";
  let value = year;
  let years = [];
  let _values = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
  let isDisabled = true;
  let get_refusion_data = async (year2) => {
    const response = await fetch(`api/settings/`).then((r) => r.json());
    refusion_data = response;
    for (let i = 0; i < Object.keys(refusion_data).length; i++) {
      years[i] = {
        value: Object.keys(refusion_data)[i],
        name: Object.keys(refusion_data)[i]
      };
      if (Object.keys(refusion_data)[i] === year2) {
        for (let j = 0; j < 12; j++) {
          if (refusion_data[year2][j] !== void 0) {
            _values[j] = refusion_data[year2][j];
          } else {
            _values[j] = "0,00";
          }
        }
      }
    }
    console.log(years);
  };
  let update_refusion_data = (data) => {
    let values = [];
    for (let i = 0; i < 12; i++) {
      if (data[i] == "") {
        values[i] = "0,00";
      } else {
        values[i] = data[i];
      }
    }
    refusion_data[year] = values;
  };
  let validate_input = (y) => {
    isDisabled = !isNaN(y) && y.length === 4 && Number(y) >= 2020 && !Object.keys(refusion_data).includes(y);
    return isDisabled;
  };
  year = value;
  {
    get_refusion_data(year);
  }
  {
    update_refusion_data(_values);
  }
  $$unsubscribe__active();
  return `<div class="flex flex-row pt-16"><div class="basis-1/12"></div> <div class="basis-1/12 min-w-32"><label for="search" class="block w-32"><div class="label" data-svelte-h="svelte-wpz6f4"><span class="label-text">Select year</span></div> <select class="select select-bordered w-full max-w-xs">${each(years, (year2) => {
    return `<option${add_attribute("value", year2.name, 0)}>${escape(year2.name)}</option>`;
  })}</select></label></div> <div class="basis-1/12 mt-8 min-w-16"><button class="btn-circle hover:base-100" onclick="addYear.showModal()">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "mdi:plus-circle-outline",
      class: "w-6 h-6 me-2 mt-3 ms-3"
    },
    {},
    {}
  )}</button> <dialog id="addYear" class="modal"><div class="modal-box w-96"><h3 class="font-bold text-lg" data-svelte-h="svelte-vg03cb">Add Year</h3> <div class="modal-action justify-start"><form method="dialog"><input type="text" name="add_year" class="input input-bordered w-full max-w-xs" placeholder=""${add_attribute("value", new_year, 0)}> <p class="${"mt-2 text-xs " + escape(
    validate_input(new_year) ? "text-green-600" : "text-red-500",
    true
  ) + " font-light ml-1 p-0"}">Must be a valid, non-existing year after 2020.</p> <div class="flex h-10 pt-2 m-2 justify-center"></div> <button class="btn btn-primary min-w-20 mr-2" ${!isDisabled ? "disabled" : ""}>Add</button>  <button class="btn btn-accent min-w-20" data-svelte-h="svelte-5ie35j">Cancel</button></form></div></div></dialog></div> <div class="basis-6/12 flex">${each(months({ locale: locale$1 }), (month, index) => {
    return `${index < 6 ? `<div class="p-1 min-w-28"><label class="form-control w-full max-w-xs mb-2" for="input-sm"><div class="label"><span class="label-text">${escape(month)}</span></div> <input class="input input-bordered w-full max-w-xs" id="input-sm" type="text" placeholder="0,00"${add_attribute("value", _values[index], 0)}></label> </div>` : ``}`;
  })}</div> <div class="basis-2/12" data-svelte-h="svelte-8mzjzq"></div> <div class="basis-1/12"><button class="btn-circle hover:base-100">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "mdi:close-circle-outline",
      class: "w-6 h-6"
    },
    {},
    {}
  )}</button></div></div> <div class="flex flex-row"><div class="basis-1/12"></div> <div class="basis-1/12 min-w-32"></div> <div class="basis-1/12 min-w-16"></div> <div class="basis-6/12 flex">${each(months({ locale: locale$1 }), (month, index) => {
    return `${index > 5 ? `<div class="p-1 min-w-28"><label class="form-control w-full max-w-xs mb-2" for="input-sm"><div class="label"><span class="label-text">${escape(month)}</span></div> <input class="input input-bordered w-full max-w-xs" id="input-sm" type="text" placeholder="0,00"${add_attribute("value", _values[index], 0)}></label> </div>` : ``}`;
  })}</div> <div class="basis-3/12" data-svelte-h="svelte-10jhmcn"></div></div> <div class="flex flex-row"><div class="basis-1/12"></div> <div class="basis-1/12 min-w-32"></div> <div class="basis-1/12 min-w-16"></div> <div class="basis-1/12 flex"><div class="m-1 p-1 pt-10 mr-6 w-12"><button class="btn btn-primary" data-svelte-h="svelte-11nv672">Save</button></div> <div class="m-1 pt-10 w-12"> <button class="btn btn-secondary" onclick="deleteYear.showModal()" data-svelte-h="svelte-a7cexm">Delete</button> <dialog id="deleteYear" class="modal"><div class="modal-box w-96"><form method="dialog"><h3 class="mb-5 text-lg font-normal text-gray-400">This will delete the year ${escape(year)} and all the monthly refusion data registered.</h3> <button class="btn btn-secondary me-2" data-svelte-h="svelte-1i0gcfu">Delete</button>  <button class="btn btn-primary" data-svelte-h="svelte-brik8e">Cancel</button></form></div></dialog></div></div> <div class="basis-8/12"></div></div>`;
});
let locale = "da-DK";
const Summary = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe__view;
  let $$unsubscribe__active;
  $$unsubscribe__view = subscribe(_view, (value) => value);
  $$unsubscribe__active = subscribe(_active, (value) => value);
  let { data } = $$props;
  let s = 0;
  let refusion_sum = (y) => {
    s = 0;
    data.refusion_data[`${y}`].forEach((el) => s += Number(el.replace(/,/g, ".")));
    return s;
  };
  let years = Object.keys(data.years);
  let total = (y) => totalYear(data.years, `${y}`, 2)[0].toLocaleString(locale);
  let total_charging = (y) => totalYear(data.years, `${y}`, 2)[1].toLocaleString(locale);
  let total_pay = (y) => (totalYear(data.years, `${y}`, 2)[1] - refusion_sum(`${y}`)).toLocaleString(locale);
  console.log("total: " + total("2023"));
  console.log("total_charing: " + total_charging("2023"));
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$unsubscribe__view();
  $$unsubscribe__active();
  return `<div class="container mx-auto p-10"><div class="flex flex-row">${each(years, (year, _i) => {
    return `<div><div class="basis-3/12 p-2"><div class="card w-60 bg-neutral text-neutral-content"><div class="card-body items-center text-center"><button class="btn btn-ghost min-w-40 m-2 hover:bg-neutral" size="xl"><h5 class="text-3xl font-bold tracking-tight">${escape(year)}</h5></button> <button class="btn min-w-48 m-2">${validate_component(Icon, "Icon").$$render(
      $$result,
      {
        icon: "mdi:home-lightning-bolt",
        style: "color: rgba(54, 162, 235, 1)",
        class: "w-6 h-6 me-2"
      },
      {},
      {}
    )}DKK ${escape(total(year))}</button> <button class="btn min-w-48 m-2">${validate_component(Icon, "Icon").$$render(
      $$result,
      {
        icon: "mdi:home-battery",
        style: "color: rgba(255, 99, 132, 1)",
        class: "w-6 h-6 me-2"
      },
      {},
      {}
    )}DKK ${escape(total_charging(year))}</button> <button class="btn min-w-48 m-2">${validate_component(Icon, "Icon").$$render(
      $$result,
      {
        icon: "mdi:battery-charging-80",
        style: "color: rgb(75, 192, 192)",
        class: "w-6 h-6 me-2"
      },
      {},
      {}
    )}DKK ${escape(total_pay(year))}</button></div> </div></div> </div>`;
  })}</div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $_data, $$unsubscribe__data;
  let $_active, $$unsubscribe__active;
  $$unsubscribe__data = subscribe(_data, (value) => $_data = value);
  $$unsubscribe__active = subscribe(_active, (value) => $_active = value);
  let { data } = $$props;
  let detail_link;
  set_store_value(_data, $_data = data, $_data);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${$_active === "year" ? `${validate_component(Year, "Year").$$render(
      $$result,
      { data: $_data, detail_link },
      {
        detail_link: ($$value) => {
          detail_link = $$value;
          $$settled = false;
        }
      },
      {}
    )}` : ``} ${$_active === "month" ? `${validate_component(Month, "Month").$$render(
      $$result,
      { data: $_data, detail_link },
      {
        detail_link: ($$value) => {
          detail_link = $$value;
          $$settled = false;
        }
      },
      {}
    )}` : ``} ${$_active === "day" ? `${validate_component(Day, "Day").$$render(
      $$result,
      { data: $_data, detail_link },
      {
        detail_link: ($$value) => {
          detail_link = $$value;
          $$settled = false;
        }
      },
      {}
    )}` : ``} ${$_active === "settings" ? `${validate_component(Settings, "Settings").$$render($$result, {}, {}, {})}` : ``} ${$_active === "summary" ? `${validate_component(Summary, "Summary").$$render($$result, { data: $_data }, {}, {})}` : ``} `;
  } while (!$$settled);
  $$unsubscribe__data();
  $$unsubscribe__active();
  return $$rendered;
});
export {
  Page as default
};
