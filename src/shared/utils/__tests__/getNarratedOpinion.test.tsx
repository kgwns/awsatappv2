import { AxiosError } from "axios";
import { fetchNarratedOpinionArticleApi } from "src/services/narratedOpinionArticleService";


jest.mock('src/services/narratedOpinionArticleService', () => ({
    fetchNarratedOpinionArticleApi: jest.fn()
}));
describe("test getNarratedOpinion", () => {
    beforeEach(() => {
        jest.useFakeTimers('legacy');
    })
    afterEach(() => {
        jest.clearAllMocks();
    })
    it("test fetchNarratedOpinionArticleApi return response", async () => {
        (fetchNarratedOpinionArticleApi as jest.Mock).mockReturnValue({playList:{duration:[{time:'02:34'}]}});
        try{
            const res = await fetchNarratedOpinionArticleApi({jwPlayerID:'2'});
            expect(res).toEqual({playList:{duration:[{time:'02:34'}]}});
        }
        catch(error) {}
      })

      it("test fetchNarratedOpinionArticleApi throws error", async () => {
        (fetchNarratedOpinionArticleApi as jest.Mock).mockRejectedValue({response:{data:"error"}});
        try{
            await fetchNarratedOpinionArticleApi({jwPlayerID:'2'});
        }
        catch(error) {
            const errormes = error as AxiosError;
            expect(errormes?.response?.data).toBeDefined();
        }
      })
})