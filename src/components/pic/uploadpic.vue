<template>
  <div>
    <div class="weui-uploader" style="padding:15px;">
      <div class="weui-uploader__hd">
        <p class="weui-uploader__title">图片上传</p>
      </div>
      <div class="weui-uploader__bd">
        <ul class="weui-uploader__files" id="uploaderFiles">
          <li class="weui-uploader__file weui-uploader__file_status" v-for="(pic,index) in files"
              :style="{backgroundImage:'url('+pic.url+')'}">
            <div class="weui-uploader__file-content">
              <p v-if="pic.status=='unstart'">未开始</p>
              <p v-if="pic.status=='process'" :text="pic.process"></p>
              <p v-if="pic.status=='success'">上传成功</p>
              <p v-if="pic.status=='error'" style="cursor:pointer" title="点击重传" @click="reupload(index)">上传失败</p>
            </div>
          </li>
        </ul>
        <div class="weui-uploader__input-box">
          <input id="uploaderInput" class="weui-uploader__input" @change="autoUpload" type="file" accept="image/*"
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
      reupload: function (index) {
        let pic = this.files[index];
        uploadPic(pic.file, (e) => {
          if (e.lengthComputable) {
            pic.status = 'process';
            pic.process = Math.ceil(e.loaded / e.total);
          }
        }).then(() => {
          pic.status = 'success';
          pic.process = 0;
        }).catch(() => {
          pic.status = 'error';
          pic.process = 0;
        });
      },
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
            status: 'unstart',
            process: 0,
            file: pics[i]
          };
          _this.files.push(pic);
          uploadPic(pics[i], (e) => {
            if (e.lengthComputable) {
              pic.status = 'process';
              pic.process = Math.ceil(e.loaded / e.total);
            }
          }).then(() => {
            if (++i < pics.length) {
              reader.readAsDataURL(pics[i]);
            }
            pic.status = 'success';
            pic.process = 0;
          }).catch(() => {
            if (++i < pics.length) {
              reader.readAsDataURL(pics[i]);
            }
            pic.status = 'error';
            pic.process = 0;
          });
        }
      }
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/weui/widget/weui-uploader/index.less';
</style>
