var clearTimer = '',
  app = getApp().globalData;
import {chatData} from '../../data/data.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    myHead: '../../img/head2.png',
    otherHead: '../../img/head.png',
    myName: getApp().globalData.myName,
    otherName: getApp().globalData.otherName,
    height: 0,
    scrollLoca: 0,
    mySendValue: '',
    chatData: [],
    chatAllData: [],
    chatReadyData: []
  },

  startReceive: function(e) {
    let that = this
    clearTimer = setInterval(function() {
      if (that.data.chatReadyData.length == 0) {
        that.setData({
          chatReadyData: that.data.chatAllData
        })
      }
      let index = Math.floor(Math.random() * that.data.chatReadyData.length)
      that.setData({
        chatData: that.data.chatData.concat(that.data.chatReadyData[index])
      }, () => {
        that.setData({
          scrollLoca: 100000
        })

        var lists = that.data.chatReadyData // 删除
        lists.splice(index, 1);
        that.setData({
          chatReadyData: lists
        })

        console.log(that.data.chatReadyData)
      })
    }, 2000)
  },

  mySend: function(e) {
    let that = this,
      newChat = 'chatData[' + that.data.chatData.length + ']'
    if (e.detail.value != '') {
      clearInterval(clearTimer)
      that.setData({
        mySendValue: '',
        [newChat]: {
          person: 1,
          text: e.detail.value
        },
      }, () => {
        that.setData({
          scrollLoca: 100000
        })
        that.startReceive()
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    if (getApp().globalData.myHead) {
      that.setData({
        myHead: getApp().globalData.myHead,
        otherHead: getApp().globalData.otherHead
      })
    }
    wx.setNavigationBarTitle({
      title: getApp().globalData.otherName
    })
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          height: res.windowHeight - 51
        })
        that.startReceive()
      }
    })
    that.setData({
      chatAllData: chatData(getApp().globalData.type, getApp().globalData.myName, getApp().globalData.otherName)
    }, ()=> {
      that.setData({
        chatReadyData: that.data.chatAllData
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    let that = this
    setTimeout(function(){
      that.setData({
        chatData: [{
          person: 0,
          text: '在吗？' + getApp().globalData.myName
        }]
      })
    }, 500)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    clearInterval(clearTimer)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '疯狂彩虹屁正在袭来~~',
      path: '/pages/index/index',
      imageUrl: '../../img/share.png'
    }
  }
})