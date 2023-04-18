//
//  TodayTabViewManager.m
//  Awsatapp
//
//  Created by Deepak Kumar on 11/05/22.
//

#import "TodayTabViewManager.h"
#import "Awsatapp-Swift.h"


@implementation TodayTabViewManager

+ (BOOL)requiresMainQueueSetup {
    return true;
}

RCT_EXPORT_MODULE(RNTodayTabView)

-(UIView *) view {
    return [TodayTabView new];
}

RCT_EXPORT_VIEW_PROPERTY(onItemClick, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onArchiveButtonClick, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onDownloadComplete, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(isActive, BOOL)

@end
