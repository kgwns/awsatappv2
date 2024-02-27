#import <RCTAppDelegate.h>
#import <UIKit/UIKit.h>
#import <UserNotifications/UNUserNotificationCenter.h>
#import <WatchConnectivity/WatchConnectivity.h>

@interface AppDelegate : RCTAppDelegate <UIApplicationDelegate, RCTBridgeDelegate, UNUserNotificationCenterDelegate>

@property (nonatomic, strong) WCSession *watchSession;

@end
