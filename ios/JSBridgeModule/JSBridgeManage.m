//
//  JSBridgeManage.m
//  CloudPaymentProject
//
//  Created by 刘芳友 on 16/6/16.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "JSBridgeManage.h"
#import "RCTEventDispatcher.h"
#import "RCTBridge.h"
#import "UIView+React.h"
#import "RCTComponent.h"



@implementation JSBridgeManage

@synthesize  bridge = _bridge;

RCT_EXPORT_MODULE();


RCT_EXPORT_METHOD(addPaymentEvent:(NSDictionary*)orderInfoDic callback:(RCTResponseSenderBlock)callback){
  RCTLogInfo(@"%@",orderInfoDic);
  //调起支付
  PayModel *model = [[PayModel alloc] initWithDic:orderInfoDic];
  AppDelegate *app = (AppDelegate*)[UIApplication sharedApplication].delegate;
  [app payReqWith:model];
  app.payFinishBlock = ^(NSInteger payFinishCode){
    callback(@[[NSString stringWithFormat:@"%ld",(long)payFinishCode]]);
  };
}

RCT_EXPORT_METHOD(findEvents:(NSDictionary*)orderInfoDic callback:(RCTResponseSenderBlock)callback)
{
  NSArray *events = @[@"1",@"2"];
  callback(@[[NSNull null], events]);
}


- (void)paymentFinishEvent:(NSNotification*)notification
{
  NSString *eventName = notification.userInfo[@"name"];
  [self.bridge.eventDispatcher sendAppEventWithName:@"EventReminder" body:@{@"name":eventName}];
  
}

@end
