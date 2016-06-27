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
    //因为没有填写相应微信APPId，所以跳转不到微信，这里也肯定是收不到回调的。
    callback(@[[NSString stringWithFormat:@"%ld",(long)payFinishCode]]);
  };
  //如果设置了微信相关信息，可以把这里给注释掉呢
//  callback(@[@"0"]);
  
}

@end
