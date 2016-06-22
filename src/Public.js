module.exports={
    checkMobile: function(input) {
		return /^0{0,1}(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/.test(input);
	},
    
};