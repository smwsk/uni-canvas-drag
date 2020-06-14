<template>
	<view>
		<canvas-drag ref="canvasRef" id="canvas-drag" :graph="graph" width="700" height="750" enableUndo="true"></canvas-drag>
		<view class="btn" @tap="onAddImage">添加图片</view>
		<view class="btn" @tap="onAddTest">添加测试图片</view>
		<view class="btn" @tap="onAddText">添加文字</view>
		<view class="btn" @tap="onExport">导出图片</view>
		<view class="btn" @tap="onChangeColor">改变文字颜色</view>
		<view class="btn" @tap="onChangeBgColor">改变背景颜色</view>
		<view class="btn" @tap="onChangeBgImage">改变背景照片</view>
		<view class="btn" @tap="onExportJSON">导出模板</view>
		<view class="btn" @tap="onImport">导入默认模板</view>
		<view class="btn" @tap="onClearCanvas">清空画布</view>
		<view class="btn" @tap="onUndo">后退</view>
	</view>
</template>

<script>
//index.js
import canvasDrag from "@/components/canvas-drag/index";

export default {
  data() {
    return {
      graph: {},
      canvasBg: ""
    };
  },

  components: {
    canvasDrag
  },
  props: {},
  methods: {
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
    },

    /**
     * 添加图片
     */
    onAddImage() {
      wx.chooseImage({
        success: res => {
          this.setData({
            graph: {
              w: 200,
              h: 200,
              type: 'image',
              url: res.tempFilePaths[0]
            }
          });
        }
      });
    },

    /**
     * 添加文本
     */
    onAddText() {
      this.setData({
        graph: {
          type: 'text',
          text: 'helloworld'
        }
      });
    },

    /**
     * 导出图片
     */
    onExport() {
      this.$refs.canvasRef.export().then(filePath => {
        console.log(filePath);
        wx.previewImage({
          urls: [filePath]
        });
      }).catch(e => {
        console.error(e);
      });
    },

    /**
     * 改变文字颜色
     */
    onChangeColor() {
      this.$refs.canvasRef.changColor('blue');
    },

    /**
     * 改变背景颜色
     */
    onChangeBgColor() {
      this.$refs.canvasRef.changeBgColor('yellow');
    },

    /**
     * 改变背景照片
     */
    onChangeBgImage() {
		this.$refs.canvasRef.changeBgImage("/static/assets/images/test.jpg")
    },

    /**
     * 导出当前画布为模板
     */
    onExportJSON() {
      this.$refs.canvasRef.exportFun().then(imgArr => {
        console.log(JSON.stringify(imgArr));
      }).catch(e => {
        console.error(e);
      });
    },

    onImport() {
      // 有背景
      // let temp_theme = [{"type":"bgColor","color":"yellow"},{"type":"image","url":"../../assets/images/test.jpg","y":98.78423143832424,"x":143.78423143832424,"w":104.43153712335152,"h":104.43153712335152,"rotate":-12.58027482265038,"sourceId":null},{"type":"text","text":"helloworld","color":"blue","fontSize":24.875030530031438,"y":242.56248473498428,"x":119.57012176513672,"w":116.73966979980469,"h":34.87503053003144,"rotate":8.873370699754087}];
      // 无背景
      let temp_theme = [{
        "type": "image",
        "url": "/static/assets/images/test.jpg",
        "y": 103,
        "x": 91,
        "w": 120,
        "h": 120,
        "rotate": 0,
        "sourceId": null
      }, {
        "type": "text",
        "text": "helloworld",
        "color": "blue",
        "fontSize": 20,
        "y": 243,
        "x": 97,
        "rotate": 0
      }];
      this.$refs.canvasRef.initByArr(temp_theme);
    },

    onClearCanvas: function (event) {
      let _this = this;

      _this.setData({
        canvasBg: null
      });

      this.$refs.canvasRef.clearCanvas();
    },
    onUndo: function (event) {
      this.$refs.canvasRef.undo();
    }
  }
};
</script>
<style>
@import "./index.css";
</style>