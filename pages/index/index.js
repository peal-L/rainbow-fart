
var app = getApp().globalData

Page({

  /**
   * 页面的初始数据
   */
  data: {
    myName: app.myName,
    otherName: app.otherName,
    myHead: '../../img/head2.png',
    otherHead: '../../img/head.png',
    type: ['爱情屁', '商务屁'],
    typeIndex: 0
  },

  typeChange: function(e) {
    console.log(e.detail.value);
    this.setData({
      typeIndex: e.detail.value
    })
  },

  goChat: function() {
    if (this.data.myName != '' && this.data.otherName != '') {
      getApp().globalData.myName = this.data.myName
      getApp().globalData.otherName = this.data.otherName
      getApp().globalData.type = this.data.typeIndex
      wx.setStorageSync('myName', this.data.myName)
      wx.setStorageSync('otherName', this.data.otherName)
      wx.navigateTo({
        url: '/pages/chat/chat'
      })
    }
    else {
      wx.showToast({
        title: '没名字玩个鬼啊',
        icon: 'none'
      })
    }
  },

  chooseHead: function(e) {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        console.log(res.tempFilePaths[0])
        if (e.currentTarget.dataset.type == 0) {
          getApp().globalData.myHead = res.tempFilePaths[0]
          that.setData({
            myHead: res.tempFilePaths[0]
          })
        }
        else {
          getApp().globalData.otherHead = res.tempFilePaths[0]
          that.setData({
            otherHead: res.tempFilePaths[0]
          })
        }
      },
    })
  },

  inputValue: function(e) {
    if (e.currentTarget.dataset.type == 0) {
      this.setData({
        myName: e.detail.value
      })
    }
    else {
      this.setData({
        otherName: e.detail.value
      })
    }
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '疯狂彩虹屁正在袭来~~',
      path: '/pages/index/index',
      imageUrl: '../../img/share.png'
    }
  }
})