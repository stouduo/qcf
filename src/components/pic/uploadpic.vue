<template>
  <div>
    <div class="weui-uploader" style="padding:15px;">
      <div class="weui-uploader__hd">
        <p class="weui-uploader__title">图片上传</p>
      </div>
      <div class="weui-uploader__bd">
        <ul class="weui-uploader__files" id="uploaderFiles">
          <li class="weui-uploader__file weui-uploader__file_status" v-for="(pic,index) in files"
              :style="{backgroundImage:'url(pic.url)'}">
            <div class="weui-uploader__file-content">
              <p v-if="pic.unstart">未开始</p>
              <p v-if="pic.process">50%</p>
              <i v-if="pic.success" class="weui-icon-warn"></i>
              <i v-if="pic.error" class="weui-icon-success"></i>
            </div>
          </li>
        </ul>
        <div class="weui-uploader__input-box">
          <input id="uploaderInput" class="weui-uploader__input" @chage="autoUpload" type="file" accept="image/*"
                 multiple/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {uploadPic} from '../../util/beApi'

  export default {
    data() {
      return {
        files: []
      }
    },
    methods: {
      autoUpload: function (e) {
        let pics = e.target.files;
        let i = 0;
        let pic;
        let _this = this;
        const reader = new FileReader();
        reader.readAsDataURL(pics[i]);
        reader.onload = function () {
          pic = {
            url: reader.result,
            unstart: true,
            error: false,
            success: false,
            process: 0,
            file: pics[i]
          };
          _this.files.push(pic);
          uploadPic(pics[i], (e) => {
            if (e.lengthComputable) {
              pic.unstart = false;
              pic.success = true;
              pic.error = false;
              pic.process = Math.ceil(e.loaded / e.total);
            }
          }).then(res => {
            pic.unstart = false;
            pic.success = true;
            pic.error = false;
            pic.process = 0;
          }).catch((err) => {
            pic.unstart = false;
            pic.success = false;
            pic.error = true;
            pic.process = 0;
          });
          if (i < pics.length) {
            reader.readAsDataURL(pics[++i]);
          }
        }
      }
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/weui/widget/weui-uploader/index.less';
</style>
