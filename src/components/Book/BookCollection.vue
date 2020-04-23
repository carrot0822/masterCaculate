<template>
  <div id="bookCataBox">
    <section class="titleBox">
      <h2 class="title">书籍典藏</h2>
    </section>
    <!-- 按钮集合 -->
    <section class="changeBtnBox">
      <div class="oprateBtn">
        <button class="addBtn" @click="addBtn">
          <i class="addIcon el-icon-plus"></i>添加
        </button>
        <button class="deleteBtn" @click="removeBtn">
          <i class="deleteIcon el-icon-delete"></i>批量删除
        </button>
        <button class="transferBtn" @click="transferBtn">
          <i class="transferIcon el-icon-edit"></i>批量调馆
        </button>
        <button class="rejectBtn" @click="rejectBtn">
          <i class="deleteIcon el-icon-delete"></i>剔除
        </button>
        <!-- <button class="outputBtn" @click="outputBtn">
          <i class="outputIcon el-icon-share"></i>导出
        </button>-->
      </div>
      <div class="searchBtn">
        <el-form :inline="true" :model="searchInput">
          <el-form-item label="筛选 :">
            <el-select
              style="width: 150px"
              v-model="searchInput.option"
              placeCodeholder="请选择"
              clearable
            >
              <el-option
                v-for="(item,index) of searchInput.optionsArr"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input
              v-model="searchInput.search"
              placeCodeholder="请输入相关信息"
              clearable
              style="width: 250px"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchBtn">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
    </section>
    <!-- 表格数据与分页 -->
    <section class="tableBox">
      <div class="table">
        <el-table
          :header-cell-style="tableObj.headerCellSty"
          empty-text="无数据"
          style="width: 100%; text-align:center;"
          :data="tableObj.tableData"
          :row-style="tableObj.rowStyle"
          @selection-change="selectAll"
        >
          <el-table-column fixed="left" align="center" type="selection" width="100"></el-table-column>
          <el-table-column align="center" prop="index" type="index" width="100" label="序号">
            <template slot-scope="scope">
              <span>{{(pagationObj.currentPage - 1) * pagationObj.pageSize + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="100"
            align="center"
            prop="callNumber"
            label="索取号"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            width="100"
            align="center"
            prop="code"
            label="馆内码"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            width="200"
            align="center"
            prop="isbn"
            label="ISBN"
            :show-overflow-tooltip="true"
          ></el-table-column>

          <el-table-column
            width="200"
            align="center"
            prop="name"
            label="书名"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="clusterName"
            label="丛编题名"
            width="200"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>{{scope.row.clusterName == null || scope.row.clusterName=='' ?'---':scope.row.clusterName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="200"
            align="center"
            prop="place"
            label="馆藏地"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            width="200"
            align="center"
            prop="publishingTime"
            label="出版日期"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            width="100"
            align="center"
            prop="fkTypeCode"
            label="分类号"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            width="100"
            align="center"
            prop="language"
            label="语种"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            width="100"
            align="center"
            prop="toAvailable"
            label="启用状态"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            width="100"
            align="center"
            prop="toLendState"
            label="在架状态"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            width="100"
            align="center"
            prop="toOtherState"
            label="其他状态"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column align="center" label="操作" fixed="right" width="200">
            <!-- 这里的scope代表着什么 index是索引 row则是这一行的对象 -->
            <template slot-scope="scope">
              <span
                class="tranceOn"
                @click="controlBtn(scope.$index, scope.row)"
              >{{scope.row.available?"停用":"启用"}}</span>
              <span class="revise" @click="reviseBtn(scope.$index, scope.row)">修改</span>

              <span class="damage" @click="damageBtn(scope.$index, scope.row)">报损</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagationBox">
        <el-pagination
          background
          layout="prev, pager, next,total,slot"
          :total=" pagationObj.total"
          :page-size=" pagationObj.pageSize"
          :current-page="pagationObj.currentPage"
          @current-change="current_change"
        >
          <slot>
            <span class="el-pagination__jump">
              前往
              <div class="el-input el-pagination__editor is-in-pagination">
                <input
                  ref="text"
                  v-model.number="pagationObj.pageInput"
                  autocomplete="off"
                  class="compo el-input__inner"
                />
              </div>页
            </span>
          </slot>
        </el-pagination>
        <el-button type="primary" class="ml_30" size="medium" @click="jumpBtn">确定</el-button>
      </div>
    </section>

    <!-- 新增与修改弹框 -->
    <el-dialog
      id="changeDialog"
      center
      :title="aeDialog.title"
      :visible.sync="aeDialog.display"
      width="900px;"
    >
      <div id="indexCataAdd" class="content">
        <el-form
          ref="aeForm"
          :rules="aeDialog.aeRules"
          label-width="80px"
          :model="aeDialog.aeForm"
          style="width:840px;"
        >
          <section class="firstInfoBox">
            <div class="searchForm">
              <el-form-item prop="isbn" label="ISBN:">
                <el-input
                  style="width:350px;"
                  :disabled="aeDialog.searchDisabled"
                  v-model="aeDialog.aeForm.isbn"
                  placeCodeholder="请输入ISSN进行搜索选择相关数据"
                >
                  <el-button
                    :disabled="aeDialog.searchDisabled"
                    slot="append"
                    type="primary"
                    @click="sIssnBtn"
                    icon="el-icon-search"
                  ></el-button>
                </el-input>
              </el-form-item>
              <div class="otherInput">
                <el-checkbox
                  :disabled="aeDialog.checkObj.checkControl"
                  style="margin:0;"
                  v-model="aeDialog.checkObj.control"
                >含有复本</el-checkbox>
                <el-input-number
                  style="width:80px;"
                  :disabled="!aeDialog.checkObj.control"
                  v-model="aeDialog.checkObj.value"
                  controls-position="right"
                  @change="handleChange"
                  :min="1"
                  :max="99"
                ></el-input-number>
              </div>
            </div>
            <!-- 输出的信息 -->
            <div class="indexInfo">
              <div class="diagOneInput">
                <el-form-item style="width:100%" label="正题名:">
                  <el-input
                    style="width:720px;"
                    v-model="aeDialog.showLocalForm.name"
                    :disabled="aeDialog.inputDisabled"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="diagOneInput">
                <el-form-item label="丛编题名:">
                  <el-input
                    style="width:720px;"
                    v-model="aeDialog.showLocalForm.clusterName"
                    :disabled="aeDialog.inputDisabled"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="diagThreeInput flexRow">
                <el-form-item label="分类号:">
                  <el-input
                    style="width:180px;"
                    v-model="aeDialog.showLocalForm.fkTypeCode"
                    :disabled="aeDialog.inputDisabled"
                  ></el-input>
                </el-form-item>
                <el-form-item label="版次:">
                  <el-input
                    style="width:180px;"
                    v-model="aeDialog.showLocalForm.edition"
                    :disabled="aeDialog.inputDisabled"
                  ></el-input>
                </el-form-item>
                <el-form-item label="卷册号:">
                  <el-input
                    style="width:180px;"
                    v-model="aeDialog.showLocalForm.volumeNum"
                    :disabled="aeDialog.inputDisabled"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="diagThreeInput flexRow">
                <el-form-item label="编著者:">
                  <el-input
                    style="width:180px;"
                    v-model="aeDialog.showLocalForm.author"
                    :disabled="aeDialog.inputDisabled"
                  ></el-input>
                </el-form-item>
                <el-form-item label="装订版面:">
                  <el-input
                    style="width:180px;"
                    v-model="aeDialog.showLocalForm.layout"
                    :disabled="aeDialog.inputDisabled"
                  ></el-input>
                </el-form-item>
                <el-form-item label="参考单价:">
                  <el-input
                    style="width:180px;"
                    v-model="aeDialog.showLocalForm.price"
                    :disabled="aeDialog.inputDisabled"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="diagtwoInput flexRow">
                <el-form-item label="出版社:">
                  <el-input
                    style="width:250px;"
                    v-model="aeDialog.showLocalForm.fkPressName"
                    :disabled="aeDialog.inputDisabled"
                  ></el-input>
                </el-form-item>
                <el-form-item label="页码:">
                  <el-input
                    style="width:320px;"
                    v-model="aeDialog.showLocalForm.pageNumber"
                    :disabled="aeDialog.inputDisabled"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="diagOneInput">
                <el-form-item label="摘要:">
                  <el-input
                    style="width:720px;"
                    v-model="aeDialog.showLocalForm.introduction"
                    :disabled="aeDialog.inputDisabled"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
          </section>
          <!-- 条码号  -->
          <section class="threeInfoBox">
            <div class="number">
              <div class="diagThreeInput flexRow">
                <el-form-item prop="code" label="条码号:">
                  <el-input
                    style="width:140px;"
                    v-model="aeDialog.aeForm.code"
                    placeCodeholder="请输入条码号"
                  ></el-input>
                </el-form-item>
                <el-form-item label="索取号:">
                  <el-input
                    placeCodeholder="请输入内容"
                    v-model="aeDialog.cNbSelect.input"
                    class="input-with-select"
                  >
                    <el-select
                      style="width:100px;"
                      v-model="aeDialog.cNbSelect.select"
                      slot="append"
                      placeCodeholder="请选择"
                      @change="NumberSelect"
                    >
                      <el-option
                        v-for="(item,index) of aeDialog.cNbSelect.options"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-input>
                </el-form-item>
                <el-form-item label="馆藏地:">
                  <el-select
                    value-key="id"
                    prop="placeCode"
                    @change="watchValue"
                    v-model="aeDialog.libIndex"
                    placeCodeholder="选择馆藏地"
                    ref="selectV"
                    :disabled="aeDialog.issnDiabled"
                  >
                    <el-option
                      v-for="(item) of aeDialog.libSelect"
                      :key="item.id"
                      :label="item.name"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="mutilyBox">
              <el-checkbox
                style="margin-right:130px; margin-left:20px;"
                v-model="aeDialog.aeForm.available"
              >启用</el-checkbox>
              <el-checkbox
                style="margin-right:130px; margin-left:20px;"
                v-model="aeDialog.aeForm.available"
              >默认日租金</el-checkbox>
              <el-checkbox style="margin:0;" v-model="aeDialog.aeForm.lendingPermission">不外借</el-checkbox>
            </div>
          </section>
          <!-- 书籍回显 -->
          <section class="bookBackShow">
            <el-table
              :data="aeDialog.bookShow"
              max-height="250"
              :header-row-style="tableNomalHead"
              :header-cell-style="tableNomalHead"
              empty-text="无数据"
              style="width: 100%;"
              :row-style="{height:'30px'}"
            >
              <el-table-column align="center" prop="code" label="条码号" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column
                align="center"
                prop="callNumber"
                label="索取号"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="place"
                label="馆藏地"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="lendState"
                label="状态"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.lendState==0">不在架</span>
                  <span v-else-if="scope.row.lendState==1">在架</span>
                  <span v-else-if="scope.row.lendState==2">借出</span>
                  <span v-else-if="scope.row.lendState==3">剔除</span>
                  <span v-else-if="scope.row.lendState==4">损坏</span>
                </template>
              </el-table-column>
            </el-table>
          </section>
          <div class="dialogBoxBtn">
            <span class="dialogButton true mr_40" @click="aeConfirmBtn">确 定</span>
            <span class="dialogButton cancel" @click="aeDialog.display = false">取 消</span>
          </div>
        </el-form>
      </div>
      <!--- ISSN搜索数据弹框 --->
      <div id="issnLogBox">
        <el-dialog :title="issnDialog.title[0]" :visible.sync="issnDialog.display" append-to-body>
          <div id="issnTable">
            <div class="issnTableBox">
              <el-table
                :data="issnDialog.tableData"
                max-height="250"
                :header-row-style="tableNomalHead"
                :header-cell-style="tableNomalHead"
                empty-text="无数据"
                style="width: 100%;"
                :row-style="{height:'30px'}"
              >
                <el-table-column align="center" width="180" prop="name" label="正题名"></el-table-column>
                <el-table-column align="center" width="120" prop="isbn" label="ISBN"></el-table-column>
                <el-table-column align="center" width="120" prop="author" label="编著者"></el-table-column>
                <el-table-column align="center" width="120" prop="fkPressName" label="出版社"></el-table-column>
                <el-table-column width="120" align="center" prop="fkTypeCode" label="分类号"></el-table-column>
                <el-table-column width="120" align="center" prop="volumeNum" label="卷册号"></el-table-column>
                <el-table-column align="center" fixed="right" label="操作" width="120">
                  <template slot-scope="scope">
                    <span class="getBtn" @click="getLocalBtn(scope.$index, scope.row)">获取</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="dialogBoxBtn textCenter">
              <span class="dialogButton cancel" @click="issnDialog.display = false">取 消</span>
            </div>
          </div>
        </el-dialog>
      </div>
    </el-dialog>
    <!-- 否定弹框 只有确定和取消的弹框 -->
    <section class="waringDialog">
      <el-dialog :title="warDialog.title" :visible.sync="warDialog.display" width="400px" center>
        <div class="dialogBody">是否{{warDialog.title}}?</div>
        <div style="margin-bottom: 20px">
          <span class="dialogButton true mr_40" @click="warBtn">确 定</span>
          <span class="dialogButton cancel" @click="warDialog.display=false">取 消</span>
        </div>
      </el-dialog>
    </section>
    <!-- 剔除弹框 只有单个input的弹框 -->
    <section class="rejectDialog">
      <el-dialog
        :title="otherDialog.title"
        :visible.sync="otherDialog.display"
        width="400px"
        center
      >
        <div class="dialogBody">
          <el-form ref="otherForm" label-width="90px" :model="otherForm">
            <div v-if="otherDialog.otherIndex == 0" class="diagOneInput">
              <el-form-item style="width:100%" label="剔除原因:">
                <el-select v-model="otherDialog.otherInput" placeCodeholder="选择剔除原因">
                  <el-option
                    v-for="(item,index) of otherDialog.rejectOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <!-- 馆藏地 -->
            <div v-if="otherDialog.otherIndex == 1" class="diagOneInput">
              <el-form-item style="width:100%" label="馆藏地:">
                <el-select v-model="otherDialog.otherInput" placeCodeholder="选择馆藏地">
                  <el-option
                    v-for="(item,index) of otherDialog.translateOptions"
                    :key="index"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-form>
        </div>

        <div style="margin-bottom: 20px">
          <span class="dialogButton true mr_40" @click="otherDialogBtn">确 定</span>
          <span class="dialogButton cancel" @click="otherDialog.display=false">取 消</span>
        </div>
      </el-dialog>
    </section>
    <!-- 报损弹框 -->
    <section id="damageDialog">
      <el-dialog
        :title="damageDialog.title"
        :visible.sync="damageDialog.display"
        width="900px"
        center
      >
        <div class="dialogBody">
          <div class="showMessage">
            <div class="backShow">
              <span class="label">索取号:</span>
              <p class="showContent">{{damageDialog.showData.callNumber}}</p>
            </div>
            <div class="backShow">
              <span class="label">馆内码:</span>
              <p class="showContent">{{damageDialog.showData.code}}</p>
            </div>

            <div class="backShow">
              <span class="label">ISBN:</span>
              <p class="showContent">{{damageDialog.showData.isbn}}</p>
            </div>
            <div class="backShow">
              <span class="label">书籍名称:</span>
              <p class="hidden showContent">{{damageDialog.showData.name}}</p>
            </div>
            <div class="backShow">
              <span class="label">馆藏地:</span>
              <p class="showContent">{{damageDialog.showData.place}}</p>
            </div>
            <div class="backShow">
              <span class="label">语种:</span>
              <p class="showContent">{{damageDialog.showData.language}}</p>
            </div>
            <div class="backShow">
              <span class="label">价格:</span>
              <p class="showContent">{{damageDialog.showData.price}}</p>
            </div>
            <div class="backShow">
              <span class="label">出版日期</span>
              <p class="showContent">{{damageDialog.showData.publishingTime}}</p>
            </div>
            <div class="backShow">
              <span class="label">分类号</span>
              <p class="showContent">{{damageDialog.showData.fkTypeCode}}</p>
            </div>
          </div>
          <div class="showBody">
            <el-form ref="damageForm" class="showBodyBox" :model="damageDialog.form">
              <div class="left">
                <el-form-item label=" 卡　　号 :" label-width="100px" id="cardErr">
                  <el-input v-model="damageDialog.form.cardNum "></el-input>
                </el-form-item>
                <el-form-item label=" 损坏原因 :" prop="price" class="errTitle" label-width="100px">
                  <el-select
                    @change="dagameTest"
                    value-key="id"
                    style="width: 330px"
                    v-model="damageDialog.damageItem"
                    placeCodeholder="请选择"
                  >
                    <el-option
                      v-for="item in damageDialog.damageOptions"
                      :key="item.id"
                      :label="item.damageName"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label=" 赔偿金额 :" prop="amountCompensation" label-width="100px">
                  <p class="backText">{{damageValue}}</p>
                </el-form-item>
              </div>
              <div class="right">
                <el-form-item label=" 备　　注 :" style="width: 400px" class="errTitle">
                  <el-input
                    type="textarea"
                    v-model="damageDialog.form.remarks"
                    style="width: 300px"
                    :autosize="{ minRows:8, maxRows: 8}"
                    resize="none"
                  ></el-input>
                </el-form-item>
              </div>
            </el-form>
          </div>
        </div>
        <div style="margin-bottom: 20px">
          <span class="dialogButton true mr_40" @click="damageDlgBtn">确 定</span>
          <span class="dialogButton cancel" @click="damageDialog.display=false">取 消</span>
        </div>
      </el-dialog>
    </section>
  </div>
</template>

<script>
import { reserveInt } from "@request/api/book/cataAdd";
export default {
  data() {
    return {
      /*------ 非弹框组 ------*/
      // 状态数据可以放在其他地方存储
      // 禁用分类号
      typeBan:true,
      rowId: "",
      // 查询表单
      searchInput: {
        option: "", // 选择框
        search: "", // 输入框
        optionsArr: [
          {
            label: "馆内码",
            value: 1
          },
          {
            label: "书籍名称",
            value: 2
          },
          {
            label: "丛编题名",
            value: 3
          },
          {
            label: "ISBN",
            value: 4
          },
          /* {
            label: "在馆状态",
            value: 5
          } */
        ]
      },
      searchForm: {
        libraryBookCode: "", // 藏馆码
        name: "", // 名字
        parallelTitle: "", // 并列题名
        remark: "", // 备注
        queryIssn: "", // isbn
        pageSize: 10,
        currentPage: 1
      },
      // 表格DOM数据
      tableObj: {
        tableData: [], // 表格数据
        headerCellSty: {
          background: "#0096FF",
          color: "#fff",
          height: "60px",
          fontSize: "14px",
          borderRight: "none"
        },
        rowStyle: { height: "60px" },
        selectAll: []
      },
      //分页DOM
      pagationObj: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        pageInput: 1
      },
      /*------ 展示数据初始化 ------*/
      /*------ 弹框数据 ------*/
      // a: add e:edit
      aeDialog: {
        flag: false,
        display: false,
        title: "",
        titleBox: ["添加书籍", "修改书籍"],
        searchDisabled: false, // 搜索禁用
        inputDisabled: true, // 回显框禁用
        issnDiabled: false, // 期刊号备用禁用
        callNumberCopy: "", // 对比索引号是否被修改了
        checkObj: {
          // 控制复本
          control: false,
          value: 0,
          checkControl: false
        },
        libSelect: [],
        libIndex: {
          id: 1,
          code: "00"
        }, // 用这个去数组找元素
        aeForm: {
          duplicate: 0, // 复本
          id: "",
          isbn: "", // isbn
          fkCataBookId: "", // 期刊ID

          code: "", // 条码号
          callNumber: "", // 索引号
          alteration: 0, // 索引号码是否改动
          placeCode: "", // 馆内码
          dailyRent: false,
          available: true, // 是否启用
          lendingPermission: false // 是否外借
        },
        aeRules: {
          isbn: [{ required: true, message: "ISBN不得为空", trigger: "blur" }],
          pNumberId: [
            { required: true, message: "期刊号不得为空", trigger: "blur" }
          ],
          code: [
            { required: true, message: "条码号不得为空", trigger: "blur" }
          ],
          callNumber: [
            { required: true, message: "索书号不得为空", trigger: "blur" }
          ],
          placeCode: [
            {
              required: true,
              message: "馆藏地不得为空",
              trigger: "change"
            }
          ]
        },
        rowId: "", // 获取row的ID存
        showLocalForm: {},
        bookShow: [],
        cNbSelect: {
          select: "0",
          options: [
            { label: "种次号", value: "0" },
            { label: "著作号", value: "1" }
          ],
          input: "",
          backSelect: [],
          fix: false
        }
      },
      aeindex: 0, //控制添加和编辑弹框的切换

      // issn搜索语言弹框
      issnDialog: {
        display: false,
        title: ["本地数据预览"],
        tableData: []
      },

      // 表头样式
      tableNomalHead: {
        background: "#0096FF",
        color: "#fff",
        height: "30px",
        fontSize: "18px",
        borderRight: "none",
        textAlign: "center"
      },
      tableRowHead: {},
      // 期刊号弹框
      indexNumDlg: {
        display: false,
        title: "期刊号选择",
        tableData: []
      },
      // war:waring 否定弹框
      warIndex: 0, // 控制标题
      warDialog: {
        display: false,
        title: "",
        titleData: ["删除", "启用", "停用"]
      },
      // reject剔除 other 其余弹框
      otherDialog: {
        display: false,
        otherIndex: 0,
        otherInput: "",
        otherOptions: [],
        title: "剔除",
        otherForm: {},
        titleData: ["剔除", "调馆"],
        // 剔除下拉
        rejectOptions: [
          {
            label: "未还",
            value: "4"
          },
          {
            label: "被盗",
            value: "5"
          },
          {
            label: "陈旧",
            value: "6"
          },
          {
            label: "破损",
            value: "7"
          },
          {
            label: "其他",
            value: "8"
          }
        ],
        rejectForm: {
          codes: [],
          state: ""
        },
        // 调馆下拉
        translateOptions: [],
        translateForm: {
          code: "", // 藏馆code
          ids: [] // 数组
        }
      },
      // 报损弹框
      damageDialog: {
        display: false,
        title: "报损",
        index: 0,
        titleData: ["报损"],
        form: {
          cardNum: "",
          damageId: "",
          price: null,
          remarks: "",
          fkBookLibCode: ""
        },
        damageItem: {
          compensationNum: 0,
          compensationType: 0,

          id: "",
          remarks: "阿斯顿"
        }, // 报损原因对象
        rules: {
          price: [
            { required: true, message: "赔偿原因不得为空", trigger: "change" }
          ]
        },
        showData: {
          callNumber: "",
          code: "",
          isbn: "",
          name: "",
          placeCode: "",
          anumber: "",
          openBook: "",
          publicationDate: "",
          fkTypeCode: "",
          price: 0
        },
        damageOptions: []
      }
    };
  },
  computed: {
    pageCount() {
      let pageSize = 10;

      let all = parseInt(this.pagationObj.total);
      return Math.ceil(all / pageSize);
    },
    editForm() {
      let obj = {};
      obj.id = this.aeDialog.rowId;
      obj = Object.assign(obj, this.aeDialog.aeForm);
      return obj;
    },
    otherForm() {
      switch (this.otherDialog.otherIndex) {
        case 0:
          return this.otherDialog.rejectForm;
          break;
        case 1:
          return this.otherDialog.translateForm;
          break;
      }
    },
    // 报损价格
    damageValue() {
      let juge = this.damageDialog.damageItem.compensationType;
      let times = this.damageDialog.damageItem.compensationNum;
      let price = this.damageDialog.showData.price;
      if (juge == 0) {
        return times;
      } else {
        return times * price;
      }
      console.log(this.damageDialog.damageItem, "先看看值和字段");
    }
  },
  methods: {
    /*------ 通信框架函数 ------*/
    selectCheck() {},
    selectAll(val) {
      this.tableObj.selectAll = val;
      console.log("全选的内容", val);
    },
    current_change(val) {
      this.searchForm.currentPage = val;
      this.pagationObj.currentPage = val;
      this._search(this.searchForm);
      console.log(val);
    },
    // 跳页
    jumpBtn() {
      let pageNum = this.pagationObj.pageInput;
      if (typeof pageNum != "number") {
        this.pagationObj.pageInput;
      }
      if (pageNum < 0 || pageNum > this.pageCount) {
        this.pagationObj.pageInput = 1;
        this.$refs.text.value = 1;
      } else {
        this.pagationObj.pageInput = parseInt(pageNum);
        this.$refs.text.value = parseInt(pageNum);
      }
      this.searchForm.currentPage = this.pagationObj.pageInput;
      this.pagationObj.currentPage = this.pagationObj.pageInput;
      this._search(this.searchForm);
    },
    handleChange() {},
    /*------ 非弹框触发按钮 ------*/
    addBtn() {
      if (this.aeDialog.flag) {
        this.$refs.aeForm.resetFields();
      }
      this.aeIndex = 0;
      this.aeDialog.title = this.aeDialog.titleBox[0];
      this.aeDialog.flag = true;
      // 清空数据回显问题
      this.clearValue(this.aeDialog.aeForm);
      this.clearValue(this.aeDialog.showLocalForm);
      this.aeDialog.bookShow = [];
      this.aeDialog.cNbSelect.input = "";
      this.aeDialog.cNbSelect.backSelect = [];
      this.aeDialog.checkObj.checkControl = false;
      this.aeDialog.searchDisabled = false;
      this.aeDialog.checkObj.control = false;
      this.aeDialog.issnDiabled = false;

      this.aeDialog.checkObj.value = 0;
      this.aeDialog.aeForm.available = true;
      this.aeDialog.aeForm.lendingPermission = false;
      this.aeDialog.display = true;
    },
    removeBtn() {
      let length = this.tableObj.selectAll.length;
      if (length) {
        this.warDialog.display = true;
        this.warIndex = 0;
        this.warDialog.title = this.warDialog.titleData[0];
      } else {
        this.$message.error("请先选择需要删除的对象");
      }
    },
    searchBtn() {
      let value = this.searchInput.option;
      console.log(value);
      if (value) {
        switch (value) {
          case 1:
            this.clearValue(this.searchForm);
            this.searchForm.code = this.searchInput.search;
            break;
          case 2:
            this.clearValue(this.searchForm);
            this.searchForm.bookName = this.searchInput.search;
            break;
          case 3:
            this.clearValue(this.searchForm);
            this.searchForm.clusterName = this.searchInput.search;
            break;
          case 4:
            this.clearValue(this.searchForm);
            this.searchForm.isbn = this.searchInput.search;

          /* case 5:
            this.clearValue(this.searchForm);
            this.searchForm.remark = this.searchInput.search;
            break; */
        }
      } else {
        this.clearValue(this.searchForm);
      }
      this.searchForm.pageSize = 10;
      this.searchForm.currentPage = 1;
      this._search(this.searchForm);
      console.log(this.searchInput, this.searchForm);
    },
    reviseBtn(index, row) {
      this.aeIndex = 1;
      this.aeDialog.title = this.aeDialog.titleBox[1];
      this.aeDialog.checkObj.checkControl = true;
      this.aeDialog.searchDisabled = true;
      this.aeDialog.issnDiabled = true;
      this.aeDialog.showLocalForm = Object.assign(
        this.aeDialog.showLocalForm,
        row
      );
      let obj = {};
      let pbj = {};
      let zbj = {};
      this.aeDialog.rowId = row.id;
      this.aeDialog.aeForm.id = row.id;
      obj.id = row.id;
      pbj.id = row.fkCataBookId;
      zbj.fkCataBookId = row.fkCataBookId;
      this._getFront(obj);
      this._getSearchNum(pbj);
      this._getbackTab(zbj);
      this.aeDialog.flag = true;
      this.aeDialog.aeForm.available = this.aeDialog.aeForm.available
        ? true
        : false;
      this.aeDialog.aeForm.lendingPermission = this.aeDialog.aeForm
        .lendingPermission
        ? true
        : false;

      console.log("当前row数据", row, this.aeDialog.aeForm);
    },
    // 剔除
    rejectBtn() {
      let length = this.tableObj.selectAll.length;
      if (length) {
        this.otherDialog.otherIndex = 0;
        this.otherDialog.title = this.otherDialog.titleData[0];

        this.otherDialog.display = true;
        this.otherDialog.otherInput = "";
      } else {
        this.$message.error("请先选择需要剔除的对象");
      }
    },
    // 批量调馆
    transferBtn() {
      let length = this.tableObj.selectAll.length;
      if (length) {
        this.otherDialog.otherIndex = 1;
        this.otherDialog.title = this.otherDialog.titleData[1];

        this.otherDialog.display = true;
        this.otherDialog.otherInput = "";
      } else {
        this.$message.error("请先选择需要调馆的对象");
      }
    },
    // 导出
    outputBtn() {},

    // 启用禁用
    controlBtn(index, row) {
      this.rowId = row.id;

      if (row.available) {
        this.warIndex = 2;
        this.warDialog.title = this.warDialog.titleData[2];
      } else {
        this.warIndex = 1;
        this.warDialog.title = this.warDialog.titleData[1];
      }
      console.log("启用调用", row.available, this.warIndex);
      this.warDialog.display = true;
    },
    pagationBtn() {},
    // 报损
    damageBtn(index, row) {
      this.clearValue(this.damageDialog.form);
      this.clearValue(this.damageDialog.damageItem);
      this.damageDialog.form.id = row.id;
      console.log("报损回显", row);
      this.damageDialog.showData = Object.assign(
        this.damageDialog.showData,
        row
      );
      this.damageDialog.display = true;
    },
    damageDlgBtn() {
      // 要开校检 而且是分开校检
      this.damageDialog.form.damageId = this.damageDialog.damageItem.id;
      this.$refs.damageForm.validate(valid => {
        if (valid) {
          this.damageDialog.form.price = this.damageValue;
          this._damage(this.damageDialog.form);
        } else {
          console.log("where happen");
        }
      });
    },
    dagameTest(val) {
      console.log(val, this.damageDialog.damageItem, "选取测试");
    },
    /*------ 弹框按钮 ------*/
    aeConfirmBtn() {
      console.log(this.aeDialog.aeForm, "检测");
      this.$refs.aeForm.validate(valid => {
        if (valid) {
          // 复本要做判定
          if (this.aeDialog.checkObj.control) {
            this.aeDialog.aeForm.duplicate = this.aeDialog.checkObj.value;
          } else {
          }
          // 索取号判定
          /* if (this.callNumberCopy == this.callNumber) {
            this.aeDialog.aeForm.alteration = 0;
          } else {
            this.aeDialog.aeForm.alteration = 1;
          } */
          // true和false
          this.aeDialog.aeForm.dailyRent = this.aeDialog.aeForm.dailyRent
            ? 1
            : 0;
          this.aeDialog.aeForm.available = this.aeDialog.aeForm.available
            ? 1
            : 0;
          this.aeDialog.aeForm.lendingPermission = this.aeDialog.aeForm
            .lendingPermission
            ? 1
            : 0;
          this.aeDialog.aeForm.placeCode = this.aeDialog.libIndex.code;
          this.aeDialog.aeForm.callNumber = this.aeDialog.cNbSelect.input;
          let cNbValue = this.aeDialog.cNbSelect.select;
          localStorage.setItem("selectValue", cNbValue);
          console.log(this.aeDialog.aeForm, "检测");
          if (this.aeIndex == 0) {
            this._add(this.aeDialog.aeForm);
          } else {
            this._revise(this.editForm);
          }
        } else {
          return false;
        }
      });
    },
    warBtn() {
      let value = this.warIndex;
      let obj = {};
      switch (value) {
        case 0:
          let arr = [];
          for (let item of this.tableObj.selectAll) {
            arr.push(item.id);
          }

          obj.ids = arr;
          this._remove(obj);
          break;
        case 1:
          obj.id = this.rowId;
          this._openIndex(obj);
          break;
        case 2:
          obj.id = this.rowId;
          this._closeIndex(obj);
      }
    },
    otherDialogBtn() {
      let obj = {};
      let arr = [];
      switch (this.otherDialog.otherIndex) {
        case 0:
          for (let item of this.tableObj.selectAll) {
            arr.push(item.id);
          }
          obj.bookId = arr;
          obj.remove = this.otherDialog.otherInput;
          this._reject(obj);
          break;
        case 1:
          for (let item of this.tableObj.selectAll) {
            arr.push(item.id);
          }
          obj.ids = arr;
          obj.code = this.otherDialog.otherInput;
          this._translate(obj);
          break;
      }
    },
    // 功能弹框 s: search 外层表单弹框
    sIssnBtn() {
      // 做数据验证
      let obj = {};
      obj.isbn = this.aeDialog.aeForm.isbn;

      console.log(obj, "传递的数据");
      this._getLocal(obj);
    },
    /*--- ISSN搜索数据弹框 ---*/
    getLocalBtn(index, row) {
      this.aeDialog.aeForm.fkCataBookId = row.id;
      this.issnDialog.display = false;
      this.aeDialog.showLocalForm = Object.assign(
        this.aeDialog.showLocalForm,
        row
      );
      // 调用 期刊号接口
      let obj = {};
      obj.isbn = this.aeDialog.aeForm.isbn;
      obj.cataPeriodicalId = row.id;
      let pbj = {};
      pbj.id = row.id;
      let zbj = {};
      zbj.fkCataBookId = row.id;
      this._getNumber(obj);
      this._getSearchNum(pbj);
      this._getbackTab(zbj);
      console.log(row, "获取的数据");
    },

    /*------ api ------*/
    _add(obj) {
      let data = obj;
      reserveInt.add(data).then(res => {
        if (res.data.state) {
          this.aeDialog.display = false;
          this._search();
          this.$message.success(res.data.msg);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    _remove(obj) {
      let data = obj;
      reserveInt.remove(data).then(res => {
        if (res.data.state == true) {
          this.$message.success(res.data.msg);
          this._search();
          this.warDialog.display = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    _search(obj) {
      let data = obj;
      reserveInt.search(data).then(res => {
        if (res.data.state == true) {
          for (let item of res.data.row) {
            item.toAvailable = this.toAvailable(item.available);
            item.toLendState = this.toLendState(item.lendState);
            item.toOtherState = this.toOtherState(item.otherState);
          }
          this.tableObj.tableData = res.data.row;
          this.pagationObj.total = res.data.total;
        }
        console.log(res, "查询");
      });
    },
    _revise(obj) {
      let data = obj;
      reserveInt.revise(data).then(res => {
        if (res.data.state == true) {
          this.$message.success(res.data.msg);
          this._search();
          this.aeDialog.display = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    _reject(obj) {
      let data = obj;
      reserveInt.reject(data).then(res => {
        if (res.data.state == true) {
          this.$message.success(res.data.msg);
          this._search();
          this.otherDialog.display = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    /*------ 过滤函数 filter ------*/
    clearValue(obj) {
      // 不使用for in 避免遍历出原型属性
      let { keys, values, entries } = Object;

      for (let key of keys(obj)) {
        obj[key] = "";
      }
    }, // 一层清空不完整
    // 健壮性未做 类型判定未做
    toAvailable(num) {
      let str = "";
      switch (num) {
        case 0:
          str = "停用";
          break;
        case 1:
          str = "启用";
          break;
      }
      return str;
    },
    toLendState(num) {
      let str = "";
      let lendArr = ['不在架','在架','借出','剔除','报损']
      str = lendArr[num]
      return str;
    },
    toOtherState(num) {
      let str = "";
      switch (num) {
        case 0:
          str = "无特殊状态";
          break;
        case 1:
          str = "损坏";
          break;
        case 2:
          str = "遗失";
          break;
        case 3:
          str = "调馆";
          break;
        case 4:
          str = "未还";
          break;
        case 5:
          str = "被盗";
          break;
        case 6:
          str = "陈旧";
          break;
        case 7:
          str = "破损";
          break;
        case 8:
          str = "其他";
          break;
      }
      return str;
    },
    /*------ 2019/8/10接盘版 api区 ------*/

    /*------ 额外API ------*/
    // 获取本地期刊数据
    _getLocal(obj) {
      let data = obj;
      reserveInt.getLocal(data).then(res => {
        if (res.data.state == true) {
          this.issnDialog.display = true;
          this.issnDialog.tableData = res.data.row;
        } else {
          this.$message.error(res.data.msg);
        }
        console.log("获取本地ISSN", res);
      });
    },
    // 获取期刊号数据
    _getIndexNum(obj) {
      let data = obj;
      reserveInt.getIndex(data).then(res => {
        if (res.data.state == true) {
          this.indexNumDlg.display = true;
          this.indexNumDlg.tableData = res.data.row;
        } else {
          this.$message.error(res.data.msg);
        }
        console.log("获取本地期刊号", res);
      });
    },
    // 获取索书号
    _getNumber(obj) {
      let data = obj;
      reserveInt.getNumber(data).then(res => {
        if (res.data.state == true) {
          let dataMe = JSON.parse(res.data.row);
          this.aeDialog.aeForm.code = dataMe;
          //this.aeDialog.aeForm.callNumber = dataMe.callNumber;
          //this.aeDialog.callNumberCopy = dataMe.callNumber;
          console.log(dataMe, "索取号", this.aeDialog.aeForm);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 获取馆藏地
    _getCity(obj) {
      let data = obj;
      reserveInt.getCity(data).then(res => {
        if (res.data.state == true) {
          this.aeDialog.libSelect = res.data.row;
          this.otherDialog.translateOptions = res.data.row;
          console.log(res, "馆藏地");
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 点击获取
    _getFront(obj) {
      let data = obj;

      reserveInt.getFront(data).then(res => {
        if (res.data.state == true) {
          console.log(res, "编辑回显");
          let dataNom = res.data.row;
          this.aeDialog.libIndex = Object.assign(
            this.aeDialog.libIndex,
            dataNom.bookTbLibrary
          );
          /* this.aeDialog.showLocalForm = Object.assign(
            this.aeDialog.showLocalForm,
            dataNom.cataTbBookInfo
          );*/
          this.aeDialog.aeForm.isbn = dataNom.cataTbBookInfo.isbn;
          this.aeDialog.aeForm.fkCataBookId = dataNom.fkCataBookId;
          this.aeDialog.aeForm.code = dataNom.code;
          this.aeDialog.aeForm.placeCode = dataNom.placeCode;
          this.aeDialog.aeForm.available = dataNom.available ? true : false;
          this.aeDialog.aeForm.lendingPermission = dataNom.lendingPermission
            ? true
            : false;
          this.aeDialog.aeForm.duplicate = 0;
          this.aeDialog.display = true;
          this.aeDialog.cNbSelect.input = dataNom.callNumber;
          console.log(this.aeDialog, "赋值失败？");
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    // 启用
    _openIndex(obj) {
      let data = obj;
      reserveInt.openIndex(data).then(res => {
        if (res.data.state == true) {
          this.$message.success(res.data.msg);
          this._search();
          this.warDialog.display = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 停用
    _closeIndex(obj) {
      let data = obj;
      reserveInt.closeIndex(data).then(res => {
        if (res.data.state == true) {
          this.$message.success(res.data.msg);
          this._search();
          this.warDialog.display = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 调馆
    _translate(obj) {
      let data = obj;
      reserveInt.translate(data).then(res => {
        if (res.data.state == true) {
          this.$message.success(res.data.msg);
          this._search();
          this.otherDialog.display = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 报损
    _damage(obj) {
      let data = obj;
      reserveInt.damage(data).then(res => {
        if (res.data.state == true) {
          this.$message.success(res.data.msg);
          this._search();
          this.damageDialog.display = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 报损下拉框
    _getDamegeOp(obj) {
      let data = obj;
      reserveInt.getDamegeOp(data).then(res => {
        console.log();
        if (res.data.state == true) {
          this.damageDialog.damageOptions = res.data.row;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 新型索引号 还要存在本地
    _getSearchNum(obj) {
      let data = obj;
      reserveInt.getSearchNum(data).then(res => {
        if (res.data.state == true) {
          let dataMe = res.data.row;
          let arr = [];
          if (dataMe) {
            arr.push(dataMe.searchNumberAuthorNum);
            arr.push(dataMe.searchNumberOrderNum);
            this.aeDialog.cNbSelect.backSelect = arr;
            // 修改就不赋值了
            if (!this.aeindex) {
              let value = parseInt(this.aeDialog.cNbSelect.select);
              this.aeDialog.cNbSelect.input = this.aeDialog.cNbSelect.backSelect[
                value
              ];
              console.log(this.aeindex);
            }
          } else {
            this.aeDialog.cNbSelect.backSelect = arr;
          }

          console.log(this.aeDialog.cNbSelect, "索取号下拉");
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 获取书籍损坏信息
    _getbackTab(obj) {
      let data = obj;
      reserveInt.getbackTab(data).then(res => {
        console.log();
        if (res.data.state == true) {
          this.aeDialog.bookShow = res.data.row;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 索引号下拉
    NumberSelect() {
      if (this.aeDialog.cNbSelect.backSelect.length) {
        let value = parseInt(this.aeDialog.cNbSelect.select);
        this.aeDialog.cNbSelect.input = this.aeDialog.cNbSelect.backSelect[
          value
        ];
        console.log("？？？");
      }
    },
    watchValue(val) {
      //this.aeDialog.libIndex = Object.assign(this.aeDialog.libIndex,val)
      console.log(val, this.aeDialog.libIndex);
    }
  },
  created() {
    // 获取存在本地的local值来付给select 记录用户的习惯
    let value = localStorage.getItem("selectValue");
    this.aeDialog.cNbSelect.select = value ? "1" : "0";
    console.log(value, "如果为空的话");
    this._getCity();
    this._search();
    this._getDamegeOp();
  }
};
</script>

<style lang="scss">
#bookCataBox {
  background-color: #ffffff;
  padding: 30px;
  .titleBox {
    margin-bottom: 35px;
    .title {
      padding-left: 5px;
      border-left: 4px;
      border-left-color: #0096ff;
      border-left-style: solid;
      font-size: 16px;
      color: #878787;
    }
  }
  .changeBtnBox {
    margin-bottom: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .oprateBtn {
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
      .addBtn {
        background: rgba(255, 146, 49, 1);
        border-radius: 10px;
        margin-right: 10px;
      }
      .deleteBtn {
        background: rgba(255, 92, 60, 1);
        border-radius: 10px;
        margin-right: 10px;
      }
      .rejectBtn {
        background: #4d94ff;
        border-radius: 10px;
        margin-right: 10px;
      }
      .transferBtn {
        background: #01eeca;
        border-radius: 10px;
        margin-right: 10px;
      }
      .outputBtn {
        background: #31d6ff;
        border-radius: 10px;
        margin-right: 10px;
      }
    }
    .searchBtn {
    }
  }
  .tableBox {
    .table {
      margin-bottom: 50px;
      .revise {
        color: #01d793;
        margin-right: 20px;
        cursor: pointer;
      }
      .tranceOn {
        color: #00d7f0;
        margin-right: 20px;
        cursor: pointer;
      }
      .damage {
        color: #ff5c3c;

        cursor: pointer;
      }
    }
    .pagationBox {
      display: flex;
      flex-basis: row;
      justify-content: center;
      align-items: center;
    }
  }
  /*弹框组*/
  #indexCataAdd {
    .firstInfoBox {
      .searchForm {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .el-button--primary.is-disabled {
          background-color: transparent;
          color: #c0c4cc;
          border-color: #ebeef5;
        }
      }
      .indexInfo {
        padding: 20px 15px;
        border: 1px solid #d3dfe6;
        margin-bottom: 25px;

        .el-form-item {
          margin-bottom: 0px;
        }
        .el-input__inner {
          border: none;
          border-bottom: 1px solid #d3dfe6;
        }
      }
    }
    .twiceInfoBox {
      margin: 22px 0;
      .indexNumInfo {
        padding: 20px 15px;
        border: 1px solid #d3dfe6;

        .el-form-item {
          margin-bottom: 0px;
        }
        .el-input__inner {
          border: none;
          border-bottom: 1px solid #d3dfe6;
        }
      }
    }
    .threeInfoBox {
      padding: 20px 15px;
      border: 1px solid #d3dfe6;
      .number {
        margin-bottom: 10px;
      }
      .mutilyBox {
      }
    }
    .bookBackShow {
      margin-top: 20px;
    }
    .dialogBoxBtn {
      text-align: center;
      padding-top: 20px;
    }
    /*------ 通用样式 ------*/
    .diagtwoInput {
      justify-content: space-between;
    }
    .diagThreeInput {
      justify-content: space-between;
      .el-form-item {
        margin-bottom: 0px;
      }
    }
    .flexRow {
      display: flex;
      flex-direction: row;
    }
    .el-form-item__label {
      text-align: right;
    }
  }

  /*剔除弹框*/
  /*警告弹框*/
  .waringDialog,
  .rejectDialog {
    .dialogBody {
      text-align: center;
      font-size: 16px;
      margin-top: 15px;
      margin-bottom: 30px;
    }
  }
  .rejectDialog {
    .el-form-item__content {
      width: 180px;
    }
  }
  /*------ 覆盖样式 ------*/
  .el-input.is-disabled .el-input__inner {
    background-color: rgba(0, 0, 0, 0);
  }
  .otherInput .el-input .el-input__inner {
    height: 40px;
    line-height: 40px;
  }
}
#issnTable {
  .issnTableBox {
    margin-bottom: 30px;
    .getBtn {
      color: rgb(0, 150, 255);
      cursor: pointer;
    }
    .el-table__fixed-right-patch {
      background: rgb(0, 150, 255);
    }
  }
}
#damageDialog {
  .dialogBody {
    .showMessage {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      padding: 20px 10px;
      padding-bottom: 25px;
      border: 1px solid #ccc;
      margin-bottom: 20px;
      .backShow {
        line-height: 30px;

        display: flex;
        flex-direction: row;
        overflow: hidden;

        .label {
          width: 80px;
          padding-right: 20px;
          box-sizing: border-box;
          display: inline-block;
          text-align: right;
        }
        .showContent {
          display: inline-block;
          width: 180px;
          border-bottom: 1px solid #ccc;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
    .showBody {
      margin-bottom: 20px;
      .showBodyBox {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .left {
          width: 450px;
          margin-right: 30px;
        }
      }
    }
  }
}
</style>
