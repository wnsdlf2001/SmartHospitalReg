var models = require('../models');
var express = require('express');
var router = express.Router();
var moment = require('moment');

var FCM = require('fcm-node');
var serverKey = 'AAAAzvdjbtM:APA91bHGScMIWES9R693Me8i0NQt_dx0LfBGtcrqV7zp2AXKjrY-7LLDeOHOWRA7fleDG9-X05U8vZJZrnFItFXCQU7fvnVok42iHo_1QXaXG81us8DOaQxf9edRX1Zw6COb_-ViIjo7';
var fcm = new FCM(serverKey);
 
var multer  = require('multer');
var path = require('path');
var crypto = require('crypto');

var descriptStorage = multer.diskStorage({
	destination: './uploads/descript/',
	filename: function (req, file, cb) {
		crypto.pseudoRandomBytes(16, function (err, raw) {
		 	cb(null, raw.toString('hex') + Date.now() + path.extname(file.originalname));
		});
	}
});
var descriptUpload = multer({
    storage : descriptStorage
});




router.get('/', function(req, res, next) {
    res.render('admin/index');  	
});

router.post('/loginProc', function(req, res, next) {
	models.Admin.findAll({
		where: {
			user: req.body.user,
			password: req.body.password
		}
		,include: [{
			model: models.Hospital,
		}]			
	}).then(function(result){
		if(result[0]){
			req.session.login=true;
			req.session.user=result[0].user;
			req.session.HospitalId=result[0].HospitalId;
			req.session.Hospital=result[0].Hospital;
			res.redirect('/admin/main');
		}
		else{
			req.session.login=false;
			res.redirect('/admin');
		}
	});	
});

router.all('*', function(req, res, next) {
	if(req.session&&req.session.login) next();
	//else res.redirect('/admin');
	else{ // 개발할떄 임시로
		models.Admin.findAll({
			where: {
				user: 'admin1',
			}
			,include: [{
				model: models.Hospital,
			}]			
		}).then(function(result){
			if(result[0]){
				req.session.login=true;
				req.session.user=result[0].user;
				req.session.HospitalId=result[0].HospitalId;
				req.session.Hospital=result[0].Hospital;
				res.redirect('/admin/main');
			}
			else{
				req.session.login=false;
				res.redirect('/admin');
			}
		});
	}
});


router.all('/main', function(req, res, next) {
	models.Admin.findAll({
		where: {
			user: req.session.user,
		}
		,include: [{
			model: models.Hospital,
		}]		
	}).then(function(result){
		if(result[0]){
		    res.render('admin/main', {
		    	title : 'main'
		    });  	
		}
		else{
			next();
		}
	});
});

router.all('/userList', function(req, res, next) {
	models.User.findAll().then(function(result){
		result.forEach(function(index){
			index.birth_ = moment(new Date(index.birth)).format("YYYY-MM-DD");
		});
	    res.render('admin/userList', {
	    	userList : result
	    });  	
	});
});

router.all('/partList', function(req, res, next) {
	models.Part.findAll({
		where: {
			HospitalId: req.session.HospitalId,
		}
		,include: [{
			model: models.Doctor,
		}]				
	}).then(function(result){
		result.forEach(function(index){
			index.count = index.Doctors.length;
		});		
	    res.render('admin/partList', {
	    	partList : result
	    });  	
	});
});

router.all('/doctorList', function(req, res, next) {
	models.Doctor.findAll({
		where: {
			HospitalId: req.session.HospitalId,
		}		
		,include: [{
			model: models.Part,
		}]			
	}).then(function(result){
	    res.render('admin/doctorList', {
	    	HospitalName : req.session.Hospital.name,
	    	doctorList : result
	    });  	
	});
});

router.all('/reservList', function(req, res, next) {
	models.Reserv.findAll({
		where: {
			HospitalId: req.session.HospitalId,
		}		
		,include: [{
			model: models.Doctor,
			include: [{
				model: models.Part,
			}]
		},{
			model: models.Family,
			include: [{
				model: models.User,
			}]			
		},{
			model: models.Hospital,
		}]			
	}).then(function(result){
		result.forEach(function(index){
			index.rdate_ = moment(new Date(index.rdate)).format("YYYY-MM-DD HH:mm");
			index.FamilyBirth_ = moment(new Date(index.Family.birth)).format("YYYY-MM-DD");
		});
	    res.render('admin/reservList', {
	    	reservList : result
	    });  	
	});
});

router.all('/waitList', function(req, res, next) {
	models.Doctor.findAll({
		where: {
			HospitalId: req.session.HospitalId,
		},
		include: [{
			model: models.Wait,
		}]		
	}).then(function(result){
		console.log(result);
	    res.render('admin/waitList', {
	    	doctorList : result
	    });  	
	});
});

router.all('/descriptList', function(req, res, next) {
	models.Descript.findAll({
		where: {
			HospitalId: req.session.HospitalId,
		},
		include: [{
			model: models.DescriptFile,
		},{
			model: models.Doctor,
			include: [{
				model: models.Part,
			}]				
		},{
			model: models.User,
		},{
			model: models.Family,
		}]		
	}).then(function(result){
		result.forEach(function(index){
			console.log(index);
		
			index.ddate_ = moment(new Date(index.ddate)).format("YYYY-MM-DD HH:mm");
		});
	    res.render('admin/descriptList', {
	    	descriptList : result
	    });  	
	});
});

router.all('/descriptAdd', function(req, res, next) {
	models.User.findAll({
		include: [{
			model: models.Family,
		}]		
	}).then(function(userList){
		models.Part.findAll({
			where: {
				HospitalId: req.session.HospitalId,
			},
			include: [{
				model: models.Doctor,
			}]		
		}).then(function(PartList){
			console.log(userList);
		    res.render('admin/descriptAdd', {
		    	userList : userList,
		    	PartList : PartList
		    });  	
		});
	});
});


router.all('/descriptAddProc', descriptUpload.single("file"), function(req, res, next) {
//router.all('/descriptAddProc', function(req, res, next) {
	models.Family.findAll({
		where: {
			id: req.body.FamilyId,
		},
		include: [{
			model: models.User,
		}]		
	}).then(function(familyList){
		if(familyList&&familyList[0]){
			models.Doctor.findAll({
				where: {
					id: req.body.DoctorId
				},
				include: [{
					model: models.Part,
					include: [{
						model: models.Hospital,
					}]		
				}]		
			}).then(function(doctorList){
				if(doctorList&&doctorList[0]){
					models.Descript.create({
						ddate : (new Date()),
						text : req.body.text,
						HospitalId : doctorList[0].Part.Hospital.id,
						DoctorId : doctorList[0].id,
						UserId : familyList[0].User.id,
						FamilyId : familyList[0].id,
					}).then(function(result){
						//console.log(result.id);
						models.DescriptFile.create({
							originalname : req.file.originalname,
							mimetype : req.file.mimetype,
							filename : req.file.filename,
							size : req.file.size,
							text : '',
							DescriptId : result.id
						}).then(function(result){
							//console.log(result);
							res.redirect('/admin/push');
						}).catch(function(error){
							console.log(error);
							res.redirect('/admin/push');
						});
					}).catch(function(error){
						console.log(error);
						res.redirect('/admin/push');
					});
				}
				else{
					res.redirect('/admin/push');
				}
			});

		}
		else{
			res.redirect('/admin/push');
		}
	});
});









router.all('/push', function(req, res, next) {
	models.Admin.findAll({
		where: {
			user: req.session.user,
		}
		,include: [{
			model: models.Hospital,
		}]		
	}).then(function(result){
		if(result[0]){
			var adminData=result[0];
			models.User.findAll({
				include: [{
					model: models.Device,
				}]						
			}).then(function(result){
				var userList=result;
			    res.render('admin/push', {
			    	title : 'Notifications',
			    	userList : userList
			    });  	
			});
		}
		else{
			next();
		}
	});
});

router.all('/pushProc', function(req, res, next) {
	models.Device.findAll({
		where: {
			UserId: req.body.UserId,
		}	
	}).then(function(result){
		if(result[0]){
			var sendData={};
			if(req.body.data.indexOf("isMove"))sendData.isMove=true;
			if(req.body.data.indexOf("isCall"))sendData.isCall=true;

			fcm.send({
				// 수신대상
				to: result[0].fcmid,
				// App이 실행중이지 않을 때 상태바 알림으로 등록할 내용
				notification: {
				    title: req.body.title,
				    body: req.body.text,
				    sound: "default",
				    click_action: "FCM_PLUGIN_ACTIVITY",
				    icon: "fcm_push_icon"
				},
				// 메시지 중요도
				priority: "high",
				// App 패키지 이름
				restricted_package_name: "com.skkuproj",
				// App에게 전달할 데이터
				data: sendData
			},function(err,response){
			    if (err) {
			        //console.error(err);
			        res.redirect('/admin/push');
			    }
			    else{
			    	//console.log(response);
			    	res.redirect('/admin/push');			    

			    }			 
			});
		}
		else{
			res.redirect('/admin/push');
		}
	});
});



router.all('/logout', function(req, res, next) {
	req.session.login=false;
	res.redirect('/admin');
});



module.exports = router;
