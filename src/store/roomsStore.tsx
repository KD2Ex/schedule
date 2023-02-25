import { create } from "zustand";
import axios from 'axios';

interface Room {
    id: number,
    label: string,
};


interface RoomsState {
    rooms: string[] | Room[],
    isLoading: boolean;
    addRoom: (teacherName: string) => void;
    getRooms: () => void;
}

const useRoomsStore = create<RoomsState>((set, get) => ({
    rooms: [],
    isLoading: false,
    addRoom: (teacherName: string) => set(state => (
        {
            
        }
    )),
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
            set({rooms: res})
            console.log(get().rooms);
        }
        catch {
            set({rooms: result})
            console.log(get().rooms);
        }
        
        set({isLoading: false})
    }
}))

export default useRoomsStore;