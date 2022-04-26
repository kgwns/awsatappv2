import { ImagesName } from "../images";
import { getSvgImages } from "../svgImages";

jest.mock('react', () => {
    const ActualReact = jest.requireActual('react')
    return {
      ...ActualReact,
      useContext: () => ({ }), // what you want to return when useContext get fired goes here
    }
  })

describe('SvgImages', () => {
    test('svg', () => {

        expect(getSvgImages({ name: ImagesName.fontScaling })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.themeChange })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.share })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.bookMarkSVG })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.bookMarkActiveSVG })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.applePodcast })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.googlePodcast })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.spotifyPodcast })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.closeSVG })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.playIconSVG })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.appleIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.facebookIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.googleIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.mailIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.clock })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.arrowLeftFaced })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.returnIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.searchIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.headerLogo })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.menuIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.newsIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.newsActiveIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.sectionsIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.sectionsActiveIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.mostReadIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.mostReadActiveIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.favoriteIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.favoriteActiveIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.arrowNext })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.arrowPrev })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.authorItem })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.authorItemActive })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.notificationSelected })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.notification })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.bookMarkWhite })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.bookMarkWhiteActive })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.mail })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.mailSelected })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.notificationGrey })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.manageNews })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.newsLetter })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.profile })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.exit })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.pen })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.bookmark })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.arrowLeftGrey })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.plusSvg })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.returnGreenish })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.userDefaultIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.editIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.dropDownIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.returnBlackSvg })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.playerCloseIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.pauseIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.leftArrowIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.downArrowIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.plusGreen })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.tickIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.returnSvg })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.default  })).toBe(null);
    });
})