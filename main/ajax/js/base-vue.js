/**
 * Created by WD on 2017-8-14.
 * 依赖：layer.js vue.js common.js
 * Version 1.0.0
 */

var root = new Vue({
        el: '#app',
        data: {data: "", data1: '', data2: '', data3: '', data4: '', data5: '', data6: '', data7: '', data8: '', data9: '', data10: '',data11:"",data12:"",data88:"",
            data99:[]},
        created: function () {
            this.load();
        },
        methods: {
            load: function () {
                if(localStorage.url_list.length>=1){
                    po(getUrl(localStorage.url_list), getSearchFormData(), function (data) {
                        var se = dispage(data.number,data.totalPages);
                        data.startPage = se[0];
                        data.endPage = se[1];
                        root.data = data;
                    });
                }
            },
            loadedit: function (url) {
                var ids = getIds();
                if (ids != "" && ids != undefined) {
                    po(getUrl(url + ids), function (data) {
                        root.data6 = data;
                    })
                }
            },
            loadPama: function (url) {
                po(getUrl(url), function (data) {
                    root.data1 = data;
                });
            } ,
            loadPama1: function (url) {
                po(getUrl(url), function (data) {
                    root.data8 = data;
                });
            } ,
            loadPama2: function (url) {
                po(getUrl(url), function (data) {
                    root.data9 = data;
                });
            } ,
            loadPama3: function (url) {
                po(getUrl(url), function (data) {
                    root.data11 = data;
                });
            } ,
            loadPama4: function (url) {
                po(getUrl(url), function (data) {
                    root.data12 = data;
                });
            } ,
            loadCompany: function () {
                root.data5 = JSON.parse(localStorage.userInfo);
            },
            del: function () {
                var ids = getIds();
                if (ids.length != 0) {
                    if(ids.length==1){
                        if(ids[0]=='on'){
                            msg("不能选择标题")
                        }else{
                            var index = layer.confirm('您确定要删除此数据？', {
                                btn: ['确定', '取消'] //按钮
                            }, function () {
                                layer.close(index);
                                po(getUrl(localStorage.url_del), 'ids=' + ids + "&" + getAuthorization(), function (data) {
                                    if (data.code == 100) {
                                        root.load();
                                        $('.ace').attr('checked', false);
                                    } else {
                                        msg("删除出现错误！原因：有关联数据。")
                                    }
                                });
                            }, function () {
                                layer.close(index);
                            });
                        }
                    }else{
                        $.each(ids,function(index,item){
                            if(item=='on'){
                                ids.splice(index,1);
                            }
                        });
                            var index = layer.confirm('您确定要删除此数据？', {
                                btn: ['确定', '取消'] //按钮
                            }, function () {
                                layer.close(index);
                                po(getUrl(localStorage.url_del), 'ids=' + ids + "&" + getAuthorization(), function (data) {
                                    if (data.code == 100) {
                                        root.load();
                                        $('.ace').attr('checked', false);
                                    } else {
                                        msg("删除出现错误！原因：有关联数据。")
                                    }
                                });
                            }, function () {
                                layer.close(index);
                            });

                    }
                } else {
                    msg("请选择数据！")
                }
            },
            delRelation: function () {
                var ids = getIds();
                if (ids.length ==1) {
                    var index = layer.confirm('该数据是关系数据，您确定要删除此数据？', {
                        btn: ['确定', '取消'] //按钮
                    }, function () {
                        layer.close(index);
                        po(getUrl(localStorage.delRelation) + ids, function (data) {
                            if (data.code == 101) {
                                msg(data.msg);
                            }
                            else{
                                $('.ace').attr('checked', false);
                                root.load();
                            }
                        });
                    }, function () {
                        layer.close(index);
                    });
                }
                else if (ids.length > 1) {
                    msg("只能选择一条数据！")
                } else {
                    msg("请选择数据！")
                }
            },
            edit: function (url_edit) {
                var ids = getIds();
                localStorage.editId = ids;
                if (ids.length == 1) {
                    if(ids[0]=='on'){
                        msg("不能选择标题")
                        $('.ace').attr('checked', false);
                    }
                    else{
                        setPama(ids[0]);
                        localStorage.motherId=ids[0]
                        location.href = url_edit;
                    }
                } else if (ids.length > 1) {
                    msg("只能选择一条数据！")
                    $('.ace').attr('checked', false);
                } else {
                    msg("请选择数据！")
                }
            } ,
            editVerify:function(url_edit,url_verify){
                var ids = getIds();
                localStorage.editId = ids;
                if (ids.length == 1) {
                    if(ids[0]=='on'){
                        msg("不能选择标题")
                    }
                    else{
                        po(getUrl(url_verify)+"/"+ids[0], function (data) {
                            if(data.code=='101'){
                                msg(data.msg)
                            }
                            else{
                                setPama(ids[0]);
                                localStorage.editID=ids[0]
                                location.href = url_edit;
                            }
                        });
                    }
                } else if (ids.length > 1) {
                    msg("只能选择一条数据！")
                } else {
                    msg("请选择数据！")
                }
            },
            lamb: function (url_lamb) {
                //添加羔羊，传母羊id
                var ids = getIds();
                if (ids.length == 1) {
                    localStorage.motherId = ids[0];
                    location.href = url_lamb;
                } else if (ids.length > 1) {
                    msg("只能选择一条数据！")
                } else {
                    msg("请选择数据！")
                }
            } ,
            editId: function (url_edit,id) {
                setPama(id);
                location.href = url_edit;
            } ,
            animalList: function (url_edit) {
                    var ids = getIds();
                    if (ids.length == 1) {
                        setPama(ids[0]);
                        location.href = url_edit;
                    } else if (ids.length > 1) {
                        msg("只能选择一条数据！")
                    } else {
                        msg("请选择数据！")
                    }
            },
            //从列表种选择，接收选择的列表和返回的页面地址
            selectList: function (url_selectlist,url_back) {
                setPama(url_back)
                location.href = url_selectlist;
            },
            selectListplan: function (url_selectlistplan,planId) {
                setPama(planId);
                location.href = url_selectlistplan;
            },
            children: function (url, parentId) {
                localStorage.deathDisposalReasonId = parentId;
                location.href = url;
            } ,
            //鲜胚移植、冻胚制作传冲胚Id
            xd: function (url, parentId) {
                localStorage.xdid = parentId;
                location.href = url;
            } ,
            childrenurl: function (url) {
                location.href = url;
            } ,
            childrenmothid: function (url, parentId) {
                localStorage.motherId = parentId;
                location.href = url;
            } ,
            //接收父母的id，和跳转的页面
            earTagDail: function (url, parentId) {
                localStorage.codePurchaseOrder = parentId;
                location.href = url;
            },
            prev: function () {
                if (!this.data.first) {
                    this.pageqq();
                    this.load();
                } else {
                    msg("已经是第一页");
                }
            }
            ,
            next: function () {
                if (!this.data.last) {
                    this.pagepp();
                    this.load();
                } else {
                    msg("已经是最后一页");
                }
            }
            ,
            goto: function (n) {
                if ($("#page").val() != n) {
                    $("#page").val(n)
                    this.load();
                }
            },
            search: function () {
                $("#page").val("0");
                this.load();
            }
            ,
            pagepp: function () {
                $("#page").val(parseInt($("#page").val()) + 1);
            }
            ,
            pageqq: function () {
                $("#page").val(parseInt($("#page").val()) - 1);
            },
            loadPamaWithCallback: function (url,fun) {
                po(getUrl(url), function (data) {
                    root.data10 = data;
                    var se = dispage(root.data10.number,root.data10.totalPages);
                    root.data10.startPage = se[0];
                    root.data10.endPage = se[1];
                    root.$nextTick(function(){
                        fun();
                    })
                })
            },
            rephb: function (url,path) {
                 po(getUrl(url), function (data) {
                     root.data88 = data;
                     combineCell(data,path)
                 })
             },
            getCount:function (url) {
                var total=0;
                po(getUrl(url), function (data33) {
                    root.data88 = data33;
                    var se = dispage(root.data88.number,root.data88.totalPages);
                    root.data88.startPage = se[0];
                    root.data88.endPage = se[1];
                    data33.content.forEach(function(d){
                      total+=d.num
                    })
                    $("#total").html(total)
                })
            }
        }
    })
;
function getIds() {
    var ids = [];
    $('.ace:checked').each(function () {
        ids.push($(this).val());
    });
    return ids;
}

//创建并校验日期
// $('.datep').datepicker({
//     format: 'yyyy-mm-dd',
//     language: 'zh-CN',
//     autoclose: true,
//     minView: "month",
//     endDate : new Date()
// }).on('changeDate', function (ev) {
//     $(this).closest('form').validate().element($(this));//加上校验规则
// });

var myDate=new Date();
year=myDate.getFullYear()
mon=myDate.getMonth()+1
day=myDate.getDate()
date=year+'-'+mon+'-'+day
laydate.render({
    elem: '.datep',
    max: date
});
laydate.render({
    elem: '.end',
    max: date
});
laydate.render({
    elem: '.end1',
    max: date
});
laydate.render({
    elem: '.start',
    max: date
});


function  clearDate() {
    $(".datep").val("");
    $(".end").val("");
}

function range(type,url,change) {
    var k="base";
    if(change!=null){
        k=change;
    }
    if($(type).val()==1){
        localStorage.url_list = url+"/list?"+k+".org.id="+JSON.parse(localStorage.userInfo).organization.id;
        root.load();
    }else{
        localStorage.url_list = url+"/list?org.id="+JSON.parse(localStorage.userInfo).organization.id;
        root.load();
    }
}


function combineCell(list,poth) {
    for (field in list[0]) {
        if(poth.indexOf(','+field+',')>-1){
            continue;
        }
        var k = 0;
        while (k < list.length) {
            list[k][field + 'span'] = 1;
            list[k][field + 'dis'] = false;
            for (var i = k + 1; i <= list.length - 1; i++) {
                if (list[k][field] == list[i][field] && (list[k][field] != '' || list[k][field]==0)) {
                    list[k][field + 'span']++;
                    list[k][field + 'dis'] = false;
                    list[i][field + 'span'] = 1;
                    list[i][field + 'dis'] = true;
                } else {
                    break;
                }
            }
            k = i;
        }
    }
    return list;
}

function getCountNum(list) {
    var total;
    alert(list.length)
    for(var i in list.length){
        total+=parseInt(list[i].num)
    }
}
 var exportsUrl
var exportsorg
function exports(url,org){
    exportsUrl=url;
    exportsorg=org;
    //页面层
    layer.open({
        type: 1,
        shadeClose:true,
        area: ['200px', '200px'], //宽高
        content: '<select id="number" class="col-sm-11 col-xs-11" style="height: 40px;margin-top: 20px;margin-left: 10px;"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option>' +
        '<option>9</option><option>10</option><option>11</option><option>12</option><option>13</option><option>14</option><option>15</option><option>16</option><option>17</option>' +
        '<option>18</option><option>19</option><option>20</option></select><br><div class="col-xs-12 col-sm-12" style="height: 10px;"></div>' +
        '<button class="col-sm-11 col-xs-11 btn btn-success" onclick="exportsButton()" style="margin-left: 10px;">确认导出</button>'
    });
}

//导出Excel
function exportsButton() {
    layer.closeAll();
    // alert(base_url+exportsUrl+$(".searchForm").serialize()+"&number="+$('#number').val()+'&'+exportsorg+"="+JSON.parse(localStorage.userInfo).organization.id)
    window.location.href=base_url+exportsUrl+$(".searchForm").serialize()+"&number="+$('#number').val()+'&'+exportsorg+"="+JSON.parse(localStorage.userInfo).organization.id;
}

//复制到群组弹出弹出框
function layerOut() {
    layer.open({
        type: 1,
        title: '请输入群组名称',
        area: ['300px', '200px'],
        shadeClose: true,
        content: $("#layerr")

    });
}



