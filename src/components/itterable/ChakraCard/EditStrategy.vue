<template>
  <div>
    <!-- modal popups -->
    <!-- showProfitInModal -->
    <md-dialog
      class="text-center roundedDialog"
      :md-active.sync="showProfitInModal"
    >
      <md-dialog-title class="selectAssets" style="text-align: left"
        >Select Asset</md-dialog-title
      >

      <md-dialog-content
        style="padding-top: 15px; padding-left: 0px; padding-right: 0px"
      >
        <Add-Coin-Modal @rowItemClicked="handleProfitInCoinChosen" />
      </md-dialog-content>
    </md-dialog>
    <!-- showDCAInModal -->
    <md-dialog
      class="text-center roundedDialog"
      :md-active.sync="showDCAInModal"
    >
      <md-dialog-title class="selectAssets" style="text-align: left"
        >Select Asset</md-dialog-title
      >

      <md-dialog-content
        style="padding-top: 15px; padding-left: 0px; padding-right: 0px"
      >
        <Add-Coin-Modal @rowItemClicked="handleDCAInCoinChosen" />
      </md-dialog-content>
    </md-dialog>

    <!-- edit modal -->
    <div class="edit-modal" style="text-align: left" v-if="!showProfitInModal">
      <h1 class="edit-strategy-text">Edit Strategy</h1>
      <hr />
      <div class="md-layout">
        <div
          class="md-layout-item"
          style="padding-left:30px;padding-right:30px;padding-top:10px;padding-bottom:20px"
        >
          <span class="modal-text-small">
            Edit or disable your DCA strategy. Are you sure you’re in a mindful
            mood?</span
          >
          <Segment
            style="width:600; margin-top:20px"
            :titles="['DCA Strategy', 'Profit Strategy']"
            v-on:update-selected="currentTab = $event"
          />

          <!-- DCA strategy -->
          <div v-if="currentTab == 'DCA Strategy'">
            <div
              class="secondary-heading md-layout md-gutter md-alignment-center-left"
            >
              <div class="md-layout-item">
                <span>DCA Contribution</span>
              </div>
              <div
                class="md-layout-item"
                style="display: flex; justify-content: flex-end;"
              >
                <md-switch class="" v-model="dcaToggle" value="1" />
              </div>
            </div>
            <span class="modal-text-small">
              Choose an asset, amount and frequency to DCA (dollar cost average)
              into your Chakra.
            </span>
            <!-- DCA Dropdown -->
            <Dropdown
              class="my-dropdown-toggle"
              :options="dcaTimeframes"
              :selected="dcaTimeframes[dcaTimeframes.length - 1]"
              v-on:updateOption="handleFrequencySelect"
            />
            <!-- Asset Input -->
            <div class="md-layout" style="padding-top: 20px">
              <div class="md-layout-item md-size-30">
                <AssetDropdown
                  :asset="dcaInCoin"
                  v-on:show-modal="showDCAInModal = true"
                />
              </div>
              <div class="md-layout-item md-size-40">
                <TokenInput
                  :state="tokenAllowanceState"
                  v-model="tokenAllowance"
                />
                <!-- v-on:approve-token="handleTokenAllowance($event)" -->
              </div>

              <div class="md-layout-item md-size-30">
                <TokenInfo
                  :price="dcaInCoin.price | 0"
                  :balance="dcaInCoin.amountRounded | 0"
                />
              </div>
            </div>
          </div>

          <!-- Profit strategy -->
          <div v-if="currentTab == 'Profit Strategy'">
            <div
              class="secondary-heading md-layout md-gutter md-alignment-center-left"
            >
              <div class="md-layout-item">
                <span>Profit Strategy</span>
              </div>
              <div
                class="md-layout-item"
                style="display: flex; justify-content: flex-end;"
              >
                <md-switch class="" v-model="profitToggle" value="1" />
              </div>
            </div>

            <div class="md-layout md-alignment-center-left">
              <div class="md-layout-item md-size-30">
                <p>Take profit as:</p>
              </div>
              <div class="md-layout-item md-size-70">
                <Segment
                  :titles="['% of Chakra', '% of Profit']"
                  v-on:update-selected="profitCurrentTab = $event"
                />
              </div>
            </div>
            <div
              class="md-layout md-alignment-center-left"
              style="padding-top: 20px"
            >
              <div class="md-layout-item md-size-30">
                <p>Take profit after:</p>
              </div>
              <div class="md-layout-item md-size-35">
                <div class="percentage">
                  <span>%</span>
                  <input
                    placeholder="0"
                    type="number"
                    v-model="profitAfter"
                    style="width: 100%"
                  />
                </div>
              </div>
              <div class="md-layout-item md-size-35">
                <p style="margin-left:1rem">increase in Chakra value.</p>
              </div>
            </div>
            <div
              class="md-layout md-alignment-center-left"
              style="padding-top: 20px"
            >
              <div class="md-layout-item md-size-30">
                <p>Profit to take:</p>
              </div>
              <div class="md-layout-item md-size-35">
                <div class="percentage">
                  <span>%</span>
                  <input
                    placeholder="0"
                    type="number"
                    v-model="profitAmount"
                    style="width: 100%"
                  />
                </div>
              </div>
              <div class="md-layout-item md-size-35">
                <p style="margin-left:1rem">of total Chakra value.</p>
              </div>
            </div>
            <div
              class="md-layout md-alignment-center-left"
              style="padding-top: 20px"
            >
              <div class="md-layout-item md-size-30">
                <p>Take profit in:</p>
              </div>
              <div class="md-layout-item md-size-45">
                <AssetDropdown
                  :asset="profitInCoin"
                  v-on:show-modal="showProfitInModal = true"
                />
              </div>
              <div class="md-layout-item md-size-25">
                <TokenInfo
                  :price="profitInCoin.price | 0"
                  :balance="profitInCoin.amountRounded | 0"
                />
              </div>
            </div>
            <div class="md-layout" style="padding-top: 20px">
              <div class="md-layout-item md-size-100">
                <p>
                  When Chakra value increases by
                  <b>{{ profitAfter || "–" }}%</b>, take
                  <b>{{ profitAmount || "–" }}%</b> of
                  <b>the total {{ profitSelection }} value</b> as profit in
                  <b>{{ profitInCoin.symbol }}</b
                  >.
                </p>
              </div>
            </div>
          </div>

          <div class="md-layout fees" style="padding-top: 20px">
            <div class="md-layout-item">
              <p style="text-align: right"><b>Fees:</b> Gas + 0.3% of DCA</p>
            </div>
          </div>

          <div class="md-layout" style="padding-top: 20px">
            <div class="md-layout-item md-size-100">
              <hr style="margin:0" />
              <div class="md-layout">
                <div class="md-layout-item md-size-100 stepper-nav">
                  <md-button class="cancel-button">Cancel</md-button>
                  <md-button class="md-raised md-primary next-button"
                    >No Changes</md-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from "vue-dropdowns";
import Segment from "@/components/elements/Segment";
import AssetDropdown from "@/components/elements/AssetDropdown";
import TokenInput from "@/components/elements/TokenInput";
import TokenInfo from "@/components/elements/TokenInfo";
import AddCoinModal from "@/components/AddCoinModal";

export default {
  name: "EditChakra",
  components: {
    Segment,
    Dropdown,
    AssetDropdown,
    TokenInput,
    TokenInfo,
    AddCoinModal,
  },
  props: {
    chakraInfo: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDataString(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    handleFrequencySelect({ name: frequency }) {
      this.dcaBreakdownStats = { ...this.dcaBreakdownStats, frequency };
    },
    handleProfitInCoinChosen(coin) {
      this.profitInCoin = coin;
      this.showProfitInModal = false;
    },
    handleDCAInCoinChosen(coin) {
      this.dcaInCoin = coin;
      this.showDCAInModal = false;
    },
  },
  computed: {},
  data: () => ({
    currentTab: "DCA Strategy",
    tokenAllowance: 0,
    tokenAllowanceState: "default",
    // Modals
    showProfitInModal: false,
    showDCAInModal: false,
    // DCA Strategy
    dcaToggle: true,
    dcaTimeframes: [
      { name: "Daily" },
      { name: "Weekly" },
      { name: "Fortnightly" },
      { name: "Monthly" },
    ],
    dcaInCoin: { symbol: "SELECT", logoURI: null },
    // Profit Strategy
    profitCurrentTab: "Profit Strategy",
    profitInCoin: { symbol: "SELECT", logoURI: null },
    profitAmount: null,
    profitOn: true,
    profitSelection: null,
    profitAfter: null,
    profitAmount: null,
    profitToggle: true,
  }),
  computed: {},
};
</script>

<style lang="scss" scoped>
@import "../../../styles/variables.scss";

.edit-modal {
  width: 640px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
}
.edit-strategy-text {
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  align-items: center;
  color: #292929;
  padding-left: 30px;
  padding-top: 10px;
  padding-bottom: 5px;
}
.modal-text-small {
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: #292929;
  padding-top: 10px;
  display: flex;
}

.secondary-heading {
  font-family: Helvetica Neue;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  display: flex;
  align-items: center;
  color: #292929;
  padding-top: 30px;
}

.percentage {
  position: relative;

  span {
    position: absolute;
    top: 25%;
    right: 0.75rem;
    vertical-align: middle;
    color: #aaa;
  }
}

.roundedDialog {
  background: rgb(255, 255, 255) !important;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px !important;
}
</style>
