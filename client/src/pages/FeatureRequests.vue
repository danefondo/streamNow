<template>
  <div class="footer_page_container">
    <div class="nav-container auto-side-margins">
      <div class="navlinks-container">
        <div
          @click="switchTab('estonian')"
          class="lang-tab"
          v-bind:class="[ activetab === 'estonian' ? 'active-lang' : '' ]"
        >{{$t("features.estonian")}}</div>
        <div
          @click="switchTab('english')"
          class="lang-tab"
          v-bind:class="[ activetab === 'english' ? 'active-lang' : '' ]"
        >{{$t("features.english")}}</div>
      </div>
    </div>
    <div v-if="activetab == 'estonian'" class="request_page">
      <div class="features_title">Küsi julgelt</div>
      <div class="features_tagline">Oled sattunud maale, kus kõik on võimalik.</div>
      <img class="unicorn" src="../assets/images/unicorn.jpeg" />
      <input
        class="new_feature feature_input"
        autocomplete="off"
        placeholder="Mis teeks Eeter.tv veel ägedamaks?"
        v-model="newFeature"
        @keyup.enter="addNewFeature"
      />
      <input
        class="new_feature_desc feature_input"
        autocomplete="off"
        placeholder="Räägi meile veel sellest!"
        v-model="newFeatureDesc"
        @keyup.enter="addNewFeature"
      />
      <div v-if="!isAuthenticated" class="input_container">
        <input
          class="requester_email feature_input"
          autocomplete="off"
          placeholder="Jaga emaili, anname teada kui valmis!"
          v-model="requesterEmail"
          @keyup.enter="addNewFeature"
        />
      </div>
      <div @click="addNewFeature" class="feature_button">Saada idee teele!</div>
      <div class="features_leaderboard">Nõutumad ideed</div>
      <div v-if="featuresExist && features" class="requested_features">
        <div
          v-for="feature in features"
          v-bind:key="feature.id"
          v-show="feature.language == activetab"
          class="requested_feature"
          :id="feature._id"
          @click="updateFeatureDemand(feature._id)"
          :class="isAuthenticated ? checkHasVoted(feature._id) : ''"
        >
          <div class="feature_idea">{{ feature.idea }}</div>
          <div class="demand_count">{{ feature.demand_count }}</div>
        </div>
      </div>
    </div>
    <div v-else-if="activetab == 'english'" class="request_page">
      <div class="features_title">Don't be shy.</div>
      <div class="features_tagline">The possibilities are endless.</div>
      <img class="unicorn" src="../assets/images/unicorn.jpeg" />
      <input
        class="new_feature feature_input"
        autocomplete="off"
        placeholder="What would make Eeter.tv even cooler?"
        v-model="newFeature"
        @keyup.enter="addNewFeature"
      />
      <input
        class="new_feature_desc feature_input"
        autocomplete="off"
        placeholder="Tell us more about those unicorns!"
        v-model="newFeatureDesc"
        @keyup.enter="addNewFeature"
      />
      <div v-if="!isAuthenticated" class="input_container">
        <input
          class="requester_email feature_input"
          autocomplete="off"
          placeholder="Email to be notified to when ready!"
          v-model="requesterEmail"
          @keyup.enter="addNewFeature"
        />
      </div>
      <div @click="addNewFeature" class="feature_button">Send your wish!</div>
      <div class="features_leaderboard">Nõutumad ideed</div>
      <div v-if="featuresExist && features" class="requested_features">
        <div
          v-for="feature in features"
          v-bind:key="feature.id"
          v-show="feature.language == activetab"
          class="requested_feature"
          :id="feature._id"
          @click="updateFeatureDemand(feature._id)"
          :class="isAuthenticated ? checkHasVoted(feature._id) : ''"
        >
          <div class="feature_idea">{{ feature.idea }}</div>
          <div class="demand_count">{{ feature.demand_count }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import auth from "../config/auth";

export default {
  name: "FeatureRequests",
  data() {
    return {
      activetab: "estonian",
      estonian: true,
      english: false,
      features: {},
      featuresExist: false,
      newFeature: "",
      newFeatureDesc: "",
      requesterEmail: "",
      isAuthenticated: false,
      user: {}
    };
  },
  async mounted() {
    if (auth.isAuthenticated()) {
      this.user = auth.isAuthenticated();
      this.isAuthenticated = true;
    }
    try {
      if (!this.isAuthenticated) {
        const { data } = await axios.get(`/features`);
        this.features = data.features;
        this.featuresExist = true;
      } else if (this.isAuthenticated) {
        let sendData = {
          userId: this.user._id
        };
        const { data } = await axios.post("/features/checkAllVoted", sendData);
        this.features = data.features;
        this.featuresExist = true;
      }
    } catch (error) {
      this.featuresExist = false;
    }
  },
  methods: {
    addNewFeature: async function() {
      let feature_data = {};
      feature_data.language = this.activetab;
      feature_data.idea = this.newFeature && this.newFeature.trim();
      feature_data.description =
        this.newFeatureDesc && this.newFeatureDesc.trim();
      if (!this.isAuthenticated) {
        if (this.requesterEmail && this.requesterEmail.includes("@")) {
          feature_data.requester_email =
            this.requesterEmail && this.requesterEmail.trim();
        } else if (!this.requesterEmail || !this.requesterEmail.includes("@")) {
          return alert("Please enter valid email.");
        } else {
          return alert("Please enter valid email.");
        }
      }
      if (!feature_data.idea) {
        return alert("You forgot to tell us your brilliant idea!");
      }
      if (!feature_data.description) {
        return alert("You forgot to describe your brilliant idea!");
      }
      feature_data.userId = this.user._id;
      let result = await axios.post(`/features/addFeature`, feature_data);
      let feature = { ...result.data.feature, hasVoted: true };
      this.features.push(feature);
      this.newFeature = "";
      this.newFeatureDesc = "";
      this.requesterEmail = "";
      //   try {
      //     const { data } = await axios.get(`/features`);
      //     this.features = data.features;
      //     this.featuresExist = true;
      //   this.newFeature = "";
      //   this.newFeatureDesc = "";
      //   this.requesterEmail = "";
      //   } catch (error) {
      //     this.featuresExist = false;
      //   }
    },
    switchTab: function(tab) {
      this.activetab = tab;
      this.estonian = !this.estonian;
      this.english = !this.english;
    },
    checkHasVoted(featureId) {
      let obj = this.features;
      let key = "_id";
      let value = featureId;
      const filterValue = (obj, key, value) =>
        obj.filter(v => v[key] === value);
      let result = filterValue(obj, key, value);
      let hasVoted = result[0].hasVoted;
      if (hasVoted) {
        return "upvoted";
      } else {
        return "";
      }
    },
    async updateFeatureDemand(feature_id) {
      if (!this.isAuthenticated) {
        let alertText = "Please make an account to vote for features.";
        alert(alertText);
        return;
      }
      try {
        let info = {};
        info.user = this.user;
        let { data } = await axios.post(
          `/features/updateFeatureDemand/${feature_id}`,
          info
        );
        console.log("dataa", data);
        let feature = data.feature;
        let hasVoted = data.hasVoted;

        this.features = this.features.filter(function(obj) {
          return obj._id !== feature._id;
        });
        let new_feature = { ...feature, hasVoted: hasVoted };
        this.features.push(new_feature);

        // let toggled_feature = document.getElementById(feature_id);
        // let feature_edited = toggled_feature.getElementsByClassName(
        //   "demand_count"
        // )[0];
        // feature_edited.innerHTML = feature.demand_count;
        // toggled_feature.removeAttribute("class");
        // let voted = new_feature.hasVoted ? "upvoted" : "";
        // toggled_feature.removeAttribute("class");
        // if (voted) {
        //     toggled_feature.className = "requested_feature upvoted";
        // } else {
        //     toggled_feature.className = "requested_feature";
        // }
      } catch (error) {
        console.log(error);
        alert(error.response.data.errors);
      }
    }
  }
};
</script>


<style>
.unicorn {
  width: 355px;
}

.features_title {
  font-size: 55px;
  text-align: center;
  margin-bottom: 10px;
}

.features_leaderboard {
  font-size: 45px;
  text-align: center;
  margin-top: 50px;
}

.features_tagline {
  margin-bottom: 10px;
  text-align: center;
}

.feature_button {
  background-color: #130088;
  color: white;
  border-radius: 3px;
  padding: 10px 16px;
  font-size: 26px;
  margin-top: 10px;
  text-align: center;
  cursor: pointer;
  transition: 0.2s ease;
}

.feature_button:hover {
  transform: scale(1.02);
}

.feature_input {
  border-radius: 3px;
  border: 1px solid #eee;
  margin-right: 16px;
  padding: 10px;
  margin-left: auto;
  margin-right: auto;
  padding: 15px !important;
  display: block !important;
  font-size: 18px !important;
  /* box-shadow: 4px 5px 0px 0px #e6e6e6; */
  margin-top: 15px;
  box-sizing: border-box;
  font-family: "Trebuchet MS", sans-serif;
}

.requested_features {
  margin-top: 25px;
  margin-bottom: 100px;
}

.requested_feature {
  border-radius: 3px;
  border: 1px solid transparent;
  background-color: #f7f7fb;
  color: #130088;
  transition: 0.2s ease;
  display: flex;
  justify-content: space-between;
  padding: 14px 15px;
  margin-bottom: 7px;
  cursor: pointer;
}
.requested_feature:hover {
  border-color: #a3a7ff;
  transform: scale(1.02);
  background-color: #ebebff;
}

.upvoted {
  color: #1919ff;
  border-color: #a3a7ff;
  background-color: #ebebff;
}

.textTitle {
  font-size: 11pt;
  font-family: Arial;
  color: rgb(0, 0, 0);
  background-color: transparent;
  font-weight: 700;
  font-style: normal;
  font-variant: normal;
  text-decoration: none;
  vertical-align: baseline;
  white-space: pre-wrap;
  margin-bottom: 6px;
}
.textStyle {
  font-size: 11pt;
  font-family: Arial;
  color: rgb(0, 0, 0);
  background-color: transparent;
  font-style: normal;
  font-variant: normal;
  text-decoration: none;
  vertical-align: baseline;
  white-space: pre-wrap;
  line-height: 1.38;
  margin-top: 0pt;
  margin-bottom: 0pt;
}

.textSection {
  margin-bottom: 30px;
}

.footer_page_container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
  font-family: "Trebuchet MS", sans-serif;
}
.request_page {
  padding: 30px 0px;
  padding-bottom: 40px;
  font-size: 18px !important;
  max-width: 600px;
  margin: 0 auto;
  max-width: 355px;
  min-width: 355px;
  width: 100%;
}
/*! CSS Used from: https://www.eeter.tv/css/navigation.css */
.lang-tab {
  border-radius: 4px;
  padding: 12px 16px;
  margin: 0px 6px;
  box-sizing: border-box;
  margin-bottom: 0px;
  border: 1px solid transparent;
}
.lang-tab {
  color: #120088;
  font-weight: bold;
  padding: 10px 16px;
  display: inline-block;
  cursor: pointer;
}
.lang-tab:hover {
  background-color: #f5f5f5;
}
.nav-container {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 0px 15px;
  background-color: #b1f6ff00;
  height: 60px;
}
.nav-container a {
  text-decoration: none;
}
/*! CSS Used from: https://www.eeter.tv/css/responsive.css */
@media screen and (max-width: 480px) {
  .nav-container {
    padding: 10px 0px;
    flex-wrap: wrap;
  }
  .navlinks-container {
    margin-left: 10px;
  }
  .topNavigationLink__topBar {
    padding: 10px 6px;
    margin: 0px 4px;
  }
}
/*! CSS Used from: https://www.eeter.tv/css/streaming.css */
.nav-container {
  padding-top: 0px;
}
.auto-side-margins {
  margin-left: auto;
  margin-right: auto;
}
.active-lang {
  background-color: #f7f7fb;
}
</style>
