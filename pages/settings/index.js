var app = getApp();
var cl = cl;
var im = im;
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
        cl = "red";
        im = "none";
        this.setData({
            cl: cl,
            im: im
        })
    },
    bkgsetorange() {
        cl = "orange";
        im = "none";
        this.setData({
            cl: cl,
            im: im
        })
    },
    bkgsetgreen() {
        cl = "green";
        im = "none";
        this.setData({
            cl: cl,
            im: im
        })
    },
    bkgsetblue() {
        cl = "blue";
        im = "none";
        this.setData({
            cl: cl,
            im: im
        })
    },
    bkgsetpurple() {
        cl = "purple";
        im = "none";
        this.setData({
            cl: cl,
            im: im
        })
    },
    bkgsetpink() {
        cl = "pink";
        im = "none";
        this.setData({
            cl: cl,
            im: im
        })
    },
    bkgsetdefault() {
        cl = "none";
        im = "none";
        this.setData({
            cl: cl,
            im: im
        })
    },
    bkgsetimg1() {
        cl = "none";
        im = "/image/bkg1.jpg";
        this.setData({
            cl: cl,
            im: im
        })
    },
    bkgsetimg2() {
        cl = "none";
        im = "/image/bkg2.jpg";
        this.setData({
            cl: cl,
            im: im
        })
    },
    bkgsetimg3() {
        cl = "none";
        im = "/image/bkg3.jpg";
        this.setData({
            cl: cl,
            im: im
        })
    },
    bkgsetimg4() {
        cl = "none";
        im = "/image/bkg4.jpeg";
        this.setData({
            cl: cl,
            im: im
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