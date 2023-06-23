import schedule from "../store/schedule";


export const isEdited = (group: string) => {
    return !!schedule.editedSchedules.find(item => item === group)
}