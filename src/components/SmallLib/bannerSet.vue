<template>
  <div id="video" class="video">
    <section class="pagetitle">
      <div class="titleName">广告栏管理</div>
    </section>
    <div class="videoBox">
      <section class="uploadBox">
        <div class="nomal-Box">
          <div class="upload-demo">
            <div class="inputBox">
              <el-form :model="addForm" :rules="rules" ref="addForm" label-width="70px">
                <!-- <el-form-item label="标题" prop="title">
                  <el-input placeholder="标题不得超过10个字" v-model="addForm.title"></el-input>
                </el-form-item> -->
              </el-form>
            </div>
            <cover ref="cover" @imgSuccess="imgSuccess" @imgDelete="imgDelete"></cover>
            <div class="textCenter firstButton">
              <el-button class="buttonBlue" type="primary" @click="addBtn">上传</el-button>
              
            </div>
          </div>
        </div>
      </section>
      <section class="ListBox">
        <el-scrollbar class="recomandList">
          <section>
            <p class="data-title mb_20" style="color:#0096FF">广告栏列表</p>
            <section class="tableBox">
              <el-table
                :header-cell-style="{background:'#0096FF', color:'#fff',height:'50px', fontSize:'18px',borderRight:'none'}"
                empty-text="无数据"
                style="width: 100%; text-align:center;"
                :data="list"
                :row-style="{height:'50px'}"
              >
                <el-table-column min-width="160px" align="center" prop="name" label="预览封面">
                  <template slot-scope="scope">
                    <div class="tab-imgBox">
                      <img :src="scope.row.url" style="width:354px;height:108px;"/>
                    </div>
                  </template>
                </el-table-column>
                <!-- <el-table-column align="center" prop="link" label="链接"></el-table-column> -->
                <el-table-column align="center" label="操作">
                  <template slot-scope="scope">
                    <span class="red" @click="deleteBtn(scope.$index, scope.row)">删除</span>
                  </template>
                </el-table-column>
              </el-table>
            </section>
          </section>
        </el-scrollbar>
      </section>
      <div class="forbid collectionDelete">
        <el-dialog title="删除" :visible.sync="centerDialogVisible" width="400px" center>
          <div class="dialogBody">是否删除这条广告?</div>
          <div style="margin-bottom: 30px">
            <span class="dialogButton true mr_40" @click="deleteDefineBut()">确 定</span>
            <span class="dialogButton cancel" @click="centerDialogVisible = false">取 消</span>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import {coverInt} from '../../request/api/smallLib/coverSet'
import cover from "../../common/upload/upCover";
export default {
  data() {
    return {
      centerDialogVisible: false,
      list:[], // 循环列表
      jude: false, // 判定是否禁用
      addForm: {
        title: "",
        url: ""
      },
      
      rules: {
        title: [{ required: true, message: "标题不得为空", trigger: "blur" }]
      },
      timeFile: null, // 文件转换
      deleteObj: {}
    };
  },
  computed: {
    addTimeForm() {
      let obj = {
        url: this.addForm.url,
        title: this.addForm.title,
        
      };
      return obj;
    }
  },
  created() {
    this._search();
  },
  methods: {
    /*------ 图片封面 ------*/
    imgDelete(value) {
        this.addForm.url = ''
        
    },
    imgSuccess(value){
      
        this.addForm.url = value.row
        
    },
    /*--- ---*/
    cancelBtn() {
      this.$refs.addForm.resetFields();
      this.fileList = [];
    },
    addBtn() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this._add();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      console.log("上传之前的数据", this.addTimeForm);
    },
    deleteBtn(index, row) {
      this.centerDialogVisible = true;
      this.deleteObj.id = row.id;
    },
    deleteDefineBut() {
      this._delete();
    },
    /*--- API ---*/
    _search() {
      coverInt.search().then(res => {
        if (res.data.state == true) {
          if (res.data.row == null || res.data.length > 6) {
            this.juge = true;
          } else {
            this.juge = false;
          }
          this.list = res.data.row
        } else {
          this.$message.error(res.data.msg);
        }
        console.log("测试接口", res);
      });
    },
    _add() {
      coverInt.add(this.addTimeForm).then(res => {
        if (res.data.state == true) {
          this.clearObj(this.addForm);
          this.fileList = [];
          this.$refs.addForm.resetFields();
          this.$refs.cover.preImg = ''
          this._search();
          this.$message.success(res.data.msg);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    _delete() {
        let arr = []
        arr.push(this.deleteObj)
      coverInt.remove(arr).then(res => {
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
    },



  },
  components: {
    cover
  }
};
</script>

<style scoped>
.video {
  background-color: #ffffff;
  padding-left: 30px;
  padding-bottom: 117px;
}
.pagetitle {
  padding: 30px 0;
}
.titleName {
  font-size: 16px;
  color: #878787;
  border-left: 4px solid #0096ff;
  padding-left: 10px;
}
.videoBox {
  display: flex;
  flex-direction: row;

  box-sizing: border-box;
}
.uploadBox {
  padding-top: 66px;
  margin-right: 40px;
  width: 40%;
}
.nomal-Box {
  height: 453px;
  border-right: 2px solid #e4e4e4;
  position: relative;
}
.upload-demo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
/*--- 视频上传列表 ---*/
.ListBox {
  max-width: 820px;
  width: 100%;
  height: 610px;
}
.recomandList {
  height: 100%;
}
.red {
  cursor: pointer;
  color: #ff3535;
}
.firstButton {
  margin-top: 30px;
}
.buttonBlue {
  color: white;
  cursor: pointer;
  background-color: #0096ffad;
  border-width: 0px;
  border-style: none;
  width: 100px;

  outline: none;
}
.buttonBlue:hover {
  color: white;
  background-color: #0096ff73;
}
.buttonGray {
  background-color: #dcdcdc;
  color: #878787;
  cursor: pointer;
  margin-left: 10px;
  border-style: none;
  width: 100px;

  outline: none;
}
.buttonGray:hover {
  background-color: #d2d2d2;
  color: #878787;
  margin-left: 10px;
}
</style>
<style>
#video .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>

