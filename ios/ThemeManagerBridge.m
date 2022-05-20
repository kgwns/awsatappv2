//
//  ThemeManagerBridge.m
//  Awsatapp
//
//  Created by Deepak Kumar on 20/05/22.
//

// ThemeManagerBridge.m
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(ThemeManager, NSObject)

RCT_EXTERN_METHOD(setTheme:(NSString *)theme)

@end
