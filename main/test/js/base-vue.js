/**
 * Created by WD on 2017-8-14.
 * 依赖：layer.js vue.js common.js
 * Version 1.0.0
 */

var root = new Vue({
        el: '#app',
        data: {data: "", data1: '', data2: '', data3: '', data4: '', data5: '', data6: '', data7: '', data8: '', data9: '',
            data99:[]},
        created: function () {
            this.load();
        },
        methods: {
            load: function () {
                po(getUrl(localStorage.url_list), getSearchFormData(), function (data) {
                    root.data = data;
                });
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
            loadCompany: function () {
                root.data5 = JSON.parse(localStorage.userInfo);
            },
            del: function () {
                var ids = getIds();
                if (ids.length != 0) {
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
                } else {
                    msg("请选择数据！")
                }
            },
            delRelation: function () {
                var ids = getIds();
                if (ids.length ==1) {
                        po(getUrl(localStorage.delRelation) + ids, function (data) {
                            if (data.code == 101) {
                                msg(data.msg);
                                $('.ace').attr('checked', false);
                            }
                            else{
                                root.load();
                            }
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
                    setPama(ids[0]);
                    location.href = url_edit;
                } else if (ids.length > 1) {
                    msg("只能选择一条数据！")
                } else {
                    msg("请选择数据！")
                }
            } ,
            editVerify:function(url_edit,url_verify){
                var ids = getIds();
                localStorage.editId = ids;
                if (ids.length == 1) {
                    po(getUrl(url_verify)+"/"+ids[0], function (data) {
                        alert(data.code);
                        if(data.code=='101'){
                            msg(data.msg)
                        }
                        else{
                            setPama(ids[0]);
                            location.href = url_edit;
                        }
                    });
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
                    setPama(ids[0]);
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
            }
            ,
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
$('.datep').datepicker({
    format: 'yyyy-mm-dd',
    language: 'zh-CN',
    autoclose: true,
    minView: "month"
}).on('changeDate', function (ev) {
    $(this).closest('form').validate().element($(this));//加上校验规则
});