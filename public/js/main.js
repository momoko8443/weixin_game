require.config({
    paths: {
        "jquery": '../bower_components/jquery/dist/jquery.min',
        "jquery.bootstrap": '../bower_components/bootstrap/dist/js/bootstrap.min',
        "lodash": '../bower_components/lodash/lodash.min',
        "ukulele": '../jslib/ukulele/ukulele',
        "Question": 'models/Question',
        "Testing": 'models/Testing',
        "TestingManagementController": 'controllers/TestingManagementController',
        "QuestionManagementController": 'controllers/QuestionManagementController',
        "testingService":'services/TestingService',
        "questionService":'services/QuestionService'
    },
    shim:{ 	
		"ukulele":{
					deps:["jquery"],
					exports:"Ukulele"
				},	
    	"jquery.bootstrap":{
    		deps:["jquery"]
    	}
    }
});

require(["jquery","ukulele","TestingManagementController","lodash","jquery.bootstrap"], function($,Ukulele,TestingManagementController) {
	var uku;
	$(document).ready(function() {
		uku = new Ukulele();
		var testingMgrCtrl = new TestingManagementController(uku);
		uku.registerController("mgr", testingMgrCtrl);
		testingMgrCtrl.getTestings();
		uku.init();
	});
});
