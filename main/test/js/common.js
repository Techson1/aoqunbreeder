/**
 * Created by WD on 2017-8-23.
 */

// var base_url = "http://192.168.1.162:8080/aoqun/";
var base_url = "http://czx:8080/";
// var base_url = "http://test.beiqisoft.com:8080/aoqun/";

// var base_url = "http://192.168.2.2:8080/";
var Authorization = "Authorization";
var Bearer = "Bearer";
/**
 * 获取搜索表单数据
 */
function getSearchFormData() {
    return $(".searchForm").serialize();
}
function getUrl(url) {
    return base_url + url;
}
/**
 * 获取权限
 */
function getAuthorization() {
    return Authorization + "=" + Bearer + " " + localStorage.authorization;
}
/**
 * 设置权限
 */
function setAuthorization(authorizationData) {
    localStorage.authorization = authorizationData;
}
/**
 * POST 网络请求（po = $.post）
 */
function po() {
    if (arguments.length == 2) {
        aj(arguments[0], "post", getAuthorization(), arguments[1]);
    }
    else if (arguments.length == 3) {
        aj(arguments[0], "post", arguments[1] + "&" + getAuthorization(), arguments[2]);
    }
}
/**
 * GET 网络请求（ge = $.get）
 */
function ge(url, pama, result) {
    if (arguments.length == 2) {
        aj(arguments[0], "get", getAuthorization(), arguments[1]);
    }
    else if (arguments.length == 3) {
        aj(arguments[0], "get", arguments[1] + "&" + getAuthorization(), arguments[2]);
    }
}
/**
 * 网络加载(aj = $.ajax)
 * @param url 地址
 * @param type 类型（post、get）
 * @param pama 参数
 */
function aj(url, type, pama, result) {
    var index = layer.load(2);
    $.ajax({
        url: url,
        data: pama,
        timeout: 10000,
        type: type,
        success: function (data) {
            result(data)
        },
        complete: function (xhr, textStatus) {
            if (xhr.status == 401) {
                msg("您没有权限");
            } else {
                //msg("状态码："+xhr.status);
            }
            layer.close(index);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (textStatus == "timeout") {
                msg("加载超时，请重试");
            } else {
                msg("错误码：" + jqXHR);
            }
        }
    })
}
/**
 * 显示消息
 * @param content 消息内容
 */
function msg(content) {
    try {
        layer.msg(content)
    } catch (e) {
        alert(content);
    }
}
/**
 * 上传文件
 */
function openUpload() {
    layer.open({
        type: 2,
        title: '文件上传',
        area: ['400px', '250px'],
        fixed: false, //不固定
        maxmin: true,
        content: 'http://cdn.beiqisoft.com/ace1.4/components/oss-h5-upload/index.html'
    });
}

function myValidate() {
    //校验规则
    $('.myform').validate({
        errorElement: 'div',
        errorClass: 'help-block',
        //focusInvalid: false,
        rules: {
            userName: {
                remote: getUrl("user/userNameVerify")
            },
            phone: {
                remote: getUrl("user/phoneVerify")
            },
            roleName: {
                remote: getUrl("role/roleNameVerify")
            },
            orgName: {
                remote: getUrl("organization/orgNameVerify")
            },
            breedName: {
                remote: getUrl("breed/breedNameVerify")
            },
            code: {
                remote: getUrl("organization/codeVerify")
            },
            firstName: {
                remote: getUrl("customer/firstNameVerify")
            },
            paddockTypeName: {
                remote: getUrl("paddockType/nameVerify"+"&orgId=1")
            },
            damCode:{
                remote:{
                    type: "POST",				//后台处理程序
                    dataType: "json",           //接受数据格式
                    url:getUrl("baseInfo/notCodeVerify"), //url
                    data:{			 //要传递的数据，可以写多个
                        code:function(){
                            return $("#damCode").val();
                        }
                    }
                }
            },
            sireCode:{
                remote:{
                    type: "POST",				//后台处理程序
                    dataType: "json",           //接受数据格式
                    url:getUrl("baseInfo/notCodeVerify"), //url
                    data:{			 //要传递的数据，可以写多个
                        code:function(){
                            return $("#sireCode").val();
                        }
                    }
                }
            }
        },
        messages: {
            userName: {
                remote: "账号已经存在",
            },
            phone: {
                remote: "手机号已经存在"
            },
            roleName: {
                remote: "角色名已经存在",
            },
            orgName: {
                remote: "分场名称已经存在",
            },
            breedName: {
                remote: "品种名称已经存在",
            },
            code: {
                remote: "英文代码已经存在",
            },
            firstName: {
                remote: "供应商名称已经存在",
            },
            paddockTypeName: {
                remote: "饲舍名称已经存在",
            },
            damCode:{
                remote: "<a href='JavaScript:onAddMonther()'>母羊不存在，请重新输入或添加母羊<a>",
            },
            sireCode:{
                remote: "<a href='JavaScript:onAddFather()'>父羊不存在，请重新输入或添加父羊<a>",
            }

        },
        highlight: function (e) {
            $(e).closest('.form-group').removeClass('has-info').addClass('has-error');
        },
        success: function (e) {
            $(e).closest('.form-group').removeClass('has-error');//.addClass('has-info');
            $(e).remove();
        },
        errorPlacement: function (error, element) {
            if (element.is('input[type=checkbox]') || element.is('input[type=radio]')) {
                var controls = element.closest('div[class*="col-"]');
                if (controls.find(':checkbox,:radio').length > 1) controls.append(error);
                else error.insertAfter(element.nextAll('.lbl:eq(0)').eq(0));
            }
            else if (element.is('.select2')) {
                error.insertAfter(element.siblings('[class*="select2-container"]:eq(0)'));
            }
            else if (element.is('.chosen-select')) {
                error.insertAfter(element.siblings('[class*="chosen-container"]:eq(0)'));
            }
            else error.insertAfter(element.parent());
        }

    });


    //创建并校验日期
    $('.datep').datepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        autoclose: true,
        minView: "month"
        // defaultDate : new Date()
    }).on('changeDate', function (ev) {
        $(this).closest('form').validate().element($(this));//加上校验规则
    });
    //提交表单，防止重复提交
    $(".btn-submit").click(function () {
        if ($(".myform").valid()) {
            if (getPama1()==null || getPama1()=="" || getPama1()==undefined){

            }else{
                alert("else")
                $(".btn-submit i").removeClass().addClass("fa fa-spin fa-spinner  bigger-110");
                $(".btn-submit span").html("正在提交...");
                $(".btn-submit").attr('disabled', true);
                po(getUrl(getPama1()), $(".myform").serialize(), function (data) {
                    to(getPama2());
                });
            }
        }
    })
}
function getPama() {
    var rs = localStorage.pama;
    localStorage.pama = '';
    return rs;
}
function setPama(pama) {
    localStorage.pama = pama;
}
function getPama1() {
    var rs = localStorage.pama1;
    localStorage.pama1 = '';
    return rs;
}
function setPama1(pama1) {
    localStorage.pama1 = pama1;
}
function getPama2() {
    var rs = localStorage.pama2;
    localStorage.pama2 = '';
    return rs;
}
function setPama2(pama2) {
    localStorage.pama2 = pama2;
}
function to(url) {
    location.href = url;
}
function layerConfirm() {
    var index = layer.confirm('您确定要删除此数据？', {
        btn: ['确定', '取消'] //按钮
    }, function () {
        layer.close(index);
        return true;
    }, function () {
        layer.close(index);
        return false;
    });
}
function initCheckBox() {
    $('th input[type=checkbox], td input[type=checkbox]').prop('checked', false);
    var active_class = 'active';
    $('#simple-table > thead > tr > th input[type=checkbox]').eq(0).on('click', function () {
        var th_checked = this.checked;//checkbox inside "TH" table header
        $(this).closest('table').find('tbody > tr').each(function () {
            var row = this;
            if (th_checked) $(row).addClass(active_class).find('input[type=checkbox]').eq(0).prop('checked', true);
            else $(row).removeClass(active_class).find('input[type=checkbox]').eq(0).prop('checked', false);
        });
    });
}