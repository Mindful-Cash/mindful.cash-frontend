<template>
  <div class="wrapper">
    <h1 class="title">New Chakra</h1>
    <md-steppers ref="stepper" :md-active-step.sync="currentStep" md-linear>
      <md-step id="first" md-label="Setup">
        <div class="md-layout gutter" style="width:100%">
          <div class="md-layout-item md-size-55">
            <h2 class="title">Chakra Name</h2>
            <p>Choose a name for your Chakra. This will be viewable by other users.</p>
            <input placeholder="Enter Name" style="color:black" v-model="chakraName" />
            <Separator />
            <h2 class="title">Select Distribution</h2>
            <p>Select the tokens you want to add to your Chakra, and choose your distribution ratios.</p>

            <div v-for="(coin, index) in selectedCoins" :key="index" style="padding-top: 20px; padding-bottom: 20px">
              <div class="md-layout">
                <div class="md-layout-item md-size-20 md-layout" style="text-align: left">
                  <div class="md-layout-item" style="text-align: left">
                    <img :width="30" :height="30" :src="coin.logoURI" style="margin-left: 10px" />
                  </div>
                  <div class="md-layout-item" style="padding-top: 5px">
                    <span class="secondaryText"> {{ coin.symbol }}</span>
                  </div>
                </div>
                <div class="md-layout-item" style="padding-top: 5px">
                  <vue-slider
                    v-model="coin.ratio"
                    v-bind="selectorOptions"
                    :dotOptions="{ max: coin.ratio + unselectedPercent }"
                    :max="100"
                    :tooltip="'always'"
                    :process-style="{ backgroundColor: colors[index] }"
                    :tooltip-style="{ backgroundColor: colors[index], borderColor: colors[index] }"
                  ></vue-slider>
                </div>
                <div class="md-layout-item md-size-10">
                  <md-button class="md-icon-button md-raised md-dense" @click="removeCoinFromSelected(index)">
                    <md-icon>remove</md-icon>
                  </md-button>
                </div>
              </div>
            </div>

            <button class="add-asset-btn" @click="showCoinDialog = true"><span>+ Add Asset</span></button>
            <Separator />
            <h2 class="title">Initial Contribution</h2>

            <Segment :titles="['Any Asset', 'Exact Assets']" v-on:update-selected="contributionMode = $event" />

            <p>
              Deposit any asset to fund your Chakra. The assets you deposit will be used to buy the assets in your
              Chakra in accordance with your specified distribution.
            </p>
            <p><b>Slippage may occur during this process.</b></p>
            <p><b>An extra 5% ETH is sent with the TX to avoid unexpected errors - unused ETH will be returned.</b></p>

            <div class="md-layout">
              <div class="md-layout-item md-size-25" style="margin-right: 10px">
                <AssetDropdown
                  :asset="initialContributionCoin"
                  v-on:show-modal="showSelectInitialContributionDialog = true"
                />
              </div>
              <div class="md-layout-item md-size-35">
                <TokenInput
                  :state="initialContributionState"
                  v-model="initialContribution"
                  v-on:approve-token="handleInitialContribution($event)"
                />
              </div>
              <div class="md-layout-item md-size-35">
                <TokenInfo :price="initialContributionCoin.price" :balance="initialContributionCoin.amountRounded" />
              </div>
            </div>

            <div
              class="md-layout md-alignment-center-right"
              style="padding-top: 20px; margin-bottom: 30px; text-align: right"
            >
              <div class="md-layout-item">
                <span class="totalContributionText">Total Contribution:</span
                ><span class="totalContributionNumber"
                  >${{
                    initialContributionCoin.price && initialContribution
                      ? (Number(initialContribution) * initialContributionCoin.price).toFixed(2)
                      : 0
                  }}</span
                >
              </div>
            </div>
          </div>
          <div class="md-layout-item md-size-5" />
          <div class="md-layout-item md-size-40" style="padding-top: 20px">
            <div class="md-layout-item">
              <apexchart
                type="donut"
                width="420"
                :options="pieValues.options"
                :series="pieValues.values"
                class="center"
              />
            </div>
            <div class="md-layout-item" style="text-align: center" v-if="selectedCoins.length > 0">
              <span class="assetBreakdownText">Asset Breakdown</span>
              <md-table class="md-caption" style="padding-top: 25px">
                <md-table-row>
                  <md-table-head>Key</md-table-head>
                  <md-table-head>Symbol</md-table-head>
                  <md-table-head>USD</md-table-head>
                  <md-table-head>Allocation</md-table-head>
                </md-table-row>

                <md-table-row v-for="(item, index) in selectedCoins" :key="index">
                  <md-table-cell>
                    <span class="dot" :style="'background:' + colors[index]" />
                  </md-table-cell>
                  <md-table-cell>{{ item.symbol }}</md-table-cell>
                  <md-table-cell
                    >${{
                      initialContributionCoin.price && initialContribution
                        ? ((item.ratio * initialContribution * initialContributionCoin.price) / 100).toFixed(2)
                        : 0
                    }}</md-table-cell
                  >
                  <md-table-cell>{{ item.ratio }}%</md-table-cell>
                </md-table-row>
              </md-table>
            </div>
          </div>
        </div>
      </md-step>

      <md-step id="second" md-label="Mindful Strategy">
        <div class="md-layout gutter">
          <!-- DCA strategy -->
          <div class="md-layout-item md-size-55">
            <div class="md-layout md-gutter md-alignment-center-left">
              <div class="md-layout-item">
                <h2 class="title">DCA Strategy</h2>
              </div>
              <div class="md-layout-item" style="display: flex; justify-content: flex-end;">
                <md-switch class="" v-model="dcaOn" value="1" />
              </div>
            </div>
            <p>
              Setup a DCA (dollar cost average) strategy to automatically buy into your Chakra according to a set
              schedule and budget.
            </p>
            <p><b>Note that your DCA can be paused, edited, or updated at any time.</b></p>
            <Dropdown
              class="my-dropdown-toggle"
              :options="dcaTimeframes"
              :selected="dcaTimeframes[dcaTimeframes.length - 1]"
              v-on:updateOption="handleFrequencySelect"
            />
            <div class="md-layout" style="padding-top: 20px">
              <div class="md-layout-item md-size-30">
                <AssetDropdown
                  :asset="initialDCAContributionCoin"
                  v-on:show-modal="showSelectInitialDCAContributionDialog = true"
                />
              </div>
              <div class="md-layout-item md-size-40">
                <TokenInput
                  :state="tokenAllowanceState"
                  v-model="tokenAllowance"
                  v-on:approve-token="handleTokenAllowance($event)"
                />
              </div>
              <div class="md-layout-item md-size-30">
                <TokenInfo
                  :price="initialDCAContributionCoin.price | 0"
                  :balance="initialDCAContributionCoin.amountRounded | 0"
                />
              </div>
            </div>
            <Separator />
          </div>
          <div class="md-layout-item md-size-5" />
          <div class="md-layout-item md-size-40">
            <h2 class="title">DCA Strategy Breakdown</h2>
            <div class="md-layout" style="padding-top: 20px">
              <div class="md-layout-item md-size-30">
                <p>Amount:</p>
              </div>
              <div class="md-layout-item md-size-70">
                <p>{{ tokenAllowance || "–" }} {{ dcaBreakdownStats.coin || "" }}</p>
              </div>
            </div>
            <div class="md-layout" style="padding-top: 20px">
              <div class="md-layout-item md-size-30">
                <p>Frequency:</p>
              </div>
              <div class="md-layout-item md-size-70">
                <p>{{ dcaBreakdownStats.frequency || "–" }}</p>
              </div>
            </div>
            <div class="md-layout" style="padding-top: 20px">
              <div class="md-layout-item md-size-30">
                <p>Management Fee:</p>
              </div>
              <div class="md-layout-item md-size-70">
                <p>Gas + 0.3% of DCA</p>
              </div>
            </div>

            <Separator />
          </div>
          <!-- Profit strategy -->
          <div class="md-layout gutter">
            <div class="md-layout-item md-size-55">
              <div class="md-layout md-gutter md-alignment-center-left">
                <div class="md-layout-item">
                  <h2 class="title">Profit Strategy</h2>
                </div>
                <div class="md-layout-item" style="display: flex; justify-content: flex-end;">
                  <md-switch class="" v-model="takeProfitOn" value="1" />
                </div>
              </div>
              <p>
                Sell portions of your Chakra on the way up according to a profit-taking strategy.
                <b>Some fees apply.</b>
              </p>

              <div class="md-layout md-alignment-center-left">
                <div class="md-layout-item md-size-30">
                  <p>Take profit as:</p>
                </div>
                <div class="md-layout-item md-size-70">
                  <Segment :titles="takeProfitOptions" v-on:update-selected="updateTakeProfitSelection($event)" />
                </div>
              </div>
              <div class="md-layout md-alignment-center-left" style="padding-top: 20px">
                <div class="md-layout-item md-size-30">
                  <p>Take profit after:</p>
                </div>
                <div class="md-layout-item md-size-35">
                  <div class="percentage">
                    <span>%</span>
                    <input placeholder="0" type="number" v-model="takeProfitAfter" style="width: 100%" />
                  </div>
                </div>
                <div class="md-layout-item md-size-35">
                  <p style="margin-left:1rem">increase in Chakra value.</p>
                </div>
              </div>
              <div class="md-layout md-alignment-center-left" style="padding-top: 20px">
                <div class="md-layout-item md-size-30">
                  <p>Profit to take:</p>
                </div>
                <div class="md-layout-item md-size-35">
                  <div class="percentage">
                    <span>%</span>
                    <input placeholder="0" type="number" v-model="takeProfitAmount" style="width: 100%" />
                  </div>
                </div>
                <div class="md-layout-item md-size-35">
                  <p style="margin-left:1rem">of total Chakra value.</p>
                </div>
              </div>
              <div class="md-layout md-alignment-center-left" style="padding-top: 20px">
                <div class="md-layout-item md-size-30">
                  <p>Take profit in:</p>
                </div>
                <div class="md-layout-item md-size-45">
                  <AssetDropdown :asset="takeProfitInCoin" v-on:show-modal="showTakeProfitDialog = true" />
                </div>
                <div class="md-layout-item md-size-25">
                  <TokenInfo :price="20" :balance="2" />
                </div>
              </div>
            </div>
            <div class="md-layout-item md-size-5" />
            <div class="md-layout-item md-size-40">
              <h2 class="title">Profit Strategy Breakdown</h2>

              <div class="md-layout" style="padding-top: 20px">
                <div class="md-layout-item md-size-100">
                  <p>
                    When Chakra value increases by <b>{{ takeProfitAfter || "–" }}%</b>, take
                    <b>{{ takeProfitAmount || "–" }}%</b> of <b>the total {{ takeProfitSelection }} value</b> as profit
                    in <b>{{ takeProfitInCoin.symbol }}</b
                    >.
                  </p>
                </div>
              </div>
              <div class="md-layout" style="padding-top: 20px">
                <div class="md-layout-item md-size-30">
                  <p>Fees:</p>
                </div>
                <div class="md-layout-item md-size-70">
                  <p>Gas + 0.3% of DCA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </md-step>

      <md-step id="third" md-label="Complete">
        <div class="md-layout gutter">
          <div class="md-layout-item md-size-55">
            <h2 class="title">Confirm and Deploy</h2>
            <p>
              Make sure everthing is good to go - then we’ll align your Chakra.
              <b>You will need to sign a transaction.</b>
            </p>
            <Separator />
            <h2 class="title">Chakra Overview <a class="step-edit" @click="setStep(0)">Edit</a></h2>
            <p><b>Name: </b>{{ chakraName }}</p>
            <p><b>Inital contribution: </b>{{ initialContribution || 0 }} {{ initialContributionCoin.symbol }}</p>

            <Separator />
            <h2 class="title">DCA Strategy <a class="step-edit" @click="setStep(1)">Edit</a></h2>

            <p><b>DCA frequency: </b>{{ dcaBreakdownStats.frequency }}</p>
            <p><b>DCA amount: </b>$100</p>

            <Separator />
            <h2 class="title">Profit Taking Strategy <a class="step-edit" @click="setStep(1)">Edit</a></h2>
            <p>
              When Chakra value increases by <b>{{ takeProfitAfter || "–" }}%</b>, take
              <b>{{ takeProfitAmount || "–" }}%</b> of <b>the total {{ takeProfitSelection }} value</b> as profit in
              <b>{{ takeProfitInCoin.symbol }}</b
              >.
            </p>
          </div>

          <div class="md-layout-item md-size-5" />

          <div class="md-layout-item md-size-40" style="padding-top: 20px">
            <div class="md-layout-item">
              <apexchart
                id="other"
                type="donut"
                width="420"
                :options="pieValues.options"
                :series="pieValues.values"
                class="center"
              />
            </div>
            <div class="md-layout-item" style="text-align: center" v-if="selectedCoins.length > 0">
              <span class="assetBreakdownText">Asset Breakdown</span>
              <md-table class="md-caption" style="padding-top: 25px">
                <md-table-row>
                  <md-table-head>Key</md-table-head>
                  <md-table-head>Symbol</md-table-head>
                  <md-table-head>USD</md-table-head>
                  <md-table-head>Allocation</md-table-head>
                </md-table-row>
                <md-table-row v-for="(item, index) in selectedCoins" :key="index">
                  <md-table-cell>
                    <span class="dot" :style="'background:' + colors[index]" />
                  </md-table-cell>
                  <md-table-cell>{{ item.symbol }}</md-table-cell>
                  <md-table-cell>${{ ((item.ratio * initialContribution) / 100).toFixed(0) }}</md-table-cell>
                  <md-table-cell>{{ item.ratio }}%</md-table-cell>
                </md-table-row>
              </md-table>
            </div>
          </div>
        </div>
      </md-step>
    </md-steppers>

    <div class="md-layout" style="padding-top: 20px">
      <div class="md-layout-item md-size-100">
        <hr style="margin:0" />
        <div class="md-layout">
          <div class="md-layout-item md-size-100 stepper-nav">
            <md-button class="cancel-button" v-if="!isFirstStep()" @click="prevStep()">Back</md-button>
            <md-button class="md-raised md-primary next-button" @click="isLastStep() ? completeSteps() : nextStep()">{{
              isLastStep() ? `Confirm` : `Next`
            }}</md-button>
          </div>
        </div>
      </div>
    </div>

    <!-- modals -->
    <md-dialog class="text-center roundedDialog" :md-active.sync="showCoinDialog">
      <md-dialog-title class="selectAssets" style="text-align: left">Select Asset</md-dialog-title>

      <md-dialog-content style="padding-top: 15px; padding-left: 0px; padding-right: 0px">
        <Add-Coin-Modal @rowItemClicked="handelCoinChosen" />
      </md-dialog-content>
    </md-dialog>

    <md-dialog class="text-center roundedDialog" :md-active.sync="showSelectInitialContributionDialog">
      <md-dialog-title class="selectAssets" style="text-align: left">Select Asset</md-dialog-title>

      <md-dialog-content style="padding-top: 15px; padding-left: 0px; padding-right: 0px">
        <Add-Coin-Modal :filterOnlyWithBalance="true" @rowItemClicked="handelInitialSendCoinChosen" />
      </md-dialog-content>
    </md-dialog>

    <md-dialog class="text-center roundedDialog" :md-active.sync="showSelectInitialDCAContributionDialog">
      <md-dialog-title class="selectAssets" style="text-align: left">Select Asset</md-dialog-title>

      <md-dialog-content style="padding-top: 15px; padding-left: 0px; padding-right: 0px">
        <Add-Coin-Modal :filterOnlyWithBalance="true" @rowItemClicked="handleInitialDCACoinChosen" />
      </md-dialog-content>
    </md-dialog>

    <md-dialog class="text-center roundedDialog" :md-active.sync="showTakeProfitDialog">
      <md-dialog-title class="selectAssets" style="text-align: left">Select Asset</md-dialog-title>

      <md-dialog-content style="padding-top: 15px; padding-left: 0px; padding-right: 0px">
        <Add-Coin-Modal @rowItemClicked="handletakeProfitCoinChosen" />
      </md-dialog-content>
    </md-dialog>
  </div>
</template>

<script>
import Separator from "@/components/elements/Separator";
import Segment from "@/components/elements/Segment";
import AssetDropdown from "@/components/elements/AssetDropdown";
import TokenInput from "@/components/elements/TokenInput";
import TokenInfo from "@/components/elements/TokenInfo";
import AddCoinModal from "@/components/AddCoinModal";
import Dropdown from "vue-dropdowns";

import { mapActions, mapState } from "vuex";
export default {
  name: "ChakraFlow",
  components: {
    Separator,
    AddCoinModal,
    Segment,
    AssetDropdown,
    TokenInput,
    TokenInfo,
    Dropdown
  },
  data: () => ({
    takeProfitOptions: ["% of Chakra", "% of Profit"],
    steps: ["first", "second", "third"],
    currentStep: "first",
    chakraName: null,
    dcaOn: true,
    takeProfitOn: true,
    initialContributionCoin: { symbol: "SELECT", logoURI: null },
    initialDCAContributionCoin: { symbol: "SELECT", logoURI: null },
    takeProfitInCoin: { symbol: "SELECT", logoURI: null },
    contributionMode: "single",
    showCoinDialog: false,
    showSelectInitialContributionDialog: false,
    showSelectInitialDCAContributionDialog: false,
    showTakeProfitDialog: false,
    selectedCoins: [],
    tokenAllowance: 0,
    tokenAllowanceState: "default",
    initialContributionState: "default",
    initialContribution: "0",
    // DCA
    dcaTimeframes: [{ name: "Daily" }, { name: "Weekly" }, { name: "Fortnightly" }, { name: "Monthly" }],
    dcaBreakdownStats: {
      amount: null,
      coin: null,
      frequency: "Monthly",
      fee: null
    },
    takeProfitSelection: null,
    takeProfitAfter: null,
    takeProfitAmount: null,
    //
    colors: [
      "#A8A2F5",
      "#E66C82",
      "#F8D771",
      "#9BECBE",
      "#4371E0",
      "#CC83E9",
      "#F77D6A",
      "#D5F871",
      "#67E6ED",
      "#7B66F7"
    ]
  }),
  methods: {
    updateTakeProfitSelection(val) {
      const index = this.findIndex(this.takeProfitOptions, val);
      if (index === 0) {
        this.takeProfitSelection = "Chakra";
      } else {
        this.takeProfitSelection = "Profit";
      }
    },
    findIndex(values, expectedValue) {
      // cos es5
      let selectedIndex;
      const valuePresent = values.some((value, index) => {
        selectedIndex = index;
        return value === expectedValue;
      });
      return valuePresent ? selectedIndex : -1;
    },
    adjustStepByIndex(i) {
      const current = this.findIndex(this.steps, this.currentStep);
      const next = this.steps[current + i];

      if (!next) return;

      this.currentStep = next;
    },
    // Next, prev, completion.
    setStep(i) {
      if (!this.steps[i]) return;

      this.currentStep = this.steps[i];
    },
    nextStep() {
      this.adjustStepByIndex(1);
    },
    prevStep() {
      this.adjustStepByIndex(-1);
    },
    completeSteps() {
      alert("Mindful.cash mainnet deployment is currently disabled and will remain as such until the project has been audited. Please follow us on Twitter to get updates for the mainnet launch 🚀 Remember to stay mindful 🧘‍♂️.");
    },
    isFirstStep() {
      const currentIndex = this.findIndex(this.steps, this.currentStep);
      return currentIndex === 0;
    },
    isLastStep() {
      const currentIndex = this.findIndex(this.steps, this.currentStep);
      return currentIndex === this.steps.length - 1;
    },
    handleFrequencySelect({ name: frequency }) {
      this.dcaBreakdownStats = { ...this.dcaBreakdownStats, frequency };
    },
    handleTokenAllowance(allowance) {
      // alert(allowance);
      // demo
      this.tokenAllowanceState = "loading";
      setTimeout(() => {
        this.tokenAllowanceState = "complete";
      }, 5000);
    },
    handleInitialContribution(initialContribution) {
      this.initialContribution = initialContribution;
      this.initialContributionState = "loading";
      setTimeout(() => {
        this.initialContributionState = "complete";
      }, 5000);
    },
    handelInitialSendCoinChosen(chosenCoin) {
      console.log("CHOSEN", chosenCoin);
      this.initialContributionCoin = chosenCoin;
      this.showSelectInitialContributionDialog = false;
    },
    handleInitialDCACoinChosen(coin) {
      this.initialDCAContributionCoin = coin;
      this.dcaBreakdownStats = { ...this.dcaBreakdownStats, coin: coin.symbol };
      this.showSelectInitialDCAContributionDialog = false;
    },
    handletakeProfitCoinChosen(coin) {
      this.takeProfitInCoin = coin;
      // this.dcaBreakdownStats = { ...this.dcaBreakdownStats, coin: coin.symbol };
      this.showTakeProfitDialog = false;
    },
    handelCoinChosen(coinObject) {
      console.log("clickedz", coinObject);
      if (
        this.selectedCoins
          .map(itterationToken => {
            return itterationToken.symbol;
          })
          .indexOf(coinObject.symbol) === -1
      ) {
        this.selectedCoins.push({ ...coinObject, ratio: 0 });
      }
      this.showCoinDialog = false;
    },
    removeCoinFromSelected(removeIndex) {
      console.log("removing", removeIndex);
      this.selectedCoins[removeIndex].ratio = 0;
      this.selectedCoins.splice(removeIndex, 1);
      this.showCoinDialog = false;
    }
  },

  computed: {
    ...mapState(["allTokens"]),
    totalSelected() {
      let total = 0;
      this.selectedCoins.forEach(selected => {
        if (selected.ratio) {
          total += selected.ratio;
        }
      });
      return total;
    },
    selectorOptions() {
      const remaining = 100 - this.totalSelected;
      return {
        process: ([pos, i]) => [
          [0, pos],
          [pos, pos + remaining, { backgroundColor: "#999" }]
        ]
      };
    },
    unselectedPercent() {
      return 100 - this.totalSelected;
    },
    pieValues() {
      const pieValues = [];
      const pieLabels = [];
      const pieColors = [];
      let count = 0;
      const colors = this.colors;
      this.selectedCoins.forEach(token => {
        pieValues.push(token.ratio);
        pieLabels.push(token.symbol);
        pieColors.push(colors[count]);
        count++;
      });
      pieValues.push(this.unselectedPercent);
      pieLabels.push("Remaining");
      pieColors.push("#999");
      return {
        values: pieValues,
        options: {
          labels: pieLabels,
          colors: pieColors,
          dataLabels: {
            enabled: true
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  show: false
                }
              }
            }
          ],
          legend: {
            show: false
          }
        }
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";

// Navigation overrides
::v-deep .md-steppers-navigation {
  box-shadow: none !important;
  border-bottom: 1px solid rgba(41, 41, 41, 0.1);
}

::v-deep .md-steppers .md-stepper-number {
  background: none !important;
  color: #ccc !important;
  border: 1px solid #ccc !important;
}

::v-deep .md-steppers .md-active .md-stepper-number {
  background: linear-gradient(74.67deg, #00e0ff -6.3%, #aa55ff 111.05%) !important;
  border: none !important;
  color: #fff !important;
}

::v-deep .md-steppers .md-stepper-text {
  color: #ccc !important;
}

::v-deep .md-steppers .md-active .md-stepper-text {
  color: #292929 !important;
  font-weight: 500 !important;
}

// Theme
.wrapper {
  text-align: left;
  background: white;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 1.25rem;
  padding-top: 0.25rem;
  margin-bottom: 4rem;
}

::v-deep .md-steppers .md-stepper-content {
  display: flex;
}

input {
  border: none;
  box-shadow: inset 0 0 0 1px #ddd;
  border-radius: 0.5rem;
  color: #aaa;
  background: none;
  border-radius: 8px;
  height: 2.5rem;
  box-sizing: border-box;
  width: 95%;
  padding: 0 1rem;
  font-size: 1rem;

  &:focus {
    border: 1px solid #00e0ff;
    outline: none;
  }

  &::placeholder {
    color: #aaa;
  }
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

h1.title {
  margin: 1.5rem 0 0 1.5rem;
}

.subtitle {
  font-size: 1.125rem;
  font-weight: 500;
}

.title {
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.875rem;
}

.add-asset-btn {
  height: 2.5rem;
  border: 1px solid #aaa;
  color: #aaa;
  text-align: center;
  width: 95%;
  background: none;
  box-shadow: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 600;

  span {
    transition: all ease-in-out 0.5s;
    font-size: 1rem;
  }

  &:hover {
    border: 1px solid #00e0ff;

    span {
      background: linear-gradient(74.67deg, #00e0ff -6.3%, #aa55ff 111.05%);
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}
.roundedDialog {
  background: rgba(255, 255, 255, 0.25) !important;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px !important;
}

.primaryText {
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #292929;
}

.secondaryText {
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  text-align: right;
  color: #aaaaaa;
}

.assetBreakdownText {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 20px;
}
.dot {
  vertical-align: middle;
  text-align: center;
  height: 15px;
  width: 15px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
}

.totalContributionText {
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  text-align: right;
  color: rgba(41, 41, 41, 0.75);
  border: 1px solid #ffffff;
}

.totalContributionNumber {
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 26px;
  line-height: 31px;
  text-align: right;
  color: #292929;
  border: 1px solid #ffffff;
}

a.step-edit {
  background: linear-gradient(74.67deg, #00e0ff -6.3%, #aa55ff 111.05%);
  background-clip: text;
  color: transparent !important;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
}

.cancel-button {
  border: 1px solid #aaa !important;
  box-sizing: border-box;
  border-radius: 8px;
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 1rem;
  line-height: 19px;
  text-align: center;
  color: #aaa !important;
  text-transform: none !important;
}

.next-button {
  background: linear-gradient(74.67deg, #00e0ff -6.3%, #aa55ff 111.05%);
  border-radius: 8px;
  box-shadow: none !important;
  font-size: 1rem;
  color: #ffffff;
  text-transform: none !important;
}

.stepper-nav {
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
}
</style>
