import { createContext, useContext, useEffect, useState } from 'react';


export const themeContext = createContext<any>(true);
export const useTheme = () =>{
    const context = useContext(themeContext);
    return context
}

export default function ThemeProvider({children} : any){
    const [theme, setTheme] = useState<any>()
    const [choose,setChoose] = useState<boolean>(false);
    const darkTheme = {
        primaryColor : '#635FC7',
        bg : '#2B2C37',
        darkBg : '#20212C',
        font : '#828FA3',
        font2 : '#fff'
    }
    const lightTheme = {
        primaryColor : '#635FC7',
        bg : '#fff',
        darkBg : '#e9effa84',
        font : '#828FA3',
        font2 : '#000'
    }
    const themeHandler = () =>{
        console.log(theme)
        if(!choose){
            setTheme(lightTheme);
            localStorage.setItem('theme','light');
            setChoose(true)
            return
        }setTheme(darkTheme);
        localStorage.setItem('theme','dark');
        setChoose(false)
    }

    useEffect(()=>{
        if(localStorage.getItem('theme')){
            if(localStorage.getItem('theme') === 'dark'){
                setTheme(darkTheme);
                setChoose(false)
                return
            }setTheme(lightTheme)
            setChoose(true)
        }else{
            const pcTheme = window.matchMedia('(prefers-color-scheme: dark)');
            if(pcTheme.matches){
                setTheme(darkTheme);
                setChoose(false)
                return
            }setTheme(lightTheme);
            setChoose(true)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    return(
        <themeContext.Provider value={{
            theme,
            themeHandler,
            choose
        }}>
            {children}
        </themeContext.Provider>
    )
}