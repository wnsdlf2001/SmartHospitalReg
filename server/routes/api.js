var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/setDevice', function(req, res, next) {
	models.Device.findAll({
		where: {
			uuid: req.query.uuid
		}
	}).then(function(result){
		if(result[0]){
			models.Device.update({
				uuid: req.query.uuid,
				fcmid: req.query.fcmid,
				ip: req.ip
			},{
				where: {
					id: result[0].id
				}
			}).then(function(result){
				res.send(result);
			}).catch(function(error){
				res.send(error);
			});
		}
		else{
			models.Device.create({
				uuid: req.query.uuid,
				fcmid: req.query.fcmid,
				ip: req.ip
			}).then(function(result){
				res.send(result);
			}).catch(function(error){
				res.send(error);
			});
		}
	});
});

router.get('/isLogin', function(req, res, next) {
	models.User.findAll({
		where: {
			user: req.query.user,
			//password: req.query.password
		}
	}).then(function(result){
		if(result[0]){
			if(result[0].password == req.query.password){
				console.log(result[0].id);
				console.log(req.query.uuid);
				models.Device.update({
					UserId : result[0].id
				},{
					where: {
						uuid: req.query.uuid
					}
				}).then(function(result){
					res.send({
						isLogin:true
					});
				}).catch(function(error){
					res.send(error);
				});
			}
			else{
				res.send({
					isLogin:false,
					isExist:true
				});
			}
		}
		else{
			res.send({
				isLogin:false,
				isExist:false
			});
		}
	});
});







// 계정 생성할때 Family '나'로 생성되어야함
router.get('/setUser', function(req, res, next) {
	models.User.create({
		user: req.query.user,
		password: req.query.password,
		name: req.query.name,
		sex: req.query.sex,
		birth: new Date(req.query.birth),
		address: req.query.address,
		phone: req.query.phone,
		time: new Date(),
		ip: req.ip
	}).then(function(result){
		models.Family.create({
			name: req.query.name,
			birth: new Date(req.query.birth),
			sex: req.query.sex,
			address: req.query.address,
			phone: req.query.phone,
			text: '나',
			UserId: result.id
		}).then(function(result_){
			res.send(result);
		}).catch(function(error){
			res.send(error);
		});
	}).catch(function(error){
		res.send(error);
	});
});

router.get('/getUser', function(req, res, next) {
	models.User.findAll({
		where: {
			user: req.query.user
		}
	}).then(function(result){
		if(result[0]) res.send(result[0]);
		else res.send({});
	});
});


router.get('/getDescriptList', function(req, res, next) {
	models.Descript.findAll({
		where: {
			UserId: req.query.user
		},
		include: [{
			model: models.DescriptFile,
		}]		
	}).then(function(result){
		res.send(result);
	});
});


router.get('/getFamilyList', function(req, res, next) {
	models.User.findAll({
		where: {
			user: req.query.user
		},
		include: [{
			model: models.Family,
		}]		
	}).then(function(result){
		if(result[0]) res.send(result[0].Families);
		else res.send([]);
	});
});

router.get('/getFamilyFile', function(req, res, next) {
	models.FamilyFile.findAll({
		where: {
			FamilyId: req.query.FamilyId
		},	
	}).then(function(result){
		res.send(result);
	});
});


router.get('/setFamily', function(req, res, next) {
	models.Family.create({
		name: req.query.name,
		sex: req.query.sex,
		birth: new Date(req.query.birth),
		address: req.query.address,
		phone: req.query.phone,
		text: req.query.text,
		UserId: req.query.UserId
	}).then(function(result){
		res.send(result);
	}).catch(function(error){
		res.send(error);
	});
});

router.get('/delFamily', function(req, res, next) {
	models.Family.findAll({
		where: {
			id: req.query.id,
		},				
	}).then(function(result){
		if(result[0]){
			result[0].destroy().then(function(result){
				res.send(result);
			});
		}
		else{
			res.send(result);		
		}		
	}).catch(function(error){
		res.send(error);
	});
});

router.get('/getPartList', function(req, res, next) {
	// 병원 이름으로 검색
	models.Hospital.findAll({
		where: {
			name: req.query.name
		},
		include: [{
			model: models.Part,
		}]		
	}).then(function(result){
		if(result[0]) res.send(result[0].Parts);
		else res.send([]);
	});
});

router.get('/getDoctorList', function(req, res, next) {
	// 과 아이디로 검색
	models.Part.findAll({
		where: {
			id: req.query.id
		},
		include: [{
			model: models.Doctor,
		}]		
	}).then(function(result){
		if(result[0]) res.send(result[0].Doctors);
		else res.send([]);
	});
});

router.get('/setReserv', function(req, res, next) {
	models.Reserv.create({
		rdate: req.query.rdate,
		rindex: req.query.rindex,
		text: req.query.text,
		DoctorId: req.query.DoctorId,
		FamilyId: req.query.FamilyId,
		HospitalId: req.query.HospitalId,
	}).then(function(result){
		res.send(result);
	}).catch(function(error){
		res.send(error);
	});
});

router.get('/getReservDate', function(req, res, next) {
	models.Reserv.findAll({
		where: {
			DoctorId: req.query.DoctorId,
			rdate: new Date(req.query.rdate)
		}
	}).then(function(result){
		res.send(result);
	});
});


router.get('/getReserv', function(req, res, next) {
	models.User.findAll({
		where: {
			user: req.query.user
		},
		include: [{
			model: models.Family,
			include: [{
				model: models.Reserv,
			}]
		}]		
	}).then(function(result){
		var tmpArr=[];
		if(result[0]){
			result[0].Families.forEach(function(index){
				index.Reservs.forEach(function(index2){
					var tmpIndex = JSON.parse(JSON.stringify(index));
					var tmpIndex2 = JSON.parse(JSON.stringify(index2));
					delete tmpIndex.Reservs;
					tmpIndex2.Family=tmpIndex;
					tmpArr.push(tmpIndex2);
				});
			});
			res.send(tmpArr);
		}
		else res.send([]);
	});
});

router.get('/delReserv', function(req, res, next) {
	models.Reserv.findAll({
		where: {
			id: req.query.id,
		},				
	}).then(function(result){
		if(result[0]){
			result[0].destroy().then(function(result){
				res.send(result);
			});
		}
		else{
			res.send(result);		
		}		
	}).catch(function(error){
		res.send(error);
	});
});


router.get('/setWait', function(req, res, next) {
	models.Wait.create({
		rdatetime: req.query.rdate,
		text: req.query.text,
		DoctorId: req.query.DoctorId,
		FamilyId: req.query.FamilyId
	}).then(function(result){
		res.send(result);
	}).catch(function(error){
		res.send(error);
	});
});

router.get('/getWait', function(req, res, next) {
	models.User.findAll({
		where: {
			user: req.query.user
		},
		include: [{
			model: models.Family,
			include: [{
				model: models.Wait,
			}]
		}]		
	}).then(function(result){
		// 여러개 있어도 맨위 하나만 출력됨
		var tmpArr=[];
		if(result[0]){
			result[0].Families.forEach(function(index){
				index.Waits.forEach(function(index2){
					var tmpIndex = JSON.parse(JSON.stringify(index));
					var tmpIndex2 = JSON.parse(JSON.stringify(index2));
					delete tmpIndex.Waits;
					tmpIndex2.Family=tmpIndex;
					tmpArr.push(tmpIndex2);
				});
			});
			if(tmpArr[0]){
				models.Wait.findAll({
					where: {
						DoctorId : tmpArr[0].DoctorId
					},
				}).then(function(result2){
					var waitCnt=0;
					for(var resultIndex in result2){
						if(result2[resultIndex].id!=tmpArr[0].id) waitCnt++;
						else break;
					}
					tmpArr[0].waitCnt=waitCnt;
					res.send(tmpArr[0]);
				});
			}
			else res.send({});
		}
		else res.send({});
	});
});

router.get('/delWait', function(req, res, next) {
	models.Wait.findAll({
		where: {
			id: req.query.id,
		},				
	}).then(function(result){
		if(result[0]){
			result[0].destroy().then(function(result){
				res.send(result);
			});
		}
		else{
			res.send(result);		
		}		
	}).catch(function(error){
		res.send(error);
	});
});


router.get('/getDoctor', function(req, res, next) {
	models.Doctor.findAll({
		where: {
			id: req.query.id
		}
	}).then(function(result){
		if(result[0]) res.send(result[0]);
		else res.send({});
	});
});

router.get('/getPart', function(req, res, next) {
	models.Part.findAll({
		where: {
			id: req.query.id
		}
	}).then(function(result){
		if(result[0]) res.send(result[0]);
		else res.send({});
	});
});

router.get('/getHospital', function(req, res, next) {
	models.Hospital.findAll({
		where: {
			id: req.query.id
		}
	}).then(function(result){
		if(result[0]) res.send(result[0]);
		else res.send({});
	});
});

router.get('/getHospitalList', function(req, res, next) {
	models.Hospital.findAll({
	}).then(function(result){
		res.send(result);
	});
});

var callTmp = false;
router.get('/clientCall', function(req, res, next) {
	callTmp = req.query.user;
	res.send(true);
});

router.get('/isClientCall', function(req, res, next) {
	if(callTmp){
		models.User.findAll({
			where: {
				id: callTmp
			},
		}).then(function(result){
			callTmp=false;
			res.send(result);
		});
	}
	else res.send([]);
});



router.get('/getBeaconList', function(req, res, next) {
	models.Beacon.findAll({
		where: {
			HospitalId: req.query.HospitalId
		},
		include: [{
			model: models.Hospital,
		}]		
	}).then(function(result){
		res.send(result);
	});
});


router.get('/getHospitalByBeaconUuid', function(req, res, next) {
	models.Beacon.findAll({
		where: {
			uuid: req.query.uuid
		},
		include: [{
			model: models.Hospital,
		}]			
	}).then(function(result){
		if(result[0]) res.send(result[0].Hospital);
		else res.send({});
	});
});




router.get('/isReserve', function(req, res, next) {
	models.User.findAll({
		where: {
			user: req.query.user
		},
	include: [{
		model: models.Family,
		include: [{
			model: models.Reserv,
		}]
	}]				
	}).then(function(result){
		var flag=false;

		if(result[0]){
			result[0].Families.forEach(function(index){
				if(index.Reservs&&index.Reservs[0]){
					flag=true;
				}
			});
			res.send({
				isReserve:flag
			});
		}
		else{
			res.send({
				isReserve:false
			});
		}
	});
});


module.exports = router;
