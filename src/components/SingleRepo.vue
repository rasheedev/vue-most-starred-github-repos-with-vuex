<template>
  <div class="card">
    <div class="row no-gutters">
      <div class="col-md-2 card-img d-flex align-items-center">
        <a :href="repoUserURL" target="_blank" :title="repoUsername">
          <img class="w-100 p-2 text-center" :src="repoUserAvatar" />
        </a>
      </div>
      <div class="col-md-10">
        <div class="card-body">
          <a :href="repoURL" target="_blank" :title="repoFullTitle">
            <h3 class="card-title">
              {{ repoTitle }}
            </h3>
          </a>
          <p class="card-text">{{ repoDesc }}</p>
          <p class="card-text">
            <span class="badge badge-secondary mr-2">
              Stars: {{ repoNumStars }}
            </span>
            <span class="badge badge-secondary mr-2">
              Issues: {{ repoNumIssues }}
            </span>
            <small class="text-muted">
              <span>
                Submitted {{ repoDaysAgo }} days ago by
                <a :href="repoUserURL" target="_blank">
                  {{ repoUsername }}
                </a>
              </span>
            </small>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SingleRepo",
  props: {
    repoUserAvatar: String,
    repoURL: String,
    repoTitle: String,
    repoFullTitle: String,
    repoDesc: String,
    repoNumStars: Number,
    repoNumIssues: Number,
    repoDaysAgo: Number,
    repoUsername: String,
    repoUserURL: String
  }
};
</script>

<style scoped lang="scss">
.card {
  margin-bottom: 1rem;
  &:last-child {
    margin-bottom: 0;
  }
  .badge {
    padding: 0.5em 0.8em;
  }
}
@media (max-width: 767.98px) {
  .card-img {
    border-bottom: 1px solid #dee2e6 !important;
    border-right: none;
  }
}
@media (min-width: 768px) {
  .card-img {
    border-right: 1px solid #dee2e6 !important;
    border-bottom: none;
  }
}
</style>
