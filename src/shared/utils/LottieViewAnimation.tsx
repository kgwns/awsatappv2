import React,{useRef,useState,useEffect} from 'react';
import {AppState} from 'react-native';
import LottieView from 'lottie-react-native';

export const LottieViewAnimation = ({source,style}:any) => {
    const [animationRef, setAnimationRef] = useState<LottieView>()
    const appState = useRef(AppState.currentState);
    useEffect(() => {
        const subscription = AppState.addEventListener("change", nextAppState => {
            if (appState?.current?.match(/inactive|background/) && nextAppState === "active" && animationRef) {
                animationRef?.resume();
            }
            appState.current = nextAppState;
        });
        return () => { 
            subscription.remove(); 
        };
    }, [animationRef]);
    return (
        <LottieView
            source={source}
            autoPlay
            style = {style}
            ref={ref => setAnimationRef(ref)}
        />
    )
}
