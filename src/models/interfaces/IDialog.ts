export interface IDialog {
    title: string,
    body: string,
    callback?: () => any,
    props?: any[],
    open: boolean
}