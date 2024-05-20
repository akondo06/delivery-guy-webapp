import {
  useEffect,
  useRef,
  useCallback,
  useState
} from 'react';
// import LitePicker from 'litepicker/dist/nocss/litepicker';
import LitePicker from 'litepicker';
import 'litepicker/dist/plugins/ranges';
import {
  startOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  subDays,
  addDays
} from 'date-fns';

import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

import './TheLitePicker.scss';

export type DateExp = Date | number | string;
export type DateRange = [DateExp, DateExp];
// export interface RangeArray extends Array<DateRange> {}
// export interface DateArray extends Array<DateExp> {}

function iconBase(path: string) {
  return `<svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M0 0h24v24H0z" stroke="none" />
    <path d="${path}" />
  </svg>`;
}
const LEFT_ARROW = iconBase('m15 6-6 6 6 6');
const RIGHT_ARROW = iconBase('m9 6 6 6-6 6');

type DamnElement = HTMLElement | HTMLInputElement;

function usePicker(): [LitePicker | null, ((n: DamnElement | null) => void), DamnElement | null] {
  const [picker, setPicker] = useState<LitePicker | null>(null);
  const ref = useRef<DamnElement | null>(null);
  const setRef = useCallback((element: DamnElement | null) => {
    if (!element) {
      ref.current = null;

      setPicker(null);
      return;
    }

    const newPicker = new LitePicker({ element });
    ref.current = element;

    setPicker(newPicker);
  }, []);

  useEffect(() => { // removes html residual when component goes away...

    return () => {
      picker?.destroy();
      // if (ref.current && !picker) {
      //   return;
      // }

      // picker?.destroy();
    };
  }, [picker]);

  return [picker, setRef, ref.current];
}

export interface PickerPeriod {
  start: string | null;
  end: string | null;
}

interface PickerCustomRangeList {
  [key: string]: [Date, Date];
}

export interface TheLitePickerProps {
  className?: string;
  id?: string;
  name: string;
  placeholder?: string;

  single?: boolean;

  ranges?: 'report' | 'reportTimetracking' | 'compensation';

  startOfWeek?: 0 | 1; // 0: sun, 1: mon

  min?: string | null;
  max?: string | null;

  start: string | null;
  end: string | null;

  position?: 'top' | 'bottom' | 'left' | 'right' | 'auto';

  onChange: (value: PickerPeriod, name: string) => void;
  onBlur?: (value: PickerPeriod, name: string) => void;

  disabled?: boolean;
}

export default function TheLitePickerComp(props: TheLitePickerProps) {
  const { t } = useTranslation();

  const [picker, ref, element] = usePicker();

  const single = props.single;
  const position = props.position || 'auto';

  const currentLocale = i18n.language;
  const weekStartsOn = props.startOfWeek !== undefined ? props.startOfWeek : 1;
  const preset = props.ranges;
  const onChange = props.onChange;
  const onBlur = props.onBlur;
  const name = props.name;

  const start = props.start;
  const end = props.end;
  const min = props.min;
  const max = props.max;

  const customRanges = useCallback(() => {
    const _rangeDefault = () => {
      const now = new Date();

      const result: PickerCustomRangeList = {};

      result[t('dates.today')] = [
        startOfDay(now),
        startOfDay(now)
      ];
      result[t('reports.this_week')] = [
        startOfWeek(now, { weekStartsOn }),
        endOfWeek(now, { weekStartsOn })
      ];
      result[t('reports.this_month')] = [
        startOfMonth(now),
        endOfMonth(now)
      ];
      result[t('reports.this_year')] = [
        startOfYear(now),
        endOfYear(now)
      ];

      return result;
    };

    const _rangeReport = (allowPast: boolean, allowPresent: boolean, allowFuture: boolean) => {
      const now = new Date();

      const result: PickerCustomRangeList = {};

      const thisMonth = startOfMonth(now);
      const thisYear = startOfYear(now);

      if (allowPast) {
        const previousWeek = subDays(now, 7);
        const previousMonth = startOfMonth(subDays(thisMonth, 3));
        const previousYear = startOfYear(subDays(thisYear, 3));
        result[t('reports.previous_week')] = [
          startOfWeek(previousWeek, { weekStartsOn }),
          endOfWeek(previousWeek, { weekStartsOn })
        ];
        result[t('reports.previous_month')] = [
          startOfMonth(previousMonth),
          endOfMonth(previousMonth)
        ];
        result[t('reports.last_year')] = [
          startOfYear(previousYear),
          endOfYear(previousYear)
        ];
      }
      if (allowPresent) {
        result[t('reports.this_week')] = [
          startOfWeek(now, { weekStartsOn }),
          endOfWeek(now, { weekStartsOn })
        ];
        result[t('reports.this_month')] = [
          thisMonth,
          endOfMonth(thisMonth)
        ];
        result[t('reports.this_year')] = [
          thisYear,
          endOfYear(thisYear)
        ];
      }
      if (allowFuture) {
        const nextWeek = addDays(now, 7);
        const nextMonth = startOfMonth(addDays(thisMonth, 3));
        result[t('reports.next_week')] = [
          startOfWeek(nextWeek, { weekStartsOn }),
          endOfWeek(nextWeek, { weekStartsOn })
        ];
        result[t('reports.next_month')] = [
          nextMonth,
          endOfMonth(nextMonth)
        ];
      }

      return result;
    };

    if(preset === 'report') {
      return _rangeReport(true, true, true);
    }

    if(preset === 'reportTimetracking') {
      return _rangeReport(true, true, false);
    }

    if(preset === 'compensation') {
      return _rangeReport(true, false, false);
    }

    return _rangeDefault();
  }, [
    t,
    weekStartsOn,
    preset
  ]);

  useEffect(() => {
    if (!picker) {
      return;
    }

    // @ts-ignore
    LitePicker.prototype.weekdayName = function(day, representation?: 'short' | 'long' | 'narrow' = 'short') {
      // @ts-ignore
      return new Date(1970, 0, day, 12, 0, 0, 0).toLocaleString(this.options.lang, { weekday: representation }).substr(0, 2);
    };

    // @ts-ignore
    

    picker.setOptions({
      plugins: single ? [] : ['ranges'],

      zIndex: 99999,

      lang: currentLocale,

      numberOfColumns: single ? 1 : 2,
      numberOfMonths: single ? 1 : 2,

      position,

      // resetButton: true,
      scrollToDate: true,
      splitView: single ? false : true,
      singleMode: single,

      autoApply: single,
      autoRefresh: false,

      inlineMode: false,

      firstDay: weekStartsOn,

      dropdowns: {
        minYear: single ? 1940 : 2000,
        maxYear: (new Date()).getFullYear() + 6,
        months: true,
        years: true
      },

      tooltipText: {
        one: t('dates.day'),
        other: t('dates.days')
      },

      buttonText: {
        previousMonth: LEFT_ARROW,
        nextMonth: RIGHT_ARROW,
        reset: t('buttons.reset'),
        apply: t('buttons.apply'),
        cancel: t('buttons.cancel')
      },

      ranges: single ? undefined : {
        position: 'left',
        customRanges
      },

      minDate: min ? new Date(min) : min,
      maxDate: max ? new Date(max) : max,
      startDate: start ? new Date(start) : start,
      endDate: end ? new Date(end) : end
    });
  }, [
    picker,

    start,
    end,
    min,
    max,

    currentLocale,
    position,
    single,
    t,
    weekStartsOn,
    name,
    onChange,
    // preset,

    customRanges
  ]);

  useEffect(() => {
    if (!picker) {
      return () => null;
    }

    picker.on('selected', (date1, date2) => {
      if(!onChange) {
        return;
      }

      const values = {
        start: date1.format('YYYY-MM-DD'),
        end: date2?.format('YYYY-MM-DD')
      };

      onChange(values, name);

      if (onBlur) {
        onBlur(values, name);
      }

      element?.focus();
    });

    return () => {
      picker.removeAllListeners('selected');
    };
  }, [
    picker,
    onChange,
    onBlur,
    name,
    element
  ]);

  useEffect(() => {
    if (!picker) {
      return () => null;
    }

    picker.on('render:day', (day) => {
      const time = day.dataset.time;
      const properTime = `${Math.abs(parseInt(`${day.dataset.time}`))}`.padStart(10, '0');
      day.dataset.time = time[0] === '-' ? `-${properTime}` : properTime;
    });

    picker.on('render:month', (month, date) => {
      const days = month.querySelector('.container__days');
      const pre: HTMLElement[] = days.querySelectorAll(':not([class])') || [];
      const daysInMonth = days.children.length - pre.length;

      // @ts-ignore
      const calendars = picker.calendars;
      const isFirst = calendars[0].isSame(date, 'day');
      const isLast = calendars[calendars.length - 1].isSame(date, 'day');

      if (isFirst) {
        const before = date.clone();
        pre.forEach((element) => {
          days.removeChild(element);
          before.subtract(1, 'day');
          // @ts-ignore
          const day = picker.renderDay(before);
          day.classList.add('is-pre');
          days.prepend(day);
        });
      }

      if (isLast) {
        const after = date.clone().add(daysInMonth, 'days');
        const maxDays = days.children.length > 35 ? 42 : 35;
        while (days.children.length < maxDays) {
          // @ts-ignore
          const day = picker.renderDay(after);
          day.classList.add('is-post');
          days.appendChild(day);
          after.add(1, 'day');
        }
      }

      const today = new Date();
      // @ts-ignore
      if (date.isSame(today, 'month') || picker.options.numberOfMonths !== 1) {
        return;
      }

      const todayButton = document.createElement('button');
      todayButton.type = 'button';
      todayButton.className = 'button-show-today';
      todayButton.innerText = t('dates.show_today');

      todayButton.addEventListener('click', (e) => {
        e.preventDefault();
        picker.gotoDate(today);
      });

      const todayContainer = document.createElement('div');
      todayContainer.className = 'container__today';
      todayContainer.appendChild(todayButton);

      month.appendChild(todayContainer);
    });

    return () => {
      picker.removeAllListeners('render:day');
      picker.removeAllListeners('render:month');
    };
  }, [
    picker,
    t
  ]);

  return (
    <input
      ref={ref}

      id={props.id}
      className={props.className}
      name={props.name}
      placeholder={props.placeholder}

      disabled={props.disabled}
      // onBlur={() => props.onBlur && props.onBlur({ start: props.start, end: props.end }, props.name)} // when enabled, it will require 2 clicks on the picker for some reason...
      // onBlur={() => {
      //   picker?.hide();
      // }}
    />
  );
}
