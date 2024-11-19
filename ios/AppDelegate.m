#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <AVFoundation/AVFoundation.h>
#import <AVKit/AVKit.h>
#import <UIKit/UIKit.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "RNSplashScreen.h"
#import <React/RCTI18nUtil.h>
#import "Orientation.h"
#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <Firebase.h>
#import <AVFoundation/AVFoundation.h>
#import <React/RCTLinkingManager.h>
#import <UserNotifications/UserNotifications.h>
#import <RNCPushNotificationIOS.h>
#import "Awsatapp-Swift.h"

// uncomment below lines to enable Flipper if required

// #ifdef FB_SONARKIT_ENABLED
// #import <FlipperKit/FlipperClient.h>
// #import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
// #import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
// #import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
// #import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
// #import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>


// static void InitializeFlipper(UIApplication *application) {
//   FlipperClient *client = [FlipperClient sharedClient];
//   SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
//   [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
//   [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
//   [client addPlugin:[FlipperKitReactPlugin new]];
//   [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
//   [client start];
// }
// #endif

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FBSDKApplicationDelegate.sharedInstance initializeSDK];
  [FIRApp configure];
  
  [self setUpWatchConnectivity];
  
  // #ifdef FB_SONARKIT_ENABLED
  //   InitializeFlipper(application);
  // #endif

  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"Awsatapp"
                                            initialProperties:nil];

  if (@available(iOS 13.0, *)) {
      rootView.backgroundColor = [UIColor systemBackgroundColor];
      // rootView.backgroundColor = [UIColor blackColor];
  } else {
      // rootView.backgroundColor = [UIColor blackColor];
      rootView.backgroundColor = [UIColor systemBackgroundColor];
  }

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  // grab a local URL to our video
  NSURL *videoURL = [[NSBundle mainBundle]URLForResource:@"splashscreen" withExtension:@"mp4"];
  if ([UIDevice currentDevice].userInterfaceIdiom == UIUserInterfaceIdiomPad) {
    if (UIDeviceOrientationIsLandscape([UIDevice currentDevice].orientation)) {
          videoURL = [[NSBundle mainBundle]URLForResource:@"ipadhorizontal" withExtension:@"mp4"];
    }
    else {
          videoURL = [[NSBundle mainBundle]URLForResource:@"ipadvertical" withExtension:@"mp4"];
    }
  }
  else {
    videoURL = [[NSBundle mainBundle]URLForResource:@"splashscreen" withExtension:@"mp4"];
  }


   // create an AVPlayer
   AVPlayer *player = [AVPlayer playerWithURL:videoURL];
   player.volume = 0;
  
  [[RCTI18nUtil sharedInstance] allowRTL:YES];
  [[RCTI18nUtil sharedInstance] forceRTL:YES];
  [RNSplashScreen show];
   
   // create a player view controller
   AVPlayerViewController *splashController = [[AVPlayerViewController alloc]init];
   splashController.player = player;
   splashController.showsPlaybackControls = false;
   splashController.allowsPictureInPicturePlayback = false;
   splashController.view.frame = self.window.frame;
   splashController.view = rootView;
   splashController.videoGravity = AVLayerVideoGravityResizeAspectFill;
   splashController.modalPresentationStyle = UIModalPresentationFullScreen;
   self.window.rootViewController = splashController;
   [player play];
   [self.window makeKeyAndVisible];

   // Adding Observer for your video file,
   NSNotificationCenter *notificationCenter = [NSNotificationCenter defaultCenter];
   [notificationCenter addObserver:self selector:@selector(videoDidFinish:) name:AVPlayerItemDidPlayToEndTimeNotification object:nil];

  rootViewController.view = rootView;

  //Set initial route to rootViewController
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(3 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
      self.window.rootViewController = rootViewController;
      [self.window makeKeyAndVisible];
  });
  
  // Play Audio in Silent Mode
  AVAudioSession *audioSession = [AVAudioSession sharedInstance];
  NSError *setCategoryError = nil;
  [audioSession setCategory:AVAudioSessionCategoryPlayback
                      error:&setCategoryError];

  [[FBSDKApplicationDelegate sharedInstance] application:application
                        didFinishLaunchingWithOptions:launchOptions];

  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
    center.delegate = self;

  return YES;
}

- (void)videoDidFinish:(id)notification {
   //Remove Observer
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

// Required for the register event.
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
 [RNCPushNotificationIOS didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}
// Required for the notification event. You must call the completion handler after handling the remote notification.
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
  [RNCPushNotificationIOS didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}
// Required for the registrationError event.
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
 [RNCPushNotificationIOS didFailToRegisterForRemoteNotificationsWithError:error];
}
// Required for localNotification event
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
didReceiveNotificationResponse:(UNNotificationResponse *)response
         withCompletionHandler:(void (^)(void))completionHandler
{
  [RNCPushNotificationIOS didReceiveNotificationResponse:response];
}

//Called when a notification is delivered to a foreground app.
-(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
{
  completionHandler(UNNotificationPresentationOptionSound | UNNotificationPresentationOptionList | UNNotificationPresentationOptionBanner | UNNotificationPresentationOptionBadge);
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (UIInterfaceOrientationMask)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window {
//    while ([[UIDevice currentDevice] isGeneratingDeviceOrientationNotifications]) {
//        [[UIDevice currentDevice] endGeneratingDeviceOrientationNotifications];
//    }
  
    return [Orientation getOrientation];
}


- (BOOL)application:(UIApplication *)app
openURL:(NSURL *)url
options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  if ([[FBSDKApplicationDelegate sharedInstance] application:app openURL:url options:options]) {
  return YES;
  }
  if ([RCTLinkingManager application:app openURL:url options:options]) {
  return YES;
  }
  return NO;
}

@end
