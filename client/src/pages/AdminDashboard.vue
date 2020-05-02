<template>
  <div class="manager">
    <div class="manager-header">
      <h1 class="manager-title">{{ $t("admin.admin-dashboard") }}</h1>
      <p class="manager-tagline admin-tagline">{{ $t("admin.superadmin-notice") }}</p>
    </div>
    <div class="manager-switch">
      <div
        @click="activetab='users'"
        class="manager-option"
        v-bind:class="[ activetab === 'users' ? 'manager-selected' : '' ]"
      >Users</div>
      <div
        @click="activetab='statistics'"
        class="manager-option"
        v-bind:class="[ activetab === 'statistics' ? 'manager-selected' : '' ]"
      >Statistics</div>
      <!-- <div
        @click="activetab='previous'"
        class="manager-option"
        v-bind:class="[ activetab === 'previous' ? 'manager-selected' : '' ]"
      >Previous</div>
      <div
        @click="activetab='live'"
        class="manager-option"
        v-bind:class="[ activetab === 'live' ? 'manager-selected' : '' ]"
      >Live</div> -->
    </div>
    <div v-if="users && users.length" class="manager-streams">
      <UserBar
        v-for="user in users"
        ref="admin"
        :key="user._id"
        :user="user"
        :method="updateUsers"
        :activetab="activetab"
      />
    </div>
    <div v-if="users && users.length" class="manager-streams">
      <SuperadminStatistics
        :users="users"
        :activetab="activetab"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import UserBar from "../components/UserBar";
import SuperadminStatistics from "../components/SuperadminStatistics";

export default {
  name: "AdminDashboard",
  data() {
    return {
      users: {},
      activetab: "users"
    };
  },
  components: {
    UserBar,
    SuperadminStatistics
  },
  async mounted() {
    const { data } = await axios.get("/admin/superadmin");
    this.users = data.users;
  },
  methods: {
    updateUsers: async function() {
      const { data } = await axios.get("/admin/superadmin");
      this.users = data.users;
    }
  }
};
</script>

<style>
.admin-tagline {
    width: 500px;
}

.manager {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  margin-bottom: 60px;
}

.manager-header {
  display: flex;
  text-align: center;
  flex-direction: column;
  margin-bottom: 10px;
}

.manager-switch {
  display: flex;
  flex-direction: row;
  margin: 20px 0px;
}

.manager-option {
  margin: 5px 9px;
  padding: 9px 18px;
  border-radius: 3px;
  min-width: 45px;
  font-size: 22px;
  text-align: center;
  cursor: pointer;
}

.manager-option:hover {
  background-color: #f5f5f5;
}

.manager-initial {
  background-color: #f5f5f5;
}

.manager-selected {
  background-color: #f5f5f5;
}

.manager-title {
  font-size: 45px;
  margin-bottom: 10px;
}

.manager-tagline {
  font-size: 20px;
}

.goLiveModalBackground {
  background-color: #1f1f1f;
  opacity: 0.5;
  top: 0;
  left: 0;
  z-index: 1003;
  position: fixed;
  width: 100%;
  height: 100%;
}

.toLiveModal {
  position: fixed;
  z-index: 9999;
  top: 20%;
  right: 0;
  left: 0;
  margin: 0 auto;
  width: 350px;
  background: #ffffff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 5px 15px 0 rgba(0, 0, 0, 0.05);
  border-radius: 2px;
  border: none;
  padding: 20px;
}

.confirm-golive {
  margin-right: 12px;
  background-color: #0000ff94;
}

.button-filled {
  display: inline-block;
  font-weight: 600;
  color: white;
  letter-spacing: 0.1rem;
  background-color: #130089;
  cursor: pointer;
  border-radius: 3px;
  border: none;
  padding: 12px;
  text-align: center;
  transition: 0.2s ease;
}
.button-filled:hover {
  background-color: #0000ff94;
}

.modal-text-container {
  width: 250px;
}

.modal-content-wrapper {
  width: 290px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.modal-title {
  margin-top: 30px;
  font-size: 20px;
  width: 250px;
}
.modal-body {
  padding-top: 10px;
  font-weight: 100;
  font-size: 16px;
  display: block;
  width: 250px;
}
</style>