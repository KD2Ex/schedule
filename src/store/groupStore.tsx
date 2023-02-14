import { create } from "zustand";

interface Group {
    id: number,
    groupNumber: number,
    course: number,
    label: string,
};


interface GroupState {
    groups: Group[],
    isLoading: boolean;
    addGroup: (groupLabel: string) => void;
    getGroups: () => void;
}

const useGroupStore = create<GroupState>((set) => ({
    groups: [],
    isLoading: false,
    addGroup: (groupLabel: string) => set(state => (
        {
            
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
        
    }
}))

export default useGroupStore;