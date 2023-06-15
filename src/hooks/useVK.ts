import {useEffect} from "react";


export const useVK = (deps: any[]) => {

    return useEffect(() => {

        const script = document.createElement('script');
        script.src = 'https://vk.com/js/api/openapi.js?168';
        script.type = "text/javascript";
        document.head.appendChild(script);

    }, [...deps])

}