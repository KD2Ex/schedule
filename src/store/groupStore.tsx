import { create } from "zustand";
import axios from 'axios';

interface Group {
    id: number,
    groupNumber: number,
    course: number,
    label: string,
};

interface Room {
    id: number,
    label: string,
};

interface GroupState {
    groups: Group[],
    rooms: string[],
    isLoading: boolean;
    addGroup: (roomNumber: string) => void;
    getGroups: () => void;
    getRooms: () => void;
}

const useGroupStore = create<GroupState>((set, get) => ({
    groups: [],
    rooms: [],
    isLoading: false,
    addGroup: (roomNumber: string) => set(state => (
        {
            rooms: [...state.rooms, roomNumber],
            //rooms: [...state.rooms, roomNumber]
        }
    )),
    getGroups: () => {
        const result: Group[] = [
            {id: 1, groupNumber: 4, course: 4, label: "4-Д9-4ИСП"},
            {id: 2, groupNumber: 4, course: 4, label: "3-Д9-4ИСП"},
            {id: 3, groupNumber: 4, course: 4, label: "12-Д9-4ИСП"},
            {id: 4, groupNumber: 4, course: 4, label: "11-Д9-4ИСП"},
        ];
        set({groups: result})
        
    },
    getRooms: async () => {
        const result: Room[] = [
            {id: 1, label: "46"},
            {id: 2, label: "104"},
            {id: 3, label: "105"},
            {id: 4, label: "61"},
        ];
        set({isLoading: true})
        try {
            const rooms = await axios.get('http://192.168.43.109:8080/api/test/aud');
            const res = await rooms.data;
            console.log(res);
            set((state) => ({rooms: res}))
            console.log(get().rooms);
        }
        catch {
           // set({rooms: result})
            console.log(get().rooms);
        }
        
        set({isLoading: false})
    }
}))

export default useGroupStore;