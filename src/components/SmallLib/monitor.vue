<template>
  <div id="video" class="temp-both-layout">
    <section class="pagetitle">
      <div class="titleName">摄像头管理</div>
    </section>
    <div class="layoutBox">
      <section class="leftBox">
        <video-player ref="video" :options="playerOptions"></video-player>
      </section>
      <section class="rightBox">
        <el-scrollbar class="listScroll">
          <section class="listBox">
            <div class="listTitleBox mb_20" style="color:#0096FF">
              <p class="titleText">摄像头列表</p>
              <div class="temp-buttonBox">
                <button @click="addBtn()" class="add">
                  <i class="addIcon el-icon-plus"></i>添加
                </button>
              </div>
            </div>
            <section class="tableBox">
              <el-table
                :header-cell-style="{background:'#0096FF', color:'#fff',height:'50px', fontSize:'18px',borderRight:'none'}"
                empty-text="无数据"
                style="width: 100%; text-align:center;"
                :data="list"
                :row-style="{height:'50px'}"
              >
                <el-table-column align="center" prop="name" label="摄像头名称"></el-table-column>
                <el-table-column align="center" prop="location" label="摄像头地址"></el-table-column>
                <el-table-column align="center" label="操作">
                  <template slot-scope="scope">
                    <div class="temp-operate">
                      <span class="reviseColor" @click="reviseBtn(scope.$index, scope.row)">编辑</span>
                      <span class="checkColor" @click="checkBtn(scope.$index, scope.row)">查看</span>
                      <span class="deleteColor" @click="deleteBtn(scope.$index, scope.row)">删除</span>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </section>
          </section>
        </el-scrollbar>
      </section>
      <!-- 禁止弹框 -->
      <div class="forbid collectionDelete">
        <el-dialog title="删除" :visible.sync="centerDialogVisible" width="400px" center>
          <div class="dialogBody">是否删除这条数据?</div>
          <div style="margin-bottom: 30px">
            <span class="dialogButton true mr_40" @click="deleteDefineBut()">确 定</span>
            <span class="dialogButton cancel" @click="centerDialogVisible = false">取 消</span>
          </div>
        </el-dialog>
      </div>
      <!-- 更正弹框 -->
      <div class="aeDialog">
        <el-dialog
          :title="aeDialog.title[dialogType]"
          :visible.sync="aeDialog.display"
          width="680px"
          center
        >
          <div class="dialogBody">
            <el-form
              ref="aeForm"
              :rules="aeDialog.aeRules"
              label-width="100px"
              style="width:100%;"
              :model="aeDialog.aeForm"
            >
              <el-form-item prop="name" style="width:100%" label="摄像头名称">
                <el-input v-model="aeDialog.aeForm.name" placeholder="请输入摄像头名称"></el-input>
              </el-form-item>
              <el-form-item prop="location" style="width:100%" label="摄像头地址">
                <el-input v-model="aeDialog.aeForm.location" placeholder="请输入摄像头地址"></el-input>
              </el-form-item>
              <el-form-item prop="url" style="width:100%" label="摄像头链接">
                <el-input v-model="aeDialog.aeForm.url" placeholder="请输入摄像头链接"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div style="margin-bottom: 30px">
            <span class="dialogButton true mr_40" @click="aeConfirm">确 定</span>
            <span class="dialogButton cancel" @click="aeDialog.display = false">取 消</span>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import videoPlayer from '../../common/video/player';
import { monitorlInt } from "../../request/api/smallLib/monitor";
export default {
  data() {
    return {
      centerDialogVisible: false,
      playerOptions: {
        height: "360",
        sources: [
          {
            type: "rtmp/mp4",
            src: ""
          }
        ],
        techOrder: ["flash"],
        autoplay: false,
        controls: true,
      },
      videoSrc:'rtmp://192.168.2.29:1935/live/2',
      player:null,
      list: [], // 循环列表
      dialogType: 0, // 弹框类型
      dialogFlag: false, // 是否被创建了DOM节点 不然ref是抓不到的
      aeDialog: {
        title: ["添加", "编辑"],
        display: false,
        aeForm: {
          url: "",
          name: "",
          location: ""
        }
      },
      rules: {
        title: [{ required: true, message: "标题不得为空", trigger: "blur" }]
      },
      selectRow: {}, // 被选中的数据
      deleteObj: {}
    };
  },
  components:{
    videoPlayer
  },
  computed: {
  },
  created() {
    this._search();
  },
  methods: {

    addBtn() {
      this.clearObj(this.aeDialog.aeForm);
      console.log(this.aeDialog.aeForm);
      if (this.dialogFlag) {
        this.$refs.aeForm.resetFields();
      }

      this.dialogType = 0;
      this.aeDialog.display = true;
      this.dialogFlag = true;
    },
    reviseBtn(index, row) {
      console.log("选中", row);
      this.dialogType = 1;
      this.aeDialog.aeForm = Object.assign(this.aeDialog.aeForm, row);
      this.aeDialog.display = true;
      this.dialogFlag = true;
    },
    checkBtn(index, row) {
      this.$refs.video.checkPlayer(row.url)
      console.log(row.url)
      // 更改直播地址
    },
    deleteBtn(index, row) {
      this.centerDialogVisible = true;
      this.deleteObj.id = row.id;
    },
    /*--- ---*/
    aeConfirm() {
      let index = this.dialogType;
      switch (index) {
        case 0:
          this.addSub();
          break;
        case 1:
          this.reviseSub();
          break;
      }
    },
    addSub() {
      this.$refs.aeForm.validate(valid => {
        if (valid) {
          this._add();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    reviseSub() {
      this.$refs.aeForm.validate(valid => {
        if (valid) {
          this._revise();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    deleteDefineBut() {
      this._delete();
    },
    /*--- API ---*/
    _search() {
      monitorlInt.searchAll().then(res => {
        if (res.data.state == true) {
          if (res.data.row == null || res.data.length > 6) {
            this.juge = true;
          } else {
            this.juge = false;
          }
          this.list = res.data.row;
        } else {
          this.$message.error(res.data.msg);
        }
        console.log("测试接口", res);
      });
    },
    _add() {
      monitorlInt.add(this.aeDialog.aeForm).then(res => {
        if (res.data.state == true) {
          this._search();
          this.$message.success(res.data.msg);
          this.aeDialog.display = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    _revise() {
      monitorlInt.revise(this.aeDialog.aeForm).then(res => {
        if (res.data.state == true) {
          this._search();
          this.$message.success(res.data.msg);
          this.aeDialog.display = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    _delete() {
      let arr = [];
      arr.push(this.deleteObj);
      monitorlInt.remove(arr).then(res => {
        if (res.data.state == true) {
          this.$message.success(res.data.msg);
          this.centerDialogVisible = false;
          this._search();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    /*--- 过滤函数 ---*/
    clearObj(obj) {
      for (let key in obj) {
        obj[key] = "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.temp-both-layout {
  background-color: #ffffff;
  padding-left: 30px;
  padding-bottom: 117px;
  .pagetitle {
    padding: 30px 0;
    .titleName {
      font-size: 16px;
      color: #878787;
      border-left: 4px solid #0096ff;
      padding-left: 10px;
    }
  }
  // 后期更新为浮动 兼容低版本
  .layoutBox {
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    .leftBox {
      padding-top: 66px;
      margin-right: 40px;
      width: 40%;
    }
    .rightBox {
      max-width: 820px;
      width: 100%;
      height: 610px;
      .listScroll {
        height: 100%;
        .listBox {
          .listTitleBox {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }
          .tableBox {
          }
        }
      }
    }
  }

  .forbid {
  }
}
.temp-buttonBox {
  button {
    padding-left: 18px;
    padding-right: 18px;
    height: 40px;
    font-size: 16px;
    color: #fff;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: none;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: 0.1s;
    transition: 0.1s;
    font-weight: 500;
  }
  .add {
    background: rgba(255, 146, 49, 1);
    border-radius: 10px;
    margin-right: 10px;
  }
}
.temp-operate {
  span{
    display: inline-block;
    padding: 10px;
    cursor: pointer;
  }
  .reviseColor{

  }
  .checkColor{

  }
  .deleteColor{

  }
}
</style>
<style>
#video .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>

