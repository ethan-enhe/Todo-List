var app = getApp();
var cl = getApp().globaldata.bkgcolor;
var im = getApp().globaldata.bkgimage;
Page({
    onshow: function (options) {
        var cl = getApp().globaldata.bkgcolor;
        var im = getApp().globaldata.bkgimage;
        console.log(cl);
    },
    data: {
        cl,
        im
    },
    bkgsetred() {
        getApp().globaldata.bkgcolor = "red";
        getApp().globaldata.bkgimage = "none";
        this.setData({
            cl: "red",
            im: "none"
        })
    },
    bkgsetorange() {
        app.globaldata.bkgcolor = "orange";
        getApp().globaldata.bkgimage = "none";
        this.setData({
            cl: "orange",
            im: "none"
        })
    },
    bkgsetgreen() {
        app.globaldata.bkgcolor = "green";
        getApp().globaldata.bkgimage = "none";
        this.setData({
            cl: "green",
            im: "none"
        })
    },
    bkgsetblue() {
        app.globaldata.bkgcolor = "blue";
        getApp().globaldata.bkgimage = "none";
        this.setData({
            cl: "blue",
            im: "none"
        })
    },
    bkgsetpurple() {
        app.globaldata.bkgcolor = "purple";
        getApp().globaldata.bkgimage = "none";
        this.setData({
            cl: "purple",
            im: "none"
        })
    },
    bkgsetpink() {
        app.globaldata.bkgcolor = "pink";
        getApp().globaldata.bkgimage = "none";
        this.setData({
            cl: "pink",
            im: "none"
        })
    },
    bkgsetdefault() {
        app.globaldata.bkgcolor = "none";
        getApp().globaldata.bkgimage = "none";
        this.setData({
            cl: "none",
            im: "none"
        })
    },
    bkgsetimg1() {
        app.globaldata.bkgcolor = "none";
        getApp().globaldata.bkgimage = "/image/bkg1.jpg";
        this.setData({
            cl: "none",
            im: "/image/bkg1.jpg"
        })
    },
    bkgsetimg2() {
        app.globaldata.bkgcolor = "none";
        getApp().globaldata.bkgimage = "/image/bkg2.jpg";
        this.setData({
            cl: "none",
            im: "/image/bkg2.jpg"
        })
    },
    bkgsetimg3() {
        app.globaldata.bkgcolor = "none";
        getApp().globaldata.bkgimage = "/image/bkg3.jpg";
        this.setData({
            cl: "none",
            im: "/image/bkg3.jpg"
        })
    },
    bkgsetimg4() {
        app.globaldata.bkgcolor = "none";
        getApp().globaldata.bkgimage = "/image/bkg4.jpeg";
        this.setData({
            cl: "none",
            im: "/image/bkg4.jpeg"
        })
    },
})

/* Component({
    
    pageLifetimes: {
        show() {
            每个页面的tab栏实例是不一样的
            在切换到的页面里还需要设置那个页面的tab实例的选中项目。
            if (typeof this.getTabBar === 'function' &&
                this.getTabBar()) {
                this.getTabBar().setData({
                    selected: 3
                })
            }
        }
    },
    methods: {
        
    }
})*/