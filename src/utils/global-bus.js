// 使任何组件可以相互进行通信
import Vue from 'vue'

export default new Vue()

//假设a组件要想向b组件发送数据

// 1.b组件中注册通信的事件
    // import globalBus from '@utils/global-bus'
    // globalBus.$on('foo',(data)=>{
    //     //处理函数
    // })

//a中发布通信事件
    // import globalBus from '@utils/global-bus'
    //globalBus.$emit('foo',1232)