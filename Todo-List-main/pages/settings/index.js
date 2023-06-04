var app = getApp();
var cl = app.globaldata.bkgcolor;
var im = app.globaldata.bkgimage;
Page({
    onShow: function (options) {
        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            this.getTabBar().setData({
                selected: 3
            })
        }
    },
    data: {
        cl,
        im
    },
    bkgsetred() {
        app.globaldata.bkgcolor = "red";
        app.globaldata.bkgimage = "none";
        this.setData({
            cl: app.globaldata.bkgcolor,
            im: app.globaldata.bkgimage
        })
    },
    bkgsetorange() {
        app.globaldata.bkgcolor = "orange";
        app.globaldata.bkgimage = "none";
        this.setData({
            cl: app.globaldata.bkgcolor,
            im: app.globaldata.bkgimage
        })
    },
    bkgsetgreen() {
        app.globaldata.bkgcolor = "green";
        app.globaldata.bkgimage = "none";
        this.setData({
            cl: app.globaldata.bkgcolor,
            im: app.globaldata.bkgimage
        })
    },
    bkgsetblue() {
        app.globaldata.bkgcolor = "blue";
        app.globaldata.bkgimage = "none";
        this.setData({
            cl: app.globaldata.bkgcolor,
            im: app.globaldata.bkgimage
        })
    },
    bkgsetpurple() {
        app.globaldata.bkgcolor = "purple";
        app.globaldata.bkgimage = "none";
        this.setData({
            cl: app.globaldata.bkgcolor,
            im: app.globaldata.bkgimage
        })
    },
    bkgsetpink() {
        app.globaldata.bkgcolor = "pink";
        app.globaldata.bkgimage = "none";
        this.setData({
            cl: app.globaldata.bkgcolor,
            im: app.globaldata.bkgimage
        })
    },
    bkgsetdefault() {
        app.globaldata.bkgcolor = "none";
        app.globaldata.bkgimage = "none";
        this.setData({
            cl: app.globaldata.bkgcolor,
            im: app.globaldata.bkgimage
        })
    },
    bkgsetimg1() {
        app.globaldata.bkgcolor = "none";
        app.globaldata.bkgimage = "/image/bkg1.jpg";
        this.setData({
            cl: app.globaldata.bkgcolor,
            im: app.globaldata.bkgimage
        })
    },
    bkgsetimg2() {
        app.globaldata.bkgcolor = "none";
        app.globaldata.bkgimage = "/image/bkg2.jpg";
        this.setData({
            cl: app.globaldata.bkgcolor,
            im: app.globaldata.bkgimage
        })
    },
    bkgsetimg3() {
        app.globaldata.bkgcolor = "none";
        app.globaldata.bkgimage = "/image/bkg3.jpg";
        this.setData({
            cl: app.globaldata.bkgcolor,
            im: app.globaldata.bkgimage
        })
    },
    bkgsetimg4() {
        app.globaldata.bkgcolor = "none";
        app.globaldata.bkgimage = "/image/bkg4.jpeg";
        this.setData({
            cl: app.globaldata.bkgcolor,
            im: app.globaldata.bkgimage
        })
    },
})

/* Component({
    
    pageLifetimes: {
        show() {
            每个页面的tab栏实例是不一样的
            在切换到的页面里还需要设置那个页面的tab实例的选中项目。
        }
    },
    methods: {
        
    }
})*/