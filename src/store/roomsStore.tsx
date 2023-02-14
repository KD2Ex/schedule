import { create } from "zustand";

interface Room {
    id: number,
    label: string,
};


interface RoomsState {
    rooms: Room[],
    isLoading: boolean;
    addRoom: (teacherName: string) => void;
    getRooms: () => void;
}

const useRoomsStore = create<RoomsState>((set) => ({
    rooms: [],
    isLoading: false,
    addRoom: (teacherName: string) => set(state => (
        {
            
        }
    )),
    getRooms: () => {
        const result: Room[] = [
            {id: 1, label: "46"},
            {id: 2, label: "104"},
            {id: 3, label: "105"},
            {id: 4, label: "61"},
        ];
        set({rooms: result})
        
    }
}))

export default useRoomsStore;