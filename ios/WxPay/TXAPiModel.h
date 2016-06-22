//
//  TXAPIModel.h
//  TongxingSdk
//
//  Created by 刘芳友 on 16/2/23.
//  Copyright © 2016年 NNK. All rights reserved.
//

#import <Foundation/Foundation.h>

/**
 *  支付结果枚举
 */
typedef enum : NSUInteger {
    TXPaySuccess = 1,           //支付成功
    TXPayCancel = 2,            //支付失败
    TXPayFail = 3,              //参数错误
} PayResult;

/**
 *  业务类型枚举，此枚举为SDK返回给SDK使用方，
 */
typedef enum : NSUInteger {
    TalkRecharge = 1,           //话费业务
    FlowRecharge,               //流量业务
    OilRecharge,                //石油卡业务
    TrafficRecharge,            //交通罚款业务
    UtilityExpenseRecharge,     //水电煤业务
    GameRecharge,               //游戏币充值
    BroadBandRecharge = 7,      //宽带业务充值
} OrderType;

/**
 *  账号类型枚举,此枚举标明 SDK传入userId的类型
 */
typedef enum : NSUInteger {
    BerbonId = 1,               //倍棒账号ID
    XXXXId   = 2,               //缺省项
}UserIdType;

/**
 *  业务类型枚举，此枚举为SDK返回给SDK使用方，
 */
typedef enum : NSUInteger {
    CloudPaymentMenu = 0,           //业务集成菜单
    TalkRechargeMenu,               //话费业务
    FlowRechargeMenu,               //流量业务
    OilRechargeMenu,                //石油卡业务
    TrafficRechargeMenu,            //交通罚款业务
    UtilityExpenseRechargeMenu,     //水电煤业务
    GameRechargeMenu,               //游戏币充值
    BroadBandRechargeMenu = 7,      //宽带业务充值
} MenuType;

typedef enum : NSUInteger {
    CustomPayType = 1,          //商户自定义支付方式
    SDKPayType = 2,             //SDK自带支付方式
} PayType;


@interface BaseModel : NSObject

- (instancetype)initWithDic:(NSDictionary*)modelDic;

@end

@interface MerInfoModel : BaseModel

@property (nonatomic, copy) NSString  *merchId;                 //商户ID
@property (nonatomic, copy) NSString  *userId;                  //用户ID
@property (nonatomic, copy) NSString  *payType;                 //支付类型
@property (nonatomic, assign) UserIdType  userIdtype;           //用户账号类型，无此需求可以不传。

@end

@interface OrderInfoModel : BaseModel

@property (nonatomic, copy) NSString    *payType;               //支付类型
@property (nonatomic, copy) NSString    *userPayAmount;         //用户所需支付金额
@property (nonatomic, copy) NSString    *orderId;               //订单ID
@property (nonatomic, copy) NSString    *phone;                 //手机号码
@property (nonatomic, copy) NSString    *sign;                  //签名信息
@property (nonatomic, copy) NSString    *merPayAmount;          //商户所需支付金额
@property (nonatomic, strong) NSNumber    *orderType;             //业务类型
@property (nonatomic, assign) NSInteger amount;                 //金额


@end

@interface OrderResultModel : BaseModel

@property (nonatomic, strong) OrderInfoModel *orderInfoModel;           //订单详情model
@property (nonatomic, assign) PayResult     payResult;                  //支付结果状态
@property (nonatomic, copy)   NSString      *merchId;                   //商户ID

@end

@interface BerbonInfoModel : BaseModel

@property (nonatomic, copy)     NSString    *wxShareUrl;                //微信分享链接
@property (nonatomic, copy)     NSString    *wxShareTitle;              //微信分享title
@property (nonatomic, copy)     NSString    *wxShareDescription;        //微信分享描述
@property (nonatomic, copy)     NSString    *wxSharePicUrl;             //微信分享的图片地址和applogo的东西
@property (nonatomic, copy)     NSString    *wxSharePicData;            //微信分享图片data格式
@property (nonatomic,assign)    BOOL        wxShareIsPic;               //wxShareIsPic=1 分享的图片内容以picUrl的格式传入SDK，为0以base64编码格式传入SDK

@end




@interface TXAPiModel : NSObject

@end

