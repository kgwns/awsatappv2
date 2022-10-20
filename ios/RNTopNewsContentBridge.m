//
//  RNTopNewsContentBridge.m
//  Awsatapp
//
//  Created by Gowri Shankaran on 12/10/22.
//

#import "RNTopNewsContentBridge.h"
#import "AppDelegate.h"
#import <React/RCTLog.h>
#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "Awsatapp-Swift.h"

@implementation RNTopNewsContentBridge

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(syncTopStories: (NSDictionary *) topStories)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    AppDelegate *appDelegate = (AppDelegate*)[[UIApplication sharedApplication] delegate];
    [appDelegate syncTopStories: topStories];
    }
  );
}

@end
