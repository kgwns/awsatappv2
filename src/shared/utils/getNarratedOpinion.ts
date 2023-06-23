import { AxiosError } from "axios";
import { fetchNarratedOpinionArticleApi } from "src/services/narratedOpinionArticleService";
import { convertSecondsToHMS, isNonEmptyArray, isObjectNonEmpty } from "./utilities";

export const getNarratedOpinion = async(jwPlayerID:any,setMediaData:(opinionData:any) => void,setTimeDuration: (time:string | null) => void) => {
    try {
      const opinionData = await fetchNarratedOpinionArticleApi({ jwPlayerID })
      if(isObjectNonEmpty(opinionData)){
        setMediaData(opinionData);
        const playList = isNonEmptyArray(opinionData.playlist) ? opinionData.playlist[0] : null;
          if(playList){
          const time = playList.duration? convertSecondsToHMS(playList.duration) : null;
          setTimeDuration(time)
          } 
      }
    } catch (error) {
      const errorResponse: AxiosError = error as AxiosError;
      if (errorResponse.response) {
        const errorMessage: { message: string } = errorResponse.response.data;
        console.log(errorMessage,'errorMessage');
      }
    }
}
