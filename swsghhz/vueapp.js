var map = new BMap.Map("BMapContainer");
map.centerAndZoom(new BMap.Point(116, 33), 7);
// map.addControl(new BMap.NavigationControl({
//     type: BMAP_NAVIGATION_CONTROL_SMALL
// }));
map.enableScrollWheelZoom();




const vapp = new Vue({
    el: '#sidepanel',
    data: {
        plys: [],
        editingNewCity: "淮安",
        editingPlyIndex: -1,
        formStyleConfig: {
            strokeWeight: '2',
            strokeColor: '#000000',
            strokeOpacity: '1',
            strokeStyle: 'solid',
            fillColor: '#0000ff',
            fillOpacity: '0.5',
            //上边都是标准的百度API接口参数
        },
    },

    computed: {
        formStrokeOpacity: {
            //表单元素绑定这个，然后用set设置真实值
            get: function () {
                return this.formStyleConfig.strokeOpacity * 100
            },
            set: function (formValue) {
                this.formStyleConfig.strokeOpacity = (formValue / 100).toString()
            }
        },
        formFillOpacity: {
            get: function () {
                return this.formStyleConfig.fillOpacity * 100
            },
            set: function (formValue) {
                this.formStyleConfig.fillOpacity = (formValue / 100).toString()
            }
        },
        reversedPlys() {
            return Array.from(this.plys).reverse()
        }
    },
    methods: {
        addCity() {
            //             console.log('click addcity')
            let bdary = new BMap.Boundary();
            bdary.get(this.editingNewCity, (rs) => {
                var count = rs.boundaries.length; //行政区域的块有多少个（一般是1）
                if (!rs.boundaries.length) {
                    alert('未找到地区名')
                    return
                }
                for (var i = 0; i < count; i++) {

                    let ply = new BMap.Polygon(rs.boundaries[i]); //, this.formStyleConfig //建立多边形覆盖物
                    ply.setFromForm(this.formStyleConfig)
                    map.addOverlay(ply);
                    ply.coverCityName = this.editingNewCity //附加城市名称信息
                }
                this.plys = map.getOverlays()
                // this.plys.push(map.getOverlays()[map.getOverlays().length - 1])
                this.editingPlyIndex = map.getOverlays().length - 1
                this.editingNewCity = ''

            });
        },


        undoLast() {
            map.removeOverlay(map.getOverlays()[map.getOverlays().length - 1])
            this.editingPlyIndex = map.getOverlays().length - 1
            this.plys = map.getOverlays()
        },
        clearAllPlys() {
            map.clearOverlays()
            this.editingPlyIndex = -1
            this.plys = map.getOverlays()
        }
    }
})

vapp.$watch('formStyleConfig', function () {
    // console.log(this.formStyleConfig.strokeOpacity)
    if (this.editingPlyIndex >= 0) {
        map.getOverlays()[this.editingPlyIndex].setFromForm(this.formStyleConfig)

    }
}, {
    deep: true
})


BMap.Polygon.prototype.loadToForm = function () {
    sconf.strokeWeight = this.getStrokeWeight()
    sconf.strokeColor = this.getStrokeColor()
    sconf.strokeOpacity = this.getStrokeOpacity()
    sconf.strokeStyle = this.getStrokeStyle()
    sconf.fillColor = this.getFillColor()
    sconf.fillOpacity = this.getFillOpacity()
}
BMap.Polygon.prototype.setFromForm = function (sconf) {
    this.setStrokeWeight(sconf.strokeWeight)
    this.setStrokeColor(sconf.strokeColor)
    this.setStrokeOpacity(sconf.strokeOpacity)
    this.setStrokeStyle(sconf.strokeStyle)
    this.setFillColor(sconf.fillColor)
    this.setFillOpacity(sconf.fillOpacity)

}