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
                  <span class="close">关</span>
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
      <el-col :span="19">
        <div class="areaDetail">
          <!-- 标题和控制按钮 -->
          <section class="titleBox">
            <div class="title">
              <Title :value="contentTitle"></Title>
            </div>
            <div clsss="opearate"></div>
          </section>
          <!--excel导出 -->
          <section class="outputExcel">
            <div class="dateBlock">
              <el-date-picker v-model="dateValue" type="month" placeholder="选择月"></el-date-picker>
            </div>
            <div class="outpotBtn">
              <el-button size="mini" type="primary">导出excel</el-button>
            </div>
          </section>
          <!-- 数字跳动 -->
          <section class="numberDance">
            
            <panel-group></panel-group>
          </section>
          <!-- 数据可视化 -->
          <section class="dataBox">
            <el-col :span="12">
              <div class="rankBox">
                <div class="titleBox">
                  <Title :value="'图书借阅前10排行榜'"></Title>
                </div>
                <div class="tableBox">
                  <el-table :data="tableData" style="width: 100%">
                    <el-table-column width="60" align="center" :show-overflow-tooltip="true" prop="rank" label="排名"></el-table-column>
                    <el-table-column align="center" :show-overflow-tooltip="true" prop="bookname" label="书籍" width="180"></el-table-column>
                    <el-table-column align="center" :show-overflow-tooltip="true" prop="author" label="作者"></el-table-column>
                    <el-table-column align="center" :show-overflow-tooltip="true" prop="booktype" label="书籍类型"></el-table-column>
                  </el-table>
                </div>
              </div>
            </el-col>

            <!-- 数据折线图 -->
            <el-col :span="12">
              <div class="dataShow">
                <div class="titleBox">
                  <Title :value="'图书分类数量统计'"></Title>
                </div>
                <div class="barchart">
                  <bar-chart :height="'500px'" :chartData="chartData"></bar-chart>
                </div>
              </div>
            </el-col>
          </section>
        </div>
      </el-col>
    </el-row>
  </div>
</template>


<script>
import Title from "../../../common/title/title";
import PanelGroup from "./panelGroup";
import barChart from './barChart';
export default {
  data() {
    return {
      asideTitle: "楼层管理",
      contentTitle: "书籍统计",
      testList: [{ name: "楼层名", area: ["文学区", "XX区"] }],
      dateValue: "",
      tableData: [
        {
          rank: "1",
          bookname: "无头骑士异闻录",
          author: "王小明",
          booktype:'小说'
        },
        {
          rank: "1",
          bookname: "无头骑士异闻录",
          author: "王小明",
          booktype:'小说'
        },
        {
          rank: "1",
          bookname: "无头骑士异闻录",
          author: "王小明",
          booktype:'小说'
        },
        {
          rank: "1",
          bookname: "无头骑士异闻录",
          author: "王小明",
          booktype:'小说'
        },
        {
          rank: "1",
          bookname: "无头骑士异闻录",
          author: "王小明",
          booktype:'小说'
        },
        {
          rank: "1",
          bookname: "无头骑士异闻录",
          author: "王小明",
          booktype:'小说'
        },
        {
          rank: "1",
          bookname: "无头骑士异闻录",
          author: "王小明",
          booktype:'小说'
        },
        {
          rank: "1",
          bookname: "无头骑士异闻录",
          author: "王小明",
          booktype:'小说'
        },
        {
          rank: "1",
          bookname: "无头骑士异闻录",
          author: "王小明",
          booktype:'小说'
        },
        {
          rank: "1",
          bookname: "无头骑士异闻录",
          author: "王小明",
          booktype:'小说'
        },
      ],
      chartData:[50,100,200,100,100]
    };
  },
  components: {
    Title,
    PanelGroup,
    barChart
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
    background: rgba(255, 255, 255, 1);
    min-height: 850px;
    padding: 30px;
    .titleBox {
      margin-bottom: 20px;
    }

    .outputExcel {
      display: flex;
      flex-direction: row;
      align-items: center;
      .dateBlock {
        margin-right: 30px;
      }
    }

    .numberDance {
    }

    .dataBox {
      .rankBox {
        .titleBox {
          margin-bottom: 30px;
        }

        .tableBox{

        }
      }

      .dataShow {
        .titleBox{
          margin-bottom: 30px;
        }
      }
    }
  }
}
</style>