/**
 * Created by 程哲旭 on 2017-12-11.
 * 依赖：
 * Version 1.0.0
 */

/**状态正常*/
var NORMAL="100";
/**状态失败*/
var ABNORMAL="101";
/**需要判读是否通过*/
var IS_PASS="102";

/**
 * 数据渲染到到月份
 * @param month
 * 			最大月份
 * @param label
 * 			要渲染的标签
 * @param content
 * 			后缀文字
 * */
function renderingMonth(month,label,content){
	$("#"+label).html("")
	content = content==null?"":content;
	for (var i=month;i>0;--i){
		var months=("000"+i);
		$("#"+label).append("<option value='" + (i) + "'>" + (months.substring(months.length-2)) +content+ "</option>");
	}
}

/**
 * 数据渲染到年份
 * @param backNum
 * 			循环回退年份
 * @param label
 * 			要渲染的标签
 * @param content
 * 			后缀文字
 * */
function renderingYear(backNum,label,content){
	$("#"+label).html("")
	content = content==null?"":content;
	var year= new Date().getFullYear();
	for (var i=0;i<backNum;i++){
		$("#"+label).append("<option value='" + (year-i) + "'>" + (year-i) +content+ "</option>");
	}
}

/**
 * 根据年份返回月数
 * @param year
 * 			年份
 * @return monthh
 * 			如果是当前年份则返回当前月份,否则返回12
 * */
function getMonth(year){
	var date = new Date();
	if (year==null) return date.getMonth()+1;
	if(year==date.getFullYear().toString()){
		return date.getMonth()+1;
	}
	return 12;
}

//获得当前日
function getnewDay() {
    var date=new Date()
    var day=date.getDate();
    return day;
}

//获得某月的天数
function getMonthDays(nowyear,myMonth) {
    var monthStartDate = new Date(nowyear, myMonth, 1);
    var monthEndDate = new Date(nowyear, myMonth + 1, 1);
    var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);//格式转换
    return days;
}
//判断年份不是当前年份，则月份显示1-12，若是当前年份，则显示当前月份到1月
function jtyear() {
    renderingMonth(getMonth($("#year option:selected").text()),"month");
    refresh();
}
function refresh(){
    if($("#month").val()<=9){
        month="0"+$("#month").val()
    }
    else{
        month=$("#month").val()
    }
    if($("#sireBreed option:selected").text()==$("#dambreed option:selected").text()){
        $("#name").val($("#year").val()+month+$.trim($("#sireBreed option:selected").text()))
    }
    else{
        $("#name").val($("#year").val()+month+$.trim($("#sireBreed option:selected").text())+$.trim($("#dambreed option:selected").text()))
    }
}

/**
 * 校验并添加
 * 		如果不save_url为不执行保存方法
 * 
 * @param verify_url
 * 			校验接口地址
 * @param save_url
 * 			保存接口地址
 * @return 校验成功或添加成功返回true 否则返回false
 * */
function verifyAndSave(verify_url,save_url){
	$(".myform").serialize();
	$.post(verify_url ,$(".myform").serialize(), function (data) {
	 	if (data.code==NORMAL){
	 		if (save_url==null)
	 			return true;
			return save(save_url);
		}
		if (data.code == ABNORMAL){
			msg(data.msg)
        	return false;
		}
	});
}

/**
 * 保存并跳转页面
 * 		如果返回路径为空则不跳转页面
 * @param save_url
 * 			保存url
 * @param path
 * 			跳转页面路径
 * */
function save(save_url){
	$.post(save_url,$(".myform").serialize(), function (data) {
		if (data.code == ABNORMAL) {
            msg(data.msg)
            return false;
        }
		if (data.code == NORMAL){
			msg("添加成功")
			return true;
		}
	});
}

/**
 * 校验方式
 * */
var japPage;
function utilsSubmit(saveVerifyUrl,saveUrl,ids,isValid,page){
    japPage=page;
	if (isValid){
		if ($(".myform").valid()) {
			if (ids.length==0){
				msg("请选择数据！");
			}
			else{
				saveVerify(ids,saveVerifyUrl,saveUrl)
			}
		}
	}
}

function saveVerify(ids,saveVerifyUrl,saveUrl){
	//控制不停点击提交按钮
    // $('#save').attr('disabled',"true")
    var k=true;
	$.post(saveVerifyUrl, function (data) {
		// $('#save').removeAttr("disabled");
		data.forEach(function(d){
			if(d.code=='101'){
				k=false;
                // var msg = d.msg.split(":");
                $("table").find("tr").each(function () {
                    var t = this;
                    var tdArr = $(this).children();
                    var tableTd = tdArr.eq(1).text();
                    var msg = d.msg.split(":");
                    if (tableTd == msg[0]) {
                        $(t).css("color", "#ff6666");
                        //添加错误原因列
                        $(t).find('td:last').html(d.msg)
                    }
                });
                // if(sireCode==msg[0]){
                //     alert(d.msg)
                // }
			}
         });
		//校验通过执行添加
		if (k){
			save(ids,saveUrl);
		}
	});
}


function save(ids,saveUrl){
    $('#save').attr('disabled',"true")
    $("#idsValue").val(ids);
    $.post(saveUrl ,$(".myform").serialize(), function (data) {
        //若果修改成功跳转页面
        if (data.code == "100") {
            msg("添加成功")
			to(japPage);
            // $('#save').attr('disabled',"false")
        }
        $("table").find("tr").each(function () {
            var t = this;
            $(t).css("color", "black");
        });
    })
}

function mergeCell(num) {
	ids='#simple-table'
    var tr = $(""+ids).find("tr").length; // 获取当前表格中tr的个数
    var td = $(""+ids).find("tr").find("td").length / tr;
    for(var i = 0; i < td-num; i++) {
        table_rowspan(ids, i)
    }
}

/**
 * @ function：合并指定表格列（表格id为table_id）指定列（列数为table_colnum）的相同文本的相邻单元格
 * @ param：table_id 为需要进行合并单元格的表格的id。如在HTMl中指定表格 id="data" ，此参数应为 #data
 * @ param：table_colnum 为需要合并单元格的所在列。为数字，从最左边第一列为1开始算起。
 */
function table_rowspan(table_id, table_colnum) {
    table_firsttd = "";
    table_currenttd = "";
    table_SpanNum = 0;
    table_Obj = $(table_id + " tr td:nth-child(" + table_colnum + ")");

    table_Obj.each(function(i) {
        if(i == 0) {
            table_firsttd = $(this);
            table_SpanNum = 1;
        } else {
            table_currenttd = $(this);
            if(table_firsttd.text() == table_currenttd.text()) { //这边注意不是val（）属性，而是text（）属性
                //td内容为空的不合并
                if(table_firsttd.text() != "") {
                    table_SpanNum++;
                    table_currenttd.hide(); //remove();
                    table_firsttd.attr("rowSpan", table_SpanNum);
                }
            } else {
                table_firsttd = $(this);
                table_SpanNum = 1;
            }
        }
    });
}
