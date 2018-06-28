/**
 * Created by BQ on 2017-9-5.
 */

var vue = new Vue({
    el: '#app',
    data: {data: "", data1: "", data2: "", data3: "",data4:"",data5:"",data6:"",pvgs: "", yes: "", no: "",checkcode:""}, methods: {
        load: function (url, id) {
            if (id != "" && id != undefined) {
                po(getUrl(url + id), function (data) {
                    vue.data = data;
                })
            }
        },
        loadPama: function (url) {
            po(getUrl(url), function (data) {
                vue.data1 = data;
            })
        },
        loadPama1: function (url) {
            po(getUrl(url), function (data) {
                vue.data3 = data;
            })
        },
        loadPama2: function (url) {
            po(getUrl(url), function (data) {
                vue.data4 = data;
            })
        },
        loadPama3: function (url) {
            po(getUrl(url), function (data) {
                vue.data5 = data;
            })
        },
        loadPamaWithCallback: function (url,fun) {
            po(getUrl(url), function (data) {
                vue.data6 = data;
                vue.$nextTick(function(){
                    fun();
                })
            })
        },
        loadPamaWithCallback1: function (url,fun) {
            po(getUrl(url), function (data) {
                vue.data6 = data;
                vue.$nextTick(function(){
                    fun();
                })
            })
        },
        loadPamayes: function (url, isStatistics) {
            po(getUrl(url + '?isStatistics=' + isStatistics), function (data) {
                vue.yes = data;
            })
        },
        loadCompany: function () {
            vue.data2 = JSON.parse(localStorage.userInfo);
        },
        loadjy: function (url) {
            po(getUrl(url), function (data) {
                vue.jy = data;
            })
        },
        loadPvg: function () {
            this.pvgs = JSON.parse(localStorage.pvgs);
        },
        even: function (pama) {
            var _selfPvgs = this.pvgs.selfPvgs;
            var rs;
            try {
                rs = pama.filter(function (pvg) {
                    return _selfPvgs.indexOf(pvg.id) >= 0;
                })
            }catch (err){}

            return rs;
        },
        childrenmothid: function (url, parentId) {
            localStorage.motherId = parentId;
            location.href = url;
        } ,
        selectList: function (url_selectlist,url_back) {
            setPama(url_back)
            location.href = url_selectlist;
        }
    }
});
