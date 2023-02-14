import { GridValidRowModel } from "@mui/x-data-grid";
import { create } from "zustand";

interface Lesson {
    id: number,
    subjNumber: number,
    teacher: string,
    subject: string,
    room: number,
}

interface Schedule {
    id: number;
    lessons: Lesson[];
}

interface ScheduleState {
    schedule: [],
    fetchSchedule: () => void,
    testSchedule: () => void,
    getGroupSchedule: (groupNumber: number) => void,
}

const useScheduleStore = create<ScheduleState>((set) => ({
    schedule: [],
    fetchSchedule:async () => {
        const result = await fetch('');
        const json = await result.json();
        set({schedule: json})
    },
    testSchedule: () => {

        let schedule1: any = [];

        // for (let i = 0; i < 6; i++) {

        //     const lessons: Lesson[] = [
        //         {id: 1, subjNumber: 1, teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: 46},
        //         {id: 2, subjNumber: 2, teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: 46},
        //         {id: 3, subjNumber: 3, teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: 46},
        //         {id: 4, subjNumber: 4, teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: 46},
        //     ],
            
        // }


        const fullSchedule = [[
            
            [
              {id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "46"},
                {id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
                {id: 3, subjNumber: "3", teacher: "Шостак Н. И.",subject: 'Инструментальные средста разработки', room: "104"},
                {id: 4, subjNumber: "4", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
            ],
            [
              {id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "46"},
                {id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
                {id: 3, subjNumber: "3", teacher: "Шостак Н. И.",subject: 'Инструментальные средста разработки', room: "104"},
                {id: 4, subjNumber: "4", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
            ],
            [
              {id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "46"},
                {id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
                {id: 3, subjNumber: "3", teacher: "Шостак Н. И.",subject: 'Инструментальные средста разработки', room: "104"},
                {id: 4, subjNumber: "4", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
            ],
            [
              {id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "46"},
                {id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
                {id: 3, subjNumber: "3", teacher: "Шостак Н. И.",subject: 'Инструментальные средста разработки', room: "104"},
                {id: 4, subjNumber: "4", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
            ],
            [
              {id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "46"},
                {id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
                {id: 3, subjNumber: "3", teacher: "Шостак Н. И.",subject: 'Инструментальные средста разработки', room: "104"},
                {id: 4, subjNumber: "4", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
            ],
            [
              {id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "46"},
                {id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
                {id: 3, subjNumber: "3", teacher: "Шостак Н. И.",subject: 'Инструментальные средста разработки', room: "104"},
                {id: 4, subjNumber: "4", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
            ],
          ],
          [
            [
              {id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "460"},
                {id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
                {id: 3, subjNumber: "2", teacher: "Шостак Р. А.",subject: 'Разработка программных модулей', room: "105"},
                {id: 4, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
            ],
            [
              {id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "46"},
                {id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
                {id: 3, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
                {id: 4, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
            ],
            [
              {id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "46"},
                {id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
                {id: 3, subjNumber: "2", teacher: "йцукйцук Р. А.",subject: 'Разработка программных модулей', room: "105"},
                {id: 4, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
            ],
            [
              {id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "46"},
                {id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
                {id: 3, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
                {id: 4, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
            ],
            [
              {id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "46"},
                {id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
                {id: 3, subjNumber: "2", teacher: "йцукйцук Р. А.",subject: 'Разработка программных модулей', room: "105"},
                {id: 4, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
            ],
            [
              {id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "46"},
                {id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
                {id: 3, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
                {id: 4, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
            ],
          ]];

        set({schedule:fullSchedule})
    },
    getGroupSchedule(groupNumber) {
      
      const result4 = [
        [
          {id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "46"},
            {id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
            {id: 3, subjNumber: "3", teacher: "Шостак Н. И.",subject: 'Инструментальные средста разработки', room: "104"},
            {id: 4, subjNumber: "4", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
        ],
        [
          {id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "46"},
            {id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
            {id: 3, subjNumber: "3", teacher: "Шостак Н. И.",subject: 'Инструментальные средста разработки', room: "104"},
            {id: 4, subjNumber: "4", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
        ],
        [
          {id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "46"},
            {id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
            {id: 3, subjNumber: "3", teacher: "Шостак Н. И.",subject: 'Инструментальные средста разработки', room: "104"},
            {id: 4, subjNumber: "4", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
        ],
        [
          {id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "46"},
            {id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
            {id: 3, subjNumber: "3", teacher: "Шостак Н. И.",subject: 'Инструментальные средста разработки', room: "104"},
            {id: 4, subjNumber: "4", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
        ],
        [
          {id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "46"},
            {id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
            {id: 3, subjNumber: "3", teacher: "Шостак Н. И.",subject: 'Инструментальные средста разработки', room: "104"},
            {id: 4, subjNumber: "4", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
        ],
        [
          {id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "46"},
            {id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
            {id: 3, subjNumber: "3", teacher: "Шостак Н. И.",subject: 'Инструментальные средста разработки', room: "104"},
            {id: 4, subjNumber: "4", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
        ],
      ]

      const result3 = [
        [
          {id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "460"},
            {id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
            {id: 3, subjNumber: "2", teacher: "Шостак Р. А.",subject: 'Разработка программных модулей', room: "105"},
            {id: 4, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
        ],
        [
          {id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "46"},
            {id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
            {id: 3, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
            {id: 4, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
        ],
        [
          {id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "46"},
            {id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
            {id: 3, subjNumber: "2", teacher: "йцукйцук Р. А.",subject: 'Разработка программных модулей', room: "105"},
            {id: 4, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
        ],
        [
          {id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "46"},
            {id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
            {id: 3, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
            {id: 4, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
        ],
        [
          {id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "46"},
            {id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
            {id: 3, subjNumber: "2", teacher: "йцукйцук Р. А.",subject: 'Разработка программных модулей', room: "105"},
            {id: 4, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
        ],
        [
          {id: 1, subjNumber: "1", teacher: "Тесленко Н. Ф.",subject: 'Элементы высшей математики', room: "46"},
            {id: 2, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
            {id: 3, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
            {id: 4, subjNumber: "2", teacher: "Головко Р. А.",subject: 'Разработка программных модулей', room: "105"},
        ],
      ]

      if (groupNumber === 4) {
          set({schedule: result4})
          
          
      }
      if (groupNumber === 3) {
        set({schedule: result3})
      }

    },
}))

export default useScheduleStore;