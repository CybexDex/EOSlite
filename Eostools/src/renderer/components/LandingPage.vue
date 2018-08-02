<template>
  <div id="wrapper">
    <el-row>
      <el-col :span="6">
        <img style="margin:10px 10px;" id="logo" src="~@/assets/logo.png" alt="electron-vue">
      </el-col>
      <el-col :span="10">
        <p style="margin-top:50px;color:#f56c6c;text-align:center;"><i class="el-icon-warning" style="color:#f56c6c;"></i>&nbsp;&nbsp;{{$t('label.notification')}}</p>
      </el-col>
      <el-col :span="6" :offset="2">
        <div style="margin-top:20px;margin-right:35px;float:right;">
          <span style="margin-right:10px;">Language/语言</span>
          <el-radio-group v-model="currLocale" @change="onChangeLocale">
            <el-radio-button label="en">EN</el-radio-button>
            <el-radio-button label="cn">CN</el-radio-button>
          </el-radio-group>
        </div>
      </el-col>
    </el-row>
    <el-tabs v-model="currMode" style="width:100%;margin-left: 5px;" @tab-click="onModeSelected">
      <el-tab-pane label="" disabled></el-tab-pane>
      <el-tab-pane :label="$t('title.newAccount')" name="newAccount"></el-tab-pane>
      <el-tab-pane :label="$t('title.transfer')" name="transfer"></el-tab-pane>
      <el-tab-pane :label="$t('title.updatePermission')" name="updatePermission"></el-tab-pane>
      <el-tab-pane :label="$t('title.refund')" name="refund"></el-tab-pane>
      <el-tab-pane :label="$t('title.delegate')" name="delegate"></el-tab-pane>
      <el-tab-pane :label="$t('title.vote')" name="vote"></el-tab-pane>
      <el-tab-pane :label="$t('title.transferRam')" name="transferRam"></el-tab-pane>
      <el-tab-pane :label="$t('title.keygen')" name="keygen"></el-tab-pane>
    </el-tabs>
    <el-row v-for="(tmodule, tname, index) in  allModules" :key="index" v-if="currMode === tname">
      <el-col :span="22" :offset="1">
        <div v-if="tmodule.hasTab" style="text-align:center;margin-bottom:20px;">
          <el-radio-group v-model="tmodule.vmodel" @change="onModeSelected">
            <el-radio-button v-for="(submodule, subname, idx) in tmodule.tabs" :key="index + idx" :label="subname">{{$t('title.' + subname)}}</el-radio-button>
          </el-radio-group>
        </div>
        <div v-if="tmodule.hasTab">
          <el-form v-for="(submodule, subname, idx) in tmodule.tabs" v-if="subname === tmodule.vmodel" :key="index + idx" ref="form" :model="dlgData" :rules="dlgRules" :label-width="'150px'" @keyup.native="onEnterClicked">
            <div v-for="(val, attr, idx) in submodule" :key="index+idx">
              <el-form-item v-if="attr === 'producers'" :label="$t('label.vote.producers')" prop="producers">
                <el-row>
                  <el-col :span="14">
                    <el-input v-model="dlgData.producerNames" rows="5" type="textarea" :placeholder="$t('placeholder.vote.producers')" clearable></el-input>
                  </el-col>
                  <el-col :span="9" :offset="1">
                    <el-input style="margin-top:-2px;" v-model="dlgData.singleProducerName" :placeholder="$t('placeholder.vote.producer')" clearable>
                      <el-button @click="onAddProducer" slot="append">{{$t('button.add')}}</el-button>
                    </el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item v-else :label="$t(`label.${subname}.${attr}`)" :prop="attr">
                <el-input v-model="dlgData[attr]" :type="val.isPrivateKey ? keyInputType : ''" :placeholder="$t(`placeholder.${subname}.${attr}`)" clearable>
                  <el-button v-if="val.isPrivateKey" @click="onSwitchKey" slot="append" icon="el-icon-view"></el-button>
                </el-input>
              </el-form-item>
            </div>
            <div style="text-align:center;"><el-button @click="generate">{{$t('label.generate')}}</el-button></div>
          </el-form>
        </div>
        <el-form v-else ref="form" :model="dlgData" :rules="dlgRules" :label-width="'150px'" @keyup.native="onEnterClicked">
          <el-form-item v-for="(val, attr, idx) in tmodule" :key="index+idx" :label="$t(`label.${tname}.${attr}`)" :prop="attr">
            <el-input v-model="dlgData[attr]" :type="val.isPrivateKey ? keyInputType : ''" :placeholder="$t(`placeholder.${tname}.${attr}`)" clearable>
              <el-button v-if="val.isPrivateKey" @click="onSwitchKey" slot="append" icon="el-icon-view"></el-button>
            </el-input>
          </el-form-item>
          <div style="text-align:center;"><el-button @click="generate">{{$t('label.generate')}}</el-button></div>
        </el-form>
      </el-col>
    </el-row>
    <el-row v-if="currMode === 'keygen'">
      <el-col :span="20" :offset="2">
        <el-form ref="form" :model="dlgData" :rules="dlgRules" :label-width="'100px'" @keyup.native="onEnterClicked">
          <el-form-item v-if="dlgData.privateKey && dlgData.privateKey.length > 0" :label="$t('label.keygen.privateKey')">
            <el-input v-model="dlgData.privateKey" :type="keyInputType" clearable>
              <el-button @click="onSwitchKey" slot="append" icon="el-icon-view"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item v-if="dlgData.publicKey && dlgData.publicKey.length > 0" :label="$t('label.keygen.publicKey')">
            <el-input v-model="dlgData.publicKey" clearable>
              <!-- <el-button slot="append" @click="copyKey" icon="el-icon-document"></el-button> -->
            </el-input>
          </el-form-item>
          <div style="text-align:center;margin-top:35px;"><el-button @click="generate">{{$t('label.keygenbtn')}}</el-button></div>
        </el-form>
      </el-col>
    </el-row>
    <el-row v-if="currMode === 'transfer'">
      <el-col :span="22" :offset="1">
        <el-form ref="form" :model="dlgData" :rules="dlgRules" :label-width="'150px'" @keyup.native="onEnterClicked">
          <el-form-item :label="$t('label.transfer.jsonInfo')" prop="jsonInfo">
            <el-input v-model="dlgData.jsonInfo" :placeholder="$t('placeholder.transfer.jsonInfo')" clearable>
              <!-- <el-button slot="append" @click="scanQRCode" icon="el-icon-download"></el-button> -->
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('label.transfer.keyProvider')" prop="keyProvider">
            <el-input v-model="dlgData.keyProvider" :placeholder="$t('placeholder.transfer.keyProvider')" :type="keyInputType" clearable>
              <el-button @click="onSwitchKey" slot="append" icon="el-icon-view"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('label.transfer.fromAccountName')" prop="fromAccountName">
            <el-input v-model="dlgData.fromAccountName" :placeholder="$t('placeholder.transfer.fromAccountName')" clearable></el-input>
          </el-form-item>
          <el-form-item :label="$t('label.transfer.toAccountName')" prop="toAccountName">
            <el-input v-model="dlgData.toAccountName" :placeholder="$t('placeholder.transfer.toAccountName')" clearable></el-input>
          </el-form-item>
          <el-form-item :label="$t('label.transfer.transferQuantity')" prop="transferQuantity">
            <el-input v-model="dlgData.transferQuantity" :placeholder="$t('placeholder.transfer.transferQuantity')" clearable></el-input>
          </el-form-item>
          <el-form-item :label="$t('label.transfer.transferMemo')" prop="transferMemo">
            <el-input v-model="dlgData.transferMemo" :placeholder="$t('placeholder.transfer.transferMemo')" clearable></el-input>
          </el-form-item>
          <div style="text-align:center;"><el-button @click="generate">{{$t('label.generate')}}</el-button></div>
        </el-form>
      </el-col>
    </el-row>
    <el-row v-if="currMode === 'delegate'">
      <el-col :span="22" :offset="1">
        <div style="text-align:center;margin-bottom:20px;">
          <el-radio-group v-model="delegateMode" @change="onModeSelected">
            <el-radio-button label="delegatebw">{{$t('title.delegatebw')}}</el-radio-button>
            <el-radio-button label="unDelegatebw">{{$t('title.unDelegatebw')}}</el-radio-button>
          </el-radio-group>
        </div>
        <el-form v-if="delegateMode === 'delegatebw'" ref="form" :model="dlgData" :rules="dlgRules" :label-width="'150px'" @keyup.native="onEnterClicked">
          <el-form-item :label="$t('label.delegatebw.jsonInfo')" prop="jsonInfo">
            <el-input v-model="dlgData.jsonInfo" :placeholder="$t('placeholder.delegatebw.jsonInfo')" clearable>
              <!-- <el-button slot="append" icon="el-icon-download"></el-button> -->
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('label.transfer.keyProvider')" prop="keyProvider">
            <el-input v-model="dlgData.keyProvider" :placeholder="$t('placeholder.transfer.keyProvider')" :type="keyInputType" clearable>
              <el-button @click="onSwitchKey" slot="append" icon="el-icon-view"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('label.delegatebw.fromAccountName')" prop="fromAccountName">
            <el-input v-model="dlgData.fromAccountName" :placeholder="$t('placeholder.delegatebw.fromAccountName')" clearable></el-input>
          </el-form-item>
          <el-form-item :label="$t('label.delegatebw.receiverAccountName')" prop="receiverAccountName">
            <el-input v-model="dlgData.receiverAccountName" :placeholder="$t('placeholder.delegatebw.receiverAccountName')" clearable></el-input>
          </el-form-item>
          <el-form-item :label="$t('label.delegatebw.netQuantity')" prop="netQuantity">
            <el-input v-model="dlgData.netQuantity" :placeholder="$t('placeholder.delegatebw.netQuantity')" clearable></el-input>
          </el-form-item>
          <el-form-item :label="$t('label.delegatebw.cpuQuantity')" prop="cpuQuantity">
            <el-input v-model="dlgData.cpuQuantity" :placeholder="$t('placeholder.delegatebw.cpuQuantity')" clearable></el-input>
          </el-form-item>
          <div style="text-align:center;"><el-button @click="generate">{{$t('label.generate')}}</el-button></div>
        </el-form>
        <el-form v-if="delegateMode === 'unDelegatebw'" ref="form" :model="dlgData" :rules="dlgRules" :label-width="'150px'" @keyup.native="onEnterClicked">
          <el-form-item :label="$t('label.unDelegatebw.jsonInfo')" prop="jsonInfo">
            <el-input v-model="dlgData.jsonInfo" :placeholder="$t('placeholder.unDelegatebw.jsonInfo')" clearable>
              <!-- <el-button slot="append" icon="el-icon-download"></el-button> -->
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('label.unDelegatebw.keyProvider')" prop="keyProvider">
            <el-input v-model="dlgData.keyProvider" :placeholder="$t('placeholder.unDelegatebw.keyProvider')" :type="keyInputType" clearable>
              <el-button @click="onSwitchKey" slot="append" icon="el-icon-view"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('label.unDelegatebw.fromAccountName')" prop="fromAccountName">
            <el-input v-model="dlgData.fromAccountName" :placeholder="$t('placeholder.unDelegatebw.fromAccountName')" clearable></el-input>
          </el-form-item>
          <el-form-item :label="$t('label.unDelegatebw.receiverAccountName')" prop="receiverAccountName">
            <el-input v-model="dlgData.receiverAccountName" :placeholder="$t('placeholder.unDelegatebw.receiverAccountName')" clearable></el-input>
          </el-form-item>
          <el-form-item :label="$t('label.unDelegatebw.netQuantity')" prop="netQuantity">
            <el-input v-model="dlgData.netQuantity" :placeholder="$t('placeholder.unDelegatebw.netQuantity')" clearable></el-input>
          </el-form-item>
          <el-form-item :label="$t('label.unDelegatebw.cpuQuantity')" prop="cpuQuantity">
            <el-input v-model="dlgData.cpuQuantity" :placeholder="$t('placeholder.unDelegatebw.cpuQuantity')" clearable></el-input>
          </el-form-item>
          <div style="text-align:center;"><el-button @click="generate">{{$t('label.generate')}}</el-button></div>
        </el-form>
      </el-col>
    </el-row>
    <!-- <el-row v-if="currMode === 'vote'">
      <el-col :span="22" :offset="1">
        <el-form ref="form" :model="dlgData" :rules="dlgRules" :label-width="'150px'" @keyup.native="onEnterClicked">
          <el-form-item :label="$t('label.vote.jsonInfo')" prop="jsonInfo">
            <el-input v-model="dlgData.jsonInfo" :placeholder="$t('placeholder.vote.jsonInfo')" clearable>
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('label.transfer.keyProvider')" prop="keyProvider">
            <el-input v-model="dlgData.keyProvider" :placeholder="$t('placeholder.transfer.keyProvider')" :type="keyInputType" clearable>
              <el-button @click="onSwitchKey" slot="append" icon="el-icon-view"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('label.vote.voterAccountName')" prop="voterAccountName">
            <el-input v-model="dlgData.voterAccountName" :placeholder="$t('placeholder.vote.voterAccountName')" clearable></el-input>
          </el-form-item>
          <el-form-item :label="$t('label.vote.producers')" prop="producers">
            <el-row>
              <el-col :span="14">
                <el-input v-model="dlgData.producerNames" rows="5" type="textarea" :placeholder="$t('placeholder.vote.producers')" clearable></el-input>
              </el-col>
              <el-col :span="9" :offset="1">
                <el-input style="margin-top:-2px;" v-model="dlgData.singleProducerName" :placeholder="$t('placeholder.vote.producer')" clearable>
                  <el-button @click="onAddProducer" slot="append">{{$t('button.add')}}</el-button>
                </el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <div style="text-align:center;"><el-button @click="generate">{{$t('label.generate')}}</el-button></div>
        </el-form>
      </el-col>
    </el-row> -->
    <el-row v-if="currMode === 'transferRam'">
      <el-col :span="22" :offset="1">
        <el-row style="font-size:12px;">
          <el-col :span="2"><p style="float:right;line-height:32px;">换算：</p></el-col>
          <el-col :span="7">
            <el-row>
              <el-col :span="18">
                <el-input v-model="byteCalculate.byte" clearable @change="onCalChanged('byte')"></el-input>
              </el-col>
              <el-col :span="6">
                <p style="margin-left:5px;line-height:32px;">{{$t('label.byteCalculate.byte')}}&nbsp;=</p>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="7">
            <el-row>
              <el-col :span="18">
                <el-input v-model="byteCalculate.kb" clearable @change="onCalChanged('kb')"></el-input>
              </el-col>
              <el-col :span="6">
                <p style="margin-left:5px;line-height:32px;">{{$t('label.byteCalculate.kb')}}&nbsp;=</p>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="7">
            <el-row>
              <el-col :span="18">
                <el-input v-model="byteCalculate.mb" clearable @change="onCalChanged('mb')"></el-input>
              </el-col>
              <el-col :span="6">
                <p style="margin-left:5px;line-height:32px;">{{$t('label.byteCalculate.mb')}}</p>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <div style="text-align:center;margin-bottom:20px;margin-top:7px;">
          <el-radio-group v-model="ramMode" @change="onModeSelected">
            <el-radio-button label="buyRam">{{$t('title.buyRam')}}</el-radio-button>
            <el-radio-button label="buyRamBytes">{{$t('title.buyRamBytes')}}</el-radio-button>
            <el-radio-button label="sellRam">{{$t('title.sellRam')}}</el-radio-button>
          </el-radio-group>
        </div>
        <el-form v-if="ramMode === 'sellRam'" ref="form" :model="dlgData" :rules="dlgRules" :label-width="'150px'" @keyup.native="onEnterClicked">
          <el-form-item :label="$t('label.sellRam.jsonInfo')" prop="jsonInfo">
            <el-input v-model="dlgData.jsonInfo" :placeholder="$t('placeholder.sellRam.jsonInfo')" clearable>
              <!-- <el-button slot="append" icon="el-icon-download"></el-button> -->
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('label.transfer.keyProvider')" prop="keyProvider">
            <el-input v-model="dlgData.keyProvider" :placeholder="$t('placeholder.transfer.keyProvider')" :type="keyInputType" clearable>
              <el-button @click="onSwitchKey" slot="append" icon="el-icon-view"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('label.sellRam.accountName')" prop="accountName">
            <el-input v-model="dlgData.accountName" :placeholder="$t('placeholder.sellRam.accountName')" clearable></el-input>
          </el-form-item>
          <el-form-item :label="$t('label.sellRam.bytes')" prop="bytes">
            <el-input v-model="dlgData.bytes" :placeholder="$t('placeholder.sellRam.bytes')" clearable></el-input>
          </el-form-item>
          <div style="text-align:center;"><el-button @click="generate">{{$t('label.generate')}}</el-button></div>
        </el-form>
        <el-form v-if="ramMode === 'buyRam'" ref="form" :model="dlgData" :rules="dlgRules" :label-width="'150px'" @keyup.native="onEnterClicked">
          <el-form-item :label="$t('label.buyRam.jsonInfo')" prop="jsonInfo">
            <el-input v-model="dlgData.jsonInfo" :placeholder="$t('placeholder.buyRam.jsonInfo')" clearable>
              <!-- <el-button slot="append" icon="el-icon-download"></el-button> -->
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('label.buyRam.keyProvider')" prop="keyProvider">
            <el-input v-model="dlgData.keyProvider" :placeholder="$t('placeholder.buyRam.keyProvider')" :type="keyInputType" clearable>
              <el-button @click="onSwitchKey" slot="append" icon="el-icon-view"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('label.buyRam.payerAccountName')" prop="payerAccountName">
            <el-input v-model="dlgData.payerAccountName" :placeholder="$t('placeholder.buyRam.payerAccountName')" clearable></el-input>
          </el-form-item>
          <el-form-item :label="$t('label.buyRam.receiverAccountName')" prop="receiverAccountName">
            <el-input v-model="dlgData.receiverAccountName" :placeholder="$t('placeholder.buyRam.receiverAccountName')" clearable></el-input>
          </el-form-item>
          <el-form-item :label="$t('label.buyRam.quantity')" prop="quantity">
            <el-input v-model="dlgData.quantity" :placeholder="$t('placeholder.buyRam.quantity')" clearable></el-input>
          </el-form-item>
          <div style="text-align:center;"><el-button @click="generate">{{$t('label.generate')}}</el-button></div>
        </el-form>
        <el-form v-if="ramMode === 'buyRamBytes'" ref="form" :model="dlgData" :rules="dlgRules" :label-width="'150px'" @keyup.native="onEnterClicked">
          <el-form-item :label="$t('label.buyRamBytes.jsonInfo')" prop="jsonInfo">
            <el-input v-model="dlgData.jsonInfo" :placeholder="$t('placeholder.buyRamBytes.jsonInfo')" clearable>
              <!-- <el-button slot="append" icon="el-icon-download"></el-button> -->
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('label.transfer.keyProvider')" prop="keyProvider">
            <el-input v-model="dlgData.keyProvider" :placeholder="$t('placeholder.transfer.keyProvider')" :type="keyInputType" clearable>
              <el-button @click="onSwitchKey" slot="append" icon="el-icon-view"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('label.buyRamBytes.payerAccountName')" prop="payerAccountName">
            <el-input v-model="dlgData.payerAccountName" :placeholder="$t('placeholder.buyRamBytes.payerAccountName')" clearable></el-input>
          </el-form-item>
          <el-form-item :label="$t('label.buyRamBytes.receiverAccountName')" prop="receiverAccountName">
            <el-input v-model="dlgData.receiverAccountName" :placeholder="$t('placeholder.buyRamBytes.receiverAccountName')" clearable></el-input>
          </el-form-item>
          <el-form-item :label="$t('label.buyRamBytes.bytes')" prop="bytes">
            <el-input v-model="dlgData.bytes" :placeholder="$t('placeholder.buyRamBytes.bytes')" clearable></el-input>
          </el-form-item>
          <div style="text-align:center;"><el-button @click="generate">{{$t('label.generate')}}</el-button></div>
        </el-form>
      </el-col>
    </el-row>
    <div style="margin-top:10px;"></div>
    <el-row>
      <el-col v-if="signedMsg" :span="8" :offset="8">
        <el-input v-model="signedMsg" type="textarea" rows="5"></el-input>
      </el-col>
      <el-col v-show="signedMsg" :span="8">
        <canvas id="qrcode" style="margin-top:-55px;width:188px;height:188px;"></canvas>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'
  import QRCode from 'qrcode'
  import clipboard from 'clipboard-polyfill'
  // import WebCamera from 'webcamjs'
  import {transfer, voteProducer, sellRam, buyRam, buyRamBytes, delegatebw, unDelegatebw, isKeyValid, newAccount, updateActiveKey, updateOwnerKey, proxy, refund, createKey} from '../../utils/offline'

  export default {
    name: 'landing-page',
    components: { SystemInformation },
    data () {
      const obj = this
      const numberValidator = function (rule, value, callback) {
        console.log('validator: ', rule)
        let param = 'transferQuantity'
        if (obj.currMode === 'delegate') {
          param = 'delegateQuantity'
        } else if (obj.currMode === 'transferRam') {
          if (obj.ramMode === 'buyRam') {
            param = 'quantity'
          } else {
            param = 'bytes'
          }
        } else {
          param = rule.field
        }

        if (!value || value.length === 0) {
          callback(new Error(obj.$t(`error.${param}Required`)))
        } else if (isNaN(value)) {
          callback(new Error(obj.$t(`error.${param}MustBeNumber`)))
        } else {
          const afterPoint = value.split('.')[1]
          if ((param === 'transferQuantity' || param === 'quantity' || param === 'delegateQuantity') && (afterPoint && afterPoint.length > 4)) {
            callback(new Error(obj.$t('error.precisionTooSmall')))
          } else {
            callback()
          }
        }
      }

      return {
        byteCalculate: {
          byte: 0,
          mb: 0,
          kb: 0
        },
        allModules: {
          // vote: {
          //   hasTab: true,
          //   vmodel: this.voteMode,
          // },
          newAccount: {
            jsonInfo: {},
            keyProvider: {
              isPrivateKey: true
            },
            creatorName: {},
            newAccountName: {},
            newOwnerKey: {},
            newActiveKey: {},
            netQuantity: {},
            cpuQuantity: {},
            bytes: {}
          },
          updatePermission: {
            hasTab: true,
            vmodel: 'updateActiveKey',
            tabs: {
              updateActiveKey: {
                jsonInfo: {},
                keyProvider: {
                  isPrivateKey: true
                },
                accountName: {},
                newPublicKey: {}
              },
              updateOwnerKey: {
                jsonInfo: {},
                keyProvider: {
                  isPrivateKey: true
                },
                accountName: {},
                newPublicKey: {}
              }
            }
          },
          vote: {
            hasTab: true,
            vmodel: 'vote',
            tabs: {
              vote: {
                jsonInfo: {},
                keyProvider: {
                  isPrivateKey: true
                },
                voterAccountName: {},
                producers: {}
              },
              proxy: {
                jsonInfo: {},
                keyProvider: {
                  isPrivateKey: true
                },
                voterAccountName: {},
                proxyAccountName: {}
              }
            }
          },
          refund: {
            jsonInfo: {},
            keyProvider: {
              isPrivateKey: true
            },
            accountName: {}
          }
        },
        currLocale: null,
        currMode: 'transfer',
        ramMode: 'buyRam',
        delegateMode: 'delegatebw',
        keyInputType: 'password',
        dlgData: {
          jsonInfo: '',
          keyProvider: '',
          fromAccountName: '',
          toAccountName: '',
          transferQuantity: '',
          voterAccountName: '',
          singleProducerName: '',
          producerNames: 'eoscybexiobp',
          // Array
          producers: ['eoscybexiobp'],
          accountName: '',
          // number
          bytes: null,
          payerAccountName: '',
          receiverAccountName: '',
          transferMemo: '',
          // number
          quantity: null,
          netQuantity: null,
          cpuQuantity: null,
          creatorName: '',
          newAccountName: '',
          newOwnerKey: '',
          newActiveKey: '',
          privateKey: '',
          publicKey: ''
        },
        dlgRules: {
          jsonInfo: [{
            trigger: 'blur',
            required: true,
            validator: function (rule, value, callback) {
              try {
                if (!value || value.length === 0) {
                  callback(new Error(obj.$t('error.jsonInfoRequired')))
                }
                const parsed = JSON.parse(value)
                if (typeof parsed === 'object' &&
                    parsed.expiration && typeof parsed.expiration === 'string' &&
                    parsed.ref_block_num && typeof parsed.ref_block_num === 'number' &&
                    parsed.ref_block_prefix && typeof parsed.ref_block_prefix === 'number') {
                  callback()
                } else {
                  callback(new Error(obj.$t('error.wrongFormat')))
                }
              } catch (e) {
                callback(new Error(obj.$t('error.wrongFormat')))
              }
            }
          }],
          keyProvider: [{
            trigger: 'blur',
            required: true,
            validator: async function (rule, value, callback) {
              const isValid = await isKeyValid(value)
              if (!value || value.length === 0) {
                callback(new Error(obj.$t('error.keyProviderRequired')))
              } else if (!isValid) {
                callback(new Error(obj.$t('error.keyProviderInvalid')))
              } else {
                callback()
              }
            }
          }],
          fromAccountName: [{
            trigger: 'blur',
            required: true,
            validator: function (rule, value, callback) {
              if (!value || value.length === 0) {
                let msg = obj.$t('error.fromAccountNameRequired')
                if (obj.currMode === 'delegate') {
                  if (obj.delegateMode === 'delegatebw') {
                    msg = obj.$t('error.payAccountNameRequired')
                  } else {
                    msg = obj.$t('error.paidAccountNameRequired')
                  }
                }
                callback(new Error(msg))
              } else {
                callback()
              }
            }
          }],
          toAccountName: [{
            trigger: 'blur',
            required: true,
            validator: function (rule, value, callback) {
              if (!value || value.length === 0) {
                callback(new Error(obj.$t('error.toAccountNameRequired')))
              } else {
                callback()
              }
            }
          }],
          payerAccountName: [{
            trigger: 'blur',
            required: true,
            validator: function (rule, value, callback) {
              if (!value || value.length === 0) {
                callback(new Error(obj.$t('error.payerAccountNameRequired')))
              } else {
                callback()
              }
            }
          }],
          receiverAccountName: [{
            trigger: 'blur',
            required: true,
            validator: function (rule, value, callback) {
              if (!value || value.length === 0) {
                if (obj.currMode === 'transferRam') {
                  callback(new Error(obj.$t('error.receiverAccountNameRequired')))
                } else if (obj.currMode === 'delegate') {
                  if (obj.delegateMode === 'delegatebw') {
                    callback(new Error(obj.$t('error.receiverAccountNameRequired')))
                  } else {
                    callback(new Error(obj.$t('error.undelegatedFromRequired')))
                  }
                }
              } else {
                callback()
              }
            }
          }],
          transferQuantity: [{
            trigger: 'blur',
            required: true,
            validator: numberValidator
          }],
          voterAccountName: [{
            trigger: 'blur',
            required: true,
            validator: function (rule, value, callback) {
              if (!value || value.length === 0) {
                callback(new Error(obj.$t('error.voterAccountNameRequired')))
              } else {
                callback()
              }
            }
          }],
          bytes: [{
            trigger: 'blur',
            required: true,
            validator: numberValidator
          }],
          accountName: [{
            trigger: 'blur',
            required: true,
            validator: function (rule, value, callback) {
              if (!value || value.length === 0) {
                callback(new Error(obj.$t('error.accountNameRequired')))
              } else {
                callback()
              }
            }
          }],
          quantity: [{
            trigger: 'blur',
            required: true,
            validator: numberValidator
          }],
          producers: [{
            trigger: 'blur',
            required: true,
            validator: function (rule, value, callback) {
              if (typeof value !== 'object') {
                callback(new Error(obj.$t('error.splitBySpace')))
              } else if (value.length === 0) {
                callback(new Error(obj.$t('error.producersRequired')))
              } else {
                callback()
              }
            }
          }],
          netQuantity: [{
            trigger: 'blur',
            required: true,
            validator: numberValidator
          }],
          cpuQuantity: [{
            trigger: 'blur',
            required: true,
            validator: numberValidator
          }],
          creatorName: [{
            trigger: 'blur',
            required: true,
            validator: function (rule, value, callback) {
              if (!value || value.length === 0) {
                callback(new Error(obj.$t('error.creatorName')))
              } else {
                callback()
              }
            }
          }],
          newAccountName: [{
            trigger: 'blur',
            required: true,
            validator: function (rule, value, callback) {
              if (!value || value.length === 0) {
                callback(new Error(obj.$t('error.newAccountName')))
              } else {
                callback()
              }
            }
          }],
          newOwnerKey: [{
            trigger: 'blur',
            required: true,
            validator: function (rule, value, callback) {
              if (!value || value.length === 0) {
                callback(new Error(obj.$t('error.newOwnerKey')))
              } else {
                callback()
              }
            }
          }],
          newActiveKey: [{
            trigger: 'blur',
            required: true,
            validator: function (rule, value, callback) {
              if (!value || value.length === 0) {
                callback(new Error(obj.$t('error.newActiveKey')))
              } else {
                callback()
              }
            }
          }],
          proxyAccountName: [{
            trigger: 'blur',
            required: true,
            validator: function (rule, value, callback) {
              if (!value || value.length === 0) {
                callback(new Error(obj.$t('error.proxyAccountName')))
              } else {
                callback()
              }
            }
          }],
          newPublicKey: [{
            trigger: 'blur',
            required: true,
            validator: function (rule, value, callback) {
              if (!value || value.length === 0) {
                callback(new Error(obj.$t('error.newPublicKey')))
              } else {
                callback()
              }
            }
          }]
        },
        signedMsg: null
      }
    },
    watch: {
      'dlgData.producerNames': function (newVal, oldVal) {
        if (newVal === null) return
        this.dlgData.producers = newVal.trim().split(' ')
        const noEmpty = []
        this.dlgData.producers.forEach(function (producer) {
          if (producer !== '') {
            noEmpty.push(producer)
          }
        })
        this.dlgData.producers = noEmpty
      }
    },
    methods: {
      onCalChanged (keyName) {
        if (keyName === 'byte') {
          this.byteCalculate.kb = this.byteCalculate.byte / 1024
          this.byteCalculate.mb = this.byteCalculate.byte / 1024 / 1024
        } else if (keyName === 'kb') {
          this.byteCalculate.byte = this.byteCalculate.kb * 1024
          this.byteCalculate.mb = this.byteCalculate.kb / 1024
        } else if (keyName === 'mb') {
          this.byteCalculate.byte = this.byteCalculate.mb * 1024 * 1024
          this.byteCalculate.kb = this.byteCalculate.mb * 1024
        }
      },
      scanQRCode () {

      },
      onEnterClicked (event) {
        if (event.code === 'Enter') {
          this.generate()
        }
      },
      onSwitchKey () {
        this.keyInputType = this.keyInputType === 'password' ? 'text' : 'password'
      },
      onChangeLocale () {
        this.$i18n.locale = this.currLocale
        this.keyInputType = 'password'
        let form = this.$refs['form']
        if (!form.validate) form = form[0]
        form.clearValidate()
      },
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      importJson () {
        // this.dlgData.jsonInfo = clipboard.readText()
      },
      onAddProducer () {
        this.dlgData.producers.push(this.dlgData.singleProducerName)
        this.dlgData.singleProducerName = ''
        this.dlgData.producerNames = this.dlgData.producers.join(' ')
      },
      async generate () {
        if (this.currMode === 'keygen') {
          const keypair = await createKey()
          this.dlgData.privateKey = keypair.privateKey
          this.dlgData.publicKey = keypair.publicKey
          clipboard.writeText(JSON.stringify(keypair).replace('","', '\n').replace('{"', '').replace('"}', '').replace('":"', ':\n').replace('":"', ':\n'))
          this.$message({
            type: 'success',
            message: this.$t('message.copied')
          })
        } else {
          let form = this.$refs['form']
          if (!form.validate) form = form[0]
          form.validate(async (valid) => {
            if (valid) {
              form.clearValidate()
              const actions = {
                'newAccount': newAccount,
                'refund': refund,
                'updatePermission': {
                  'updateActiveKey': updateActiveKey,
                  'updateOwnerKey': updateOwnerKey
                }[this.allModules.updatePermission.vmodel],
                'vote': {
                  'proxy': proxy,
                  'vote': voteProducer
                }[this.allModules.vote.vmodel],
                'transfer': transfer,
                'transferRam': {
                  'buyRam': buyRam,
                  'buyRamBytes': buyRamBytes,
                  'sellRam': sellRam
                }[this.ramMode],
                'delegate': {
                  'delegatebw': delegatebw,
                  'unDelegatebw': unDelegatebw
                }[this.delegateMode]
              }
              this.signedMsg = null
              this.signedMsg = await actions[this.currMode](this.dlgData)
              console.log('++++ generate: ', actions[this.currMode], this.signedMsg)
              this.$message({
                type: 'success',
                message: this.$t('message.copied')
              })
              clipboard.writeText(this.signedMsg)
              QRCode.toCanvas(document.getElementById('qrcode'), this.signedMsg, { width: '188' }, function (error) {
                if (error) console.error(error)
              })
            } else {
              return false
            }
          })
        }
      },
      onModeSelected () {
        this.signedMsg = null
        this.keyInputType = 'password'
        let form = this.$refs['form']
        if (!form.validate) form = form[0]
        form.clearValidate()
        if (this.currMode === 'newAccount') {
          this.dlgData.bytes = '3500'
          this.dlgData.netQuantity = '0.01'
          this.dlgData.cpuQuantity = '0.01'
        } else {
          this.dlgData.bytes = null
          this.dlgData.netQuantity = null
          this.dlgData.cpuQuantity = null
        }
      }
    },
    mounted () {
      this.currLocale = localStorage.getItem('global-locale')
      if (!this.currLocale || this.currLocale === 'null') {
        this.currLocale = 'cn'
      }
      this.$i18n.locale = this.currLocale
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { 
    font-family: 'Source Sans Pro', sans-serif;
    overflow: hidden;
    height: 768px;
    width: 1024px;
  }
</style>
