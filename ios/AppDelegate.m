#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "RNSplashScreen.h"
#import <React/RCTI18nUtil.h>
#import "Orientation.h"
#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <Firebase.h>
#import <AVFoundation/AVFoundation.h>
#import <React/RCTLinkingManager.h>  


#ifdef FB_SONARKIT_ENABLED
#import <FlipperKit/FlipperClient.h>
#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>


static void InitializeFlipper(UIApplication *application) {
  FlipperClient *client = [FlipperClient sharedClient];
  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
  [client addPlugin:[FlipperKitReactPlugin new]];
  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
  [client start];
}
#endif

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FBSDKApplicationDelegate.sharedInstance initializeSDK];
  [FIRApp configure];
#ifdef FB_SONARKIT_ENABLED
  InitializeFlipper(application);
#endif

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
  [[RCTI18nUtil sharedInstance] allowRTL:YES];
  [[RCTI18nUtil sharedInstance] forceRTL:YES];
  [RNSplashScreen show];
  
  // Play Audio in Silent Mode
  AVAudioSession *audioSession = [AVAudioSession sharedInstance];
  NSError *setCategoryError = nil;
  [audioSession setCategory:AVAudioSessionCategoryPlayback
                      error:&setCategoryError];

  [[FBSDKApplicationDelegate sharedInstance] application:application
                        didFinishLaunchingWithOptions:launchOptions];

  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
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
