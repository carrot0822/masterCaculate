<template>
  <div id="indexMeger">
    <section class="titleBox">
      <h2 class="title">过刊合订</h2>
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
        </button> -->
      </div>
      <div class="searchBtn">
        <el-form :inline="true" :model="searchInput">
          <el-form-item label="筛选 :">
            <el-select
              style="width: 150px"
              v-model="searchInput.option"
              placeholder="请选择"
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
              placeholder="请输入相关信息"
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
          <el-table-column align="center" type="selection" width="100"></el-table-column>
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
            prop="issn"
            label="ISSN"
            :show-overflow-tooltip="true"
          ></el-table-column>

          <el-table-column
            width="200"
            align="center"
            prop="name"
            label="期刊名称"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            width="200"
            align="center"
            prop="place"
            label="馆藏地"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            width="100"
            align="center"
            prop="issn"
            label="在馆状态"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column align="center" prop="anumber" label="刊期号" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column
            width="100"
            align="center"
            prop="openBook"
            label="开本"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            width="200"
            align="center"
            prop="publicationDate"
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
          <!-- <el-table-column
            width="100"
            align="center"
            prop
            label="典藏者"
            :show-overflow-tooltip="true"
          ></el-table-column> -->
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
            prop="periodicalTypeName"
            label="期刊类型"
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
      <div id="mergeAdd" class="content">
        <el-form
          ref="aeForm"
          :rules="aeDialog.aeRules"
          label-width="80px"
          :model="aeDialog.aeForm"
          style="width:840px;"
        >
          <section class="firstInfoBox">
            <div class="searchForm">
              <el-form-item prop="issn" label="ISSN:">
                <el-input
                  style="width:350px;"
                  :disabled="aeDialog.searchDisabled"
                  v-model="aeDialog.aeForm.issn"
                  placeholder="请输入ISSN进行搜索选择相关数据"
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
            </div>
            <!-- 输出的信息 -->
            <div class="indexInfo">
              <div class="diagOneInput">
                <el-form-item style="width:100%" label="期刊名称:">
                  <el-input
                    style="width:720px;"
                    v-model="aeDialog.showLocalForm.name"
                    :disabled="aeDialog.inputDisabled"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="diagOneInput">
                <el-form-item label="并列题名:">
                  <el-input
                    style="width:720px;"
                    v-model="aeDialog.showLocalForm.parallelTitle"
                    :disabled="aeDialog.inputDisabled"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="diagThreeInput flexRow">
                <el-form-item label="统一刊号:">
                  <el-input
                    style="width:180px;"
                    v-model="aeDialog.showLocalForm.unifyNum"
                    :disabled="aeDialog.inputDisabled"
                  ></el-input>
                </el-form-item>
                <el-form-item label="邮发代号:">
                  <el-input
                    style="width:180px;"
                    v-model="aeDialog.showLocalForm.postIssueNumber"
                    :disabled="aeDialog.inputDisabled"
                  ></el-input>
                </el-form-item>
                <el-form-item label="发行周期:">
                  <el-input
                    style="width:180px;"
                    v-model="aeDialog.showLocalForm.releaseCycle"
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
                <el-form-item label="参考开本:">
                  <el-input
                    style="width:180px;"
                    v-model="aeDialog.showLocalForm.openBook"
                    :disabled="aeDialog.inputDisabled"
                  ></el-input>
                </el-form-item>
                <el-form-item label="参考单价:">
                  <el-input
                    style="width:180px;"
                    v-model="aeDialog.showLocalForm.issnPrice"
                    :disabled="aeDialog.inputDisabled"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="diagtwoInput flexRow">
                <el-form-item label="主编:">
                  <el-input
                    style="width:250px;"
                    v-model="aeDialog.showLocalForm.author"
                    :disabled="aeDialog.inputDisabled"
                  ></el-input>
                </el-form-item>
                <el-form-item label="发行单位:">
                  <el-input
                    style="width:320px;"
                    v-model="aeDialog.showLocalForm.fkPressName"
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
          <!-- 子刊号 -->
          <section class="sonIndexBox">
            <div class="backout">
              <div class="sonIndex">
                <span @click="sIndexBtn">管理>></span>
              </div>
              <div class="table">
                <el-table
                  :data="aeDialog.showIndexForm.tableData"
                  max-height="120"
                  :header-row-style="tableNomalHead"
                  :header-cell-style="tableNomalHead"
                  empty-text="无数据"
                  style="width: 100%;"
                  :row-style="{height:'30px'}"
                >
                  <el-table-column align="center" prop="index" type="index" width="60" label="序号"></el-table-column>
                  <el-table-column align="center" prop="callNumber" label="条码号"></el-table-column>
                  <el-table-column align="center" prop="anumber" label="期刊号"></el-table-column>
                  <el-table-column align="center" prop="price" label="价格"></el-table-column>
                  <el-table-column align="center" prop="toLendState" label="在馆状态"></el-table-column>
                </el-table>
              </div>
            </div>

            <!--- 子刊号选择回显信息 --->
            <div class="flexRow">
              <el-form-item label-width="85px" prop="hkPrice" label="合刊估价:">
                <el-input
                  style="width:230px;"
                  v-model="aeDialog.aeForm.hkPrice"
                  placeholder="请输入合刊估价"
                ></el-input>
              </el-form-item>
              <el-form-item prop="hkRemark" label-width="95px" label="合刊备注:">
                <el-input
                  style="width:430px;"
                  v-model="aeDialog.aeForm.hkRemark"
                  placeholder="请输入合刊备注"
                ></el-input>
              </el-form-item>
            </div>
          </section>
          <!-- 条码号 期刊号回显  -->
          <section class="threeInfoBox">
            <div class="number">
              <div class="diagThreeInput flexRow">
                <el-form-item prop="code" label="条码号:">
                  <el-input
                    style="width:180px;"
                    v-model="aeDialog.aeForm.code"
                    placeholder="请输入条码号"
                  ></el-input>
                </el-form-item>
                <el-form-item label="索取号:">
                  <el-input
                    placeholder="请输入内容"
                    v-model="aeDialog.cNbSelect.input"
                    class="input-with-select"
                  >
                    <el-select
                      style="width:100px;"
                      v-model="aeDialog.cNbSelect.select"
                      slot="append"
                      placeholder="请选择"
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
                    placeholder="选择馆藏地"
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
              <el-checkbox style="margin:0;" v-model="aeDialog.aeForm.lendingPermission">不外借</el-checkbox>
            </div>
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
                <el-table-column align="center" width="180" prop="name" label="期刊名"></el-table-column>
                <el-table-column align="center" width="120" prop="issn" label="ISSN"></el-table-column>
                <el-table-column align="center" width="120" prop="author" label="主编"></el-table-column>
                <el-table-column align="center" width="120" prop="fkPressName" label="出版社"></el-table-column>
                <el-table-column width="120" align="center" prop="fkTypeCode" label="分类号"></el-table-column>
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
      <!--- 期刊号弹框 --->
      <div class="index">
        <el-dialog
          id="indexNumBox"
          :title="indexNumDlg.title"
          :visible.sync="indexNumDlg.display"
          append-to-body
        >
          <div class="content">
            <div class="leftBox">
              <section class="mypagation">
                <pagationOwn @pageChange="pageSelect" :allData="indexNumDlg.pagatiomnObj.alldata"></pagationOwn>
              </section>
              <section class="searchIndex">
                <span class="getBtn" @click="transformBtn">
                  <i class="addIcon el-icon-plus"></i>选取
                </span>
                <el-input
                  style="width:350px;"
                  v-model="indexNumDlg.searchInput"
                  placeholder="按条码编号或期刊号筛选"
                >
                  <el-button
                    slot="append"
                    type="primary"
                    @click="searchSelect"
                    icon="el-icon-search"
                  ></el-button>
                </el-input>
              </section>
              <section class="tableData">
                <el-table
                  ref="leftTable"
                  :data="indexNumDlg.tableDataL"
                  max-height="370"
                  :header-row-style="tableNomalHead"
                  :header-cell-style="tableNomalHead"
                  empty-text="无数据"
                  style="width: 100%;"
                  @selection-change="indexSelect"
                  :row-style="{height:'30px'}"
                >
                  <el-table-column align="center" type="selection" width="60"></el-table-column>
                  <el-table-column align="center" width="100" prop="remarkIndex" label="序号"></el-table-column>
                  <!-- <el-table-column align="center" prop="index" type="index" width="60" label="序号">
                    <template slot-scope="scope">
                      <span>{{(pagationObj.currentPage - 1) * pagationObj.pageSize + scope.$index + 1}}</span>
                    </template>
                  </el-table-column>-->
                  <el-table-column align="center" width="100" prop="callNumber" label="条码号"></el-table-column>
                  <el-table-column align="center" width="100" prop="anumber" label="期刊号"></el-table-column>
                  <el-table-column align="center" width="100" prop="price" label="价格"></el-table-column>
                  <el-table-column align="center" prop="toLendState" label="在馆状态"></el-table-column>
                </el-table>
              </section>
            </div>
            <div class="rightBox">
              <section class="tableData">
                <el-table
                  :data="indexNumDlg.tableDataR"
                  max-height="470"
                  :header-row-style="tableNomalHead"
                  :header-cell-style="tableNomalHead"
                  empty-text="无数据"
                  style="width: 100%;"
                  :row-style="{height:'30px'}"
                >
                  <!-- <el-table-column align="center" prop="index" type="index" width="60" label="序号">
                    <template slot-scope="scope">
                      <span>{{(pagationObj.currentPage - 1) * pagationObj.pageSize + scope.$index + 1}}</span>
                    </template>
                  </el-table-column>-->
                  <el-table-column align="center" width="100" prop="remarkIndex" label="序号"></el-table-column>
                  <el-table-column align="center" width="100" prop="callNumber" label="条码号"></el-table-column>
                  <el-table-column align="center" width="100" prop="anumber" label="期刊号"></el-table-column>
                  <el-table-column align="center" width="100" prop="price" label="价格"></el-table-column>
                  <el-table-column align="center" prop="toLendState" label="在馆状态"></el-table-column>
                  <el-table-column align="center" fixed="right" label="操作" width="80">
                    <template slot-scope="scope">
                      <span class="ban" @click="singleRemove(scope.$index, scope.row)">移除</span>
                    </template>
                  </el-table-column>
                </el-table>
              </section>
            </div>
          </div>

          <div class="dialogBoxBtn textCenter">
            <span class="dialogButton true mr_40" @click="confirmSelect">确 定</span>
            <span class="dialogButton cancel" @click="indexNumDlg.display = false">取 消</span>
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
          <el-form ref="otherForm" label-width="90px">
            <div v-if="otherDialog.otherIndex == 0" class="diagOneInput">
              <el-form-item style="width:100%" label="剔除原因:">
                <el-select v-model="otherDialog.otherInput" placeholder="选择剔除原因">
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
                <el-select v-model="otherDialog.otherInput" placeholder="选择馆藏地">
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
              <span class="label">ISSN:</span>
              <p class="showContent">{{damageDialog.showData.issn}}</p>
            </div>
            <div class="backShow">
              <span class="label">期刊名称:</span>
              <p class="hidden showContent">{{damageDialog.showData.name}}</p>
            </div>
            <div class="backShow">
              <span class="label">馆藏地:</span>
              <p class="showContent">{{damageDialog.showData.place}}</p>
            </div>
            <!-- <div class="backShow">
              <span class="label">刊期号:</span>
              <p class="showContent">{{damageDialog.showData.anumber}}</p>
            </div> -->
            <div class="backShow">
              <span class="label">价格:</span>
              <p class="showContent">{{damageDialog.showData.price}}</p>
            </div>
            <!-- <div class="backShow">
              <span class="label">出版日期</span>
              <p class="showContent">{{damageDialog.showData.publicationDate}}</p>
            </div> -->
            <div class="backShow">
              <span class="label">分类号</span>
              <p class="showContent">{{damageDialog.showData.fkTypeCode}}</p>
            </div>
          </div>
          <div class="showBody">
            <el-form ref="damageForm" class="showBodyBox" :model="damageDialog.form">
              <div class="left">
                <el-form-item label=" 卡　　号 :" label-width="100px" id="cardErr">
                  <el-input v-model="damageDialog.form.cardNumber "></el-input>
                </el-form-item>
                <el-form-item label=" 损坏原因 :" prop="price" class="errTitle" label-width="100px">
                  <el-select
                    @change="dagameTest"
                    value-key="id"
                    style="width: 330px"
                    v-model="damageDialog.damageItem"
                    placeholder="请选择"
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
import { mergeInt } from "@request/api/magazine/merge";
import { reserveInt } from "@/request/api/magazine/magazine.js";
import pagationOwn from "@/common/pagation/pagation"
export default {
  data() {
    return {
      /*------ 非弹框组 ------*/
      // 状态数据可以放在其他地方存储
      //
      rowId: "",
      // 查询表单
      searchInput: {
        option: "", // 选择框
        search: "", // 输入框
        optionsArr: [
          {
            label: "藏馆码",
            value: 1
          },
          {
            label: "期刊名",
            value: 2
          },
          {
            label: "并列题名",
            value: 3
          },
          {
            label: "ISSN",
            value: 4
          },
          {
            label: "备注",
            value: 5
          }
        ]
      },
      searchForm: {
        libraryBookCode: "", // 藏馆码
        name: "", // 名字
        parallelTitle: "", // 并列题名
        remark: "", // 备注
        queryIssn: "", // issn
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
        titleBox: ["添加期刊", "修改期刊"],
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
          ids: [], // 合刊刊号ID
          issn: "", // issn
          fkCataPeriodicalId: "", // 期刊ID
          
          hkPrice: 0, // 合刊价格
          hkRemark: "", // 合刊备注
          code: "", // 条码号
          callNumber: "", // 索引号
          alteration: 0, // 索引号码是否改动
          placeCode: "", // 馆内码
          available: true, // 是否启用
          lendingPermission: false // 是否外借
        },
        aeRules: {
          hkPrice:[{
            required: true, message: "合刊价格不得为空", trigger: "blur"
          }],
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
        showLocalForm: {
          name: "", //正题名
          parallelTitle: "", //并列题名
          unifyNum: "", // 统一刊号
          author: "", // 主编信息
          postIssueNumber: "", // 邮发代号
          releaseCycle: "", // 发行周期
          fkTypeCode: "", //分类号
          fkTypeName: "", //分类名
          fkPressName: "", //出版社
          fkPressCode: "", //出版码
          publishingPleace: "", //出版地
          language: "", //语种
          languageCode: "汉语", // 语言类型
          periodicalTypeId: "1", //文献类别
          openBook: "32", //开本
          issnPrice: "", //价格
          themeWord: "", //主题词
          annotations: "", //附注
          introduction: "" //摘要
        },
        showIndexForm: {
          tableData: []
        },
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
        searchInput: "", // 搜索存储
        tableDataL: [],
        tableDataR: [],
        searchForm: {
          cataPeriodicalId:"",
          libraryBookCode:"", // 馆内码
          periodicalNum:"", // 刊期号
          pageSize:10,
          currentPage:1, 
        }, // 搜索表单
        rowTable: [] ,// 全选按钮暂存
        pagatiomnObj:{
          alldata:0,

        }
      },
      // war:waring 否定弹框
      warIndex: 0, // 控制标题
      warDialog: {
        display: false,
        title: "删除",
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
          cardNumber: "",
          damageId: "",
          price: null,
          remarks: "",
          fkBookLibCode: ""
        },
        damageItem: {
          compensationNum: 0,
          compensationType: 1,
          createTime: "2019-06-27 15:46:01",
          damageName: "损坏",
          distinction: 0,
          id: "",
          remarks: "阿斯顿",
          updateTime: "2019-08-19 15:41:22"
        }, // 报损原因对象
        rules: {
          price: [
            { required: true, message: "赔偿原因不得为空", trigger: "change" }
          ]
        },
        showData: {
          callNumber: "",
          code: "",
          issn: "",
          name: "",
          place: "",
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
  components:{
    pagationOwn
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
      this.aeDialog.cNbSelect.input = "";
      this.aeDialog.cNbSelect.backSelect = [];
      this.aeDialog.showIndexForm.tableData = [];
      this.aeDialog.checkObj.checkControl = false;
      this.aeDialog.searchDisabled = false;
      this.aeDialog.checkObj.control = false;
      this.aeDialog.issnDiabled = false
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
            this.searchForm.libraryBookCode = this.searchInput.search;
            break;
          case 2:
            this.clearValue(this.searchForm);
            this.searchForm.name = this.searchInput.search;
            break;
          case 3:
            this.clearValue(this.searchForm);
            this.searchForm.parallelTitle = this.searchInput.search;
            break;
          case 4:
            this.clearValue(this.searchForm);
            this.searchForm.queryIssn = this.searchInput.search;

          case 5:
            this.clearValue(this.searchForm);
            this.searchForm.remark = this.searchInput.search;
            break;
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
      this.aeDialog.issnDiabled = true
      let obj = {};
      let pbj = {};
      this.aeDialog.rowId = row.id;
      obj.id = row.id;
      pbj.id = row.fkCataPeriodicalId;
      this._getFront(obj);
      this._getSearchNum(pbj);
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
      this.damageDialog.form.fkBookLibCode = row.code;
      this.damageDialog.damageItem.id="";
      console.log("报损回显",this.damageDialog.damageItem);
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

          // 索取号判定
          if (this.callNumberCopy == this.callNumber) {
            this.aeDialog.aeForm.alteration = 0;
          } else {
            this.aeDialog.aeForm.alteration = 1;
          }
          // true和false
          this.aeDialog.aeForm.available = this.aeDialog.aeForm.available
            ? 1
            : 0;
          this.aeDialog.aeForm.lendingPermission = this.aeDialog.aeForm
            .lendingPermission
            ? 1
            : 0;
          this.aeDialog.aeForm.placeCode = this.aeDialog.libIndex.code;
          let cNbValue = this.aeDialog.cNbSelect.select;
          localStorage.setItem('selectValue', cNbValue);
          this.aeDialog.aeForm.callNumber = this.aeDialog.cNbSelect.input
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
      let arr = [];
      switch (value) {
        case 0:
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
            arr.push(item.code);
          }
          obj.codes = arr;
          obj.state = this.otherDialog.otherInput;
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
      obj.queryIssn = this.aeDialog.aeForm.issn;

      console.log(obj, "传递的数据");
      this._getLocal(obj);
    },
    // 子刊号管理按钮
    sIndexBtn() {
      let obj = {};
      obj.issn = this.aeDialog.aeForm.issn;
      obj.cataPeriodicalId = this.aeDialog.aeForm.fkCataPeriodicalId;
      this.indexNumDlg.tableDataR = [];
      this.indexNumDlg.tableDataR = this.aeDialog.showIndexForm.tableData;
      if (obj.cataPeriodicalId) {
        this.indexNumDlg.searchForm = Object.assign(this.indexNumDlg.searchForm,obj)
        this._getMore(this.indexNumDlg.searchForm);
      } else {
        this.$message.error("请先输入ISSN选取对应期刊后再选取期刊号");
      }
      console.log(obj);
    },
    // 期刊号内部查询
    innerIndexBtn() {},
    /*--- ISSN搜索数据弹框 ---*/
    getLocalBtn(index, row) {
      this.aeDialog.aeForm.fkCataPeriodicalId = row.id;
      this.issnDialog.display = false;
      this.aeDialog.showLocalForm = Object.assign(
        this.aeDialog.showLocalForm,
        row
      );
      // 调用 期刊号接口
      let obj = {};
      obj.issn = this.aeDialog.aeForm.issn;
      obj.cataPeriodicalId = row.id;
      let pbj = {};
      pbj.id = row.id;
      this._getNumber(obj);
      this._getSearchNum(pbj);
      console.log(row, "获取的数据");
    },
    /*------ api ------*/
    _add(obj) {
      let data = obj;
      mergeInt.add(data).then(res => {
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
      mergeInt.remove(data).then(res => {
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
      mergeInt.search(data).then(res => {
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
      mergeInt.revise(data).then(res => {
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
      mergeInt.reject(data).then(res => {
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
      let arr = ["不在架", "在架", "借出", "剔除", "剔除"];

      return arr[num];
    },
    toOtherState(num) {
      let str = "";
      let arr = [
        "无特殊状态",
        "损坏",
        "遗失",
        "调馆",
        "未还",
        "被盗",
        "陈旧",
        "破损",
        "其他"
      ];
      return arr[num];
    },
    /*------ 2019/8/10接盘版 api区 ------*/

    /*------ 额外API ------*/
    // 获取本地期刊数据
    _getLocal(obj) {
      let data = obj;
      mergeInt.getLocal(data).then(res => {
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
    _getMore(obj) {
      let data = obj;
      mergeInt.getMore(data).then(res => {
        if (res.data.state == true) {
          this.indexNumDlg.display = true;
          let supName = res.data.row; // sup 辅助变量
          res.data.row.forEach((item, index) => {
            item.toLendState = this.toLendState(item.lendState);
            item.remarkIndex = index;
          });
          // 过滤元素 对查询的数据进行去重处理
          if (this.indexNumDlg.tableDataR.length) {
            this.clearArr(supName, this.indexNumDlg.tableDataR);
          }
          this.indexNumDlg.pagatiomnObj.alldata = res.data.total;
          this.indexNumDlg.tableDataL = supName;
        } else {
          this.$message.error(res.data.msg);
        }
        console.log("获取子刊号", res);
      });
    },
    // 获取索书号
    _getNumber(obj) {
      let data = obj;
      mergeInt.getNumber(data).then(res => {
        if (res.data.state == true) {
          let dataMe = JSON.parse(res.data.row);
          this.aeDialog.aeForm.code = dataMe;
          
          console.log(dataMe, "索取号", this.aeDialog.aeForm);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 获取馆藏地
    _getCity(obj) {
      let data = obj;
      mergeInt.getCity(data).then(res => {
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

      mergeInt.getFront(data).then(res => {
        if (res.data.state == true) {
          console.log(res, "编辑回显");
          let dataNom = res.data.row;
          this.aeDialog.libIndex = Object.assign(
            this.aeDialog.libIndex,
            dataNom.bookTbLibrary
          );
          this.aeDialog.showLocalForm = Object.assign(
            this.aeDialog.showLocalForm,
            dataNom.cataTbPeriodicalInfo
          );

          this.aeDialog.showIndexForm.tableData = dataNom.periodicalTbCollectionInfos;
          for (let item of dataNom.periodicalTbCollectionInfos) {
            
            item.toLendState = this.toLendState(item.lendState);
            
          }

          this.aeDialog.aeForm.fkCataPeriodicalId = dataNom.fkCataPeriodicalId;
          this.aeDialog.aeForm.hkPrice = dataNom.hkPrice;
          this.aeDialog.aeForm.hkRemark = dataNom.hkRemark
          this.aeDialog.aeForm.code = dataNom.code;
          this.aeDialog.aeForm.callNumber = dataNom.callNumber;
          this.aeDialog.callNumberCopy = dataNom.callNumber;
          this.aeDialog.aeForm.placeCode = dataNom.placeCode;
          this.aeDialog.aeForm.available = dataNom.available ? true : false;
          this.aeDialog.aeForm.lendingPermission = dataNom.lendingPermission
            ? true
            : false;
          
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
      mergeInt.openIndex(data).then(res => {
        if (res.data.state == true) {
          this.$message.success(res.data.msg);
          this._search();
          this.warDialog.display = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    _closeIndex(obj) {
      let data = obj;
      mergeInt.closeIndex(data).then(res => {
        if (res.data.state == true) {
          this.$message.success(res.data.msg);
          this._search();
          this.warDialog.display = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    watchValue(val) {
      //this.aeDialog.libIndex = Object.assign(this.aeDialog.libIndex,val)
      console.log(val, this.aeDialog.libIndex);
    },
    /*------ 期刊一套的增删查改 ------*/
    // 全选按钮
    indexSelect(row) {
      this.indexNumDlg.rowTable = row;
      console.log(row, "选择的数据");
    },
    // 选取按钮
    transformBtn() {
      // 排序 对选择出的函数进行排序处理
      this.indexNumDlg.tableDataR = this.indexNumDlg.tableDataR.concat(
        this.indexNumDlg.rowTable
      );

      this.clearArr(this.indexNumDlg.tableDataL, this.indexNumDlg.rowTable);
      this.$refs.leftTable.clearSelection();
      this.indexNumDlg.rowTable = [];
      console.log("执行了吗");
    },
    // 查询条件
    searchSelect() {
      this.indexNumDlg.searchForm.periodicalNum = this.indexNumDlg.searchInput;
      this._getMore(this.indexNumDlg.searchForm);
      console.log('？？')
    },
    // 单个选取
    singleSelect() {
      
    },
    pageSelect(val){
      console.log(val);
       this.indexNumDlg.searchForm.currentPage = val;
       this._getMore(this.indexNumDlg.searchForm);
    },
    // 单个移除
    singleRemove(index, row) {
      let len = this.indexNumDlg.tableDataL.length;
      let loopArr = this.indexNumDlg.tableDataL;
      let insert = 0;
      console.log(len, loopArr, "为什么没走循环");
      if (len == 10) {
        this.indexNumDlg.tableDataR.splice(index, 1);
      } else {
        for (let j = len - 1; j >= 0; j--) {
          console.log(loopArr[j].remarkIndex, row.remarkIndex);
          if (loopArr[j].remarkIndex < row.remarkIndex) {
            insert = j + 1;
            break;
          }
        }
        console.log("插入的位置", insert);
        loopArr.splice(insert, 0, row);
        this.indexNumDlg.tableDataR.splice(index, 1);
      }
    },
    // 确认选择
    confirmSelect() {
      /* if(this.this.indexNumDlg.tableDataR){

      } */
      this.aeDialog.showIndexForm.tableData = this.indexNumDlg.tableDataR;
      let arr = [];
      for (let item of this.indexNumDlg.tableDataR) {
        arr.push(item.id);
      }
      this.aeDialog.aeForm.ids = arr;
      this.indexNumDlg.display = false;
    },
    // 消除两数组的交集 创建一个新数组然后赋值也可以 直接删除引用也行 消除传入第一个数组
    // 并不完美 这个函数
    clearArr(delArr, testArr) {
      let delLen = delArr.length;
      let testLen = testArr.length;
      let deleteIndex = [];
      // 输出排序原来被对比数组限定了
      for (let i = 0; i < delLen; i++) {
        for (let j = 0; j < testLen; j++) {
          if (delArr[i].id == testArr[j].id) {
            deleteIndex.push(i);
          }
        }
      }
      console.log(deleteIndex, "删除序号");
      // 逆向删除
      let splLen = deleteIndex.length;
      for (let l = splLen - 1; l >= 0; l--) {
        let index = deleteIndex[l];
        delArr.splice(index, 1);
      }
    },
    // 批量删除数组元素
    // 调馆
    _translate(obj) {
      let data = obj;
      mergeInt.translate(data).then(res => {
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
      mergeInt.damage(data).then(res => {
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
      mergeInt.getDamegeOp(data).then(res => {
        console.log();
        if (res.data.state == true) {
          this.damageDialog.damageOptions = res.data.row;
          console.log('报损',res)
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
            if(!this.aeindex){
              let value = parseInt(this.aeDialog.cNbSelect.select);
              this.aeDialog.cNbSelect.input = this.aeDialog.cNbSelect.backSelect[value];
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
    // 索引号下拉
    NumberSelect(){
      if(this.aeDialog.cNbSelect.backSelect.length){
        let value = parseInt(this.aeDialog.cNbSelect.select);
        this.aeDialog.cNbSelect.input = this.aeDialog.cNbSelect.backSelect[value];
        console.log("？？？")
      }
      
    },
  },
  created() {
    this._getCity();
    this._search();
    this._getDamegeOp();
  }
};
</script>

<style lang="scss">
#indexMeger {
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
  #mergeAdd {
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

        .el-form-item {
          margin-bottom: 0px;
        }
        .el-input__inner {
          border: none;
          border-bottom: 1px solid #d3dfe6;
        }
      }
    }
    .sonIndexBox {
      .backout {
        border: 1px solid #dcdcdc;
        border-bottom: none;
        margin: 20px 0;
        .sonIndex {
          font-size: 16px;
          color: #0096ff;
          line-height: 28px;

          text-indent: 12px;
          span {
            cursor: pointer;
          }
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
// 这两个弹框直接脱离标准的文档流 直接插入到body的 所以scss会失效
#indexNumBox {
  .el-dialog {
    width: 56%;
  }
  .content {
    display: flex;
    flex-direction: row;
    .leftBox {
      width: 600px;
      margin-right: 20px;
      .mypagation{
        margin-bottom: 10px;
      }
      .searchIndex {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 15px;
        .getBtn {
          display: inline-block;
          padding: 0 20px;
          color: #fff;
          cursor: pointer;
          height: 36px;
          line-height: 36px;
          text-align: center;
          background-color: #0096ff;
        }
      }
    }
    .rightBox {
      width: 340px;
      height: 480px;
    }
  }
  .el-table__fixed-right-patch {
    background: rgb(0, 150, 255);
  }
}

  #issnTable {
    .issnTableBox {
      margin-bottom: 30px;
      .el-table__fixed-right-patch {
        background: rgb(0, 150, 255);
      }
      .getBtn{
        color: rgb(0, 150, 255);
        cursor: pointer;
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
