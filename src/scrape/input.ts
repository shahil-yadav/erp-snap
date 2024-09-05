export const html = `
 
 

<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->

<!-- Mirrored from seantheme.com/color-admin-v1.7/admin/html/index.html by HTTrack Website Copier/3.x [XR&CO'2014], Fri, 24 Apr 2015 10:50:18 GMT -->
<head>
	<meta charset="utf-8" />
	<title>PSIT</title>
	<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />
	<meta content="" name="description" />
	<meta content="" name="author" />

	<!-- ================== BEGIN BASE CSS STYLE ================== -->
	<link href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
	<link href="https://erp.psit.ac.in/assets/plugins/jquery-ui/themes/base/minified/jquery-ui.min.css" rel="stylesheet" />
	<link href="https://erp.psit.ac.in/assets/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
	<link href="https://erp.psit.ac.in/assets/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" />
	<link href="https://erp.psit.ac.in/assets/css/animate.min.css" rel="stylesheet" />
	<link href="https://erp.psit.ac.in/assets/css/style.min.css" rel="stylesheet" />
	<link href="https://erp.psit.ac.in/assets/css/style-responsive.min.css" rel="stylesheet" />
	<link href="https://erp.psit.ac.in/assets/css/theme/default.css" rel="stylesheet" id="theme" />
	<!-- ================== END BASE CSS STYLE ================== -->

	<!-- ================== BEGIN PAGE LEVEL STYLE ================== -->

	<link href="https://erp.psit.ac.in/assets/plugins/bootstrap-datepicker/css/datepicker.css" rel="stylesheet" />
	<link href="https://erp.psit.ac.in/assets/plugins/bootstrap-datepicker/css/datepicker3.css" rel="stylesheet" />
	<link href="https://erp.psit.ac.in/assets/plugins/ionRangeSlider/css/ion.rangeSlider.css" rel="stylesheet" />
	<link href="https://erp.psit.ac.in/assets/plugins/ionRangeSlider/css/ion.rangeSlider.skinNice.css" rel="stylesheet" />
	<link href="https://erp.psit.ac.in/assets/plugins/bootstrap-colorpicker/css/bootstrap-colorpicker.min.css" rel="stylesheet" />
	<link href="https://erp.psit.ac.in/assets/plugins/bootstrap-timepicker/css/bootstrap-timepicker.min.css" rel="stylesheet" />
	<link href="https://erp.psit.ac.in/assets/plugins/password-indicator/css/password-indicator.css" rel="stylesheet" />
	<link href="https://erp.psit.ac.in/assets/plugins/bootstrap-combobox/css/bootstrap-combobox.css" rel="stylesheet" />
	<link href="https://erp.psit.ac.in/assets/plugins/bootstrap-select/bootstrap-select.min.css" rel="stylesheet" />
	<link href="https://erp.psit.ac.in/assets/plugins/bootstrap-tagsinput/bootstrap-tagsinput.css" rel="stylesheet" />
	<link href="https://erp.psit.ac.in/assets/plugins/jquery-tag-it/css/jquery.tagit.css" rel="stylesheet" />
	<link href="https://erp.psit.ac.in/assets/plugins/bootstrap-daterangepicker/daterangepicker-bs3.css" rel="stylesheet" />
	<link href="https://erp.psit.ac.in/assets/plugins/select2/dist/css/select2.min.css" rel="stylesheet" />

	<!-- ================== END PAGE LEVEL STYLE ================== -->

	<!-- ================== BEGIN PAGE LEVEL STYLE ================== -->
	<link href="https://erp.psit.ac.in/assets/plugins/DataTables/css/data-table.css" rel="stylesheet" />
	<!-- ================== END PAGE LEVEL STYLE ================== -->

	<!-- ================== BEGIN BASE JS ================== -->
	<script src="https://erp.psit.ac.in/assets/plugins/pace/pace.min.js"></script>
	<!-- ================== END BASE JS ================== -->

	<!-- ================== BEGIN BASE JS ================== -->
	<script src="https://erp.psit.ac.in/assets/plugins/jquery/jquery-1.9.1.min.js"></script>
	<script src="https://erp.psit.ac.in/assets/plugins/jquery/jquery-migrate-1.1.0.min.js"></script>
	<script src="https://erp.psit.ac.in/assets/plugins/jquery-ui/ui/minified/jquery-ui.min.js"></script>
	<script src="https://erp.psit.ac.in/assets/plugins/bootstrap/js/bootstrap.min.js"></script>
</head>
<body>
<!-- begin #page-loader -->
<div id="page-loader" class="fade in"><span class="spinner"></span></div>
<!-- end #page-loader -->

<!-- begin #page-container -->
<div id="page-container" class="fade page-sidebar-fixed page-header-fixed">

	
    <!-- begin #header -->
	<div id="header" class="header navbar navbar-default navbar-fixed-top">
		<!-- begin container-fluid -->
		<div class="container-fluid">
			<!-- begin mobile sidebar expand / collapse button -->
			<div class="navbar-header">
				<a href="https://erp.psit.ac.in/" class="navbar-brand"><span class="navbar-logo"></span> <strong>PSIT</strong> </a>
				<button type="button" class="navbar-toggle" data-click="sidebar-toggled">
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
			</div>
			<!-- end mobile sidebar expand / collapse button -->

			<!-- begin header navigation right -->
			<ul class="nav navbar-nav navbar-right">

				<li class="dropdown">
					<a href="javascript:;" data-toggle="dropdown" class="dropdown-toggle f-s-14">
						<i class="fa fa-bell-o"></i>
						<span class="label">0</span>
					</a>
					<ul class="dropdown-menu media-list pull-right animated fadeInDown">
					<li class="dropdown-header">Notifications (0)</li>
					<li class="media">
						<a href="https://erp.psit.ac.in/Student/MediaManagerList/">
							<div class="media-left"><i class="fa fa-bell-o media-object bg-red"></i></div>
							<div class="media-body">
								<h6 class="media-heading">Resume</h6>
								<div class="text-muted f-s-11">(0)</div>
							</div>
						</a>
					</li>
					<!--<li class="media">
						<a href="javascript:;">
							<div class="media-left"><img src="assets/img/user-1.jpg" class="media-object" alt="" /></div>
							<div class="media-body">
								<h6 class="media-heading">John Smith</h6>
								<p>Quisque pulvinar tellus sit amet sem scelerisque tincidunt.</p>
								<div class="text-muted f-s-11">25 minutes ago</div>
							</div>
						</a>
					</li>
					<li class="media">
						<a href="javascript:;">
							<div class="media-left"><img src="assets/img/user-2.jpg" class="media-object" alt="" /></div>
							<div class="media-body">
								<h6 class="media-heading">Olivia</h6>
								<p>Quisque pulvinar tellus sit amet sem scelerisque tincidunt.</p>
								<div class="text-muted f-s-11">35 minutes ago</div>
							</div>
						</a>
					</li>
					<li class="media">
						<a href="javascript:;">
							<div class="media-left"><i class="fa fa-plus media-object bg-green"></i></div>
							<div class="media-body">
								<h6 class="media-heading"> New User Registered</h6>
								<div class="text-muted f-s-11">1 hour ago</div>
							</div>
						</a>
					</li>
					<li class="media">
						<a href="javascript:;">
							<div class="media-left"><i class="fa fa-envelope media-object bg-blue"></i></div>
							<div class="media-body">
								<h6 class="media-heading"> New Email From John</h6>
								<div class="text-muted f-s-11">2 hour ago</div>
							</div>
						</a>
					</li>
					<li class="dropdown-footer text-center">
						<a href="javascript:;">View more</a>
					</li>-->
				</ul>
				</li>
				<li class="dropdown navbar-user">
					<a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
						<img src="https://erp.psit.ac.in/assets/img/Simages/2212594.jpg" alt="" />
						<span class="hidden-xs">
                                                  </span> <b class="caret"></b>
					</a>
					<ul class="dropdown-menu animated fadeInLeft">
						<li class="arrow"></li>
						<!--<li><a href="">Edit Profile</a></li>-->
						<li><a href="javascript:;"><span class="badge badge-danger pull-right">0</span> Inbox</a></li>

						<li class="divider"></li>
						<li><a href="https://erp.psit.ac.in/Student/Logout">Log Out</a></li>
					</ul>
				</li>
			</ul>
			<!-- end header navigation right -->
		</div>
		<!-- end container-fluid -->
	</div>
    <!-- end #header -->

	<!-- begin #sidebar -->
	<div id="sidebar" class="sidebar">
		<!-- begin sidebar scrollbar -->
		<div data-scrollbar="true" data-height="100%">
			<!-- begin sidebar user -->
			<ul class="nav">
				<li class="nav-profile">
					<div class="image">
						<a href="javascript:;"><img src="https://erp.psit.ac.in/assets/img/Simages/2212594.jpg" alt="" /></a>
					</div>
					<div class="info">
						Shahil Yadav						<small> 2201641720092</small>
					</div>
				</li>
			</ul>

			<!-- end sidebar user -->
			<!-- begin sidebar nav -->
			<ul class="nav">
				<li class="has-sub active">
					<a href="javascript:;">
						<b class="caret pull-right"></b>
						<i class="fa fa-laptop"></i>
						<span style="font-size:15px;">Home</span>
					</a>
					<ul class="sub-menu">
						<li  ><a href="https://erp.psit.ac.in/Student">Home  </a></li>
						<li ><a href="https://erp.psit.ac.in/Student/Dashboard">My Account </a></li>
						<li class="active"><a href="https://erp.psit.ac.in/Student/MyTimeTable">My TimeTable </a></li>
						<li ><a href="https://erp.psit.ac.in/Student/MyAttendanceDetail">My Attendance </a></li>
					</ul>
				</li>
                <li class="has-sub ">
					<a href="javascript:;">
						<b class="caret pull-right"></b>
						<i class="fa fa-laptop"></i>
						<span style="font-size:15px;">My Work Space</span>
					</a>
					<ul class="sub-menu">
                    <li ><a href="https://erp.psit.ac.in/Student/MyAttendanceDetail">My Attendance  </a></li>
                    <li ><a href="https://erp.psit.ac.in/Student/MyAttPerSemesterWise">Attendance Percentage Semester-Wise </a></li>
					<li ><a href="https://erp.psit.ac.in/Student/StudentDelegationList">My Delegation  </a></li>
                        
                     <li ><a href="https://erp.psit.ac.in/Student/LabAssignmentList">Labs Assignments  </a></li>
                        <li ><a href="https://erp.psit.ac.in/Student/NotesList">Download Notes   </a></li>
						<li ><a href="https://erp.psit.ac.in/Student/StudentBooksList">My Library  </a></li>
                        <li ><a href="https://erp.psit.ac.in/Student/DiscussionAll">College Wall </a></li>
                        <li ><a href="https://erp.psit.ac.in/Student/ClubJoinList">PSIT Club (Join Now)  </a></li>
                       					</ul>
				</li>
				<li class="has-sub ">
					<a href="javascript:;">
						<b class="caret pull-right"></b>
						<i class="fa fa-database"></i>
						<span style="font-size:15px;">Online Exam</span>
					</a>
					<ul class="sub-menu">
						<li ><a href="https://erp.psit.ac.in/Student/OnlineTraining">OLT Result  </a></li>
						<li ><a href="https://erp.psit.ac.in/Student/TechnicalTraining">Online Academics Test Reports  <img src="https://erp.psit.ac.in/assets/img/icon/new.gif"></a></li>
					</ul>
				</li>
				<!-- begin sidebar minify button -->
				<li><a href="javascript:;" class="sidebar-minify-btn" data-click="sidebar-minify"><i class="fa fa-angle-double-left"></i></a></li>
				<!-- end sidebar minify button -->
			</ul>
			<!-- end sidebar nav -->
		</div>
		<!-- end sidebar scrollbar -->
	</div>
	<div class="sidebar-bg"></div>
	<!-- end #sidebar -->






<!-- begin #content -->
<div id="content" class="content">
	<!-- begin breadcrumb -->
	<ol class="breadcrumb pull-right">
		<li><a href="https://erp.psit.ac.in/Erp/">Home</a></li>
		<li><a href="https://erp.psit.ac.in/Student">Student</a></li>
		<li class="active">My Time Table</li>
	</ol>
	<!-- end breadcrumb -->
	<!-- begin page-header -->
	<h1 class="page-header">Time Table</h1>
	<!-- end page-header -->


	<!-- begin row -->
	<div class="row">
		<div class="col-md-12">
			<!-- end panel -->
			<div class="panel panel-inverse" data-sortable-id="form-plugins-3">
				<div >
					<form method="post" enctype="multipart/form-data" class="form-horizontal form-bordered col-sm-12" style="background-color:#E9E9E9;" action="https://erp.psit.ac.in/Student/MyTimeTable">
						<div class="form-group">

							<label class="col-md-2 control-label">Change Date</label>
							<div class="col-md-3">
								<input type="text" class="form-control" id="datepicker-Change" name="datepicker-Change" placeholder="Auto Close Datepicker" value="09/04/2024" />
							</div>
							<div class="col-md-2">
								<input type="submit" class="form-control btn-success" value="Show">
							</div>
						</div>


					</form>



				</div>
			</div>
			<!-- begin panel -->
		</div>
	</div>
	<!-- end row -->

	<!-- begin row -->
	<div class="row">
		<!-- begin col-6 -->
		<div class="col-md-12">
			<!-- begin panel -->
			<div class="panel-body"><div class="alert alert-success fade in m-b-15">TimeTable Date is Successfully Changed<span class="close" data-dismiss="alert">&times;</span></div></div>			<!-- end panel -->

			<!-- begin panel -->
				<div class="panel panel-inverse" data-sortable-id="form-plugins-4">
				<div class="panel-heading">
					<div class="panel-heading-btn">
						<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
						<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-success" data-click="panel-reload"><i class="fa fa-repeat"></i></a>
						<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
						<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-danger" data-click="panel-remove"><i class="fa fa-times"></i></a>
					</div>
					<h4 class="panel-title">Time Table</h4>
				</div>
				<div class="panel-body">

					<div class="table-responsive">
						<table  class="table table-striped table-bordered" rules="all" FRAME=BOX>
							<thead>
							
							<tr  style="font-size:12px; color:#000000; background-color:#ECFFEC;">
								<th style="background-color:#008a8a; color:#FFFFFF;"><strong>Day/ Lecture</strong></th>
								<th><center><h5>1<sup>st</sup></h5>9:05-09:55</center></th>
								<th><center><h5>2<sup>nd</sup></h5>9:55-10:45</center></th>
								<th><center><h5>3<sup>rd</sup></h5>10:55-11:45</center></th>
								<th><center><h5>4<sup>th</sup></h5>11:45-12:35</center></th>
																	<th><center><h5>5<sup>th</sup></h5>12:35-13:25</center></th>
																	
								<th><center><h5>6<sup>th</sup></h5>14:15-15:05</center></th>
								<th><center><h5>7<sup>th</sup></h5>15:15-16:05</center></th>
								<th><center><h5>8<sup>th</sup></h5>16:05-16:55</center></th>

							</tr>
							<!--
							<tr  style="font-size:12px; color:#000000; background-color:#ECFFEC;">
								<th style="background-color:#ffffff; font-size:16px; "><strong>Day/ Lecture</strong></th>
								<th><center><h5>1<sup>st</sup></h5>9:30-10:20</center></th>
								<th><center><h5>2<sup>nd</sup></h5>10:20-11:10</center></th>
								<th><center><h5>3<sup>rd</sup></h5>11:10-12:00</center></th>
								<th><center><h5>4<sup>th</sup></h5>12:00-12:50</center></th>
								<th><center><h5>5<sup>th</sup></h5>12:50-13:40</center></th>
								<th><center><h5>6<sup>th</sup></h5>13:40-14:30</center></th>
								<th><center><h5>7<sup>th</sup></h5>14:30-15:20</center></th>
								<th><center><h5>8<sup>th</sup></h5>15:20-16:10</center></th>

							</tr>-->
							</thead>
							<tbody>
															<tr class="odd gradeX " style="font-size:16px;">
									<td style="color:#292929;  background-color:#ECFFEC;"><strong>Monday</strong></td>
																			<td align="center">
Period1											
										</td>
																				<td align="center">
Period2											
										</td>
																				<td align="center">
Period3											
										</td>
																				<td align="center">
Period4										
										</td>
																				<td align="center">
Period5											
										</td>
																				<td align="center">
Period6											
										</td>
																				<td align="center">
Period											
										</td>
																				<td align="center">
Period											
										</td>
																		</tr>
																<tr class="odd gradeX " style="font-size:16px;">
									<td style="color:#292929;  background-color:#ECFFEC;"><strong>Tuesday</strong></td>
																			<td align="center">
											
										</td>
																				<td align="center">
											
										</td>
																				<td align="center">
											
										</td>
																				<td align="center">
											
										</td>
																				<td align="center">
											
										</td>
																				<td align="center">
											
										</td>
																				<td align="center">
											
										</td>
																				<td align="center">
											
										</td>
																		</tr>
																<tr class="odd gradeX danger" style="font-size:16px;">
									<td style="color:#292929;  background-color:#ECFFEC;"><strong>Wednesday</strong></td>
																			<td align="center">
											
										</td>
																				<td align="center">
											
										</td>
																				<td align="center">
											
										</td>
																				<td align="center">
											
										</td>
																				<td align="center">
											
										</td>
																				<td align="center">
											
										</td>
																				<td align="center">
											
										</td>
																				<td align="center">
											
										</td>
																		</tr>
																<tr class="odd gradeX " style="font-size:16px;">
									<td style="color:#292929;  background-color:#ECFFEC;"><strong>Thursday</strong></td>
																			<td align="center">
											
										</td>
																				<td align="center">
											
										</td>
																				<td align="center">
											
										</td>
																				<td align="center">
											
										</td>
																				<td align="center">
											
										</td>
																				<td align="center">
											
										</td>
																				<td align="center">
											
										</td>
																				<td align="center">
											
										</td>
																		</tr>
																<tr class="odd gradeX " style="font-size:16px;">
									<td style="color:#292929;  background-color:#ECFFEC;"><strong>Friday</strong></td>
																			<td align="center">
											
										</td>
																				<td align="center">
											
										</td>
																				<td align="center">
											
										</td>
																				<td align="center">
											
										</td>
																				<td align="center">
											
										</td>
																				<td align="center">
											
										</td>
																				<td align="center">
											
										</td>
																				<td align="center">
											
										</td>
																		</tr>
																<tr class="odd gradeX " style="font-size:16px;">
									<td style="color:#292929;  background-color:#ECFFEC;"><strong>Saturday</strong></td>
																			<td align="center">
											
										</td>
																				<td align="center">
											
										</td>
																				<td align="center">
											
										</td>
																				<td align="center">
											
										</td>
																				<td align="center">
											
										</td>
																				<td align="center">
											
										</td>
																				<td align="center">
											
										</td>
																				<td align="center">
											
										</td>
																		</tr>
								

							</tbody>
						</table>
					</div>
				</div>
			</div>
			<!-- end col-6 -->

		</div>
		<!-- end col-6 -->
	</div>
	<!-- end row -->
</div>
<!-- end #content -->


<!-- begin scroll to top btn -->
<a href="javascript:;" class="btn btn-icon btn-circle btn-success btn-scroll-to-top fade" data-click="scroll-top">
	<i class="fa fa-angle-up"></i>
</a>
<!-- end scroll to top btn -->
</div>
<!-- end page container -->

<!-- ================== BEGIN BASE JS ================== -->

<!--[if lt IE 9]>
<script src="https://erp.psit.ac.in/assets/crossbrowserjs/html5shiv.js"></script>
<script src="https://erp.psit.ac.in/assets/crossbrowserjs/respond.min.js"></script>
<script src="https://erp.psit.ac.in/assets/crossbrowserjs/excanvas.min.js"></script>
<![endif]-->
<script src="https://erp.psit.ac.in/assets/plugins/slimscroll/jquery.slimscroll.min.js"></script>
<script src="https://erp.psit.ac.in/assets/plugins/jquery-cookie/jquery.cookie.js"></script>
<!-- ================== END BASE JS ================== -->

<!-- ================== BEGIN PAGE LEVEL JS ================== -->
<script src="https://erp.psit.ac.in/assets/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js"></script>
<script src="https://erp.psit.ac.in/assets/plugins/ionRangeSlider/js/ion-rangeSlider/ion.rangeSlider.min.js"></script>
<script src="https://erp.psit.ac.in/assets/plugins/bootstrap-colorpicker/js/bootstrap-colorpicker.min.js"></script>
<script src="https://erp.psit.ac.in/assets/plugins/masked-input/masked-input.min.js"></script>
<script src="https://erp.psit.ac.in/assets/plugins/bootstrap-timepicker/js/bootstrap-timepicker.min.js"></script>
<script src="https://erp.psit.ac.in/assets/plugins/password-indicator/js/password-indicator.js"></script>
<script src="https://erp.psit.ac.in/assets/plugins/bootstrap-combobox/js/bootstrap-combobox.js"></script>
<script src="https://erp.psit.ac.in/assets/plugins/bootstrap-select/bootstrap-select.min.js"></script>
<script src="https://erp.psit.ac.in/assets/plugins/bootstrap-tagsinput/bootstrap-tagsinput.min.js"></script>
<script src="https://erp.psit.ac.in/assets/plugins/bootstrap-tagsinput/bootstrap-tagsinput-typeahead.js"></script>
<script src="https://erp.psit.ac.in/assets/plugins/jquery-tag-it/js/tag-it.min.js"></script>
<script src="https://erp.psit.ac.in/assets/plugins/bootstrap-daterangepicker/moment.js"></script>
<script src="https://erp.psit.ac.in/assets/plugins/bootstrap-daterangepicker/daterangepicker.js"></script>
<script src="https://erp.psit.ac.in/assets/plugins/select2/dist/js/select2.min.js"></script>
<script src="https://erp.psit.ac.in/assets/js/form-plugins.demo.min.js"></script>
<script src="https://erp.psit.ac.in/assets/plugins/DataTables/js/jquery.dataTables.js"></script>
<script src="https://erp.psit.ac.in/assets/js/table-manage-default.demo.min.js"></script>
<script src="https://erp.psit.ac.in/assets/plugins/parsley/dist/parsley.js"></script>
<script src="https://erp.psit.ac.in/assets/js/apps.min.js"></script>
<!-- ================== END PAGE LEVEL JS ================== -->
<script>
	$(document).ready(function() {
		App.init();
		FormPlugins.init();
		TableManageDefault.init();
		Dashboard.init();
	});


</script>


</body>

</html>


`
