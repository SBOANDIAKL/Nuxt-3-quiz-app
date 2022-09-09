<template>
  <div>
    <div v-if="hasData">
      <div class="container my-2 bg-success">
        <div class="row align-middle text-center">
          <div class="text-light col-sm">
            <p class="pt-3">Total Questions: {{ store.total }}</p>
          </div>
          <div class="text-light col-sm">
            <p class="pt-3">Questions Number: {{ store.questionNumber + 1 }}</p>
          </div>
          <div class="text-light col-sm">
            <p class="pt-3">
              Score: {{ store.score }}/{{ store.questionNumber + 1 }}
            </p>
          </div>
        </div>
      </div>
      <div class="card mx-auto w-75" style="width: 18rem">
        <h3></h3>
        <div class="card-body">
          <h5 class="card-title" v-html="thisQuestion?.question"></h5>
          <p class="card-text mb-0 mt-5">
            Choose correct answer:
            <!-- {{ thisQuestion?.correct_answer }} -->
          </p>
          <div class="row mx-auto mw-50">
            <button
              class="btn m-3 col-8 mx-auto"
              :class="
                submitted && correctIndex == index
                  ? ' btn-success'
                  : submitted && clickedId == index
                  ? ' btn-danger'
                  : 'btn-info'
              "
              :disabled="submitted"
              v-for="(item, index) in answers"
              :key="item"
              :value="item"
              v-html="item"
              @click="checkAnswer(index)"
            ></button>
          </div>
        </div>

        <div
          v-if="hasSubmitted && !isGameOver"
          class="mx-auto w-25 mb-3 text-center"
        >
          <h4>{{ reply }}</h4>
          <button class="btn btn-warning" @click="nextQuestion">
            Next Question
          </button>
        </div>
        <div
          v-else-if="hasSubmitted && isGameOver"
          class="mx-auto w-25 mb-3 text-center"
        >
          <h4>Game Over</h4>
          <h5>Score: {{ store.score }}/{{ store.total }}</h5>

          <button class="btn btn-warning" @click="playAgain">Play Again</button>
        </div>
      </div>
    </div>
    <div v-else class="w-50 mx-auto">
      <h1 class="my-5">No Data Found...</h1>
      <nuxt-link to="/" class="btn btn-success">Go to Home Page</nuxt-link>
    </div>
  </div>
</template>

<script setup>
import { testStore } from "~/store/";
const store = testStore();
// const route = useRoute();
const reply = ref("");
const submitted = ref(false);
const correctIndex = ref(null);
const isGameOver = ref(false);
const gameFinished = ref(false);
const router = useRouter();
const clickedId = ref(-1);
const hasData = ref(false);
// if (store.total) {
hasData.value = true;

const fetchName = Math.random().toFixed(10).toString();
console.log(store.getparamater);
const { data, pending, error, refresh } = await useAsyncData(fetchName, () =>
  $fetch("https://opentdb.com/api.php" + store.getparamater)
);
if (store.total == 0) {
  hasData.value = false;
}
const allQuestions = data.value?.results;

// const loaded = computed(() => allQuestions?.length);

const hasSubmitted = computed(() => submitted.value);

const thisQuestion = computed(() => allQuestions[store.questionNumber]);

const answers = computed(() =>
  [...thisQuestion.value?.incorrect_answers, thisQuestion.value?.correct_answer]
    .sort()
    .reverse()
);

function checkAnswer(id) {
  if (answers.value[id] == thisQuestion.value.correct_answer) {
    reply.value = "Correct";
    correctIndex.value = id;
    store.score++;
  } else {
    reply.value = "Incorrect";
    correctIndex.value = answers.value.findIndex(
      (item) => item === thisQuestion.value.correct_answer
    );
  }
  // To add color in correct/incorrect answer
  clickedId.value = id;
  if (store.questionNumber + 1 == store.total) {
    isGameOver.value = true;
  }
  submitted.value = true;
}

function playAgain() {
  nextQuestion();
  store.total = 10;
  store.questionNumber = 0;
  store.questions = [];
  store.score = 0;
  gameFinished.value = "true";
  router.push("/");
}

function nextQuestion() {
  store.questionNumber++;
  submitted.value = false;
}
</script>
