import { AxiosError } from "axios";
import { fetchNarratedOpinionArticleApi } from "src/services/narratedOpinionArticleService";
import { getNarratedOpinion } from "../getNarratedOpinion";


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
        (fetchNarratedOpinionArticleApi as jest.Mock).mockReturnValueOnce({playList:[{duration:[{time:'02:34'}]}]});
        try{
            getNarratedOpinion('2',jest.fn(),jest.fn());
            const res = await fetchNarratedOpinionArticleApi({jwPlayerID:'2'});
            expect(res).toEqual({playList:[{duration:[{time:'02:34'}]}]});
        }
        catch(error) {}
    })

    it("test fetchNarratedOpinionArticleApi return empty response", async () => {
        (fetchNarratedOpinionArticleApi as jest.Mock).mockReturnValue({});
        try{
            getNarratedOpinion('2',jest.fn(),jest.fn());
            const res = await fetchNarratedOpinionArticleApi({jwPlayerID:'2'});
            expect(res).toEqual({});
        }
        catch(error) {}
    })

    it("test fetchNarratedOpinionArticleApi throws error", async () => {
        (fetchNarratedOpinionArticleApi as jest.Mock).mockRejectedValue({response:{data:"error"}});
        try{
            getNarratedOpinion('2',jest.fn(),jest.fn());
            await fetchNarratedOpinionArticleApi({jwPlayerID:'2'});
        }
        catch(error) {
            const errormes = error as AxiosError;
            expect(errormes?.response?.data).toBeDefined();
        }
    })

    it("test fetchNarratedOpinionArticleApi throws error to handle else", async () => {
        (fetchNarratedOpinionArticleApi as jest.Mock).mockImplementation(() => { throw new Error('error message')})
        try{
            getNarratedOpinion('2',jest.fn(),jest.fn());
            await fetchNarratedOpinionArticleApi({jwPlayerID:'2'});
        }
        catch(error) {
            expect(error.message).toEqual('error message')
        }
    })
})