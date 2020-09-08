<template>
  <footer>
    <div class="footer">
      <div class="card">
        <div class="title">
          <h4>下载音乐客户端</h4>
        </div>
        <div class="content download">
          <a href="#">
            <p class="iconfont icon-Windows"></p>
            <h4>PC</h4>
          </a>
          <a href="#">
            <p class="iconfont icon-anzhuo"></p>
            <h4>Android</h4>
          </a>
          <a href="#">
            <p class="iconfont icon-ios"></p>
            <h4>IPHONE</h4>
          </a>
        </div>
      </div>
      <div class="card">
        <div class="title">
          <h4>协议与声明</h4>
        </div>
        <div class="content">
          <a href="#">用户服务协议</a>
          <a href="#">免责声明</a>
          <a href="#">隐私政策</a>
          <a href="#">权利声明</a>
          <a href="#">权利声明</a>
          <a href="#">权利声明</a>
        </div>
      </div>
      <div class="card">
        <div class="title">
          <h4>其他</h4>
        </div>
        <div class="content">
          <a href="#">联系我们</a>
          <a href="#">腾讯音乐</a>
          <a href="#">诚聘英才</a>
          <a href="#">广告服务</a>
          <a href="#">网上有害信息举报专区</a>
        </div>
      </div>
    </div>
    <div class="copy">
      <p>
        北京酷我科技有限公司版权所有 丨 网络文化经营许可证：京网文[2015]0525-205号 | 信息网络传播视听节目许可证0109362号   丨 增值电信业务经营许可证B2-20090418 丨京ICP证060261号
      </p>
      <p>
        广播电视节目制作经营许可证京字第2037号 丨营业性演出许可证京市演1574  |  京公网安备11010502030216号
      </p>
      <p>
        举报电话：010-87939949丨 举报邮箱：support@kuwo.cn
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped lang="less">
.footer{
  margin-top: 62px;
  height: 220px;
  background: #282828;
  color: #fff;
  font-size: 13px;
  font-weight: 400;
  display: flex;
  justify-content: center;
  .card{
    width: 350px;
    margin-top: 30px;
    div.content{
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      a{
        width: 110px;
        height: 50px;
        color: grey;
        text-decoration: none;
      }
      a:hover{
        color: yellow;
      }
    }
    .download{
      text-align: center;
      a{
        height: 80px!important;
      }
    }
  }
}
.copy{
  font-size: 12px;
  font-weight: 400;
  height: 80px;
  padding: 22px 0 99px;
  background: #1f1f1f;
  text-align: center;
  color: grey;
  display: flex;
  flex-direction: column;
  p{
    font-size: 12px;
    font-weight: 400;
    text-align: center;
    color: grey;
  }
}
</style>
