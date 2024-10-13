import { firebase } from '@react-native-firebase/remote-config'
import React, { useEffect } from 'react'
import arabic from 'src/assets/locales/ar/arabic.json';
import { useFetchArabicData } from '../../hooks/useFetchArabicData';
export const FetchArabicData = () => {
    const arabicWords: any = arabic;
    const { fetchArabicData } = useFetchArabicData();
            
    /*
    ** Get data from the firebase remote config.
    ** setDefaults() -> set the default value, if the value is not received from the firebase remote config.
    ** fetchAndActivate() -> It will fetch the data and activate.
    */
        
    useEffect(() => {
        firebase.remoteConfig().setDefaults({
            arabic: arabicWords
        })
            .then(() => firebase.remoteConfig().fetchAndActivate())
            .then(() => {
                const result = firebase.remoteConfig().getValue('arabic')._value;
                const resultJSON = JSON.parse(result)
                fetchArabicData(resultJSON)
            })
            .catch(error => console.log(error))

    }, [])
    return <></>
}
