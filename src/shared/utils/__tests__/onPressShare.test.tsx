import Share from "react-native-share";
import { AlbumDetailType } from "src/redux/photoGallery/types";
import { onPressShare } from "../onPressShare"

const mockString = 'mockString';
const data: AlbumDetailType = {
    title: mockString,
    type: 'album',
    field_album_img_export: mockString,
    field_photo_album_export: [mockString],
    body_export: mockString,
    nid: '2982206',
    view_node: mockString,
    created_export: new Date(),
    created: new Date(),
    field_album_source_export: null,
    isBookmarked: false,
    field_photo_album_export_1:[mockString],
    field_shorturl:mockString
};
describe("test share function and return response",() => {
    it("should render a function and move to response block",() => {
        jest.spyOn(Share,'open').mockResolvedValue({response:true} as any);
        let instance = onPressShare(data);
        expect(instance).toBeDefined();
    })
    it("should render a function and throws error",() => {
        jest.spyOn(Share,'open').mockRejectedValue({error:true} as any);
        let instance = onPressShare(data);
        expect(instance).toBeDefined();
    })
})