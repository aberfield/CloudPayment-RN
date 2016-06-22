//本地
module.exports = {
    //servicePath:"http://10.2.13.111:80/",
    servicePath: "http://jfcloud.berbon.com/",
    payResultUrl: "http://10.1.16.162:11438/modules/recharge/result/index.html?MenuId={0}&MerId={1}&UserId={2}",
    siteDomain: '/',
    ChargeItems: [{
        type: 0,
        des: '10'
    }, {
            type: 1,
            des: '20'
        }, {
            type: 2,
            des: '30'
        }, {
            type: 3,
            des: '50'
        }, {
            type: 4,
            des: '100'
        }, {
            type: 5,
            des: '200',
        }, {
            type: 6,
            des: '300',
        }, {
            type: 7,
            des: '500',
        }
    ],
    CellCore: {
        1: '移动',
        2: '电信',
        8: '联通',
        24: '虚拟号段',
    },
    orderState(t) {
        switch (t) {
            case 10:
                return "充值成功";
            case 11:
                return "充值中"; //充值中
            case 20:
                return "未支付"; //未支付
            case 24:
                return "支付中"; //支付中
            case 21:
                return "支付成功"; //支付成功
            case 22:
                return "未知"; //支付状态未知
            case 23:
                return "支付失败"; //支付失败	
            case 12:
                return "充值失败"; //充值失败
            case 13:
                return "充值未知"; //充值未知
            case 30:
                return "退款中"; //退款中
            case 31:
                return "退款成功"; //退款成功
            case 32:
                return "退款成功"; //退款失败
            case 33:
                return "退款未知"; //退款未知
            case 40:
                return "冲正中"; //冲正中
            case 41:
                return "冲正成功"; //冲正成功
            case 42:
                return "冲正失败"; //冲正失败
            case 50:
                return "撤销"; //撤销
        }
    },

    serialize(o) {
        var ar = [];
        for (var i in o) {
            //考虑传入的值为0的情况
            if (o[i] != 0 && (o[i] == null || o[i] == "")) {
                ar.push(i + "=");
            }
            else {
                ar.push(i + "=" + o[i]);
            }
        }
        return ar.join("&");
    }

}

/*//测试环境
module.exports = {
	servicePath: "http://jfclouddev.berbon.com/",
	payResultUrl: "http://dev.static.berbon.com/berbon-app/modules/recharge/result/index.html?MenuId={0}&MerId={1}&UserId={2}",
	siteDomain: 'http://dev.static.berbon.com/berbon-app/'
}*/

/*//线上
module.exports = {
	servicePath: "http://jfcloud.berbon.com/",
	payResultUrl: "http://jfcloudapi.berbon.com/modules/recharge/result/index.html?MenuId={0}&MerId={1}&UserId={2}",
	siteDomain: 'http://jfcloudapi.berbon.com/'
}*/