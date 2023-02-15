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
    getTeacherSchedule: (teacherId: number) => void,
    getRoomSchedule: (roomNumber: number) => void,
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
    getGroupSchedule: (groupNumber) => {
      
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

      set({schedule: result4})

    },
    getTeacherSchedule: (teacherId: number) => {

        const result = 
        [

        [
          {id: 1, subjNumber: "1", teacher: "4-Д9-4ИСП",subject: 'Элементы высшей математики', room: "46"},
            {id: 2, subjNumber: "2", teacher: "3-Д9-4ИНС",subject: 'Элементы высшей математики', room: "46"},
            {id: 3, subjNumber: "3", teacher: "12-КД9-4ИСП",subject: 'Элементы высшей математики', room: "46"},
            {id: 4, subjNumber: "4", teacher: "11-КД9-4ИНС",subject: 'Элементы высшей математики', room: "46"},
        ],
        [
          {id: 1, subjNumber: "1", teacher: "4-Д9-4ИСП",subject: 'Элементы высшей математики', room: "46"},
            {id: 2, subjNumber: "2", teacher: "3-Д9-4ИНС",subject: 'Элементы высшей математики', room: "46"},
            {id: 3, subjNumber: "3", teacher: "12-КД9-4ИСП",subject: 'Элементы высшей математики', room: "46"},
            {id: 4, subjNumber: "4", teacher: "11-КД9-4ИНС",subject: 'Элементы высшей математики', room: "46"},
        ],
        [
          {id: 1, subjNumber: "1", teacher: "4-Д9-4ИСП",subject: 'Элементы высшей математики', room: "46"},
            {id: 2, subjNumber: "2", teacher: "3-Д9-4ИНС",subject: 'Элементы высшей математики', room: "46"},
            {id: 3, subjNumber: "3", teacher: "12-КД9-4ИСП",subject: 'Элементы высшей математики', room: "46"},
            {id: 4, subjNumber: "4", teacher: "11-КД9-4ИНС",subject: 'Элементы высшей математики', room: "46"},
        ],
        [
          {id: 1, subjNumber: "1", teacher: "4-Д9-4ИСП",subject: 'Элементы высшей математики', room: "46"},
            {id: 2, subjNumber: "2", teacher: "3-Д9-4ИНС",subject: 'Элементы высшей математики', room: "46"},
            {id: 3, subjNumber: "3", teacher: "12-КД9-4ИСП",subject: 'Элементы высшей математики', room: "46"},
            {id: 4, subjNumber: "4", teacher: "11-КД9-4ИНС",subject: 'Элементы высшей математики', room: "46"},
        ],
        [
          {id: 1, subjNumber: "1", teacher: "4-Д9-4ИСП",subject: 'Элементы высшей математики', room: "46"},
            {id: 2, subjNumber: "2", teacher: "3-Д9-4ИНС",subject: 'Элементы высшей математики', room: "46"},
            {id: 3, subjNumber: "3", teacher: "12-КД9-4ИСП",subject: 'Элементы высшей математики', room: "46"},
            {id: 4, subjNumber: "4", teacher: "11-КД9-4ИНС",subject: 'Элементы высшей математики', room: "46"},
        ],
        [
          {id: 1, subjNumber: "1", teacher: "4-Д9-4ИСП",subject: 'Элементы высшей математики', room: "46"},
            {id: 2, subjNumber: "2", teacher: "3-Д9-4ИНС",subject: 'Элементы высшей математики', room: "46"},
            {id: 3, subjNumber: "3", teacher: "12-КД9-4ИСП",subject: 'Элементы высшей математики', room: "46"},
            {id: 4, subjNumber: "4", teacher: "11-КД9-4ИНС",subject: 'Элементы высшей математики', room: "46"},
        ],
      ]

        set({schedule: result})

    },
    getRoomSchedule: (roomNumber: number) => {

      const result = [
        [
          {id: 1, subjNumber: "1", teacher: "4-Д9-4ИСП",subject: 'Элементы высшей математики', room: "Тесленко Н. Ф."},
            {id: 2, subjNumber: "2", teacher: "3-Д9-4ИНС",subject: 'Элементы высшей математики', room: "Тесленко Н. Ф."},
            {id: 3, subjNumber: "3", teacher: "12-КД9-4ИСП",subject: 'Элементы высшей математики', room: "Тесленко Н. Ф."},
            {id: 4, subjNumber: "4", teacher: "11-КД9-4ИНС",subject: 'Элементы высшей математики', room: "Тесленко Н. Ф."},
        ],
        [
          {id: 1, subjNumber: "1", teacher: "4-Д9-4ИСП",subject: 'Элементы высшей математики', room: "Тесленко Н. Ф."},
            {id: 2, subjNumber: "2", teacher: "3-Д9-4ИНС",subject: 'Элементы высшей математики', room: "Тесленко Н. Ф."},
            {id: 3, subjNumber: "3", teacher: "12-КД9-4ИСП",subject: 'Элементы высшей математики', room: "Тесленко Н. Ф."},
            {id: 4, subjNumber: "4", teacher: "11-КД9-4ИНС",subject: 'Элементы высшей математики', room: "Тесленко Н. Ф."},
        ],
        [
          {id: 1, subjNumber: "1", teacher: "4-Д9-4ИСП",subject: 'Элементы высшей математики', room: "Тесленко Н. Ф."},
            {id: 2, subjNumber: "2", teacher: "3-Д9-4ИНС",subject: 'Элементы высшей математики', room: "Тесленко Н. Ф."},
            {id: 3, subjNumber: "3", teacher: "12-КД9-4ИСП",subject: 'Элементы высшей математики', room: "Тесленко Н. Ф."},
            {id: 4, subjNumber: "4", teacher: "11-КД9-4ИНС",subject: 'Элементы высшей математики', room: "Тесленко Н. Ф."},
        ],
        [
          {id: 1, subjNumber: "1", teacher: "4-Д9-4ИСП",subject: 'Элементы высшей математики', room: "Тесленко Н. Ф."},
            {id: 2, subjNumber: "2", teacher: "3-Д9-4ИНС",subject: 'Элементы высшей математики', room: "Тесленко Н. Ф."},
            {id: 3, subjNumber: "3", teacher: "12-КД9-4ИСП",subject: 'Элементы высшей математики', room: "Тесленко Н. Ф."},
            {id: 4, subjNumber: "4", teacher: "11-КД9-4ИНС",subject: 'Элементы высшей математики', room: "Тесленко Н. Ф."},
        ],
        [
          {id: 1, subjNumber: "1", teacher: "4-Д9-4ИСП",subject: 'Элементы высшей математики', room: "Тесленко Н. Ф."},
            {id: 2, subjNumber: "2", teacher: "3-Д9-4ИНС",subject: 'Элементы высшей математики', room: "Тесленко Н. Ф."},
            {id: 3, subjNumber: "3", teacher: "12-КД9-4ИСП",subject: 'Элементы высшей математики', room: "Тесленко Н. Ф."},
            {id: 4, subjNumber: "4", teacher: "11-КД9-4ИНС",subject: 'Элементы высшей математики', room: "Тесленко Н. Ф."},
        ],
        [
          {id: 1, subjNumber: "1", teacher: "4-Д9-4ИСП",subject: 'Элементы высшей математики', room: "Тесленко Н. Ф."},
            {id: 2, subjNumber: "2", teacher: "3-Д9-4ИНС",subject: 'Элементы высшей математики', room: "Тесленко Н. Ф."},
            {id: 3, subjNumber: "3", teacher: "12-КД9-4ИСП",subject: 'Элементы высшей математики', room: "Тесленко Н. Ф."},
            {id: 4, subjNumber: "4", teacher: "11-КД9-4ИНС",subject: 'Элементы высшей математики', room: "Тесленко Н. Ф."},
        ],
      ]

      set({schedule: result})

    }
}))

export default useScheduleStore;