<template>
  <div id="araeRemaker">
    <el-row :gutter="20" type="flex">
      <!-- 侧边栏 -->
      <el-col :span="5">
        <section class="areaSelect">
          <div class="titleBox">
            <div class="title">
              <Title :value="asideTitle"></Title>
            </div>

            <div class="addFloorBtn">
              <el-button size="mini" type="primary">添加楼层</el-button>
            </div>
          </div>
          <!-- 楼层 区选择 -->
          <div class="areaList">
            <div class="floorBox">
              <div class="opearate">
                <div class="static">
                  <span class="switch">开</span>
                  <span class="areaName">楼层名</span>
                </div>
                <div class="curd">
                  <span class="editArea">编辑</span>
                  <span class="addArea">添加区</span>
                  <span class="deleteArea">删除</span>
                </div>
              </div>
              <div class="zoneList">
                <p class="zoneName">区名字1</p>
              </div>
            </div>
          </div>
        </section>
      </el-col>

      <!-- 楼层区间数据显示 -->
      <el-col :span="18">
        <div class="areaDetail">
            <!-- 标题和控制按钮 -->
          <section class="titleBox">
            <div class="title">
              <Title :value="contentTitle"></Title>
            </div>
            <div clsss="opearate">

            </div>
          </section>
          <!--excel导出 -->
          <section class="outputExcel">

          </section> 
          <!-- 数字跳动 -->
          <section class="numberDance">

          </section>
          <!-- 数据可视化 -->
          <section class="dataBox">
            <div class="rankBox">

            </div>
            <!-- 数据折线图 -->
            <div class="dataShow">

            </div>
          </section>
        </div>
      </el-col>
    </el-row>
  </div>
</template>


<script>
import Title from "../../../common/title/title";
export default {
  data() {
    return {
      asideTitle: "楼层管理",
      contentTitle: "书籍统计",
      testList: [{ name: "楼层名", area: ["文学区", "XX区"] }]
    };
  },
  components: {
    Title
  }
};
</script>

<style lang="scss" scoped>
#araeRemaker {
  .areaSelect {
    background-color: #fffeff;
    height: 850px;
    .titleBox {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 10px 30px;
      border-bottom: 1px solid rgba(238, 238, 238, 1);
      .title {
      }
      .addFloorBtn {
      }
    }

    .areaList {
      padding: 20px 30px 0 30px;
      .floorBox {
        .opearate {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          min-height: 30px;
          span {
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(0, 150, 255, 1);
            cursor: pointer;
          }
          .static {
            .switch {
            }
            .areaName {
            }
          }
          .curd {
            width: 60%;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
          }
        }
        .zoneList {
          .zoneName {
            height: 40px;
            line-height: 40px;
            position: relative;
            padding-left: 40px;
            cursor: pointer;
            &::before {
              position: absolute;
              content: "";
              top: 50%;
              transform: translateY(-50%);
              left: 25px;
              width: 6px;
              height: 6px;
              background-color: red;
              border-radius: 50%;
            }
          }
        }
      }
    }
  }

  .areaDetail {
  }
}
</style>