var models = require('../models');
var express = require('express');
var router = express.Router();

var FCM = require('fcm-node');
var serverKey = 'AAAAzvdjbtM:APA91bHGScMIWES9R693Me8i0NQt_dx0LfBGtcrqV7zp2AXKjrY-7LLDeOHOWRA7fleDG9-X05U8vZJZrnFItFXCQU7fvnVok42iHo_1QXaXG81us8DOaQxf9edRX1Zw6COb_-ViIjo7';
var fcm = new FCM(serverKey);
 
var multer  = require('multer');
var path = require('path');
var crypto = require('crypto');

var failmyStorage = multer.diskStorage({
	destination: './uploads/family/',
	filename: function (req, file, cb) {
		crypto.pseudoRandomBytes(16, function (err, raw) {
		 	cb(null, raw.toString('hex') + Date.now() + path.extname(file.originalname));
		});
	}
});
var failmyUpload = multer({
    storage : failmyStorage
});

var tmpJusoArr = [];

// 디폴트
router.get('/', function(req, res, next) {
  	res.render('index', { title: 'Express' });
});

// 주소 관련 홈
router.get('/api/daumJuso', function(req, res, next) {
	res.render('juso', {
		id : req.query.id
	});
});
router.get('/api/daumJusoDone', function(req, res, next) {
	tmpJusoArr[req.query.id] = req.query.data;
	res.send(true);
});
router.get('/api/daumJusoGet', function(req, res, next) {
	res.send(tmpJusoArr[req.query.id]);
});

router.all('/api/failmyUpload', failmyUpload.single("file"), function (req, res, next) {
	models.FamilyFile.create({
		originalname : req.file.originalname,
		mimetype : req.file.mimetype,
		filename : req.file.filename,
		size : req.file.size,
		text : req.body.text,
		FamilyId : req.body.id
	}).then(function(result){
		res.send(result);
	}).catch(function(error){
		res.send(error);
	});
});



module.exports = router;
