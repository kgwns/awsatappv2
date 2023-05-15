import { ImagesName } from "../images";
import { getSvgImages } from "../svgImages";
import { useTheme } from 'src/shared/styles/ThemeProvider';

jest.mock('react', () => {
    const ActualReact = jest.requireActual('react')
    return {
      ...ActualReact,
      useContext: () => ({ }), // what you want to return when useContext get fired goes here
    }
  })

  jest.mock('src/shared/styles/ThemeProvider', () => {
    const ActualReact = jest.requireActual('src/shared/styles/ThemeProvider')
    return {
      ...ActualReact,
      useTheme: jest.fn(), 
    }
  })

describe('SvgImages', () => {
  const useThemeMock = jest.fn()

    test('svg', () => {
      (useTheme as jest.Mock).mockImplementation(useThemeMock)
       useThemeMock.mockReturnValue({themeData:{id:'dark'}})

        expect(getSvgImages({ name: ImagesName.fontScaling })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.themeChange })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.share })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.bookMarkSVG })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.bookMarkActiveSVG })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.applePodcast })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.googlePodcast })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.spotifyPodcast })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.anghamiPodcast })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.returnWhiteIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.arrowLeftFacedBlack })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.listToggleIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.playForwardIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.playBackwardIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.headPhoneIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.printVersionActiveIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.printVersionGrayIcon })).toBeDefined();  
        expect(getSvgImages({ name: ImagesName.logoBlack})). toBeDefined();
        expect(getSvgImages({ name: ImagesName.gridToggleIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.popupImage })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.myNewsActiveIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.facebookGray })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.instagramGray })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.twitterGray })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.shareGray })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.bookmarkGray })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.menuCloseIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.clockWhite })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.closeSVG })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.playIconSVG })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.appleIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.facebookIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.googleIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.mailIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.clock })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.arrowLeftFaced })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.returnIconName })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.searchIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.headerLogo })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.headerLogoDark })).toBeDefined();
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
        expect(getSvgImages({ name: ImagesName.flagIcon})). toBeDefined()
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
        expect(getSvgImages({ name: ImagesName.greenArrowLeft })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.returnSvg })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.default  })).toBe(null);
        expect(getSvgImages({ name: ImagesName.weatherThermometerIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.weatherRainIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.WeatherIcon3 })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.cloudsIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.cloudyWindyIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.rainIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.snowIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.sunIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.calendarIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.videoCloseIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.myNewsIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.homeIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.profileNameIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.emailGrayIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.chatBubbleIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.photoIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.popupLogo })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.subscribeIconWhite })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.subscribeIconGreen })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.resetIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.liveIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.thunderIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.WeatherIcon4 })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.celsiusIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.sunImageIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.cloudImageIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.fogImageIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.rainImageIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.sunCloudsImageIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.WeatherIcon5 })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.WeatherIcon6 })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.weatherDayIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.weatherNightIcon })).toBeDefined();
        expect(getSvgImages({ name: ImagesName.weatherNightIcon })).toBeDefined(); 
    });
    
    test('svg Light Theme ', () => {
      (useTheme as jest.Mock).mockImplementation(useThemeMock)
      useThemeMock.mockReturnValue({themeData:{id:'light'}})
      expect(getSvgImages({ name: ImagesName.themeChange })).toBeDefined();
      expect(getSvgImages({ name: ImagesName.share })).toBeDefined();
      expect(getSvgImages({ name: ImagesName.bookMarkSVG })).toBeDefined();
      expect(getSvgImages({ name: ImagesName.bookMarkActiveSVG })).toBeDefined();
      expect(getSvgImages({ name: ImagesName.applePodcast })).toBeDefined();
      expect(getSvgImages({ name: ImagesName.googlePodcast })).toBeDefined();
      expect(getSvgImages({ name: ImagesName.spotifyPodcast })).toBeDefined();
      expect(getSvgImages({ name: ImagesName.anghamiPodcast })).toBeDefined();
      expect(getSvgImages({ name: ImagesName.clock })).toBeDefined();
      expect(getSvgImages({ name: ImagesName.searchIcon })).toBeDefined();
      expect(getSvgImages({ name: ImagesName.headerLogo })).toBeDefined();
      expect(getSvgImages({ name: ImagesName.menuIcon })).toBeDefined();
      expect(getSvgImages({ name: ImagesName.newsIcon })).toBeDefined();
      expect(getSvgImages({ name: ImagesName.newsActiveIcon })).toBeDefined();
      expect(getSvgImages({ name: ImagesName.mostReadIcon })).toBeDefined();
      expect(getSvgImages({ name: ImagesName.mostReadActiveIcon })).toBeDefined();
      expect(getSvgImages({ name: ImagesName.notificationSelected })).toBeDefined();
      expect(getSvgImages({ name: ImagesName.notification })).toBeDefined();
      expect(getSvgImages({ name: ImagesName.notificationGrey })).toBeDefined();
      expect(getSvgImages({ name: ImagesName.manageNews })).toBeDefined();
      expect(getSvgImages({ name: ImagesName.newsLetter })).toBeDefined();
      expect(getSvgImages({ name: ImagesName.profile })).toBeDefined();
      expect(getSvgImages({ name: ImagesName.exit })).toBeDefined();
      expect(getSvgImages({ name: ImagesName.pen })).toBeDefined();
      expect(getSvgImages({ name: ImagesName.bookmark })).toBeDefined();
      expect(getSvgImages({ name: ImagesName.returnSvg })).toBeDefined();
      expect(getSvgImages({ name: ImagesName.returnGreenish })).toBeDefined();
      expect(getSvgImages({ name: ImagesName.dropDownIcon })).toBeDefined();
      expect(getSvgImages({ name: ImagesName.returnBlackSvg })).toBeDefined();
      expect(getSvgImages({ name: ImagesName.playerCloseIcon })).toBeDefined();
      expect(getSvgImages({ name: ImagesName.arrowLeftFacedBlack })).toBeDefined();
      expect(getSvgImages({ name: ImagesName.facebookGray })).toBeDefined();
      expect(getSvgImages({ name: ImagesName.instagramGray })).toBeDefined();
      expect(getSvgImages({ name: ImagesName.twitterGray })).toBeDefined();
      expect(getSvgImages({ name: ImagesName.shareGray })).toBeDefined();
      expect(getSvgImages({ name: ImagesName.bookmarkGray })).toBeDefined();
      expect(getSvgImages({ name: ImagesName.menuCloseIcon })).toBeDefined();
      expect(getSvgImages({ name: ImagesName.gridToggleIcon })).toBeDefined();
      expect(getSvgImages({ name: ImagesName.listToggleIcon })).toBeDefined();
      expect(getSvgImages({ name: ImagesName.calendarIcon })).toBeDefined();
      expect(getSvgImages({ name: ImagesName.homeIcon })).toBeDefined();

    })
})