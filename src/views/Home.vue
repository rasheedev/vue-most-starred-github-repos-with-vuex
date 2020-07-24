<template>
  <div id="app">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="title">
            <h3 class="mb-5 text-center">The most starred Github Repositories in the last 30 days</h3>
          </div>
          <!-- Displaying Repositories -->
          <SingleRepo
            v-for="repo in repos"
            :key="repo.id"
            :repoTitle="repo.name"
            :repoFullTitle="repo.fullName"
            :repoUserAvatar="repo.userAvatar"
            :repoURL="repo.url"
            :repoDesc="repo.desc"
            :repoNumStars="repo.starsNum"
            :repoNumIssues="repo.issuesNum"
            :repoUserURL="repo.userURL"
            :repoUsername="repo.userName"
            :repoDaysAgo="repo.createdAt"
          />
          <!-- Pulse Loader -->
          <pulse-loader :loading="loading" class="loader"></pulse-loader>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SingleRepo from "@/components/SingleRepo.vue";
import moment from "moment";
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

export default {
  name: "Home",
  components: {
    SingleRepo,
    PulseLoader
  },
  data() {
    return {
      lastDays: 30,
      pageNumber: 1,
      loading: true
    };
  },
  computed: {
    repos: function(){
      return this.$store.getters.customizedRepos;
    }
  },
  methods: {
    // Method to get new repositories when the scroll reachs the bottom of the page
    scroll() {
      window.onscroll = () => {
        let winHeight = document.documentElement.scrollTop + window.innerHeight;
        let offHeight = document.documentElement.offsetHeight;
        if (winHeight === offHeight) {
          this.loading = true;
          this.pageNumber++;
          this.$store.dispatch('getRepositories', {
            pageNb: this.pageNumber, 
            dateFrom: moment().subtract(this.lastDays, "days").format("YYYY-MM-DD"),
            reposPerPage: 30
          }).then(() => {
            this.loading = false;
          });

        }
      };
    }
  },
  // displaying repositories after the vue instance is created
  created() {
    this.$store.dispatch('getRepositories', {
      pageNb: this.pageNumber, 
      dateFrom: moment().subtract(this.lastDays, "days").format("YYYY-MM-DD"),
      reposPerPage: 30,
      loading: this.loading
    }).then(() => {
      this.loading = false;
    });
    this.scroll();
  }
};
</script>

<style lang="scss">
#app {
  margin: 40px 0;
  .loader {
    text-align: center;
    margin: 0 auto;
  }
  .title {
    padding: 25px 40px;
    text-align: center;
    margin-bottom: 40px;
    border-radius: 4px;
    background-color: #d1ecf1;
    border-color: #bee5eb;
    h3 {
      margin: 0 !important;
      font-size: 22px;
      font-weight: 600;
      color: #0c5460;
    }
  }
}
</style>
