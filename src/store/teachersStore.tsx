import { create } from "zustand";

interface Teacher {
    id: number,
    label: string,
};


interface TeachersState {
    teachers: Teacher[],
    isLoading: boolean;
    addTeacher: (teacherName: string) => void;
    getTeachers: () => void;
}

const useTeachersStore = create<TeachersState>((set) => ({
    teachers: [],
    isLoading: false,
    addTeacher: (teacherName: string) => set(state => (
        {
            
        }
    )),
    getTeachers: () => {
        const result: Teacher[] = [
            {id: 1, label: "Тесленко Н. Ф."},
            {id: 2, label: "Шостак А. И."},
            {id: 3, label: "Новожилова А. С."},
            {id: 4, label: "Головко Р. А."},
        ];
        set({teachers: result})
    }
}))

export default useTeachersStore;