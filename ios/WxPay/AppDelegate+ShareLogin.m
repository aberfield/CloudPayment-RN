
//
//  AppDelegate+ShareLogin.m
//  NNK_ZT_APP
//
//  Created by 刘芳友 on 15/10/26.
//  Copyright © 2015年 NNK. All rights reserved.
//


//#warning //这是我公司的微信App-Id和秘钥，我肯定不会告诉你啦,哈哈哈哈
//#define APP_ID          @""               //APPID
//#define APP_SECRET      @""               //appsecret
////商户号，填写商户对应参数
//#define MCH_ID          @""
////商户API密钥，填写相应参数
//#define PARTNER_ID      @""



#define APP_ID          @"wx0c95e99989149e5d"               //APPID
#define APP_SECRET      @"80ed42921fdcd9c2c80c440b46127489" //appsecret
//商户号，填写商户对应参数
#define MCH_ID          @"1277792301"
//商户API密钥，填写相应参数
#define PARTNER_ID      @"NNK007KA201510222015102220151022"


//支付结果回调页面
#define NOTIFY_URL      @"http://wxpay.weixin.qq.com/pub_v2/pay/notify.v2.php"
//获取服务器端支付数据地址（商户自定义）
#define SP_URL          @"http://wxpay.weixin.qq.com/pub_v2/app/app_pay.php"


#import "AppDelegate+ShareLogin.h"
#import <objc/message.h>
#import "common.h"

@implementation PayModel

- (instancetype)initWithDic:(NSDictionary*)dic
{
    self = [super init];
    if (self) {
        self.prepayId = [dic[@"package"] componentsSeparatedByString:@"="][1];
        self.timeStamp = dic[@"timeStamp"];
        self.nonceStr = dic[@"nonceStr"];
        self.signType = dic[@"signType"];
        
        NSMutableDictionary *signParams = [NSMutableDictionary dictionary];
        [signParams setObject: APP_ID forKey:@"appid"];
        [signParams setObject: self.nonceStr forKey:@"noncestr"];
        [signParams setObject: @"Sign=WXPay" forKey:@"package"];
        [signParams setObject: MCH_ID        forKey:@"partnerid"];
        [signParams setObject: self.timeStamp forKey:@"timestamp"];
        [signParams setObject: self.prepayId forKey:@"prepayid"];
        
        self.paySign  = [self createMd5Sign:signParams];;
    }
    return self;
}

//创建package签名
-(NSString*)createMd5Sign:(NSMutableDictionary*)dict
{
    NSMutableString *contentString  =[NSMutableString string];
    NSArray *keys = [dict allKeys];
    //按字母顺序排序
    NSArray *sortedArray = [keys sortedArrayUsingComparator:^NSComparisonResult(id obj1, id obj2) {
        return [obj1 compare:obj2 options:NSNumericSearch];
    }];
    //拼接字符串
    for (NSString *categoryId in sortedArray) {
        if (![[dict objectForKey:categoryId] isEqualToString:@""]
        && ![categoryId isEqualToString:@"sign"]
            && ![categoryId isEqualToString:@"key"]
            )
        {
            [contentString appendFormat:@"%@=%@&", categoryId, [dict objectForKey:categoryId]];
        }
    }
    //添加key字段
    [contentString appendFormat:@"key=%@", PARTNER_ID];
    //得到MD5 sign签名
    NSString *md6Sign =[contentString md5String];
    NSString *md5Sign = [StringHelper md5:contentString];
    
    NSLog(@"%@:%@",md5Sign,md6Sign);
    //输出Debug Info
    
    return md5Sign;
}

@end


static const NSString *infoKey;
static const NSString *payFinishKey;
static const NSString *shareFinishKey;
@implementation AppDelegate (ShareLogin)

#pragma mark - Init
- (void)setupLoginSDK
{
    [WXApi registerApp:APP_ID withDescription:@"weixin"];
}


-(void)sendAuthRequest
{
    //构造SendAuthReq结构体
    SendAuthReq* req =[[SendAuthReq alloc ] init ];
    req.scope = @"snsapi_userinfo" ;
    req.state = @"123" ;
    //第三方向微信终端发送一个SendAuthReq消息结构
    [WXApi sendReq:req];
}

#pragma mark - GET/Set
- (void)setWxInfoBlock:(WxUserInfoBlock)wxInfoBlock
{
    objc_setAssociatedObject(self, &infoKey, wxInfoBlock, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (WxUserInfoBlock)wxInfoBlock
{
    return objc_getAssociatedObject(self, &infoKey);
}

- (WxPayFinishBlock)payFinishBlock
{
    return objc_getAssociatedObject(self, &payFinishKey);
}

- (void)setPayFinishBlock:(WxPayFinishBlock)payFinishBlock
{
    objc_setAssociatedObject(self, &payFinishKey, payFinishBlock, OBJC_ASSOCIATION_COPY_NONATOMIC);
}

- (void)setShareFinishBlock:(WxShareFinishBlock)shareFinishBlock
{
    objc_setAssociatedObject(self, &shareFinishKey, shareFinishBlock, OBJC_ASSOCIATION_COPY_NONATOMIC);
}

- (WxShareFinishBlock)shareFinishBlock
{
    return objc_getAssociatedObject(self, &shareFinishKey);
}


#pragma mark - Appdelegate
- (BOOL)application:(UIApplication *)application handleOpenURL:(NSURL *)url
{
    return [WXApi handleOpenURL:url delegate:self];
}

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
    return [WXApi handleOpenURL:url delegate:self];
}

#pragma mark - WXApiDelegate
- (void)onReq:(BaseReq *)req
{

}


- (void)onResp:(BaseResp *)resp
{
    /*
     ErrCode ERR_OK = 0(用户同意)
     ERR_AUTH_DENIED = -4（用户拒绝授权）
     ERR_USER_CANCEL = -2（用户取消）
     code    用户换取access_token的code，仅在ErrCode为0时有效
     state   第三方程序发送时用来标识其请求的唯一性的标志，由第三方程序调用sendReq时传入，由微信终端回传，state字符串长度不能超过1K
     lang    微信客户端当前语言
     country 微信用户当前国家信息
     */
    if ([resp isKindOfClass:[SendAuthResp class]]) {
        SendAuthResp *aresp = (SendAuthResp *)resp;
        if (aresp.errCode== 0) {
            NSString *code = aresp.code;
            NSDictionary *dic = @{@"code":code};
            [self getAccess_token:dic];
        }
    }

    if ([resp isKindOfClass:[PayResp class]]){
        PayResp *response=(PayResp*)resp;
        self.payFinishBlock(response.errCode);
        }
    
    if ([resp isKindOfClass:[SendMessageToWXResp class]]) {
        NSInteger resultType = resp.type;
        if (resp.type == 0) {
            resultType = 1;
        }else  {
            resp.type = 0;
        }
        self.shareFinishBlock(resultType);
    }
    
}


#pragma mark - 获取微信token和个人详情
-(void)getAccess_token:(NSDictionary*)dic
{
    //https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code
    
    NSString *url =[NSString stringWithFormat:@"https://api.weixin.qq.com/sns/oauth2/access_token?appid=%@&secret=%@&code=%@&grant_type=authorization_code",APP_ID,APP_SECRET,dic[@"code"]];
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
      NSURL *zoneUrl = [NSURL URLWithString:url];
      NSString *zoneStr = [NSString stringWithContentsOfURL:zoneUrl encoding:NSUTF8StringEncoding error:nil];
      NSData *data = [zoneStr dataUsingEncoding:NSUTF8StringEncoding];
      dispatch_async(dispatch_get_main_queue(), ^{
        if (data) {
          NSDictionary *dic = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableContainers error:nil];
          [self getUserInfo:dic];
        }
      });
    });
}


-(void)getUserInfo:(NSDictionary*)dic
{
  // https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID
  
    NSString *url =[NSString stringWithFormat:@"https://api.weixin.qq.com/sns/userinfo?access_token=%@&openid=%@",dic[@"access_token"],dic[@"openid"]];
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
      NSURL *zoneUrl = [NSURL URLWithString:url];
      NSString *zoneStr = [NSString stringWithContentsOfURL:zoneUrl encoding:NSUTF8StringEncoding error:nil];
      NSData *data = [zoneStr dataUsingEncoding:NSUTF8StringEncoding];
      dispatch_async(dispatch_get_main_queue(), ^{
        if (data) {
          NSDictionary *dic = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableContainers error:nil];
          self.wxInfoBlock(dic);
        }
      
      });
    });
  
}

#pragma mark - 微信支付
/**
 *  发起支付
 *
 *  @param payModel 支付信息
 */
- (void)payReqWith:(PayModel*)payModel
{
    NSLog(@"%@",payModel);
    PayReq *request = [[PayReq alloc] init];
    request.partnerId = MCH_ID;
    request.prepayId= payModel.prepayId;
    request.package = @"Sign=WXPay";
    request.nonceStr= payModel.nonceStr;
    request.timeStamp= [payModel.timeStamp intValue];
    request.sign= payModel.paySign;
    BOOL sendReqState = [WXApi sendReq:request];
    NSLog(@"%d",sendReqState);
}


#pragma mark - 微信分享
/**
 *  文字类分享
 *
 *  @param shareScene 分享场景
 *  @param contentStr 分享内容
 *
 *  @return 分享结果
 */
- (BOOL)wxShareActionWithScene:(WXShareScene)shareScene shareContent:(NSString*)contentStr{
    SendMessageToWXReq *req = [[SendMessageToWXReq alloc] init];
    req.text = contentStr;
    req.bText = YES;
    req.scene = shareScene;
    return [WXApi sendReq:req];
}

/**
 *  视频图片音频网页类分享
 *
 *  @param shareScene 分享场景
 *  @param message    分享视频图片类容音频
 *
 *  @return 分享结果
 */
- (BOOL)wxShareActionWithShareScene:(WXShareScene)shareScene MediaMessage:(WXMediaMessage*)message
{
    SendMessageToWXReq *req = [[SendMessageToWXReq alloc] init];
    req.bText = NO;
    req.scene = shareScene;
    req.message = message;
    return [WXApi sendReq:req];
}




@end
