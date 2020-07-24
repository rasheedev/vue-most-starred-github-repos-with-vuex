import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import moment from "moment";

Vue.use(Vuex)

export const store = new Vuex.Store({

  state: {
    repos: [],
  },
  mutations: {
    getRepositories(state, payload) {
      state.repos = state.repos.concat(payload);
    },
  },
  actions: {
    getRepositories(state, payload) {
      const baseURL = `https://api.github.com/search/repositories?q=created:>${payload.dateFrom}&sort=stars&order=desc&page=${payload.pageNb}&per_page=${payload.reposPerPage}`;
      return axios
        .get(baseURL)
        .then(result => {
          console.log(result.data.items);
          state.commit('getRepositories', result.data.items);
        });
    },
  },
  getters: {
    customizedRepos(state) {
      return state.repos.map((repo) => {
        let obj = {
          id: repo.id,
          name: (repo.name && repo.name.length > 40) ? repo.name.substring(0, 40) + "..." : repo.name,
          fullName: repo.name,
          url: repo.html_url,
          desc: (repo.description && repo.description.length > 250) ?  repo.description.substring(0, 250) + "..." : repo.description,
          starsNum: repo.stargazers_count,
          issuesNum: repo.open_issues,
          userName: repo.owner.login,
          userAvatar: repo.owner.avatar_url,
          userURL: repo.owner.html_url,
          createdAt: moment().diff(moment(repo.created_at), 'days')
        }
        return obj;
      });
    }
  }

});
