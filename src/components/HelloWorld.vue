<template>
  <div>

    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="审批人">
        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="审批人">
        <el-input v-model="formInline.region" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item label="上传图片">
        <el-input v-model="formInline.file" id="file" type="file" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="upTest">上传</el-button>
      </el-form-item>
    </el-form>
    <img v-if="src" :src="src" alt="">
  </div>
</template>
<script>
  export default {
    data() {
      return {
        src:'',
        formInline: {
          user: '',
          region: '',
          file: ''
        }
      }
    },
    methods: {
      upTest(e) {
        var el = document.getElementById('file').files[0]
        var url= this.getObjectURL(el)
        this.src=url
        var param = new FormData(); //创建form对象
        param.append('tweetPic',el,el.name);//通过append向form对象添加数据
        //param.append('chunk','0');//添加form表单中其他数据
        //console.log(param.get('tweetPic')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
        let config = {
          headers:{'Content-Type':'multipart/form-data'}
        };  //添加请求头
        this.$axios.post('img',param,config)
          .then(response=>{
            console.log(response.data);
          })
      },
      getObjectURL(file) {
        var url = null;
        if (window.createObjectURL != undefined) {
          url = window.createObjectURL(file);
        } else if (window.URL != undefined) {
          url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) {
          url = window.webkitURL.createObjectURL(file);
        }
        return url;
      },
      onSubmit() {
        this.$axios({
          method: 'post',
          url: 'api',
          data: {
            account: this.formInline.user,
            password: this.formInline.region
          }
        }).then(res => {
          console.log(res)
        });
      }
    }
  }
</script>
