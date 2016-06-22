//
//  AppDelegate+ShareLogin.h
//  NNK_ZT_APP
//
//  Created by 刘芳友 on 15/10/26.
//  Copyright © 2015年 NNK. All rights reserved.
//

#import "AppDelegate.h"
#import "WXApi.h"


typedef enum : NSUInteger {
    textType = 0,                        /**< 分享文字    */
    imageType,                           /**< 分享图片    */
    musicType,                           /**< 分享音乐    */
    voideType,                           /**< 分享视频    */
    webpageType,                         /**< 分享网页    */
} WXShareType;

typedef enum : NSUInteger {
    shareSceneSession  = 0,        /**< 聊天界面    */
    shareSceneTimeline = 1,        /**< 朋友圈      */
    shareSceneFavorite = 2,        /**< 收藏       */
}WXShareScene;


@interface PayModel : NSObject

@property (nonatomic, strong) NSString *prepayId;
@property (nonatomic, strong) NSString *nonceStr;
@property (nonatomic, strong) NSString *timeStamp;
@property (nonatomic, strong) NSString *signType;
@property (nonatomic, strong) NSString *paySign;

- (instancetype)initWithDic:(NSDictionary*)dic;

@end

typedef void(^WxUserInfoBlock)(NSDictionary* dic);
typedef void(^WxPayFinishBlock)(NSInteger type);
typedef void(^WxShareFinishBlock)(NSInteger type);

@interface AppDelegate (ShareLogin)<WXApiDelegate>


@property (nonatomic,copy) WxUserInfoBlock      wxInfoBlock;
@property (nonatomic,copy) WxPayFinishBlock      payFinishBlock;
@property (nonatomic,copy) WxShareFinishBlock   shareFinishBlock;


- (void)setupLoginSDK;
- (void)sendAuthRequest;
- (void)payReqWith:(PayModel*)payModel;

/**
 *  微信分享文本信息
 *
 *  @param shareScene 分享场景
 *  @param contentStr 分享内容
 *
 *  @return 分享成功或者失败
 */
- (BOOL)wxShareActionWithScene:(WXShareScene)shareScene shareContent:(NSString*)contentStr;


/**
 *  分享多媒体内容，包括图片，音乐，视频，网页
 *
 *  @param shareScene 分享到的场景
 *  @param message    多媒体信息，一般带有四个参数   title：标题   description：描述    ThumbImage：缩略图   mediaObject：多媒体对象
 *  多媒体数据对象，可以为WXImageObject，WXMusicObject，WXVideoObject，WXWebpageObject等。
 *  @return 分享成功或失败
 */
- (BOOL)wxShareActionWithShareScene:(WXShareScene)shareScene MediaMessage:(WXMediaMessage*)message;

@end
