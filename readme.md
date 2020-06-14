## wxa-comp-canvas-drag-uni

小程序组件-canvas拖拽画板-uniapp版本

## 概述

wxa-comp-canvas-drag-uni是将微信本部的wxa-comp-canvas-drag组件转成uniapp的版本、
是一个可以添加多种元素（图片和文字）的画板，用户可以移动拖拽元素组成自己喜欢的样子并导出图片。
## 效果
  可以在王者P图助手的贴图功能里面查看、我在里面实现了canvas的放大、缩小、旋转功能。
  <table>
    <thead>
    <td align="center">项目</td>
    <td align="center">微信小程序效果</td>
    <td align="center">头条小程序效果</td>
	<td align="center">微信二维码</td>
    </thead>
    <tr>
      <td align="center">
		王者P图助手
      </td>
      <td align="center">
        <img src="http://oss.123tool.cn/effect/weixin-canvas.jpg" width="200" height="350" alt="支付宝小程序效果"/>
      </td>
	  <td align="center">
	    <img src="http://oss.123tool.cn/effect/toutiao-canvas.jpg" width="200" height="350" alt="百度小程序效果"/>
	  </td>
	  <td align="center">
	    <img src="http://oss.123tool.cn/effect/wzpt_code.jpg" width="200" height="200" alt="百度小程序效果"/>
	  </td>
    </tr>
	<tr>
	  <td align="center">
		DEMO
	  </td>
	  <td align="center">
	    <img src="http://oss.123tool.cn/effect/weixin-canvas-demo.jpg" width="200" height="350" alt="支付宝小程序效果"/>
	  </td>
	  <td align="center">
	    <img src="http://oss.123tool.cn/effect/toutiao-canvas-demo.jpg" width="200" height="350" alt="百度小程序效果"/>
	  </td>
	  <td align="center">
		无
	  </td>
	</tr>
    </table>

## 使用
### 组件拷贝
	复制components组件下面的canvas-drag到自己的组件目录下

### 组件引用
在pages里面引用
1.在main.js注册setData方法
```
Vue.mixin({
	methods: {
		setData: function(obj, callback) {
			let that = this;
			const handleData = (tepData, tepKey, afterKey) => {
				tepKey = tepKey.split('.');
				tepKey.forEach(item => {
					if (tepData[item] === null || tepData[item] === undefined) {
						let reg = /^[0-9]+$/;
						tepData[item] = reg.test(afterKey) ? [] : {};
						tepData = tepData[item];
					} else {
						tepData = tepData[item];
					}
				});
				return tepData;
			};
			const isFn = function(value) {
				return typeof value == 'function' || false;
			};
			Object.keys(obj).forEach(function(key) {
				let val = obj[key];
				key = key.replace(/\]/g, '').replace(/\[/g, '.');
				let front, after;
				let index_after = key.lastIndexOf('.');
				if (index_after != -1) {
					after = key.slice(index_after + 1);
					front = handleData(that, key.slice(0, index_after), after);
				} else {
					after = key;
					front = that;
				}
				if (front.$data && front.$data[after] === undefined) {
					Object.defineProperty(front, after, {
						get() {
							return front.$data[after];
						},
						set(newValue) {
							front.$data[after] = newValue;
							that.$forceUpdate();
						},
						enumerable: true,
						configurable: true
					});
					front[after] = val;
				} else {
					that.$set(front, after, val);
				}
			});
			// this.$forceUpdate();
			isFn(callback) && this.$nextTick(callback);
		}
	}
});
```
2.先导入组件
```
import canvasDrag from "@/components/canvas-drag/index";
```
3.在vue组件中引用
```
components: {
  canvasDrag
}
```
4.在template中就可以使用组件
```
<canvas-drag ref="canvasRef" id="canvas-drag" :graph="graph" 
	width="700" height="750" enableUndo="true"></canvas-drag>
```
```
参数:
width:画布的宽度
height: 画布的高度
enableUndo: 是否回退
ref: 定义组件注册引用信息、在操作画布中调用
```
### 方法
#### 添加图片
```
    /**
     * 添加测试图片
     */
	onAddTest() {
      this.setData({
        graph: {
          w: 120,
          h: 120,
          type: 'image',
          url: "/static/assets/images/test.jpg"
        }
      });
    }
```
#### 导出当前画布为模板
```
   /**
	 * 导出当前画布为模板
     */
    onExportJSON() {
      this.$refs.canvasRef.exportFun().then(imgArr => {
        console.log(JSON.stringify(imgArr));
      }).catch(e => {
        console.error(e);
      });
    }
```
更多方法请下载代码自己研究哈。
注意：使用网络图片的时候记得先下载在设置。


## wxa-comp-canvas-drag项目
[wxa-comp-canvas-drag地址](https://github.com/wxa-component/wxa-comp-canvas-drag)

## 问题反馈
有什么问题可以直接提issue