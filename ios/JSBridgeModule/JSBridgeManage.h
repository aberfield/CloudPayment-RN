//
//  JSBridgeManage.h
//  CloudPaymentProject
//
//  Created by 刘芳友 on 16/6/16.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RCTBridgeModule.h"
#import "AppDelegate+ShareLogin.h"
#import "RCTLog.h"
#import "RCTComponent.h"

@interface JSBridgeManage : NSObject<RCTBridgeModule>

@property (nonatomic,copy) RCTBubblingEventBlock onChange;

@end
